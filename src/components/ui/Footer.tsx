'use client';

import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [showRocket, setShowRocket] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowRocket(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTop = () => {
    // Direct instant scroll to top without the "bump" scale effect
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <footer className="relative w-full flex flex-col items-center justify-center pt-20 pb-12 z-20">
      {/* Thin cyan gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="flex flex-col items-center text-center space-y-6">
        
        {/* Monogram Logo */}
        <motion.div
          className="font-orbitron font-bold text-3xl tracking-widest text-[#00D4FF]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          animate={{ textShadow: ["0px 0px 4px rgba(0, 212, 255, 0.4)", "0px 0px 12px rgba(0, 212, 255, 0.8)", "0px 0px 4px rgba(0, 212, 255, 0.4)"] }}
        >
          A.J
        </motion.div>

        {/* Footer Text */}
        <div className="space-y-2 font-jetbrains text-sm text-foreground/60">
          <p>© 2026 Aditya Jauhari. All rights reserved.</p>
          <p>Built with <span className="text-[#00FF88]">React</span>, <span className="text-[#00D4FF]">Tailwind CSS</span>, and a passion for <span className="text-[#7B2FFF]">AI</span>.</p>
        </div>
      </div>

      {/* Back to Top Rocket */}
      <motion.button
        className={`fixed bottom-8 right-8 w-14 h-14 bg-background/80 backdrop-blur-md border border-primary text-primary rounded-full flex items-center justify-center cursor-pointer shadow-[0_0_15px_rgba(0,212,255,0.3)] z-50 ${showRocket ? 'pointer-events-auto' : 'pointer-events-none'}`}
        initial={{ opacity: 0, scale: 0, y: 50 }}
        animate={{ 
          opacity: showRocket ? 1 : 0, 
          scale: showRocket ? 1 : 0,
          y: showRocket ? 0 : 50
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        whileHover={{ 
          scale: 1.1, 
          y: -10, 
          boxShadow: "0 0 25px rgba(0,212,255,0.6)",
          transition: { duration: 0.2 } 
        }}
        whileTap={{ scale: 0.9, y: 0 }}
        onClick={handleScrollTop}
      >
        <Rocket className="w-6 h-6 -translate-y-0.5" />
      </motion.button>
    </footer>
  );
}
