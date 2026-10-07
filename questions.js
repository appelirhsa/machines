/* Question bank for EMAEEB4 / Machines 4B study site.
   Each array feeds QuizEngine.render(containerId, array, quizId). */

var QB = {};

/* ============================================================
   DC MACHINES
   ============================================================ */
QB.dc = [
  {
    id: 'dc1', type: 'mcq',
    prompt: 'For a given set of electrical connections and excitation, what actually determines whether a DC machine is operating as a <strong>motor</strong> or a <strong>generator</strong>?',
    options: [
      'Whether mechanical power is being put in (generator) or electrical power is being put in (motor) — i.e. the direction of energy flow',
      'The number of poles the machine has',
      'Whether the winding is lap or wave wound',
      'The value of the armature resistance'
    ],
    correct: 0,
    steps: [
      'Think about energy flow rather than the machine\'s physical construction — the same physical machine can do either job.',
      'A generator converts mechanical input (a prime mover turning the shaft) into electrical output. A motor does the reverse.',
      'So the deciding factor is simply which form of power is being supplied and which is being delivered — not poles, winding type, or resistance.'
    ],
    solution: 'A DC machine is electromagnetically reversible: the same machine generates when driven mechanically and absorbs electricity from the terminals, and motors when fed electrically and drives a mechanical load.'
  },
  {
    id: 'dc2', type: 'numeric', unit: 'V',
    prompt: 'A 4-pole, <strong>lap-wound</strong> DC armature has 600 active conductors and runs at 1500 rpm. The flux per pole is 20 mWb. Calculate the EMF induced in the armature.',
    answer: 300, tolerance: 0.02,
    steps: [
      'Start from the general EMF equation: \\(E = \\phi ZN/60 \\times (P/A)\\), where \\(P\\) = poles and \\(A\\) = parallel paths.',
      'For a lap winding, the number of parallel paths \\(A\\) equals the number of poles \\(P\\), so \\(P/A = 1\\).',
      'Substitute \\(\\phi = 0.02\\,\\mathrm{Wb}\\), \\(Z = 600\\), \\(N = 1500\\,\\mathrm{rpm}\\): \\(E = (0.02)(600)(1500)/60\\).'
    ],
    solution: '\\(E = (0.02 \\times 600 \\times 1500)/60 = 300\\,\\mathrm{V}\\).'
  },
  {
    id: 'dc3', type: 'numeric', unit: 'V',
    prompt: 'The same armature from the previous question is instead <strong>wave-wound</strong> (\\(A = 2\\)), with everything else unchanged. What is the new induced voltage?',
    answer: 600, tolerance: 0.02,
    steps: [
      'For a wave winding, \\(A = 2\\) regardless of the number of poles.',
      'The EMF equation \\(E = \\phi ZN/60 \\times (P/A)\\) — only the \\(P/A\\) factor changes between windings, so \\(E_{\\text{wave}} = E_{\\text{lap}} \\times (P/A)_{\\text{wave}} \\div (P/A)_{\\text{lap}}\\).',
      '\\(P/A\\) for wave \\(= 4/2 = 2\\), versus \\(1\\) for lap. So \\(E_{\\text{wave}} = 300 \\times 2\\).'
    ],
    solution: '\\(E_{\\text{wave}} = 300 \\times (4/2) = 600\\,\\mathrm{V}\\) — wave winding gives higher voltage, lower current per path (useful for high-voltage, low-current machines).'
  },
  {
    id: 'dc4', type: 'numeric', unit: 'N·m',
    prompt: 'The armature of a 4-pole machine has an induced EMF of 660 V and carries a total armature current of 100 A while running at 1800 rpm. Calculate the electromagnetic torque developed.',
    answer: 350.1, tolerance: 0.03,
    steps: [
      'The power developed by the armature is \\(P_d = E \\times I_a\\) (both taken as the total armature quantities).',
      'Convert the mechanical speed to rad/s: \\(\\omega = 2\\pi N/60\\).',
      'Torque \\(T_e = P_d / \\omega\\).'
    ],
    solution: '\\(P_d = 660 \\times 100 = 66\\,000\\,\\mathrm{W}\\). \\(\\omega = 2\\pi(1800)/60 = 188.5\\,\\mathrm{rad/s}\\). \\(T_e = 66000/188.5 \\approx 350.1\\,\\mathrm{N\\cdot m}\\).'
  },
  {
    id: 'dc5', type: 'mcq',
    prompt: 'Which DC motor type is best suited to traction applications (e.g. trains, cranes) needing very high starting torque at low speed, with torque falling off sharply as speed increases?',
    options: ['Shunt motor', 'Series motor', 'Differentially-compound motor', 'Separately-excited motor with fixed field current'],
    correct: 1,
    steps: [
      'Recall that in this motor type, flux is produced by a winding carrying the same current as the armature.',
      'At low speed (starting), armature current — and therefore flux — is high, giving torque ∝ φIa a strong boost.',
      'As speed rises and current falls, flux falls too, so torque drops steeply — a hyperbolic-looking torque/speed curve.'
    ],
    solution: 'The series motor: field flux is proportional to armature (line) current, giving very high starting torque and a torque that falls sharply as speed/current fall — exactly the traction characteristic.'
  },
  {
    id: 'dc6', type: 'numeric', unit: '%',
    prompt: 'A 100 kW, 250 V shunt generator has armature resistance 0.04 Ω and field resistance 125 Ω. It supplies rated load at rated voltage; total rotational (mechanical + core) losses are 1.5 kW. Neglecting brush drop, calculate the full-load efficiency.',
    answer: 92.2, tolerance: 0.02,
    steps: [
      'Field current: \\(I_f = V/R_f = 250/125\\).',
      'Line current \\(I_L = P/V = 100000/250 = 400\\,\\mathrm{A}\\); armature current \\(I_a = I_L + I_f\\).',
      'Copper losses \\(= I_a^2R_a + I_f^2R_f\\). Add the \\(1.5\\,\\mathrm{kW}\\) rotational loss to get total losses, then \\(\\eta = \\text{output}/(\\text{output}+\\text{losses})\\).'
    ],
    solution: '\\(I_f = 2\\,\\mathrm{A}\\), \\(I_a = 402\\,\\mathrm{A}\\). \\(I_a^2R_a = 402^2\\times0.04 \\approx 6464\\,\\mathrm{W}\\), \\(I_f^2R_f = 500\\,\\mathrm{W}\\). Total losses \\(\\approx 6464+500+1500 = 8464\\,\\mathrm{W}\\). \\(\\eta = 100000/108464 \\approx 92.2\\%\\).'
  },
  {
    id: 'dc7', type: 'numeric', unit: 'N·m',
    prompt: 'A series DC motor has field resistance 0.4 Ω and armature resistance 0.2 Ω, a terminal voltage of 310 V, and a combined torque constant \\(k = 1.3\\) (unsaturated core, so \\(T = k\\cdot I_a^2\\)). The motor draws 100 A. Calculate the developed torque.',
    answer: 13000, tolerance: 0.02,
    steps: [
      'For a series motor with an unsaturated (linear) magnetic circuit, flux is proportional to armature current: \\(\\phi \\propto I_a\\).',
      'Since torque \\(T = k_a\\cdot\\phi\\cdot I_a\\) and \\(\\phi \\propto I_a\\), this collapses to \\(T = k\\cdot I_a^2\\), where \\(k\\) already bundles the constants — this is exactly the "torque constant" given.',
      'Substitute \\(I_a = 100\\,\\mathrm{A}\\) and \\(k = 1.3\\).'
    ],
    solution: '\\(T = 1.3 \\times (100)^2 = 13\\,000\\,\\mathrm{N\\cdot m}\\). (Note: the terminal voltage and resistances weren\'t needed for this part — they\'d matter if you were asked for speed instead.)'
  },
  {
    id: 'dc8', type: 'numeric', unit: 'rpm',
    prompt: 'A permanent-magnet DC motor rotates at 1400 rpm on a 10 V supply while drawing 7 A. Armature resistance is 0.2 Ω. Calculate the speed when 12 V is supplied under the same mechanical load, with 8 A now drawn.',
    answer: 1693, tolerance: 0.02,
    steps: [
      'A PM motor has constant flux, so back-EMF is directly proportional to speed: \\(E \\propto n\\).',
      'Find the back-EMF in each case: \\(E = V - I_aR_a\\).',
      'Then \\(n_2 = n_1 \\times (E_2/E_1)\\).'
    ],
    solution: '\\(E_1 = 10-(7)(0.2) = 8.6\\,\\mathrm{V}\\). \\(E_2 = 12-(8)(0.2) = 10.4\\,\\mathrm{V}\\). \\(n_2 = 1400\\times(10.4/8.6) \\approx 1693\\,\\mathrm{rpm}\\).'
  },
  {
    id: 'dc9', type: 'mcq',
    prompt: 'In the Ward–Leonard speed-control system, the motor speed is primarily controlled by:',
    options: [
      'Varying the motor\'s armature resistance with a rheostat',
      'Varying the generator\'s field voltage, which sets the generator output voltage that feeds the motor armature',
      'Varying the motor\'s field current only',
      'Switching the motor windings between star and delta'
    ],
    correct: 1,
    steps: [
      'The Ward-Leonard system uses a separately-driven DC generator to supply a DC motor\'s armature directly (no line resistance needed).',
      'The generator\'s output voltage — and hence the motor armature voltage and speed — is set by its own field excitation.',
      'So the "input" to the whole control system is the small field voltage/current of the generator.'
    ],
    solution: 'Varying the generator field voltage (vfg) varies the generator EMF and hence the voltage applied to the motor armature — giving smooth, wide-range, reversible speed control historically without power electronics.'
  },
  {
    id: 'dc10', type: 'mcq',
    prompt: 'For a DC shunt motor with fixed armature voltage, weakening the field current (field weakening) generally has what effect?',
    options: [
      'Speed decreases and the maximum torque available increases',
      'Speed increases, but the maximum torque the motor can produce decreases (constant-power region)',
      'Speed and torque are both unaffected',
      'The motor stalls immediately'
    ],
    correct: 1,
    steps: [
      'Recall n ∝ E/φ (for near-constant back-EMF, n ∝ 1/φ) — reducing flux raises speed.',
      'But torque T = k_a·φ·Ia — for the same armature current limit, less flux means less torque available.',
      'Above base speed this is the classic "constant power, reducing torque" field-weakening region used in variable-speed drives.'
    ],
    solution: 'Field weakening raises speed above base speed while progressively reducing the maximum available torque — the machine moves into its constant-power operating region.'
  }
];

