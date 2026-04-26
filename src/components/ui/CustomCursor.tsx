'use client';

import { useEffect, useState, useRef } from 'react';

type TrailParticle = {
  x: number;
  y: number;
  id: number;
};

export default function CustomCursor() {
  const [trails, setTrails] = useState<TrailParticle[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const idCounter = useRef(0);
  
  const mouse = useRef({ x: 0, y: 0 });
  const cursor = useRef({ x: 0, y: 0 });
  const lastTrailTime = useRef(0);

  useEffect(() => {
    // Detect mobile/touch
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      const now = Date.now();
      // Throttle trail creation to ~60fps instead of every single mousemove event
      if (now - lastTrailTime.current > 16) {
        const id = idCounter.current++;
        setTrails(prev => {
          const newTrails = [...prev, { x: cursor.current.x, y: cursor.current.y, id }];
          return newTrails.length > 15 ? newTrails.slice(newTrails.length - 15) : newTrails;
        });

        setTimeout(() => {
          setTrails(currentTrails => currentTrails.filter(t => t.id !== id));
        }, 600);
        
        lastTrailTime.current = now;
      }
    };

    const renderLoop = () => {
      cursor.current.x += (mouse.current.x - cursor.current.x) * 0.15;
      cursor.current.y += (mouse.current.y - cursor.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursor.current.x}px, ${cursor.current.y}px, 0) translate(-50%, -50%)`;
      }
      
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    renderLoop();
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block mix-blend-screen overflow-hidden">
      {trails.map(trail => (
        <div
          key={trail.id}
          className="absolute w-1.5 h-1.5 rounded-full bg-primary pointer-events-none animate-trail shadow-[0_0_10px_#00D4FF]"
          style={{ 
            left: trail.x, 
            top: trail.y, 
            transform: 'translate3d(-50%, -50%, 0)' 
          }}
        />
      ))}
      <div 
        ref={cursorRef} 
        className="absolute w-3 h-3 bg-white rounded-full shadow-[0_0_15px_#00D4FF] pointer-events-none will-change-transform top-0 left-0"
      />
    </div>
  );
}
