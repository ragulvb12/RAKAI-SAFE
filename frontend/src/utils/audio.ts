// Audio Engine for Rakai Safe: Dual-mode siren with Web Audio API Oscillator + MP3 fallback

class SoundEngine {
  private audioCtx: AudioContext | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private sirenAudio: HTMLAudioElement | null = null;
  private ringtoneAudio: HTMLAudioElement | null = null;
  private lfoInterval: number | null = null;
  private isSynthesizing = false;

  constructor() {
    try {
      this.sirenAudio = new Audio('/assets/audio/siren.mp3');
      this.sirenAudio.loop = true;
    } catch {
      // Audio element not supported
    }
  }

  private initAudioContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public playSiren() {
    this.stopSiren();

    // 1. Try playing audio asset
    let assetPlayed = false;
    if (this.sirenAudio) {
      this.sirenAudio.currentTime = 0;
      this.sirenAudio.play()
        .then(() => { assetPlayed = true; })
        .catch(() => {
          // If browser policy blocks mp3 playback without prior gesture, proceed with synthesizer
          this.startOscillatorSiren();
        });
    }

    // 2. Also start synthesizer if needed
    if (!assetPlayed) {
      this.startOscillatorSiren();
    }
  }

  public startOscillatorSiren() {
    if (this.isSynthesizing) return;
    try {
      this.initAudioContext();
      if (!this.audioCtx) return;

      this.osc1 = this.audioCtx.createOscillator();
      this.gainNode = this.audioCtx.createGain();

      this.osc1.type = 'sawtooth';
      this.osc1.frequency.setValueAtTime(800, this.audioCtx.currentTime);

      this.gainNode.gain.setValueAtTime(0.3, this.audioCtx.currentTime);

      this.osc1.connect(this.gainNode);
      this.gainNode.connect(this.audioCtx.destination);
      this.osc1.start();
      this.isSynthesizing = true;

      // Frequency alternation (wail between 700Hz and 1200Hz)
      let high = false;
      this.lfoInterval = window.setInterval(() => {
        if (!this.osc1 || !this.audioCtx) return;
        const targetFreq = high ? 1200 : 700;
        this.osc1.frequency.exponentialRampToValueAtTime(targetFreq, this.audioCtx.currentTime + 0.3);
        high = !high;
      }, 350);
    } catch (e) {
      console.warn('Synthesizer siren error:', e);
    }
  }

  public stopSiren() {
    // Stop MP3
    if (this.sirenAudio) {
      this.sirenAudio.pause();
      this.sirenAudio.currentTime = 0;
    }

    // Stop Oscillator
    if (this.lfoInterval) {
      clearInterval(this.lfoInterval);
      this.lfoInterval = null;
    }
    if (this.osc1) {
      try {
        this.osc1.stop();
        this.osc1.disconnect();
      } catch {}
      this.osc1 = null;
    }
    if (this.gainNode) {
      try {
        this.gainNode.disconnect();
      } catch {}
      this.gainNode = null;
    }
    this.isSynthesizing = false;
  }

  // Synthesize realistic phone ringtone
  public playRingtone() {
    this.stopRingtone();
    try {
      this.initAudioContext();
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.audioCtx.currentTime);
      gain.gain.setValueAtTime(0.2, this.audioCtx.currentTime);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();

      let on = true;
      this.lfoInterval = window.setInterval(() => {
        if (!gain || !this.audioCtx) return;
        gain.gain.setValueAtTime(on ? 0.2 : 0.0, this.audioCtx.currentTime);
        on = !on;
      }, 1000);

      this.osc2 = osc;
    } catch (e) {
      console.warn('Ringtone synth error:', e);
    }
  }

  public stopRingtone() {
    if (this.lfoInterval) {
      clearInterval(this.lfoInterval);
      this.lfoInterval = null;
    }
    if (this.osc2) {
      try {
        this.osc2.stop();
        this.osc2.disconnect();
      } catch {}
      this.osc2 = null;
    }
  }
}

export const soundEngine = new SoundEngine();
