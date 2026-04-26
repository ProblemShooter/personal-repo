'use client';

import { motion } from 'framer-motion';
import { Github, Play } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/utils/cn';

const projects = [
  {
    title: 'Multi-Agent Recommendation System',
    description: 'A system using collaborative and content-based filtering for personalized content delivery, built on a multi-agent architecture for scalability.',
    tags: ['Python', 'Scikit-learn', 'Pandas', 'Multi-Agent Systems'],
    status: 'In Progress',
    glowColor: 'group-hover:shadow-[0_0_30px_rgba(123,47,255,0.4)]',
    borderColor: 'group-hover:border-secondary',
    accentColor: 'text-secondary',
    icon: (
      <div className="relative w-full h-32 mb-4 bg-background/50 rounded flex items-center justify-center overflow-hidden border border-white/5">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.50, repeat: Infinity, ease: 'linear' }} className="w-16 h-16 border rounded-full border-secondary/30 border-t-secondary relative">
            <div className="absolute top-0 left-1/2 w-2 h-2 bg-secondary rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#7B2FFF]" />
            <div className="absolute bottom-4 -right-2 w-2 h-2 bg-secondary rounded-full shadow-[0_0_8px_#7B2FFF]" />
            <div className="absolute bottom-4 -left-2 w-2 h-2 bg-secondary rounded-full shadow-[0_0_8px_#7B2FFF]" />
          </motion.div>
        </div>
      </div>
    ),
  },
  {
    title: 'Real-Time Financial Fraud Detection',
    description: 'A deep learning model using LSTMs to detect fraudulent transactions in real-time financial data streams with high accuracy.',
    tags: ['Python', 'TensorFlow', 'Keras', 'Deep Learning'],
    glowColor: 'group-hover:shadow-[0_0_30px_rgba(255,77,77,0.4)]',
    borderColor: 'group-hover:border-[#FF4D4D]',
    accentColor: 'text-[#FF4D4D]',
    icon: (
      <div className="relative w-full h-32 mb-4 bg-background/50 rounded flex items-end justify-center overflow-hidden border border-white/5 pb-4 px-4">
        <div className="flex items-end gap-1 w-full h-16">
          {[40, 30, 60, 20, 90, 40, 20, 70, 30, 50].map((h, i) => (
            <motion.div
              key={i}
              className={`w-full ${h > 80 ? 'bg-[#FF4D4D]' : 'bg-primary/50'} rounded-t-sm`}
              initial={{ height: 10 }}
              animate={{ height: `${h}%` }}
              transition={{
                duration: 0.25,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      </div>
    ),
  },
  {
    title: 'Developer Portfolio Website',
    description: 'A responsive personal portfolio built with modern frontend technologies to showcase skills, projects, and achievements.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Three.js'],
    glowColor: 'group-hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]',
    borderColor: 'group-hover:border-primary',
    accentColor: 'text-primary',
    icon: (
      <div className="relative w-full h-32 mb-4 bg-background/50 rounded flex flex-col overflow-hidden border border-white/5 p-2">
        <div className="w-full h-4 bg-white/10 rounded-t flex items-center px-2 gap-1 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 flex flex-col gap-2 px-1">
          <div className="w-1/2 h-2 bg-primary/30 rounded" />
          <div className="w-full h-12 bg-white/5 rounded border border-white/10 relative overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-1/4 bg-primary/20 blur-md"
              animate={{ x: ['-100%', '400%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Autonomous Drone Navigation',
    description: 'Developed an RL-based navigation system for autonomous drones in simulated indoor environments using PyTorch.',
    tags: ['Python', 'RL', 'PyTorch', 'Simulators'],
    status: 'Learning',
    glowColor: 'group-hover:shadow-[0_0_30px_rgba(0,255,136,0.4)]',
    borderColor: 'group-hover:border-tertiary',
    accentColor: 'text-tertiary',
    icon: (
      <div className="relative w-full h-32 mb-4 bg-background/50 rounded flex items-center justify-center overflow-hidden border border-white/5 p-2">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 border border-tertiary/20 rounded-full" />
          <div className="w-16 h-16 border border-tertiary/40 rounded-full absolute" />
          <div className="w-8 h-8 border border-tertiary/60 rounded-full absolute" />
          <motion.div 
            animate={{ x: [-20, 20, -20], y: [-20, 20, -20] }} 
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-3 h-3 bg-tertiary rounded-full absolute shadow-[0_0_10px_#00FF88]" 
          />
        </div>
      </div>
    ),
  },
  {
    title: 'Cloud-Native Analytics Dashboard',
    description: 'A scalable dashboard to monitor infrastructure costs across AWS and GCP, leveraging serverless architecture.',
    tags: ['Next.js', 'AWS', 'GCP', 'Tailwind CSS'],
    glowColor: 'group-hover:shadow-[0_0_30px_rgba(255,161,22,0.4)]',
    borderColor: 'group-hover:border-[#FFA116]',
    accentColor: 'text-[#FFA116]',
    icon: (
      <div className="relative w-full h-32 mb-4 bg-background/50 rounded flex flex-col items-center justify-end overflow-hidden border border-white/5 px-4 pb-2">
        <div className="flex w-full justify-between items-end h-20">
          <motion.div className="w-4 bg-[#FFA116]/80 rounded-t" animate={{ height: [20, 40, 20] }} transition={{ duration: 2, repeat: Infinity }} />
          <motion.div className="w-4 bg-[#FFA116]/60 rounded-t" animate={{ height: [30, 60, 30] }} transition={{ duration: 2.5, repeat: Infinity }} />
          <motion.div className="w-4 bg-[#FFA116]/90 rounded-t" animate={{ height: [50, 20, 50] }} transition={{ duration: 0.75, repeat: Infinity }} />
          <motion.div className="w-4 bg-[#FFA116]/70 rounded-t" animate={{ height: [40, 70, 40] }} transition={{ duration: 3, repeat: Infinity }} />
        </div>
      </div>
    ),
  },
  {
    title: 'Distributed Key-Value Store',
    description: 'A lightweight distributed database built from scratch implementing RAFT consensus algorithm for fault tolerance.',
    tags: ['Go', 'Distributed Systems', 'RAFT'],
    status: 'In Progress',
    glowColor: 'group-hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]',
    borderColor: 'group-hover:border-primary',
    accentColor: 'text-primary',
    icon: (
      <div className="relative w-full h-32 mb-4 bg-background/50 rounded flex items-center justify-center overflow-hidden border border-white/5 gap-2">
        {[1, 2, 3].map(i => (
          <motion.div 
            key={i}
            className="w-8 h-16 border border-primary/40 rounded flex flex-col justify-center items-center gap-1"
            animate={{ borderColor: ['rgba(0,212,255,0.2)', 'rgba(0,212,255,0.8)', 'rgba(0,212,255,0.2)'] }}
            transition={{ duration: 2, delay: i * 0.15, repeat: Infinity }}
          >
            <div className="w-4 h-1 bg-primary/50 rounded" />
            <div className="w-4 h-1 bg-primary/50 rounded" />
            <div className="w-4 h-1 bg-primary/50 rounded" />
          </motion.div>
        ))}
      </div>
    ),
  },
  {
    title: 'NLP Sentiment Analyzer API',
    description: 'A microservice providing high-throughput sentiment analysis for customer reviews using fine-tuned transformer models.',
    tags: ['Python', 'FastAPI', 'Hugging Face'],
    glowColor: 'group-hover:shadow-[0_0_30px_rgba(123,47,255,0.4)]',
    borderColor: 'group-hover:border-secondary',
    accentColor: 'text-secondary',
    icon: (
      <div className="relative w-full h-32 mb-4 bg-background/50 rounded flex items-center justify-center overflow-hidden border border-white/5 p-4 flex-col gap-2">
        <div className="w-3/4 h-2 bg-white/10 rounded" />
        <div className="w-full h-2 bg-white/10 rounded" />
        <div className="w-5/6 h-2 bg-white/10 rounded" />
        <motion.div 
          className="w-1/2 h-2 bg-secondary/80 rounded mt-2" 
          animate={{ width: ['0%', '50%', '0%'] }} 
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>
    ),
  }
];

interface ProjectsSectionProps {
  preview?: boolean;
}

export default function ProjectsSection({ preview = false }: ProjectsSectionProps) {
  const displayedProjects = preview ? projects.slice(0, 2) : projects;

  return (
    <section 
      id="projects"
      className={`relative ${preview ? 'py-4 min-h-0' : 'min-h-screen py-24'} flex flex-col items-center justify-center px-6 md:px-16 w-full max-w-7xl mx-auto`}
    >
      {!preview && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.55 }}
          className="w-full mb-16 flex flex-col items-center md:items-start"
        >
          <h2 className="font-syne text-4xl md:text-5xl font-bold text-heading">
            My Projects
          </h2>
          <div className="h-1 w-20 bg-primary mt-4 rounded shadow-[0_0_8px_var(--color-primary)]" />
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full perspective-1000">
        {displayedProjects.map((project, index) => (
          <motion.div
            key={project.title}
            className="group relative h-full"
            initial={{ opacity: 0, rotateX: 20, z: -100, y: 50 }}
            whileInView={{ opacity: 1, rotateX: 0, z: 0, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.155, 
              delay: index * 0.15,
              ease: [0.21, 1.11, 0.81, 0.99] // slight spring
            }}
            whileHover={{ 
              scale: 1.05, 
              rotateX: 5,
              rotateY: -5,
              z: 50,
              transition: { duration: 0.15 }
            }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className={cn(
              "h-full w-full bg-white/[0.03] backdrop-blur-md rounded-xl p-6 border border-white/10 flex flex-col transition-all duration-300",
              project.borderColor,
              project.glowColor
            )}>
              {/* Visual Icon Area */}
              {project.icon}

              {/* Content */}
              <div className="flex justify-between items-start mb-2 gap-2">
                <h3 className="font-syne text-xl font-bold text-heading leading-tight">
                  {project.title}
                </h3>
                {project.status && (
                  <span className={cn(
                    "text-[10px] font-rajdhani uppercase tracking-wider px-2 py-0.5 rounded whitespace-nowrap border",
                    project.status === 'Learning' 
                      ? "bg-orange-500/10 border-orange-500/50 text-orange-400" 
                      : "bg-blue-500/10 border-blue-500/50 text-blue-400"
                  )}>
                    {project.status}
                  </span>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-rajdhani tracking-wider uppercase px-2 py-1 bg-white/5 rounded border border-white/10 text-white/70">
                    {tag}
                  </span>
                ))}
              </div>
              
              <p className="font-jetbrains text-sm text-foreground/70 flex-grow mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-auto">
                <a href="#" className="flex-1 group/btn border border-white/20 hover:border-white/50 bg-black/50 py-2 px-3 rounded text-xs font-jetbrains font-medium text-white transition-colors flex items-center justify-center gap-2">
                  <span className={cn("transition-colors", project.accentColor)}>{'>'}</span> git open
                </a>
                <a href="#" className="flex-1 group/btn bg-white/10 hover:bg-white/20 py-2 px-3 rounded text-xs font-jetbrains font-medium text-white transition-colors flex items-center justify-center gap-2">
                  <span className={cn("transition-colors", project.accentColor)}>{'>'}</span> run demo
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
