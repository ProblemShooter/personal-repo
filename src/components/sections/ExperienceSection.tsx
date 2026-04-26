'use client';

import { motion } from 'framer-motion';
import { Briefcase, Activity, Server, Cpu } from 'lucide-react';

const experiences = [
  {
    id: 'exp1',
    title: 'Senior AI Engineer',
    category: 'NeuroTech Solutions',
    date: 'Jan 2025 - Present',
    icon: <Briefcase className="w-6 h-6" />,
    description: 'Leading a team of 4 to develop scalable NLP pipelines and semantic search integrations capable of handling millions of enterprise documents.',
    color: '#00D4FF'
  },
  {
    id: 'exp2',
    title: 'Machine Learning Researcher',
    category: 'University AI Lab',
    date: 'Aug 2024 - Dec 2024',
    icon: <Activity className="w-6 h-6" />,
    description: 'Researched reinforcement learning strategies for autonomous robotics. Published findings on optimized pathfinding algorithms.',
    color: '#FF9900'
  },
  {
    id: 'exp3',
    title: 'Data Engineering Intern',
    category: 'Synapse Analytics',
    date: 'May 2024 - Aug 2024',
    icon: <Server className="w-6 h-6" />,
    description: 'Designed and implemented high-throughput ETL pipelines ensuring seamless migration of 50TB+ data into Snowflake environments.',
    color: '#7B2FFF'
  },
  {
    id: 'exp4',
    title: 'Full Stack Developer',
    category: 'Axisol',
    date: 'Aug 2025 - Jan 2026',
    icon: <Cpu className="w-6 h-6" />,
    description: 'Built intuitive, scalable full-stack web applications using React and Node.js. Reduced application load times by over 40%.',
    color: '#00FF88'
  }
];

interface ExperienceSectionProps {
  preview?: boolean;
}

export default function ExperienceSection({ preview = false }: ExperienceSectionProps) {
  const displayedExperiences = preview ? experiences.slice(0, 2) : experiences;

  return (
    <section 
      id="experience"
      className={`relative ${preview ? 'py-4 min-h-0' : 'min-h-screen py-24'} px-6 md:px-16 w-full max-w-5xl mx-auto z-10 flex flex-col justify-center`}
    >
      {!preview && (
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-syne text-4xl md:text-5xl font-bold text-heading mb-4"
          >
            Professional Experience
          </motion.h2>
          <div className="h-1 w-24 bg-primary mx-auto rounded shadow-[0_0_8px_var(--color-primary)]" />
        </div>
      )}

      <div className="relative w-full">
        {/* Core Timeline Beam */}
        <div className="absolute left-[24px] md:left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-transparent via-primary/30 to-transparent md:-translate-x-1/2 rounded-full" />

        <div className="flex flex-col gap-12">
          {displayedExperiences.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <motion.div 
                key={item.id}
                className={`relative flex flex-col md:flex-row items-center w-full ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.55, delay: 0.1 }}
              >
                {/* Node Orb */}
                <div className="absolute left-[24px] md:left-1/2 w-8 h-8 rounded-full border-4 bg-background z-20 flex items-center justify-center -translate-x-1/2 shadow-[0_0_20px_var(--tw-shadow-color)]" style={{ borderColor: item.color, '--tw-shadow-color': item.color } as React.CSSProperties}>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                </div>

                {/* Connecting Line (Desktop) */}
                <div 
                  className={`hidden md:block absolute top-1/2 w-[10%] h-[2px] z-10 ${isLeft ? 'left-[40%]' : 'right-[40%]'}`} 
                  style={{ background: `linear-gradient(to ${isLeft ? 'right' : 'left'}, transparent, ${item.color})` }} 
                />

                {/* Experience Data Slate */}
                <motion.div 
                  className={`relative w-full md:w-[42%] pl-16 md:pl-0 ${isLeft ? 'md:pr-10 md:text-right' : 'md:pl-10 md:text-left'}`}
                >
                  <div 
                    className="relative bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl group overflow-hidden transition-all duration-300"
                    style={{ '--hover-color': item.color } as React.CSSProperties}
                  >
                    {/* Hover Glow Background */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `radial-gradient(circle at ${isLeft ? '100%' : '0'} 50%, ${item.color}, transparent 70%)` }}
                    />

                    {/* Edge Accent */}
                    <div 
                      className={`absolute top-0 bottom-0 w-1 ${isLeft ? 'right-0' : 'left-0'} shadow-[0_0_15px_var(--hover-color)]`} 
                      style={{ backgroundColor: item.color }}
                    />

                    <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                      {!isLeft && (
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10" style={{ color: item.color }}>
                          {item.icon}
                        </div>
                      )}
                      <div>
                        <span className="font-jetbrains text-xs tracking-wider uppercase mb-1 block" style={{ color: item.color }}>{item.category}</span>
                        <h3 className="font-syne font-bold text-xl text-heading leading-tight">{item.title}</h3>
                      </div>
                      {isLeft && (
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10" style={{ color: item.color }}>
                          {item.icon}
                        </div>
                      )}
                    </div>

                    <p className="font-jetbrains text-sm text-foreground/80 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <span className="font-jetbrains text-xs text-foreground/50 bg-white/5 px-3 py-1 pb-1.5 rounded-full border border-white/10">
                      {item.date}
                    </span>
                  </div>
                </motion.div>
                
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
