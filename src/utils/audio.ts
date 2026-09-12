// Web Audio API Synthesizer for Useless AI
// Generates all sound effects locally without any external audio asset dependencies.

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!audioCtx && AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  } catch {
    return null;
  }
}

export function playSendSound(enabled: boolean = true) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(320, now);
  osc.frequency.exponentialRampToValueAtTime(640, now + 0.12);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.12, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.13);
}

export function playReceiveSound(enabled: boolean = true) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  // Two-tone playful chirp
  [
    { freq: 440, time: 0 },
    { freq: 660, time: 0.08 },
  ].forEach((tone) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(tone.freq, now + tone.time);

    gain.gain.setValueAtTime(0.001, now + tone.time);
    gain.gain.linearRampToValueAtTime(0.1, now + tone.time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + tone.time + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + tone.time);
    osc.stop(now + tone.time + 0.13);
  });
}

export function playScoreSound(score: number, enabled: boolean = true) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  // If score is high (super useless), play absurd wavering frequency
  const baseFreq = 200 + score * 4;
  osc.type = score > 80 ? 'sawtooth' : 'sine';
  osc.frequency.setValueAtTime(baseFreq, now);
  osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.3, now + 0.1);
  osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.8, now + 0.25);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.08, now + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.26);
}

export function playEmergencySound(enabled: boolean = true) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  [0, 0.15, 0.3].forEach((delay, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(idx % 2 === 0 ? 880 : 660, now + delay);

    gain.gain.setValueAtTime(0.001, now + delay);
    gain.gain.linearRampToValueAtTime(0.1, now + delay + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + delay);
    osc.stop(now + delay + 0.13);
  });
}

export function playClickSound(enabled: boolean = true) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(750, now);

  gain.gain.setValueAtTime(0.05, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.03);
}

export function playNothingDeletedSound(enabled: boolean = true) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(220, now);
  osc.frequency.exponentialRampToValueAtTime(110, now + 0.15);

  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.16);
}
