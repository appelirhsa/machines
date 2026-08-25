/* ============ Navigation active-state ============ */
document.addEventListener('DOMContentLoaded', function () {
  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.sidebar nav a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === here) a.classList.add('active');
  });
  renderMiniProgress();
});

/* ============ Simple localStorage progress store ============ */
var Progress = {
  key: 'emaeeb4_progress_v1',
  load: function () {
    try { return JSON.parse(localStorage.getItem(this.key)) || {}; }
    catch (e) { return {}; }
  },
  save: function (data) {
    try { localStorage.setItem(this.key, JSON.stringify(data)); } catch (e) {}
  },
  setResult: function (quizId, qid, status) {
    // status: 'correct' | 'hinted'
    var data = this.load();
    data[quizId] = data[quizId] || {};
    data[quizId][qid] = status;
    this.save(data);
    renderMiniProgress();
  },
  reset: function () {
    try { localStorage.removeItem(this.key); } catch (e) {}
    location.reload();
  }
};

function renderMiniProgress() {
  var el = document.getElementById('mini-progress-bar');
  var label = document.getElementById('mini-progress-label');
  if (!el) return;
  var data = Progress.load();
  var total = 0, done = 0, correct = 0;
  Object.keys(data).forEach(function (quizId) {
    Object.keys(data[quizId]).forEach(function (qid) {
      total++;
      done++;
      if (data[quizId][qid] === 'correct') correct++;
    });
  });
  var pct = total ? Math.round((done / Math.max(total, 1)) * 100) : 0;
  el.style.width = (done ? 100 : 0) + '%';
  if (label) {
    label.textContent = total
      ? (correct + '/' + total + ' answered correctly so far')
      : 'No quiz attempts yet';
  }
}

/* ============ Quiz Engine ============
Question object shape:
{
  id: 'unique-id',
  type: 'mcq' | 'numeric',
  prompt: 'HTML string for the question',
  options: [ 'a', 'b', 'c', 'd' ],       // mcq only
  correct: 0,                             // mcq: option index
  answer: 123.4,                          // numeric: correct value
  tolerance: 0.03,                        // numeric: relative tolerance (fraction), default 0.03
  unit: 'V',                              // numeric: unit label shown next to input
  steps: [ 'Step 1 ...', 'Step 2 ...' ],  // progressive hints shown on wrong attempts
  solution: 'Full worked solution shown once hints are exhausted / on request'
}
=================================== */

