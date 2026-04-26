'use client';

import { motion } from 'framer-motion';
import { FileText, ArrowRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

export default function ResumeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Calculate mouse position relative to center of button container
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setMousePosition({ x, y });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseenter', () => setIsHovering(true));
      container.addEventListener('mouseleave', () => setIsHovering(false));
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseenter', () => setIsHovering(true));
        container.removeEventListener('mouseleave', () => setIsHovering(false));
      };
    }
  }, []);

  return (
    <section 
      id="resume"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-16 w-full py-24 z-10 overflow-hidden"
    >
      {/* Light Rays Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none perspective-1000">
        <motion.div 
          className="w-[800px] h-[800px] rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0deg, rgba(0,212,255,0.1) 60deg, transparent 120deg, rgba(123,47,255,0.1) 180deg, transparent 240deg, rgba(0,255,136,0.1) 300deg, transparent 360deg)',
            filter: 'blur(40px)'
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-20 flex flex-col items-center max-w-4xl mx-auto text-center perspective-1000">
        
        {/* Floating Paper Element Behind Text */}
        <motion.div 
          className="absolute inset-0 bg-white/[0.02] border border-white/10 rounded-2xl backdrop-blur-sm -z-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          initial={{ rotateX: 60, scale: 0.8, y: 100, opacity: 0 }}
          whileInView={{ rotateX: 20, scale: 1, y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Paper lines to look like a document */}
          <div className="absolute inset-10 flex flex-col gap-4 opacity-10">
            <div className="w-1/3 h-4 bg-white rounded" />
            <div className="w-1/2 h-2 bg-white rounded" />
            <div className="w-3/4 h-2 bg-white rounded" />
            <div className="w-full h-2 bg-white rounded" />
            <div className="w-5/6 h-2 bg-white rounded" />
          </div>
        </motion.div>

        <motion.h2 
          className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-bold text-heading mt-20 mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.15, delay: 0.1 }}
        >
          Interested in learning more about my professional experience?
        </motion.h2>

        <motion.p 
          className="font-jetbrains text-lg md:text-xl text-foreground/80 mb-16 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.15, delay: 0.2 }}
        >
          View or download my full resume — all the details, distilled.
        </motion.p>

        {/* Giant CTA Button area */}
        <motion.div 
          ref={containerRef}
          className="relative group p-8 flex items-center justify-center transform-gpu cursor-pointer"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.15, delay: 0.3 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Particle Trail Follower (only visible on hover inside the ref area) */}
          {isHovering && (
            <motion.div 
              className="absolute w-32 h-32 bg-primary/20 rounded-full blur-xl pointer-events-none mix-blend-screen"
              animate={{
                x: mousePosition.x - 64,
                y: mousePosition.y - 64,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
            />
          )}

          {/* The Button */}
          <motion.a
            href="/assets/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="relative px-12 py-6 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center gap-4 text-white font-syne font-bold text-2xl shadow-[0_0_40px_rgba(0,212,255,0.4)] transition-all duration-300 z-10"
            whileHover={{ 
              scale: 1.05,
              textShadow: "0 0 8px rgba(255,255,255,0.8)",
              boxShadow: "0 0 60px rgba(0,212,255,0.6)"
            }}
            whileTap={{ scale: 0.95, boxShadow: "0 0 20px rgba(0,212,255,0.4)" }}
          >
            <FileText className="w-8 h-8" />
            <span>View Resume</span>
            
            {/* Paper Unfold Effect (Overlay that expands on hover) */}
            <div className="absolute inset-0 bg-white/10 rounded-xl overflow-hidden pointer-events-none origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] flex items-center justify-center">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-50" />
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
