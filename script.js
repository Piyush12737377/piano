  const sounds = {
    sa: 261.63,
    re: 293.66,
    ga: 329.63,
    ma: 349.23,
    pa: 392.0,
    dha: 440.0,
    ni: 493.88,
    sa_high: 523.25
  };

  const context = new (window.AudioContext || window.webkitAudioContext)();
  const activeOscillators = {}; // store playing notes

  function startSound(note) {
    if (activeOscillators[note]) return; // already playing

    const osc = context.createOscillator(); // sound source
    const gain = context.createGain(); // volume control

    osc.type = "sawtooth"; // guy's you can change to 'sine', 'square', 'triangle' and more if you're curious for more instruements then search on google "Web Audio Oscillator types"
    osc.frequency.value = sounds[note]; // set frequency

    osc.connect(gain); // connect oscillator to gain
    gain.connect(context.destination); // connect gain to output

    gain.gain.setValueAtTime(0.2, context.currentTime); // you can adjust volume

    osc.start(); // start sound
    activeOscillators[note] = { osc, gain }; // store oscillator and gain   
  }

  function stopSound(note) { // stop sound
    if (!activeOscillators[note]) return; // not playing

    const { osc, gain } = activeOscillators[note]; // retrieve oscillator and gain
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.2); // fade out
    osc.stop(context.currentTime + 0.2); // stop oscillator after fade out

    delete activeOscillators[note]; // remove from activeOscillators
  }

  const keyMap = { 
    "1":"sa", "2":"re", "3":"ga", "4":"ma", 
    "5":"pa", "6":"dha", "7":"ni", "8":"sa_high" 
  };// mapping keyboard my most fevourite keys 1 to 8 hehehe :) feels like calculator

  document.addEventListener("keydown", (e) => { 
    const note = keyMap[e.key]; // get note from keyMap
    if (note) {
      const el = document.querySelector(`[data-sound="${note}"]`); // get corresponding element
      if (el) el.classList.add("active"); // add active class for visual feedback
      startSound(note); // start sound
    }
  });

  document.addEventListener("keyup", (e) => {
    const note = keyMap[e.key]; // sorry guy's I was too lazy to make mouse click event
    if (note) {
      const el = document.querySelector(`[data-sound="${note}"]`); // guy's you can add mouse click event if you want to but i don't like that humphh!!
      if (el) el.classList.remove("active"); // remove active class
      stopSound(note); // stop sound
    }
  }); // now you are good coder hehehe :)
