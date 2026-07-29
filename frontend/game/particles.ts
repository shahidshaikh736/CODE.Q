/* ============================================
   CodeQuest — Particle Effects System (TypeScript)
   ============================================ */

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  decay: number;
  type: string;
  text?: string;
  rotation?: number;
  rotSpeed?: number;
}

export const Particles = {
  _canvas: null as HTMLCanvasElement | null,
  _ctx: null as CanvasRenderingContext2D | null,
  _particles: [] as Particle[],
  _animFrame: null as number | null,
  _running: false,

  init() {
    this._canvas = document.getElementById('particle-canvas') as HTMLCanvasElement;
    if (!this._canvas) {
      this._canvas = document.createElement('canvas');
      this._canvas.id = 'particle-canvas';
      this._canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:600;';
      document.body.appendChild(this._canvas);
    }
    this._ctx = this._canvas.getContext('2d');
    this._resize();
    window.addEventListener('resize', () => this._resize());
  },

  _resize() {
    if (!this._canvas) return;
    this._canvas.width = window.innerWidth;
    this._canvas.height = window.innerHeight;
  },

  // ── Emit XP Gain Particles ──
  emitXP(x: number, y: number, amount: number) {
    const count = Math.min(20, Math.max(8, Math.floor(amount / 5)));
    for (let i = 0; i < count; i++) {
      this._particles.push({
        x: x + (Math.random() - 0.5) * 60,
        y: y + (Math.random() - 0.5) * 40,
        vx: (Math.random() - 0.5) * 4,
        vy: -(Math.random() * 3 + 2),
        size: Math.random() * 4 + 2,
        color: `hsl(${45 + Math.random() * 15}, 100%, ${60 + Math.random() * 20}%)`,
        life: 1,
        decay: 0.01 + Math.random() * 0.02,
        type: 'xp'
      });
    }

    // XP text popup
    this._particles.push({
      x,
      y: y - 20,
      vx: 0,
      vy: -1.5,
      text: `+${amount} XP`,
      color: '#ffd700',
      life: 1,
      decay: 0.012,
      type: 'text',
      size: 18
    });

    this._startLoop();
  },

  // ── Emit Level Up Celebration ──
  emitLevelUp() {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;

    for (let i = 0; i < 60; i++) {
      const angle = (Math.PI * 2 / 60) * i;
      const speed = 3 + Math.random() * 5;
      this._particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 6 + 2,
        color: ['#00f5ff', '#ff00ff', '#ffd700', '#00ff88'][Math.floor(Math.random() * 4)],
        life: 1,
        decay: 0.008 + Math.random() * 0.01,
        type: 'circle'
      });
    }

    this._startLoop();
  },

  // ── Emit Boss Damage ──
  emitDamage(x: number, y: number) {
    for (let i = 0; i < 15; i++) {
      this._particles.push({
        x: x + (Math.random() - 0.5) * 80,
        y: y + (Math.random() - 0.5) * 80,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        size: Math.random() * 8 + 3,
        color: `hsl(${0 + Math.random() * 30}, 100%, ${50 + Math.random() * 20}%)`,
        life: 1,
        decay: 0.02 + Math.random() * 0.02,
        type: 'square'
      });
    }
    this._startLoop();
  },

  // ── Emit Confetti ──
  emitConfetti() {
    for (let i = 0; i < 50; i++) {
      this._particles.push({
        x: Math.random() * window.innerWidth,
        y: -20 - Math.random() * 200,
        vx: (Math.random() - 0.5) * 2,
        vy: 2 + Math.random() * 3,
        size: Math.random() * 8 + 4,
        color: ['#00f5ff', '#ff00ff', '#ffd700', '#00ff88', '#8b5cf6', '#ff3366'][Math.floor(Math.random() * 6)],
        life: 1,
        decay: 0.003 + Math.random() * 0.003,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
        type: 'confetti'
      });
    }
    this._startLoop();
  },

  // ── Emit Success Sparkles ──
  emitSuccess(x: number, y: number) {
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 / 12) * i;
      this._particles.push({
        x,
        y,
        vx: Math.cos(angle) * 2,
        vy: Math.sin(angle) * 2,
        size: 3,
        color: '#00ff88',
        life: 1,
        decay: 0.02,
        type: 'star'
      });
    }
    this._startLoop();
  },

  // ── Animation Loop ──
  _startLoop() {
    if (this._running) return;
    this._running = true;
    this._loop();
  },

  _loop() {
    if (!this._ctx || this._particles.length === 0) {
      this._running = false;
      if (this._ctx && this._canvas) {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
      }
      return;
    }

    if (this._canvas) {
      this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    this._particles = this._particles.filter(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;

      if (p.type === 'confetti') {
        p.vy += 0.05; // gravity
        if (p.rotation !== undefined && p.rotSpeed !== undefined) {
          p.rotation += p.rotSpeed;
        }
      }

      if (p.life <= 0) return false;

      if (this._ctx) {
        this._ctx.globalAlpha = p.life;

        if (p.type === 'text') {
          this._ctx.font = `bold ${p.size}px 'Orbitron', sans-serif`;
          this._ctx.fillStyle = p.color;
          this._ctx.textAlign = 'center';
          this._ctx.fillText(p.text || '', p.x, p.y);
        } else if (p.type === 'confetti') {
          this._ctx.save();
          this._ctx.translate(p.x, p.y);
          this._ctx.rotate((p.rotation || 0) * Math.PI / 180);
          this._ctx.fillStyle = p.color;
          this._ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
          this._ctx.restore();
        } else if (p.type === 'square') {
          this._ctx.fillStyle = p.color;
          this._ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
        } else if (p.type === 'star') {
          this._drawStar(p.x, p.y, p.size, p.color);
        } else {
          this._ctx.beginPath();
          this._ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          this._ctx.fillStyle = p.color;
          this._ctx.fill();
        }

        this._ctx.globalAlpha = 1;
      }
      return true;
    });

    this._animFrame = requestAnimationFrame(() => this._loop());
  },

  _drawStar(x: number, y: number, r: number, color: string) {
    if (!this._ctx) return;
    this._ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
      const px = x + r * Math.cos(angle);
      const py = y + r * Math.sin(angle);
      i === 0 ? this._ctx.moveTo(px, py) : this._ctx.lineTo(px, py);
    }
    this._ctx.closePath();
    this._ctx.fillStyle = color;
    this._ctx.fill();
  },

  stop() {
    this._running = false;
    if (this._animFrame) cancelAnimationFrame(this._animFrame);
    this._particles = [];
    if (this._ctx && this._canvas) {
      this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }
  }
};
