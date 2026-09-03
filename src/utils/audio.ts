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
 * Play a cinematic shutter click / projector reel gear tick
 */
export function playShutterClick(pitch = 1): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const t = ctx.currentTime;
  const duration = 0.045;
  const sampleCount = Math.floor(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(1, sampleCount, ctx.sampleRate);
  const channel = buffer.getChannelData(0);

  // Micro mechanical transient
  for (let i = 0; i < sampleCount; i++) {
    channel[i] = (Math.random() * 2 - 1) * Math.exp(-i / (sampleCount * 0.06));
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.value = 2400 * pitch;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.12, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);

  noise.connect(filter).connect(gain).connect(ctx.destination);
  noise.start(t);
  noise.stop(t + duration);

  // Low mechanical thud
  const osc = ctx.createOscillator();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(140 * pitch, t);
  osc.frequency.exponentialRampToValueAtTime(45, t + 0.035);

  const oscGain = ctx.createGain();
  oscGain.gain.setValueAtTime(0.08, t);
  oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

  osc.connect(oscGain).connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.04);
}

/**
 * Attach global listener for tactile audio
 */
export function registerCinemaSounds(): () => void {
  if (typeof document === 'undefined') return () => {};

  const handlePointerDown = (e: PointerEvent) => {
    const target = e.target as HTMLElement | null;
    if (target?.closest('button, a, [data-shutter-sound]')) {
      playShutterClick();
    }
  };

  document.addEventListener('pointerdown', handlePointerDown);
  return () => {
    document.removeEventListener('pointerdown', handlePointerDown);
  };
}
