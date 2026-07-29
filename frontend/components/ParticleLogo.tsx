import React, { useRef, useEffect } from 'react';

interface ParticleLogoProps {
  text?: string;
  width?: number;
  height?: number;
}

export default function ParticleLogo({ text = "< / >", width = 300, height = 150 }: ParticleLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    let mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 80
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };
    
    // Support for touch devices
    const handleTouchMove = (event: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.touches[0].clientX - rect.left;
      mouse.y = event.touches[0].clientY - rect.top;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', handleMouseLeave);

    // Draw text to read pixels
    ctx.fillStyle = 'white';
    ctx.font = 'bold 80px "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2);

    const textCoordinates = ctx.getImageData(0, 0, width, height);

    class Particle {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      density: number;
      color: string;

      constructor(x: number, y: number, color: string) {
        this.x = x + (Math.random() * 50 - 25); // Scatter initially
        this.y = y + (Math.random() * 50 - 25);
        this.size = Math.random() * 2 + 1.5;
        this.baseX = x;
        this.baseY = y;
        this.density = (Math.random() * 30) + 1;
        this.color = color;
      }

      draw() {
        ctx!.fillStyle = this.color;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.closePath();
        ctx!.fill();
      }

      update() {
        // Interactivity
        if (mouse.x != null && mouse.y != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          let maxDistance = mouse.radius;
          let force = (maxDistance - distance) / maxDistance;
          let directionX = forceDirectionX * force * this.density;
          let directionY = forceDirectionY * force * this.density;

          if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
          } else {
            if (this.x !== this.baseX) {
              let dx = this.x - this.baseX;
              this.x -= dx / 10;
            }
            if (this.y !== this.baseY) {
              let dy = this.y - this.baseY;
              this.y -= dy / 10;
            }
          }
        } else {
          // Return to base
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx / 15; // smoother return
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy / 15;
          }
        }
      }
    }

    const init = () => {
      particlesArray = [];
      const data = textCoordinates.data;
      // Step size determines particle density
      for (let y = 0; y < textCoordinates.height; y += 4) {
        for (let x = 0; x < textCoordinates.width; x += 4) {
          const index = (y * width + x) * 4;
          // If pixel is sufficiently opaque
          if (data[index + 3] > 128) {
            // Colors: Cyan and Purple mixed
            const color = Math.random() > 0.4 ? '#00f5ff' : '#9b51e0';
            particlesArray.push(new Particle(x, y, color));
          }
        }
      }
    };
    
    init();

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].draw();
        particlesArray[i].update();
      }
      animationId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleMouseLeave);
    };
  }, [text, width, height]);

  return (
    <div className="particle-logo-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'auto' }}>
      <canvas 
        ref={canvasRef} 
        width={width} 
        height={height}
        style={{ 
          cursor: 'crosshair', 
          filter: 'drop-shadow(0 0 15px rgba(0, 245, 255, 0.4)) drop-shadow(0 0 35px rgba(155, 81, 224, 0.3))'
        }}
      />
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '2rem',
        fontWeight: 'bold',
        letterSpacing: '0.4em',
        color: 'rgba(0, 245, 255, 0.8)',
        textShadow: '0 0 10px rgba(0, 245, 255, 0.4)',
        marginTop: '-10px',
        marginLeft: '0.4em',
        pointerEvents: 'none'
      }}>
        CODE.Q
      </div>
    </div>
  );
}
