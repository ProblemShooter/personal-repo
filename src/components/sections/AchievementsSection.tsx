'use client';

import { motion } from 'framer-motion';
import { Trophy, Star, Target, Code, Brain } from 'lucide-react';

const achievements = [
  {
    id: 'kaggle',
    title: 'Kaggle Top 1%',
    category: 'Data Science',
    date: 'Mar 2025',
    icon: <Trophy className="w-5 h-5" />,
    description: 'Achieved top percent ranking in advanced predictive modelling and exploratory data analysis competitions out of 5,000+ teams.',
    color: '#00D4FF'
  },
  {
    id: 'tf',
    title: 'TensorFlow Developer',
    category: 'Certification',
    date: 'Dec 2024',
    icon: <Brain className="w-5 h-5" />,
    description: 'Officially certified by Google. Demonstrated proficiency in building deep learning models, CNNs, and NLP architectures using TensorFlow.',
    color: '#FF9900'
  },
  {
    id: 'hackathon',
    title: 'AI Innovator Award',
    category: 'Hackathon',
    date: 'Oct 2024',
    icon: <Star className="w-5 h-5" />,
    description: 'Won 1st place overall for developing a multi-agent AI framework to optimize urban energy distribution during HackUMass.',
    color: '#7B2FFF'
  },
  {
    id: 'leetcode',
    title: 'LeetCode Knight',
    category: 'Algorithms',
    date: 'Aug 2024',
    icon: <Code className="w-5 h-5" />,
    description: 'Consistently ranked in the top 5% of global competitive programming contests, solving 500+ complex algorithmic challenges.',
    color: '#FFA116'
  },
  {
    id: 'publication',
    title: 'Research Publication',
    category: 'Academia',
    date: 'May 2024',
    icon: <Target className="w-5 h-5" />,
    description: 'Co-authored a paper on "Efficiency of Transformer Models in Edge Devices" published in IEEE International Conference.',
    color: '#00FF88'
  }
];

export default function AchievementsSection() {
  return (
    <section 
      id="achievements"
      className="relative min-h-screen py-24 px-6 md:px-16 w-full max-w-6xl mx-auto z-10 flex flex-col justify-center"
    >
      <div className="text-center mb-20">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-syne text-4xl md:text-5xl font-bold text-heading mb-4"
        >
          Milestones
        </motion.h2>
        <div className="h-1 w-24 bg-primary mx-auto rounded shadow-[0_0_8px_#00D4FF]" />
      </div>

      <div className="flex flex-col gap-6 w-full">
        {achievements.map((item, idx) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.15, delay: idx * 0.05 }}
            className="group relative w-full flex flex-col md:flex-row items-start md:items-center justify-between p-6 md:p-8 bg-black/40 backdrop-blur-md border border-white/5 rounded-2xl md:rounded-full overflow-hidden transition-all duration-500 hover:bg-white/[0.05]"
          >
            {/* Edge Hover Glow indicator */}
            <div 
              className="absolute left-0 top-0 bottom-0 w-1 opacity-50 group-hover:opacity-100 group-hover:w-2 transition-all duration-300"
              style={{ backgroundColor: item.color, boxShadow: `0 0 20px ${item.color}` }}
            />
            {/* Background Hint */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
              style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }}
            />

            {/* Left side: Icon & Title */}
            <div className="flex items-center gap-6 w-full md:w-1/3 mb-4 md:mb-0 relative z-10 pl-2">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300 shrink-0" 
                style={{ color: item.color, boxShadow: `inset 0 0 10px ${item.color}30` }}
              >
                {item.icon}
              </div>
              <div className="flex flex-col">
                <span className="font-jetbrains text-[10px] tracking-widest uppercase mb-1" style={{ color: item.color }}>{item.category}</span>
                <h3 className="font-syne font-bold text-xl lg:text-2xl text-heading leading-tight">{item.title}</h3>
              </div>
            </div>

            {/* Middle: Description */}
            <div className="w-full md:w-1/2 relative z-10 px-2 md:px-6 border-l border-white/5 pl-4 md:border-none">
              <p className="font-jetbrains text-sm text-foreground/70 leading-relaxed group-hover:text-foreground/90 transition-colors">
                {item.description}
              </p>
            </div>

            {/* Right side: Date tag */}
            <div className="w-full md:w-auto mt-4 md:mt-0 relative z-10 flex justify-end md:shrink-0 pr-2">
              <span className="font-jetbrains text-xs text-foreground/50 bg-white/5 px-4 py-2 rounded-full border border-white/10 group-hover:border-white/20 transition-colors whitespace-nowrap">
                {item.date}
              </span>
            </div>

          </motion.div>
        ))}
      </div>
    </section>
  );
}