/* ============================================================
   INDUCTION MOTORS
   ============================================================ */
QB.ind = [
  {
    id: 'ind1', type: 'numeric', unit: '%',
    prompt: 'A 6-pole, 3-phase induction motor is supplied at 50 Hz and runs at 970 rpm. Calculate the percent slip.',
    answer: 3, tolerance: 0.02,
    steps: [
      'Synchronous speed: \\(n_s = 120f/p\\).',
      'Slip \\(s = (n_s - n)/n_s\\).',
      'Substitute \\(n_s = 120(50)/6 = 1000\\,\\mathrm{rpm}\\) and \\(n = 970\\,\\mathrm{rpm}\\).'
    ],
    solution: '\\(s = (1000-970)/1000 = 0.03 = 3\\%\\).'
  },
  {
    id: 'ind2', type: 'numeric', unit: 'Hz',
    prompt: 'For the motor in the previous question (slip 3%, 50 Hz supply), what is the rotor (induced) current frequency?',
    answer: 1.5, tolerance: 0.02,
    steps: [
      'Rotor frequency: \\(f_2 = s \\times f_1\\).',
      'Use \\(s = 0.03\\) and \\(f_1 = 50\\,\\mathrm{Hz}\\).'
    ],
    solution: '\\(f_2 = 0.03 \\times 50 = 1.5\\,\\mathrm{Hz}\\).'
  },
  {
    id: 'ind3', type: 'mcq',
    prompt: 'In the induction motor\'s per-phase rotor equivalent circuit, maximum torque occurs when:',
    options: [
      'The rotor resistance equals the rotor leakage reactance at that slip: \\(R_2 = sX_2\\)',
      'The rotor resistance is zero',
      'The rotor resistance is infinite',
      'The slip is exactly zero'
    ],
    correct: 0,
    steps: [
      'Write torque as a function of R2 with s and X2 fixed, then differentiate ∂Te/∂R2 and set it to zero.',
      'This gives a condition relating R2, s, and X2.',
      'At standstill (\\(s=1\\)) this reduces to a simple, memorable statement about \\(R_2\\) and \\(X_2\\).'
    ],
    solution: 'Maximum torque occurs when \\(R_2 = sX_2\\) (which, at standstill, becomes \\(R_2 = X_2\\) for maximum starting torque).'
  },
  {
    id: 'ind4', type: 'numeric', unit: 'N·m',
    prompt: 'A 3-phase induction motor develops a maximum torque of 250 N·m at a slip of 0.18. Using \\(T/T_{\\max} = 2(s^\\*/s) / [1+(s^\\*/s)^2]\\) (valid since \\(R_2 = s^\\*X_2\\) at max torque), estimate the torque developed at a slip of 0.05.',
    answer: 128.9, tolerance: 0.05,
    steps: [
      'Compute the ratio \\(s^\\*/s = 0.18/0.05\\).',
      'Plug it into \\(T/T_{\\max} = 2(s^\\*/s)/[1+(s^\\*/s)^2]\\).',
      'Multiply the resulting ratio by \\(T_{\\max} = 250\\,\\mathrm{N\\cdot m}\\).'
    ],
    solution: '\\(s^\\*/s = 3.6\\). \\(T/T_{\\max} = 2(3.6)/(1+3.6^2) = 7.2/13.96 \\approx 0.516\\). \\(T \\approx 0.516\\times250 \\approx 129\\,\\mathrm{N\\cdot m}\\).'
  },
  {
    id: 'ind5', type: 'numeric', unit: 'kW',
    prompt: 'The rotor of a 3-phase, 4-pole, 50 Hz induction motor absorbs (air-gap power) 90 kW at a rotor frequency of 2 Hz. Stator copper loss is 2.5 kW, mechanical loss is 1.2 kW, and stator core loss is 1.5 kW (rotor core loss neglected). Calculate the motor output power at the shaft.',
    answer: 85.2, tolerance: 0.02,
    steps: [
      'Find slip from rotor frequency: \\(s = f_2/f_1\\).',
      'Rotor copper loss \\(= s \\times P_g\\) (air-gap power). Developed mechanical power \\(= P_g -\\) rotor copper loss.',
      'Shaft output \\(=\\) developed power \\(-\\) mechanical (friction & windage) losses. (Stator losses were already accounted for before the air gap, so don\'t subtract them again here.)'
    ],
    solution: '\\(s = 2/50 = 0.04\\). Rotor Cu loss \\(= 0.04\\times90 = 3.6\\,\\mathrm{kW}\\). Developed power \\(= 90-3.6 = 86.4\\,\\mathrm{kW}\\). Output \\(= 86.4-1.2 = 85.2\\,\\mathrm{kW}\\).'
  },
  {
    id: 'ind6', type: 'numeric', unit: '%',
    prompt: 'Using the same motor as the previous question, and noting \\(\\text{stator input power} = \\text{air-gap power} + \\text{stator copper loss} + \\text{stator core loss}\\), calculate the motor efficiency.',
    answer: 90.6, tolerance: 0.02,
    steps: [
      'Stator input \\(= P_g +\\) stator Cu loss \\(+\\) stator core loss.',
      'Output was found previously (85.2 kW).',
      'η = output / input.'
    ],
    solution: '\\(\\text{Input} = 90+2.5+1.5 = 94\\,\\mathrm{kW}\\). \\(\\eta = 85.2/94 \\approx 90.6\\%\\).'
  },
  {
    id: 'ind7', type: 'numeric', unit: 'A',
    prompt: 'A 400 V, 2.5 kW, 3-phase, <strong>delta-connected</strong> induction machine (85% efficiency) is powered from a 400 V, 3-phase supply. If the mechanical load equals 2.0 kW, calculate the per-phase current drawn from the supply (assume near-unity power factor since none is given).',
    answer: 1.96, tolerance: 0.06,
    steps: [
      'Electrical input power \\(=\\) mechanical output \\(\\div\\) efficiency.',
      'In a delta connection, the phase voltage equals the line voltage (400 V here).',
      'Per-phase current \\(I_{ph} = (\\text{total power}/3)/V_{ph}\\).'
    ],
    solution: '\\(\\text{Input} = 2000/0.85 \\approx 2353\\,\\mathrm{W}\\). Per-phase power \\(= 2353/3 \\approx 784\\,\\mathrm{W}\\). \\(I_{ph} = 784/400 \\approx 1.96\\,\\mathrm{A}\\).'
  },
  {
    id: 'ind8', type: 'mcq',
    prompt: 'Which statement about the star–delta (wye–delta) starter is correct?',
    options: [
      'It increases starting torque compared to direct-on-line (DOL) starting',
      'It reduces the phase voltage to \\(1/\\sqrt{3}\\) of the line voltage during starting, cutting both starting current and starting torque to roughly \\(1/3\\) of the DOL value',
      'It only works on wound-rotor (slip-ring) motors',
      'It has no effect on starting current at all'
    ],
    correct: 1,
    steps: [
      'In star, each stator phase only sees line voltage/\\(\\sqrt{3}\\), compared to full line voltage in delta.',
      'Since current (and hence torque, which \\(\\propto I^2\\)) scales with voltage squared for a given impedance, reducing voltage by \\(1/\\sqrt{3}\\) reduces both by a factor of 3.',
      'This trades away starting torque in exchange for a much gentler inrush current — the opposite of option A.'
    ],
    solution: 'The star-delta starter reduces phase voltage to \\(1/\\sqrt{3}\\) of line voltage while starting, cutting starting current AND starting torque to about \\(1/3\\) of their direct-on-line values.'
  },
  {
    id: 'ind9', type: 'mcq',
    prompt: 'In induction motor testing, the blocked-rotor (locked-rotor) test at reduced voltage is primarily used to determine:',
    options: [
      'The magnetising branch parameters, Rm and Xm',
      'The stator and rotor leakage impedance (Re, Xe) — analogous to a transformer\'s short-circuit test',
      'The core loss only',
      'The synchronous speed'
    ],
    correct: 1,
    steps: [
      'With the rotor locked, slip \\(s = 1\\), so \\(R_2/s = R_2\\) — a small value — meaning almost no current flows through the (large) magnetising branch.',
      'Nearly all the input current flows through the series leakage path, just like a transformer short-circuit test.',
      'This isolates R1+a²R2 and X1+a²X2 from the measured voltage, current and power.'
    ],
    solution: 'The blocked-rotor test (analogous to a transformer\'s short-circuit test) is used to find the series (leakage) impedance Re + jXe of the equivalent circuit.'
  },
  {
    id: 'ind10', type: 'numeric', unit: '(ratio)',
    prompt: 'A 3-phase induction motor is started via an autotransformer at 55% tap (\\(k = 0.55\\)). The full-voltage starting current is \\(6\\times\\) full-load current, and full-load slip is 5%. Calculate the ratio of starting torque to full-load torque, \\(T_s/T_{FL}\\).',
    answer: 0.545, tolerance: 0.05,
    steps: [
      'At reduced voltage, the actual starting current scales linearly with the tap ratio \\(k\\): \\(I_s = k \\times\\) (full-voltage starting current) \\(= k \\times 6 \\times I_{FL}\\).',
      'Starting torque ratio: \\(T_s/T_{FL} = (I_s/I_{FL})^2 \\times s_{FL}\\).',
      'Substitute \\(k = 0.55\\), so \\(I_s/I_{FL} = 0.55\\times6 = 3.3\\), and \\(s_{FL} = 0.05\\).'
    ],
    solution: '\\(T_s/T_{FL} = (3.3)^2 \\times 0.05 = 10.89 \\times 0.05 \\approx 0.545\\).'
  }
];