var QuizEngine = (function () {

  function fmtNum(n) {
    if (Math.abs(n) >= 1000) return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
    return (Math.round(n * 1000) / 1000).toString();
  }

  function checkNumeric(q, raw) {
    var val = parseFloat(String(raw).replace(/,/g, '').trim());
    if (isNaN(val)) return false;
    var tol = (q.tolerance !== undefined) ? q.tolerance : 0.03;
    var target = q.answer;
    if (target === 0) return Math.abs(val) < 0.01;
    return Math.abs(val - target) / Math.abs(target) <= tol;
  }

  function render(containerId, questions, quizId) {
    var container = document.getElementById(containerId);
    if (!container) return;
    quizId = quizId || containerId;

    var scoreBar = document.createElement('div');
    scoreBar.className = 'quiz-score';
    scoreBar.innerHTML = '<span class="dot"></span><span class="score-text">Answer each question below. If you get one wrong, keep trying — hints unlock step by step.</span>';
    container.appendChild(scoreBar);

    questions.forEach(function (q, idx) {
      var card = document.createElement('div');
      card.className = 'qcard';
      card.id = quizId + '-' + q.id;

      var head = document.createElement('div');
      head.className = 'qhead';
      head.innerHTML = '<span class="qnum">Question ' + (idx + 1) + ' of ' + questions.length + '</span><span class="qmark" style="display:none"></span>';
      card.appendChild(head);

      var prompt = document.createElement('div');
      prompt.className = 'qprompt';
      prompt.innerHTML = q.prompt;
      card.appendChild(prompt);

      var body = document.createElement('div');
      var state = { hintIndex: 0, solved: false, attempts: 0 };

      if (q.type === 'mcq') {
        var opts = document.createElement('div');
        opts.className = 'qoptions';
        q.options.forEach(function (optText, i) {
          var label = document.createElement('label');
          label.innerHTML = '<input type="radio" name="' + card.id + '-opt" value="' + i + '"> <span>' + optText + '</span>';
          opts.appendChild(label);
        });
        body.appendChild(opts);
      } else {
        var numRow = document.createElement('div');
        numRow.className = 'qnum-input';
        numRow.innerHTML = '<input type="text" placeholder="Your answer" id="' + card.id + '-input">' +
          (q.unit ? '<span class="unit">' + q.unit + '</span>' : '');
        body.appendChild(numRow);
      }

      var btnRow = document.createElement('div');
      btnRow.className = 'qbtn-row';
      btnRow.innerHTML = '<button class="qbtn" data-act="submit">Submit answer</button>' +
        '<button class="qbtn secondary" data-act="hint">Give me a hint</button>' +
        '<button class="qbtn secondary" data-act="reveal" style="display:none">Show full solution</button>';
      body.appendChild(btnRow);

      var feedback = document.createElement('div');
      feedback.style.display = 'none';
      body.appendChild(feedback);

      card.appendChild(body);
      container.appendChild(card);

      function markSolved(mode) {
        state.solved = true;
        card.classList.remove('revealed');
        card.classList.add('correct');
        head.querySelector('.qmark').style.display = 'inline-block';
        head.querySelector('.qmark').className = 'qmark ok';
        head.querySelector('.qmark').textContent = mode === 'correct' ? '✓ Correct' : '✓ Reviewed';
        Progress.setResult(quizId, q.id, mode === 'correct' ? 'correct' : 'hinted');
      }

      function showFeedback(cls, html) {
        feedback.style.display = 'block';
        feedback.className = 'feedback ' + cls;
        feedback.innerHTML = html;
      }

      function getUserAnswer() {
        if (q.type === 'mcq') {
          var checked = card.querySelector('input[name="' + card.id + '-opt"]:checked');
          return checked ? parseInt(checked.value, 10) : null;
        } else {
          var inp = document.getElementById(card.id + '-input');
          return inp ? inp.value : '';
        }
      }

      function isCorrect(ans) {
        if (q.type === 'mcq') return ans === q.correct;
        if (ans === null || ans === '') return false;
        return checkNumeric(q, ans);
      }

      btnRow.addEventListener('click', function (e) {
        var act = e.target.getAttribute('data-act');
        if (!act) return;
        state.attempts++;

        if (act === 'submit') {
          if (state.solved) return;
          var ans = getUserAnswer();
          if (ans === null || ans === '') {
            showFeedback('bad', 'Please select or enter an answer first.');
            return;
          }
          if (isCorrect(ans)) {
            var explain = q.solution ? ('<br><span style="font-weight:400">' + q.solution + '</span>') : '';
            showFeedback('ok', '<strong>Correct!</strong>' + explain);
            markSolved('correct');
          } else {
            if (state.hintIndex < (q.steps ? q.steps.length : 0)) {
              showFeedback('hint', '<strong>Not quite — here\'s a nudge:</strong><ul class="step-list"><li>' + q.steps[state.hintIndex] + '</li></ul>Try again with this in mind.');
              state.hintIndex++;
              head.querySelector('.qmark').style.display = 'inline-block';
              head.querySelector('.qmark').className = 'qmark hint';
              head.querySelector('.qmark').textContent = 'Working on it';
              if (state.hintIndex >= (q.steps ? q.steps.length : 0)) {
                btnRow.querySelector('[data-act="reveal"]').style.display = 'inline-block';
              }
            } else {
              showFeedback('bad', '<strong>Still not matching.</strong> Click "Show full solution" below to see it worked out step by step, then try a similar one with confidence.');
              btnRow.querySelector('[data-act="reveal"]').style.display = 'inline-block';
            }
          }
        }

        if (act === 'hint') {
          if (state.solved) return;
          if (state.hintIndex < (q.steps ? q.steps.length : 0)) {
            showFeedback('hint', '<strong>Hint ' + (state.hintIndex + 1) + ':</strong><ul class="step-list"><li>' + q.steps[state.hintIndex] + '</li></ul>');
            state.hintIndex++;
            if (state.hintIndex >= (q.steps ? q.steps.length : 0)) {
              btnRow.querySelector('[data-act="reveal"]').style.display = 'inline-block';
            }
          } else {
            showFeedback('hint', 'That was the last hint. Click "Show full solution" if you want the complete worked answer.');
            btnRow.querySelector('[data-act="reveal"]').style.display = 'inline-block';
          }
        }

        if (act === 'reveal') {
          var allSteps = (q.steps || []).map(function (s) { return '<li>' + s + '</li>'; }).join('');
          var ansLine = q.type === 'mcq'
            ? ('Correct option: <strong>' + q.options[q.correct] + '</strong>')
            : ('Correct answer: <strong>' + fmtNum(q.answer) + (q.unit ? (' ' + q.unit) : '') + '</strong>');
          showFeedback('hint', '<strong>Full solution</strong><ol class="step-list">' + allSteps + '</ol>' + ansLine + (q.solution ? ('<br>' + q.solution) : ''));
          card.classList.add('revealed');
          if (!state.solved) {
            head.querySelector('.qmark').style.display = 'inline-block';
            head.querySelector('.qmark').className = 'qmark hint';
            head.querySelector('.qmark').textContent = 'Reviewed';
            Progress.setResult(quizId, q.id, 'hinted');
          }
        }
      });
    });
  }

  function renderScorePanel(containerId, questions, quizId) {
    var container = document.getElementById(containerId);
    if (!container) return;
    var panel = document.createElement('div');
    panel.className = 'mock-final';
    panel.id = quizId + '-final';
    panel.innerHTML = '<h3>Your result</h3><div class="score-big" id="' + quizId + '-scorebig">0/0</div>' +
      '<p id="' + quizId + '-scoretext" style="color:#dce6f5;"></p>';
    container.appendChild(panel);

    var btnWrap = document.createElement('div');
    btnWrap.style.textAlign = 'center';
    btnWrap.style.marginTop = '14px';
    btnWrap.innerHTML = '<button class="qbtn" id="' + quizId + '-finish">Finish &amp; see my score</button>';
    container.appendChild(btnWrap);

    document.getElementById(quizId + '-finish').addEventListener('click', function () {
      var data = Progress.load();
      var quizData = data[quizId] || {};
      var total = questions.length;
      var correct = 0, attempted = 0;
      questions.forEach(function (q) {
        if (quizData[q.id]) {
          attempted++;
          if (quizData[q.id] === 'correct') correct++;
        }
      });
      panel.style.display = 'block';
      document.getElementById(quizId + '-scorebig').textContent = correct + '/' + total;
      var msg;
      if (attempted < total) {
        msg = 'You\'ve attempted ' + attempted + ' of ' + total + ' questions so far — finish the rest above for a full score.';
      } else if (correct === total) {
        msg = 'Perfect score, first-try or after review — you\'re in great shape for this topic.';
      } else if (correct / total >= 0.7) {
        msg = 'Solid result. Revisit the questions marked "Reviewed" above before your test.';
      } else {
        msg = 'Worth another pass — go back through the hints on each question above, then retry this mock test.';
      }
      document.getElementById(quizId + '-scoretext').textContent = msg;
      panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  return { render: render, renderScorePanel: renderScorePanel };
})();
