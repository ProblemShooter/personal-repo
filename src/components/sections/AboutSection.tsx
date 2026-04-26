'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/utils/cn';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    
    // Select the words to animate
    const words = textRef.current.querySelectorAll('.highlight-word');
    
    words.forEach((word) => {
      gsap.to(word, {
        scrollTrigger: {
          trigger: word,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        color: '#00D4FF',
        textShadow: '0 0 8px rgba(0, 212, 255, 0.6)',
        duration: 0.6,
        ease: 'power2.out'
      });
    });
  }, []);

  return (
    <section 
      id="about"
      className="relative min-h-screen flex items-center justify-center px-6 md:px-16 w-full max-w-7xl mx-auto py-20"
    >
      <div className="flex flex-col md:flex-row w-full gap-12 items-center">
        
        {/* Left Column: Holographic Avatar */}
        <div className="w-full md:w-1/2 flex justify-center items-center relative perspective-1000">
          <motion.div 
            className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center"
            initial={{ rotateY: -30, opacity: 0 }}
            whileInView={{ rotateY: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.0, ease: "easeOut" }}
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
                />
                <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,212,255,0.3)] pointer-events-none" />
              </div>
            </div>

            {/* Orbiting Stat Cards */}
            <motion.div 
              className="absolute -inset-16 md:-inset-20"
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
                    <motion.div
                      className={cn("flex items-center justify-center bg-background/90 backdrop-blur-md border px-3 py-1.5 rounded shadow-lg", stat.border)}
                      style={{ 
                        color: stat.color,
                        boxShadow: `0 0 10px ${stat.color}40`
                      }}
                      animate={{ rotateZ: 360 }}
                      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    >
                      <span className="text-xs font-jetbrains block whitespace-nowrap font-bold">
                        {stat.label}
                      </span>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>

        {/* Right Column: About Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <motion.h2 
            className="font-syne text-4xl md:text-5xl font-bold text-heading mb-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.55 }}
          >
            About Me
          </motion.h2>

          <div 
            ref={textRef}
            className="font-jetbrains text-foreground/80 leading-relaxed text-lg text-justify space-y-6"
          >
            <p>
              I have a keen interest in <span className="highlight-word transition-colors duration-300">automating</span> tasks and integrating <span className="highlight-word transition-colors duration-300">intelligence</span> into systems. Experienced in developing high-accuracy predictive models and <span className="highlight-word transition-colors duration-300">multi-agent systems</span>.
            </p>
            <p>
              I enjoy contributing to initiatives that utilize distributed <span className="highlight-word transition-colors duration-300">big data</span> to understand functionalities that aid impactful organizational decision-making.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