/* ============================================================
   SYNCHRONOUS MACHINES
   ============================================================ */
QB.syn = [
  {
    id: 'syn1', type: 'numeric', unit: '(kd)',
    prompt: 'A 3-phase, 4-pole, 50 Hz synchronous generator (wye) has 36 slots. Calculate the distribution factor, \\(k_d\\).',
    answer: 0.96, tolerance: 0.02,
    steps: [
      'Slots per pole per phase: \\(q = Q/(p\\cdot m) = 36/(4\\times3)\\).',
      'Slot angle \\(\\alpha = 180^\\circ/(m\\cdot q)\\).',
      '\\(k_d = \\sin(q\\alpha/2) / [q\\cdot\\sin(\\alpha/2)]\\).'
    ],
    solution: '\\(q = 3\\), \\(\\alpha = 180/(3\\times3) = 20^\\circ\\). \\(k_d = \\sin 30^\\circ/(3\\sin 10^\\circ) = 0.5/0.521 \\approx 0.96\\).'
  },
  {
    id: 'syn2', type: 'numeric', unit: '(kp)',
    prompt: 'For the same machine, the full pole pitch \\(\\tau = 9\\) slots and the coil pitch \\(\\beta = 8\\) slots. Calculate the pitch factor, \\(k_p\\).',
    answer: 0.985, tolerance: 0.02,
    steps: [
      'Pitch factor: \\(k_p = \\sin(\\beta \\times 90^\\circ/\\tau)\\).',
      'Substitute β = 8, τ = 9.'
    ],
    solution: '\\(k_p = \\sin(8\\times90^\\circ/9) = \\sin80^\\circ \\approx 0.985\\).'
  },
  {
    id: 'syn3', type: 'numeric', unit: 'V',
    prompt: 'Using \\(k_d = 0.96\\) and \\(k_p = 0.985\\) from the previous two questions, with \\(N = 64\\) turns/phase, \\(f = 50\\,\\mathrm{Hz}\\), and peak flux/pole \\(\\phi_m = 25\\,\\mathrm{mWb}\\), calculate the rms phase voltage: \\(E = 4.44\\cdot k_w\\cdot f\\cdot N\\cdot\\phi_m\\) (\\(k_w=k_dk_p\\)).',
    answer: 336, tolerance: 0.03,
    steps: [
      'Winding factor \\(k_w = k_d \\times k_p\\).',
      'Substitute into \\(E = 4.44\\,k_w f N \\phi_m\\).',
      '\\(\\phi_m = 0.025\\,\\mathrm{Wb}\\), \\(N = 64\\), \\(f = 50\\,\\mathrm{Hz}\\).'
    ],
    solution: '\\(k_w = 0.96\\times0.985 \\approx 0.9456\\). \\(E = 4.44\\times0.9456\\times50\\times64\\times0.025 \\approx 336\\,\\mathrm{V}\\).'
  },
  {
    id: 'syn4', type: 'mcq',
    prompt: 'A synchronous generator\'s percent voltage regulation, \\((V_0-V_t)/V_t \\times 100\\%\\), tends to be:',
    options: [
      'Positive and larger for lagging power-factor loads, and smaller (or even negative) for leading power-factor loads',
      'Always exactly zero, regardless of load pf',
      'Always negative for lagging loads',
      'Completely independent of power factor'
    ],
    correct: 0,
    steps: [
      'Sketch the phasor diagram: \\(V_0 = V_t + I_a(R_a+jX_s)\\). For lagging pf, \\(I_a\\) lags \\(V_t\\), so the \\(jI_aX_s\\) term adds constructively to \\(|V_0|\\).',
      'For leading pf, Ia leads Vt, and the reactive drop can partially cancel, sometimes making |V0| < |Vt|.',
      'This directly changes the sign and size of the regulation percentage.'
    ],
    solution: 'Lagging loads generally produce large positive regulation (Vt drops a lot under load); leading loads can produce small or even negative regulation (Vt can actually rise as load is applied and fall when load is removed... in the sense that V0 needed is less than Vt).'
  },
  {
    id: 'syn5', type: 'numeric', unit: '%',
    prompt: 'A 230 V (line), wye-connected, round-rotor generator has \\(X_s = 1.0\\,\\Omega/\\text{phase}\\) and \\(R_a = 0.4\\,\\Omega/\\text{phase}\\). At full load, \\(I_a = 20\\,\\mathrm{A}\\) at 0.8 lagging power factor. Calculate the percent voltage regulation.',
    answer: 14.2, tolerance: 0.06,
    steps: [
      'Phase voltage \\(V_t = 230/\\sqrt{3} \\approx 132.8\\,\\mathrm{V}\\). Take \\(V_t\\) as the reference phasor (\\(0^\\circ\\)).',
      'Lagging 0.8 pf means \\(I_a\\) lags \\(V_t\\): \\(I_a = 20\\angle-36.87^\\circ = 16 - j12\\,\\mathrm{A}\\).',
      '\\(V_0 = V_t + I_a(R_a + jX_s)\\). Compute the complex product, add to \\(V_t\\), then take the magnitude and compare to \\(V_t\\).'
    ],
    solution: '\\((16-j12)(0.4+j1.0) = 6.4+j16-j4.8+12 = 18.4+j11.2\\). \\(V_0 = 151.2+j11.2\\) \\(\\to |V_0| \\approx 151.6\\,\\mathrm{V}\\). Regulation \\(= (151.6-132.8)/132.8\\times100 \\approx 14.2\\%\\).'
  },
  {
    id: 'syn6', type: 'numeric', unit: '%',
    prompt: 'Repeat the same generator (\\(X_s=1.0\\,\\Omega\\), \\(R_a=0.4\\,\\Omega\\), \\(I_a=20\\,\\mathrm{A}\\)) but now at 0.8 <strong>leading</strong> power factor. What is the percent voltage regulation?',
    answer: -2.9, tolerance: 0.3,
    steps: [
      'Leading pf means \\(I_a\\) leads \\(V_t\\): \\(I_a = 20\\angle+36.87^\\circ = 16+j12\\,\\mathrm{A}\\).',
      '\\(V_0 = V_t + I_a(R_a+jX_s)\\) — carry out the same complex multiplication as before but with the sign of the imaginary part of \\(I_a\\) flipped.',
      'Compare \\(|V_0|\\) to \\(V_t = 132.8\\,\\mathrm{V}\\); note the sign of the result.'
    ],
    solution: '\\((16+j12)(0.4+j1.0) = 6.4+j16+j4.8-12 = -5.6+j20.8\\). \\(V_0 = 127.2+j20.8\\) \\(\\to |V_0| \\approx 128.9\\,\\mathrm{V}\\). Regulation \\(= (128.9-132.8)/132.8\\times100 \\approx -2.9\\%\\) — a negative regulation, characteristic of leading power factors.'
  },
  {
    id: 'syn7', type: 'numeric', unit: 'kW',
    prompt: 'A 3-phase, wye-connected, round-rotor synchronous motor has \\(X_s = 2\\,\\Omega/\\text{phase}\\) (\\(R_a\\) negligible). Phase terminal voltage is 220 V and the internal EMF is 250 V/phase. At a power angle of 15°, calculate the total 3-phase power developed.',
    answer: 21.4, tolerance: 0.04,
    steps: [
      'For a round-rotor machine with negligible \\(R_a\\), per-phase power: \\(P = (V_t\\cdot V_0/X_s)\\cdot\\sin\\delta\\).',
      'Compute the per-phase value first, using \\(V_t=220\\), \\(V_0=250\\), \\(X_s=2\\), \\(\\delta=15^\\circ\\).',
      'Multiply by 3 for total 3-phase power.'
    ],
    solution: 'Per phase: \\(P = (220\\times250/2)\\times\\sin15^\\circ = 27500\\times0.2588 \\approx 7117\\,\\mathrm{W}\\). Total \\(= 3\\times7117 \\approx 21.4\\,\\mathrm{kW}\\).'
  },
  {
    id: 'syn8', type: 'mcq',
    prompt: 'An over-excited synchronous motor operating in parallel with an induction-motor load is often deliberately used to:',
    options: [
      'Absorb extra reactive power (behave inductively), worsening the overall power factor',
      'Supply leading reactive power to the system, improving (correcting) the overall lagging power factor',
      'Increase the slip of the nearby induction motors',
      'Convert real power directly into reactive power with no other effect'
    ],
    correct: 1,
    steps: [
      'Over-exciting a synchronous machine\'s field pushes its internal EMF above what\'s needed to just match the terminal voltage.',
      'This forces the armature current to lead the terminal voltage — i.e. the machine looks like a capacitor to the rest of the system.',
      'Since induction motors are inherently lagging (inductive) loads, a leading synchronous machine can cancel out some of that lagging reactive demand.'
    ],
    solution: 'Over-excitation makes a synchronous motor draw a leading current, supplying leading vars to the network — this is used deliberately for power-factor correction alongside lagging loads like induction motors.'
  },
  {
    id: 'syn9', type: 'numeric', unit: 'kvar',
    prompt: 'An induction motor load takes 300 kW at 0.75 lagging pf. A synchronous motor is added in parallel, taking a further 100 kW, so the OVERALL combined power factor becomes 0.95 lagging. Calculate the magnitude of the leading reactive power supplied by the synchronous motor.',
    answer: 133, tolerance: 0.08,
    steps: [
      'Find the induction load\'s reactive power: apparent power \\(= P/pf\\), then \\(Q = S\\times\\sin(\\cos^{-1}pf)\\).',
      'Find the combined system\'s total real power (300+100 kW) and its reactive power the same way, using the overall pf of 0.95.',
      'The synchronous motor\'s own reactive power \\(= Q_{total} - Q_{induction}\\) (it will come out negative, meaning it is supplying/leading — report the magnitude).'
    ],
    solution: 'Induction: \\(S=300/0.75=400\\,\\mathrm{kVA}\\), \\(Q_1=400\\times\\sin(41.4^\\circ)\\approx264.6\\,\\mathrm{kvar}\\) (lag). Combined: \\(P=400\\,\\mathrm{kW}\\), \\(S=400/0.95\\approx421.1\\,\\mathrm{kVA}\\), \\(Q_{tot}=421.1\\times\\sin(18.2^\\circ)\\approx131.5\\,\\mathrm{kvar}\\) (lag). Sync motor \\(Q = 131.5-264.6 \\approx -133\\,\\mathrm{kvar}\\) \\(\\to\\) about \\(133\\,\\mathrm{kvar}\\) LEADING, confirming it is over-excited.'
  },
  {
    id: 'syn10', type: 'mcq',
    prompt: 'In the salient-pole power equation \\(P = (V\\cdot V_0/X_d)\\sin\\delta + V^2(1/X_q - 1/X_d)(\\sin2\\delta)/2\\), the second term:',
    options: [
      'Is "reluctance power" arising because X_d ≠ X_q (saliency) — it exists even with zero field excitation',
      'Represents stator copper loss',
      'Only appears in round-rotor machines',
      'Always opposes (subtracts from) the first term'
    ],
    correct: 0,
    steps: [
      'Note the second term doesn\'t contain V0 at all — it depends only on terminal voltage and the two reactances.',
      'This means it exists purely because of the machine\'s geometric saliency (Xd ≠ Xq), independent of the rotor field current.',
      'This is why salient-pole machines can even develop some torque with zero field current — pure reluctance torque.'
    ],
    solution: 'The second term is the reluctance power term, caused purely by Xd ≠ Xq. Unlike the first (excitation) term, it does not depend on V0/field current and is present even at zero excitation.'
  }
];

