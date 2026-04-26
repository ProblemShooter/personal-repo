'use client';

import { motion } from 'framer-motion';
import { PenTool, Zap, Sun, Code, Globe, Cpu } from 'lucide-react';

const activities = [
  {
    title: 'AI Tech Blog Contributor',
    date: 'Jan 2025 - Present',
    icon: <PenTool className="w-8 h-8 text-primary" />,
    description: "Wrote and published articles on modern AI trends, model explainability, and multi-agent systems.",
    color: '#00D4FF'
  },
  {
    title: 'HackUMass Contributor',
    date: 'Nov 2024',
    icon: <Zap className="w-8 h-8 text-secondary" />,
    description: "Developed a sustainability-focused application prototype and collaborated with a cross-functional team.",
    color: '#7B2FFF'
  },
  {
    title: 'Google Summer of Code',
    date: 'May 2024 - Aug 2024',
    icon: <Sun className="w-8 h-8 text-[#FF9900]" />,
    description: "Contributed to open-source solutions, writing clean and efficient code with mentors.",
    color: '#FF9900'
  },
  {
    title: 'Lead Organizer AI Hackathon',
    date: 'Feb 2024',
    icon: <Cpu className="w-8 h-8 text-[#00FF88]" />,
    description: "Spearheaded the logistics and technical infrastructure for a 500+ participant AI hackathon.",
    color: '#00FF88'
  },
  {
    title: 'Open Source Contributor',
    date: 'Oct 2023 - Present',
    icon: <Globe className="w-8 h-8 text-primary" />,
    description: "Active contributor to popular Python data science libraries including Pandas and Scikit-Learn.",
    color: '#00D4FF'
  },
  {
    title: 'Algorithm Design Workshop',
    date: 'Sep 2023',
    icon: <Code className="w-8 h-8 text-secondary" />,
    description: "Conducted workshops on advanced data structures and dynamic programming for juniors.",
    color: '#7B2FFF'
  }
];

export default function ActivitiesSection() {
  return (
    <section 
      id="activities"
      className="relative min-h-screen py-24 flex flex-col justify-center w-full z-10"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-16 mb-16 shrink-0 z-10">
        <div className="text-center">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-syne text-4xl md:text-5xl font-bold text-heading mb-4"
          >
            Extra-Curriculars
          </motion.h2>
          <div className="h-1 w-24 bg-primary mx-auto rounded shadow-[0_0_8px_#00D4FF]" />
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-16 z-10">
        {/* Creative Grid Layout for Short Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {activities.map((activity, idx) => (
            <motion.div 
              key={idx} 
              className="relative flex flex-col justify-between bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 group overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.05, duration: 0.25 }}
              whileHover={{ 
                y: -5,
                borderColor: activity.color,
                boxShadow: `0 10px 30px -10px ${activity.color}60`
              }}
            >
              {/* Background gradient hint */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at top right, ${activity.color}, transparent 60%)` }}
              />

              <div className="flex items-start justify-between mb-4 relative z-10">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-300" 
                  style={{ color: activity.color, boxShadow: `inset 0 0 10px ${activity.color}20` }}
                >
                  {activity.icon}
                </div>
                <span className="font-jetbrains text-xs px-2 py-1 rounded bg-white/5 border border-white/10 text-foreground/60 group-hover:text-white transition-colors">
                  {activity.date}
                </span>
              </div>
              
              <div className="relative z-10">
                <h3 className="font-syne font-bold text-lg leading-tight text-heading mb-2">{activity.title}</h3>
                <p className="font-jetbrains text-sm text-foreground/70 leading-relaxed line-clamp-3">
                  {activity.description}
                </p>
              </div>
              
              {/* Animated Progress Line */}
              <div 
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r w-0 group-hover:w-full transition-all duration-700 ease-out"
                style={{ backgroundImage: `linear-gradient(to right, transparent, ${activity.color}, transparent)` }}
              />
            </motion.div>
          ))}
          
        </div>
      </div>
    </section>
  );
}
