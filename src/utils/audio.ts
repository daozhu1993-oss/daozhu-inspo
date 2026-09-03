let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;
  if (!audioCtx) {
    audioCtx = new AudioCtx();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play a synthesized mechanical keyboard / hardware switch click sound
 */
export function playKeyClick(): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const t = ctx.currentTime;
  const duration = 0.07;
  const sampleCount = Math.floor(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(1, sampleCount, ctx.sampleRate);
  const channel = buffer.getChannelData(0);

  // Noise burst for mechanical transient
  for (let i = 0; i < sampleCount; i++) {
    channel[i] = (Math.random() * 2 - 1) * Math.exp(-i / (sampleCount * 0.07));
  }

  const noiseSource = ctx.createBufferSource();
  noiseSource.buffer = buffer;

  const bandpass = ctx.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.frequency.value = 1650;
  bandpass.Q.value = 0.85;

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.16, t);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

  noiseSource.connect(bandpass).connect(noiseGain).connect(ctx.destination);
  noiseSource.start(t);
  noiseSource.stop(t + duration);

  // Low frequency thud/pop
  const osc = ctx.createOscillator();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(220, t);
  osc.frequency.exponentialRampToValueAtTime(78, t + 0.045);

  const oscGain = ctx.createGain();
  oscGain.gain.setValueAtTime(0.1, t);
  oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.055);

  osc.connect(oscGain).connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.055);
}

/**
 * Attach global listener so any element with .crt-key plays sound on pointerdown
 */
export function registerKeySounds(): () => void {
  if (typeof document === 'undefined') return () => {};
  
  const handlePointerDown = (e: PointerEvent) => {
    const target = e.target as HTMLElement | null;
    if (target?.closest('.crt-key, .crt-brass, [data-key-sound]')) {
      playKeyClick();
    }
  };

  document.addEventListener('pointerdown', handlePointerDown);
  return () => {
    document.removeEventListener('pointerdown', handlePointerDown);
  };
}