/* ============================================================
   OUTCOME A — DC SYSTEMS & MECHANICS
   (gearboxes, inertia, elevators, battery/converter chains — all built
   around DC-machine driven systems, matching Assessment A-1 / A-2 style)
   ============================================================ */
QB.outcomeA = [
  {
    id: 'mech1', type: 'numeric', unit: 'N·m',
    prompt: 'A motor drives a load through a belt-and-pulley gearbox: motor-side pulley diameter 150 mm, load-side pulley diameter 600 mm. The load needs 300 N·m of torque, and the belt-drive system is 60% efficient. Calculate the torque required at the motor shaft.',
    answer: 125, tolerance: 0.03,
    steps: [
      'Gear ratio (load side ÷ motor side) = 600/150 — this tells you the ideal torque multiplication from motor to load.',
      'Ideal (lossless) motor torque \\(=\\) load torque \\(\\div\\) ratio.',
      'Because the drive is only 60% efficient, the motor must supply more than the ideal value: actual motor torque \\(=\\) ideal torque \\(\\div\\) efficiency.'
    ],
    solution: '\\(\\text{Ratio} = 600/150 = 4\\). Ideal motor torque \\(= 300/4 = 75\\,\\mathrm{N\\cdot m}\\). Actual \\(= 75/0.6 = 125\\,\\mathrm{N\\cdot m}\\).'
  },
  {
    id: 'mech2', type: 'numeric', unit: 'rpm',
    prompt: 'For the same gearbox (150 mm motor pulley, 600 mm load pulley), if the load shaft must rotate at 150 rpm, what motor speed is required?',
    answer: 600, tolerance: 0.02,
    steps: [
      'For a belt drive, the belt\'s linear speed is the same at both pulleys: \\(N_{motor}\\times D_{motor} = N_{load}\\times D_{load}\\).',
      'Rearrange for N_motor.',
      'Substitute \\(N_{load}=150\\,\\mathrm{rpm}\\), \\(D_{load}=600\\,\\mathrm{mm}\\), \\(D_{motor}=150\\,\\mathrm{mm}\\).'
    ],
    solution: '\\(N_{\\text{motor}} = 150 \\times (600/150) = 600\\,\\mathrm{rpm}\\).'
  },
  {
    id: 'mech3', type: 'numeric', unit: 'N·m',
    prompt: 'An elevator (no counterweight) has a cage of mass 800 kg and a payload of 2000 kg, to be lifted at constant speed using a drum of 1.2 m diameter. Calculate the torque required at the drum shaft (\\(g = 9.81\\,\\mathrm{m/s^2}\\)).',
    answer: 16481, tolerance: 0.02,
    steps: [
      'Total mass being lifted \\(=\\) cage \\(+\\) payload.',
      'Lifting force (constant speed) \\(=\\) weight \\(= mg\\).',
      'Torque at the drum \\(=\\) Force \\(\\times\\) drum radius (radius \\(=\\) diameter/2).'
    ],
    solution: '\\(\\text{Mass} = 2800\\,\\mathrm{kg}\\). \\(F = 2800\\times9.81 \\approx 27\\,468\\,\\mathrm{N}\\). \\(T = 27468\\times0.6 \\approx 16\\,481\\,\\mathrm{N\\cdot m}\\).'
  },
  {
    id: 'mech4', type: 'numeric', unit: 'kW',
    prompt: 'For the same elevator, if the 20 m lift height is completed in 10 s at constant speed, calculate the power required at the drum shaft.',
    answer: 54.9, tolerance: 0.02,
    steps: [
      'Find the lifting speed: \\(v = \\text{height}/\\text{time}\\).',
      'Power \\(=\\) Force \\(\\times\\) velocity (\\(F\\) was found in the previous question, \\(\\approx27\\,468\\,\\mathrm{N}\\)).',
      'Convert the result to kW.'
    ],
    solution: '\\(v = 20/10 = 2\\,\\mathrm{m/s}\\). \\(P = 27468\\times2 \\approx 54\\,936\\,\\mathrm{W} \\approx 54.9\\,\\mathrm{kW}\\).'
  },
  {
    id: 'mech5', type: 'mcq',
    prompt: 'When an ideal (lossless) gearbox steps DOWN the output speed (output slower than input), the output torque is:',
    options: [
      'Reduced by the same ratio as the speed',
      'Increased by the same ratio that speed is reduced — because power (torque × angular speed) is conserved',
      'Left completely unchanged',
      'Increased by the square of the ratio'
    ],
    correct: 1,
    steps: [
      'For an ideal gearbox there are no losses, so input power equals output power: P = T_in·ω_in = T_out·ω_out.',
      'If ω_out is smaller than ω_in by some ratio, T_out must be larger by that same ratio to keep power equal.',
      'This is exactly why gearboxes are used to trade speed for torque (or vice versa).'
    ],
    solution: 'An ideal gearbox conserves power, so a speed reduction by ratio "\\(k\\)" produces a torque increase by the same ratio "\\(k\\)" (\\(T_{out} = k \\times T_{in}\\) when \\(\\omega_{out} = \\omega_{in}/k\\)).'
  },
  {
    id: 'mech6', type: 'numeric', unit: 'A',
    prompt: 'A DC motor pump is connected to a 48 V battery pack via a buck converter set to 36 V. Motor efficiency is 90%, converter efficiency is 85%. The motor draws 4 A from the converter (output side). Calculate the current drawn FROM THE BATTERY.',
    answer: 3.53, tolerance: 0.04,
    steps: [
      'Power delivered to the motor \\(=\\) converter output power \\(= V \\times I\\) (use the converter\'s output values, 36 V and 4 A).',
      'Power drawn from the battery \\(=\\) converter output power \\(\\div\\) converter efficiency (motor efficiency doesn\'t matter for this part — it only affects the mechanical output further down the chain).',
      'Battery current \\(=\\) that power \\(\\div\\) battery voltage (48 V).'
    ],
    solution: '\\(\\text{Motor input} = 36\\times4 = 144\\,\\mathrm{W}\\). Battery-side power \\(= 144/0.85 \\approx 169.4\\,\\mathrm{W}\\). Battery current \\(= 169.4/48 \\approx 3.53\\,\\mathrm{A}\\).'
  },
  {
    id: 'mech7', type: 'numeric', unit: 'hours',
    prompt: 'Using the battery current found previously (≈3.53 A) and a 60 A·h battery pack, estimate how many hours the pack can sustain this load.',
    answer: 17.0, tolerance: 0.05,
    steps: [
      'Runtime (in hours) is approximately battery capacity (A·h) divided by discharge current (A).',
      'Substitute capacity \\(= 60\\,\\mathrm{A\\cdot h}\\), current \\(\\approx 3.53\\,\\mathrm{A}\\).'
    ],
    solution: '\\(t \\approx 60/3.53 \\approx 17.0\\,\\text{hours}\\).'
  },
  {
    id: 'mech8', type: 'mcq',
    prompt: 'Dynamic braking of a DC motor (switching a resistor across the armature and removing the supply, to dissipate kinetic energy) is best described as:',
    options: [
      'A very energy-efficient way to slow the motor, since energy is fed back into the supply',
      'An energy-inefficient method, since kinetic energy is simply dissipated as I²R heat rather than recovered — though it is simple and effective for stopping',
      'Only usable with AC induction motors',
      'A way to permanently reverse the motor\'s direction of rotation'
    ],
    correct: 1,
    steps: [
      'In dynamic braking the armature is disconnected from the supply and connected to a resistor — no path exists back to the supply.',
      'The kinetic energy of the rotating system drives current through that resistor and is dissipated as heat.',
      'Compare this to regenerative braking, where energy IS fed back to the supply — that is the efficient alternative.'
    ],
    solution: 'Dynamic braking dumps the kinetic energy as heat in a resistor — simple and effective for stopping quickly, but energy-inefficient compared to regenerative braking (which returns energy to the supply).'
  }
];

