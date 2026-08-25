let ctx: AudioContext | null = null;
let unlocked = false;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!ctx) ctx = new Ctor();
  return ctx;
}

/** Must be called from within a user gesture handler before any sound plays. */
export function unlockAudio() {
  const c = getCtx();
  if (!c) return;
  if (c.state === "suspended") c.resume();
  unlocked = true;
}

function tone(freq: number, duration: number, opts: { type?: OscillatorType; volume?: number; delay?: number } = {}) {
  const c = getCtx();
  if (!c || !unlocked) return;
  const { type = "square", volume = 0.06, delay = 0 } = opts;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.value = volume;
  osc.connect(gain);
  gain.connect(c.destination);
  const start = c.currentTime + delay;
  gain.gain.setValueAtTime(volume, start);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.start(start);
  osc.stop(start + duration + 0.02);
}

export const sfx = {
  navigate: () => tone(660, 0.05, { type: "square", volume: 0.05 }),
  select: () => tone(440, 0.06, { type: "square", volume: 0.06 }),
  correct: () => {
    tone(523, 0.09, { volume: 0.07 });
    tone(659, 0.09, { volume: 0.07, delay: 0.09 });
    tone(880, 0.15, { volume: 0.07, delay: 0.18 });
  },
  wrong: () => {
    tone(220, 0.18, { type: "sawtooth", volume: 0.06 });
    tone(160, 0.22, { type: "sawtooth", volume: 0.06, delay: 0.12 });
  },
  countdown: () => tone(880, 0.05, { type: "square", volume: 0.04 }),
  finalScore: () => {
    [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.16, { volume: 0.06, delay: i * 0.11 }));
  },
};

export function setSoundEnabled(enabled: boolean) {
  if (enabled) unlockAudio();
}
