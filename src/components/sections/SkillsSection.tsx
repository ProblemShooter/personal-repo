'use client';

import { motion } from 'framer-motion';
import { Database, Code2, Wrench, BrainCircuit, Monitor, Blocks } from 'lucide-react';
import { cn } from '@/utils/cn';

const skillCategories = [
  {
    title: 'AI & Machine Learning',
    icon: <BrainCircuit className="w-8 h-8 text-[#00D4FF]" />,
    skills: [
      { name: 'TensorFlow', learning: true },
      { name: 'PyTorch' },
      { name: 'Scikit-Learn' },
      { name: 'Keras' },
      { name: 'NLP' },
      { name: 'Computer Vision' },
      { name: 'LLMs', learning: true },
      { name: 'Reinforcement Learning' }
    ],
    color: '#00D4FF',
    colSpan: 'md:col-span-2 md:row-span-2',
  },
  {
    title: 'Languages',
    icon: <Code2 className="w-8 h-8 text-[#7B2FFF]" />,
    skills: [{ name: 'Python' }, { name: 'JavaScript' }, { name: 'TypeScript' }, { name: 'Java' }, { name: 'C++' }, { name: 'SQL' }, { name: 'R', learning: true }],
    color: '#7B2FFF',
    colSpan: 'md:col-span-1 md:row-span-1',
  },
  {
    title: 'Data Systems',
    icon: <Database className="w-8 h-8 text-[#00FF88]" />,
    skills: [{ name: 'PostgreSQL' }, { name: 'MongoDB' }, { name: 'Redis' }, { name: 'BigQuery' }, { name: 'Snowflake' }, { name: 'Spark' }, { name: 'Kafka', learning: true }],
    color: '#00FF88',
    colSpan: 'md:col-span-1 md:row-span-2',
  },
  {
    title: 'Frontend & UI',
    icon: <Monitor className="w-8 h-8 text-[#FF9900]" />,
    skills: [{ name: 'React' }, { name: 'Next.js' }, { name: 'Tailwind CSS' }, { name: 'Three.js' }, { name: 'Framer Motion' }],
    color: '#FF9900',
    colSpan: 'md:col-span-2 md:row-span-1',
  },
  {
    title: 'DevOps & Tools',
    icon: <Wrench className="w-8 h-8 text-[#FF4D4D]" />,
    skills: [{ name: 'Docker' }, { name: 'Kubernetes', learning: true }, { name: 'AWS' }, { name: 'GCP' }, { name: 'Git' }, { name: 'CI/CD' }, { name: 'Linux' }],
    color: '#FF4D4D',
    colSpan: 'md:col-span-2 md:row-span-1',
  },
  {
    title: 'Architecture',
    icon: <Blocks className="w-8 h-8 text-[#FFA116]" />,
    skills: [{ name: 'Microservices' }, { name: 'REST APIs' }, { name: 'GraphQL' }, { name: 'System Design' }, { name: 'Multi-Agent Systems', learning: true }],
    color: '#FFA116',
    colSpan: 'md:col-span-1 md:row-span-1',
  }
];

interface SkillsSectionProps {
  preview?: boolean;
}

export default function SkillsSection({ preview = false }: SkillsSectionProps) {
  const displayedCategories = preview ? skillCategories.slice(0, 3) : skillCategories;

  return (
    <section 
      id="skills"
      className={`relative ${preview ? 'py-4 min-h-0' : 'min-h-screen py-24'} flex flex-col items-center justify-center px-6 md:px-16 w-full max-w-7xl mx-auto z-10`}
    >
      {!preview && (
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-syne text-4xl md:text-5xl font-bold text-heading mb-4"
          >
            Technical Arsenal
          </motion.h2>
          <div className="h-1 w-24 bg-primary mx-auto rounded shadow-[0_0_8px_var(--color-primary)]" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full perspective-1000">
        {displayedCategories.map((category, idx) => (
          <motion.div
            key={category.title}
            className={`relative bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col overflow-hidden group ${category.colSpan}`}
            initial={{ opacity: 0, y: 30, rotateX: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            whileHover={{ 
              borderColor: `${category.color}80`,
              boxShadow: `0 10px 30px -10px ${category.color}60`,
              y: -5
            }}
          >
            {/* Background Glow */}
            <div 
              className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
              style={{ backgroundColor: category.color }}
            />

            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start lg:items-center gap-4 mb-6 z-10">
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center bg-black/40 border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-300"
              >
                {category.icon}
              </div>
              <h3 className="font-syne text-xl md:text-2xl font-bold text-heading">{category.title}</h3>
            </div>

            <div className="flex flex-wrap gap-2 z-10 mt-auto">
              {category.skills.map(skill => (
                <span 
                  key={skill.name}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-jetbrains transition-colors cursor-default border",
                    skill.learning 
                      ? "bg-orange-500/10 border-orange-500/50 text-orange-400"
                      : "bg-white/5 border-white/10 text-foreground/80 hover:text-white"
                  )}
                  onMouseEnter={(e) => {
                    if (!skill.learning) {
                      e.currentTarget.style.borderColor = category.color;
                      e.currentTarget.style.color = '#fff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!skill.learning) {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.color = 'rgba(240, 244, 255, 0.8)';
                    }
                  }}
                >
                  {skill.name}
                  {skill.learning && (
                    <span className="text-[10px] font-rajdhani uppercase tracking-wider border border-orange-500/50 text-orange-400 px-1.5 py-0.5 rounded">Learning</span>
                  )}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