/* ============================================================
   OUTCOME B — AC SYSTEMS & MECHANICS
   (gearboxes, pumps, scrapers and hoists driven by INDUCTION machines,
   plus VSD/fuse sizing — matching Assessment B-1 / B-2 style)
   ============================================================ */
QB.outcomeB = [
  {
    id: 'ob1', type: 'numeric', unit: 'kW',
    prompt: 'An induction motor drives a scraper mechanism via a 150:10 reduction gearbox (67% efficient). The scraper needs 180 N·m of torque at 60 rpm (output shaft). Calculate the mechanical power required at the MOTOR shaft (i.e. the gearbox\'s input side).',
    answer: 1.69, tolerance: 0.03,
    steps: [
      'First find the power needed at the load (scraper) shaft: \\(P_{\\text{load}} = T\\times\\omega\\), with \\(\\omega=2\\pi N/60\\).',
      '\\(P_{\\text{load}} = 180 \\times (2\\pi\\times60/60) \\approx 1131\\,\\mathrm{W}\\).',
      'The gearbox is only 67% efficient, so the motor must supply more than this ideal value: motor shaft power \\(=\\) load power \\(\\div\\) efficiency.'
    ],
    solution: 'Motor shaft power \\(= 1131/0.67 \\approx 1688.5\\,\\mathrm{W} \\approx 1.69\\,\\mathrm{kW}\\).'
  },
  {
    id: 'ob2', type: 'numeric', unit: 'kW',
    prompt: 'Continuing from the previous question (motor shaft power ≈1.69 kW), if the motor itself is 84% efficient, calculate the total ELECTRICAL input power to the machine.',
    answer: 2.01, tolerance: 0.03,
    steps: [
      'Electrical input power \\(=\\) mechanical shaft (output) power \\(\\div\\) motor efficiency — you go from a smaller mechanical output back to a larger electrical input.',
      'Use the ≈1688.5 W mechanical shaft power found previously.',
      'Divide by 0.84.'
    ],
    solution: '\\(\\text{Input} = 1688.5/0.84 \\approx 2010\\,\\mathrm{W} \\approx 2.01\\,\\mathrm{kW}\\).'
  },
  {
    id: 'ob3', type: 'numeric', unit: 'kW',
    prompt: 'A pump must lift 80 m³ of water through a height of 12 m in 45 minutes. Using water density \\(\\rho=1000\\,\\mathrm{kg/m^3}\\) and \\(g=9.81\\,\\mathrm{m/s^2}\\), calculate the hydraulic (useful) power required.',
    answer: 3.49, tolerance: 0.02,
    steps: [
      'Mass of water \\(=\\) volume \\(\\times\\) density \\(= 80 \\times 1000\\).',
      'Work done against gravity \\(= mgh\\).',
      'Power \\(=\\) Work / time — remember to convert 45 minutes to seconds (\\(45\\times60 = 2700\\,\\mathrm{s}\\)).'
    ],
    solution: '\\(\\text{Mass} = 80\\,000\\,\\mathrm{kg}\\). \\(\\text{Work} = 80000\\times9.81\\times12 = 9\\,417\\,600\\,\\mathrm{J}\\). \\(P = 9417600/2700 \\approx 3488\\,\\mathrm{W} \\approx 3.49\\,\\mathrm{kW}\\).'
  },
  {
    id: 'ob4', type: 'numeric', unit: 'kW',
    prompt: 'For the pump in the previous question (hydraulic power ≈3.49 kW), the pump itself is 72% efficient and is driven through a gearbox that is 58% efficient. Calculate the mechanical power required at the MOTOR output shaft.',
    answer: 8.35, tolerance: 0.03,
    steps: [
      'Pump shaft input power \\(=\\) hydraulic power \\(\\div\\) pump efficiency (the pump wastes some power internally, so its shaft input must exceed the hydraulic output).',
      'That pump-shaft-input power is exactly what the gearbox must deliver on its output side; going backward through the (lossy) gearbox: motor shaft output \\(=\\) pump shaft input \\(\\div\\) gearbox efficiency.',
      'Use pump efficiency 0.72 and gearbox efficiency 0.58.'
    ],
    solution: 'Pump shaft input \\(= 3488/0.72 \\approx 4844\\,\\mathrm{W}\\). Motor shaft output \\(= 4844/0.58 \\approx 8352\\,\\mathrm{W} \\approx 8.35\\,\\mathrm{kW}\\).'
  },
  {
    id: 'ob5', type: 'numeric', unit: 'A',
    prompt: 'The motor in the previous question is 82% efficient, 400 V line-to-line, wye-connected, operating at 0.85 power factor. Calculate the required fuse rating, allowing a 20% overrating margin.',
    answer: 20.8, tolerance: 0.05,
    steps: [
      'Electrical input power \\(=\\) mechanical shaft power \\(\\div\\) motor efficiency \\(= 8352/0.82\\).',
      'For a 3-phase machine: \\(P = \\sqrt{3}\\cdot V_L\\cdot I_L\\cdot pf\\), so \\(I_L = P/(\\sqrt{3}\\times V_L\\times pf)\\). Use \\(V_L=400\\,\\mathrm{V}\\), \\(pf=0.85\\).',
      'Apply the 20% overrating margin: fuse rating \\(= I_L \\times 1.2\\).'
    ],
    solution: '\\(\\text{Input} \\approx 10\\,186\\,\\mathrm{W}\\). \\(I_L = 10186/(1.732\\times400\\times0.85) \\approx 17.3\\,\\mathrm{A}\\). Fuse \\(\\approx 17.3\\times1.2 \\approx 20.8\\,\\mathrm{A}\\).'
  },
  {
    id: 'ob6', type: 'mcq',
    prompt: 'When sizing a Variable Speed Drive (VSD)\'s input power rating to supply a given mechanical load through an induction motor, you should:',
    options: [
      'Divide the required mechanical load power by (motor efficiency × VSD efficiency) to find the required input rating',
      'Multiply the required mechanical load power by both efficiencies',
      'Ignore the VSD efficiency, since a VSD only changes frequency, not power',
      'Add the two efficiency percentages together and divide by that sum'
    ],
    correct: 0,
    steps: [
      'Think of the chain: supply → VSD → motor → mechanical load. Power flows forward, but each stage loses some as heat.',
      'To go from a required OUTPUT back to the necessary INPUT, you always divide by efficiency at each lossy stage (a value < 1 dividing makes the required input bigger).',
      'There are two lossy stages here (VSD and motor), so both efficiencies are divided into the load power.'
    ],
    solution: 'Required input rating \\(=\\) load power \\(\\div\\) (motor efficiency \\(\\times\\) VSD efficiency) — each stage\'s losses mean you need more power in than what comes out the far end.'
  },
  {
    id: 'ob7', type: 'numeric', unit: 'kW',
    prompt: 'A VSD powers an induction machine whose mechanical load requires 6 kW. The motor is 85% efficient at this operating point, and the VSD itself is 82% efficient. Calculate the total input power rating required from the mains supply.',
    answer: 8.61, tolerance: 0.03,
    steps: [
      'First find the electrical power the motor itself needs: motor input \\(=\\) mechanical load \\(\\div\\) motor efficiency.',
      'This motor input power is what the VSD must deliver on its output side — but the VSD is itself lossy, so: VSD (mains) input \\(=\\) motor input \\(\\div\\) VSD efficiency.',
      'Substitute 6/0.85 for the first step, then divide by 0.82.'
    ],
    solution: '\\(\\text{Motor input} = 6/0.85 \\approx 7.06\\,\\mathrm{kW}\\). \\(\\text{VSD input} = 7.06/0.82 \\approx 8.61\\,\\mathrm{kW}\\).'
  },
  {
    id: 'ob8', type: 'mcq',
    prompt: 'True or False: "Synchronous machines are used exclusively in power plants for generating active power."',
    options: [
      'True — synchronous machines are only ever found as large generators in power stations',
      'False — synchronous machines are also widely used as MOTORS (including specifically for power-factor correction), and as generators outside utility power stations too (e.g. standby/backup gensets, ships, small-scale generation)'
    ],
    correct: 1,
    steps: [
      'Recall the power-factor-correction section of your notes — an over-excited synchronous MOTOR is a very common application.',
      'Also think about diesel gensets, marine generators, and other non-power-station uses of synchronous generators.',
      'The word "exclusively" is the giveaway in these True/False questions — one counter-example is enough to make the statement False.'
    ],
    solution: 'False. Synchronous machines are used as motors (notably for PF correction) and as generators well beyond utility power plants — "exclusively" is too strong a claim.'
  }
];

