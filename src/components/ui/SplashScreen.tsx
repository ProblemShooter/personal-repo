'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket } from 'lucide-react';

export default function SplashScreen() {
  const [show, setShow] = useState(true);
  const [launch, setLaunch] = useState(false);
  const [split, setSplit] = useState(false);
  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasSeenSplash || prefersReducedMotion) {
      setShow(false);
      document.documentElement.classList.add('hide-splash');
      return;
    }

    // Sequence timing (~3.8s total)
    const launchTimer = setTimeout(() => setLaunch(true), 1500);
    const splitTimer = setTimeout(() => setSplit(true), 2100);
    const hideTimer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem('hasSeenSplash', 'true');
      document.documentElement.classList.add('hide-splash');
    }, 3800);

    return () => {
      clearTimeout(launchTimer);
      clearTimeout(splitTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            try {
              if (sessionStorage.getItem('hasSeenSplash') || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                document.documentElement.classList.add('hide-splash');
              }
            } catch (e) {}
          `,
        }}
      />
      <style dangerouslySetInnerHTML={{
        __html: `
          html.hide-splash .splash-container {
            display: none !important;
          }
          html:not(.hide-splash) body {
            overflow: hidden !important;
          }
        `
      }} />
      <AnimatePresence>
        {show && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none overflow-hidden splash-container bg-[#030308]">
          
          {/* Left Door */}
          <motion.div
            initial={{ x: 0, boxShadow: "inset 0px 0px 0px rgba(0,212,255,0)" }}
            animate={{ 
              x: split ? "-100%" : 0,
              boxShadow: split ? "inset -20px 0 50px rgba(0,212,255,0.2)" : "inset 0px 0px 0px rgba(0,212,255,0)"
            }}
            transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-0 left-0 w-1/2 h-full bg-[#030308] flex overflow-hidden"
          >
            {/* Background Drifting Stars */}
            <motion.div 
              className="absolute inset-0"
              animate={{ x: [0, -20], y: [0, -10] }}
              transition={{ duration: 4, ease: "linear" }}
            >
              <div className="absolute top-[20%] left-[20%] w-1 h-1 bg-white rounded-full opacity-50 animate-pulse" />
              <div className="absolute top-[80%] left-[60%] w-1.5 h-1.5 bg-[#7B2FFF] rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute top-[40%] left-[80%] w-1 h-1 bg-[#00D4FF] rounded-full opacity-60 animate-pulse" style={{ animationDelay: '2s' }} />
            </motion.div>
          </motion.div>

          {/* Right Door */}
          <motion.div
            initial={{ x: 0, boxShadow: "inset 0px 0px 0px rgba(0,212,255,0)" }}
            animate={{ 
              x: split ? "100%" : 0,
              boxShadow: split ? "inset 20px 0 50px rgba(0,212,255,0.2)" : "inset 0px 0px 0px rgba(0,212,255,0)"
            }}
            transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-0 right-0 w-1/2 h-full bg-[#030308] flex overflow-hidden"
          >
            <motion.div 
              className="absolute inset-0"
              animate={{ x: [0, 20], y: [0, 10] }}
              transition={{ duration: 4, ease: "linear" }}
            >
              <div className="absolute top-[60%] left-[60%] w-2 h-2 bg-[#00D4FF] rounded-full opacity-30 animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="absolute top-[15%] left-[50%] w-1 h-1 bg-[#00FF88] rounded-full opacity-50 animate-pulse" style={{ animationDelay: '1.5s' }} />
              <div className="absolute top-[70%] left-[20%] w-1.5 h-1.5 bg-white rounded-full opacity-40 animate-pulse" style={{ animationDelay: '2.5s' }} />
            </motion.div>
          </motion.div>

          {/* Center Content Wrapper */}
          <motion.div
            animate={{ opacity: split ? 0 : 1, scale: split ? 0.8 : 1 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="absolute z-10 flex flex-col items-center justify-center w-full"
          >
            {/* Glowing Orb with Continuous Floating Animation */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ 
                scale: [0.8, 1, 1, 1], 
                opacity: [0, 1, 1, 1], 
                y: [20, 0, -10, 0] 
              }}
              transition={{ duration: 4, ease: "easeInOut" }}
              className="relative w-32 h-32 md:w-40 md:h-40 rounded-full mb-10"
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(0, 212, 255, 0.9), rgba(123, 47, 255, 0.6), transparent 70%)',
                boxShadow: '0 0 60px rgba(0, 212, 255, 0.3), inset 0 0 20px rgba(123, 47, 255, 0.6)'
              }}
            >
              {/* Orb Inner Pulse */}
              <motion.div 
                className="absolute inset-4 rounded-full bg-white/20 blur-xl mix-blend-overlay" 
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
              className="text-center"
            >
              <h1 className="font-orbitron text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-[#7B2FFF] tracking-wider mb-3 drop-shadow-[0_0_15px_rgba(0,212,255,0.4)]">
                ADITYA JAUHARI
              </h1>
              <motion.p 
                className="font-jetbrains text-xs md:text-sm text-blue-100/60 tracking-[0.2em] uppercase"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                AI Engineer <span className="mx-2 text-[#7B2FFF]">|</span> Full Stack Developer
              </motion.p>
            </motion.div>
          </motion.div>

          {/* The Rocket Launch Sequence */}
          <motion.div
            className="absolute z-50 flex items-center justify-center pointer-events-none"
            initial={{ y: '100vh', x: 0 }}
            animate={launch ? { y: '-100vh', x: [0, -10, 10, 0] } : { y: '100vh', x: 0 }}
            transition={{ 
              y: { duration: 1.5, ease: [0.5, 0, 0.2, 1] },
              x: { duration: 0.4, repeat: 3, ease: "easeInOut" } // slight wobble on launch
            }}
          >
            <div className="relative flex flex-col items-center drop-shadow-[0_0_20px_rgba(0,212,255,1)]">
              <Rocket 
                className="w-16 h-16 text-primary" 
                strokeWidth={1.5} 
                style={{ transform: 'rotate(-45deg)' }} // Point the rocket straight up
              />
              {/* Intense Rocket Exhaust Flame */}
              <motion.div 
                className="absolute top-14 w-5 bg-gradient-to-b from-white via-[#00D4FF] to-[#7B2FFF] rounded-full blur-[3px]"
                animate={{ height: [50, 100, 50], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 0.1, repeat: Infinity }}
              />
            </div>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
    </>
  );
}
