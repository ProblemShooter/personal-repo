'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, ChevronDown } from 'lucide-react';
import DecodeText from '../ui/DecodeText';
import TypewriterText from '../ui/TypewriterText';
import { cn } from '@/utils/cn';

export default function HeroSection() {
  return (
    <section 
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 md:px-16 w-full max-w-7xl mx-auto pt-32 pb-20"
    >
      <div className="flex flex-col lg:flex-row w-full gap-16 lg:gap-24 items-center">
        {/* Left Column: Text & CTA */}
        <div className="flex flex-col z-10 w-full lg:w-1/2">
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <DecodeText 
                text="Aditya Jauhari" 
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-orbitron font-bold text-heading tracking-tight mb-4 sm:mb-6 drop-shadow-lg" 
                delay={0}
              />
            </motion.div>
          </div>
          
          <div className="h-16 md:h-12 mb-8">
            <TypewriterText 
              text="Data | AI/ML | Software Engineering" 
              className="text-xl md:text-2xl font-syne text-primary/90 font-medium drop-shadow-md"
              delay={0.1}
              speed={40}
            />
          </div>

          <motion.div 
            className="flex items-center text-foreground/80 font-jetbrains text-sm md:text-base mb-10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.55 }}
          >
            <div className="relative flex items-center justify-center mr-4 w-6 h-6 flex-shrink-0">
              <MapPin className="w-5 h-5 text-primary relative z-10" />
              <motion.div 
                className="absolute inset-0 bg-primary rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </div>
            <span className="drop-shadow-sm text-lg">Mumbai, Maharashtra</span>
          </motion.div>

          <motion.div 
            className="font-jetbrains text-foreground/80 leading-relaxed text-base md:text-lg text-justify space-y-6 mb-12 max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.55 }}
          >
            <p>
              I have a keen interest in <span className="text-primary font-bold">automating</span> tasks and integrating <span className="text-primary font-bold">intelligence</span> into systems. Experienced in developing high-accuracy predictive models and <span className="text-primary font-bold">multi-agent systems</span>.
            </p>
            <p>
              I enjoy contributing to initiatives that utilize distributed <span className="text-primary font-bold">big data</span> to aid impactful organizational decision-making.
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.55 }}
          >
            <a href="#projects" onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }} className="relative group overflow-hidden bg-primary text-black font-jetbrains font-bold px-10 py-5 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,212,255,0.4)] text-lg">
              <span className="relative z-10">View My Work</span>
              <motion.div 
                className="absolute inset-0 pointer-events-none border-2 border-white/50 opacity-0 group-hover:opacity-100 scale-110 group-hover:scale-100 transition-all duration-300"
              />
            </a>
            
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="relative group overflow-hidden border border-primary text-primary font-jetbrains font-bold px-10 py-5 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 text-lg">
              <span className="relative z-10 group-hover:text-black transition-colors duration-300 delay-100">Get In Touch</span>
              <div className="absolute inset-0 bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></div>
            </a>
          </motion.div>
        </div>

        {/* Right Column: Rotating Holographic Avatar */}
        <div className="w-full lg:w-1/2 flex justify-center items-center relative perspective-1000 mt-20 lg:mt-0 z-10">
          <motion.div 
            className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center"
            initial={{ rotateY: -30, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            {/* Hexagonal Frame */}
            <div className="absolute inset-0 border border-primary/50 shadow-[0_0_15px_rgba(0,212,255,0.3)] group overflow-hidden bg-background" style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}>
              <div className="w-full h-full relative flex items-center justify-center">
                <Image 
                  src="/assets/profile.jpg"
                  alt="Aditya Jauhari"
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority
                />
                <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,212,255,0.3)] pointer-events-none" />
              </div>
            </div>

            {/* Orbiting Stat Cards */}
            <motion.div 
              className="absolute -inset-20 md:-inset-24"
              animate={{ rotateZ: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              {[
                { label: '3+ Projects', color: '#00D4FF', border: 'border-primary' },
                { label: 'Top 5% Kaggle', color: '#7B2FFF', border: 'border-secondary' },
                { label: 'TF Certified', color: '#00FF88', border: 'border-tertiary' },
                { label: 'LeetCoder', color: '#FFA116', border: 'border-[#FFA116]' },
                { label: 'Open Source', color: '#FF4D4D', border: 'border-[#FF4D4D]' },
              ].map((stat, i, arr) => {
                const angle = (i / arr.length) * Math.PI * 2;
                const radius = 50; // percentage
                const x = 50 + radius * Math.cos(angle);
                const y = 50 + radius * Math.sin(angle);
                
                return (
                  <div 
                    key={stat.label}
                    className="absolute"
                    style={{ 
                      top: `${y.toFixed(2)}%`, 
                      left: `${x.toFixed(2)}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <motion.a
                      href="/about"
                      className={cn("flex items-center justify-center bg-background/90 backdrop-blur-md border px-4 py-2 rounded shadow-lg hover:bg-white/5 transition-colors", stat.border)}
                      style={{ 
                        color: stat.color,
                        boxShadow: `0 0 10px ${stat.color}40`
                      }}
                      animate={{ rotateZ: 360 }}
                      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    >
                      <span className="text-sm font-jetbrains block whitespace-nowrap font-bold">
                        {stat.label}
                      </span>
                    </motion.a>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0], y: [0, 10, 0] }}
        transition={{ delay: 0.5, duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-10 h-10 text-primary/80 drop-shadow-[0_0_8px_rgba(0,212,255,0.5)]" />
      </motion.div>
    </section>
  );
}