/* ============================================================
   MOCK TEST A  (Outcome A only — DC Machines + DC systems/mechanics)
   ============================================================ */
QB.mockA = [ QB.dc[0], QB.dc[1], QB.dc[2], QB.dc[3], QB.dc[5], QB.dc[6],
             QB.outcomeA[0], QB.outcomeA[1], QB.outcomeA[2], QB.outcomeA[3], QB.outcomeA[4], QB.outcomeA[5] ];

/* ============================================================
   MOCK TEST B  (Outcome B only — Synchronous + Induction + AC systems/mechanics)
   ============================================================ */
QB.mockB = [ QB.syn[0], QB.syn[1], QB.syn[2], QB.syn[4],
             QB.ind[0], QB.ind[2], QB.ind[3], QB.ind[6],
             QB.outcomeB[0], QB.outcomeB[2], QB.outcomeB[4], QB.outcomeB[6] ];

/* ============================================================
   MOCK TEST — COMBINED  (Outcomes A & B together, for Assessment 3/4 style)
   ============================================================ */
QB.mockCombined = [ QB.dc[4], QB.dc[7], QB.dc[8], QB.outcomeA[5], QB.outcomeA[6],
                     QB.syn[3], QB.syn[6], QB.syn[8], QB.ind[4], QB.ind[8],
                     QB.outcomeB[1], QB.outcomeB[7] ];
