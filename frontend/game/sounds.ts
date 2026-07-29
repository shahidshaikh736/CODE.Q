/* ============================================
   CodeQuest — Audio Effects Synthesizer (TypeScript)
   ============================================ */

class SoundSystem {
  private ctx: AudioContext | null = null;
  private muted = false;

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    } catch (e) {
      console.warn('Web Audio API not supported in this browser.', e);
    }
  }

  resume() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute(): boolean {
    this.muted = !this.muted;
    this.playClick();
    return this.muted;
  }

  isMuted(): boolean {
    return this.muted;
  }

  playTone(frequency: number, type: OscillatorType, duration: number, volume: number, startTimeOffset = 0) {
    this.resume();
    if (this.muted || !this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime + startTimeOffset);

      gain.gain.setValueAtTime(volume, this.ctx.currentTime + startTimeOffset);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + startTimeOffset + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + startTimeOffset);
      osc.stop(this.ctx.currentTime + startTimeOffset + duration);
    } catch (e) {
      console.error('Failed to play tone:', e);
    }
  }

  playClick() {
    this.playTone(600, 'sine', 0.08, 0.08);
  }

  playXPGain() {
    this.playTone(987.77, 'square', 0.08, 0.05, 0); // B5
    this.playTone(1318.51, 'square', 0.22, 0.05, 0.06); // E6
  }

  playSuccess() {
    const now = 0;
    this.playTone(523.25, 'triangle', 0.1, 0.07, now); // C5
    this.playTone(659.25, 'triangle', 0.1, 0.07, now + 0.08); // E5
    this.playTone(783.99, 'triangle', 0.1, 0.07, now + 0.16); // G5
    this.playTone(1046.50, 'sine', 0.35, 0.09, now + 0.24); // C6
  }

  playError() {
    this.playTone(130.81, 'sawtooth', 0.22, 0.1, 0); // C3
    this.playTone(123.47, 'sawtooth', 0.22, 0.1, 0.05); // B2
  }

  playLevelUp() {
    const t = 0.06;
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((freq, idx) => {
      this.playTone(freq, idx === notes.length - 1 ? 'sine' : 'square', 0.25, 0.05, idx * t);
    });
  }

  playRealmUnlock() {
    const steps = 12;
    const baseFreq = 440;
    for (let i = 0; i < steps; i++) {
      const freq = baseFreq + (i * 60);
      this.playTone(freq, 'triangle', 0.05, 0.03, i * 0.035);
    }
  }
}

export const Sounds = new SoundSystem();
