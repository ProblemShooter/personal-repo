"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";

const categories = ["All", "Development", "AI/ML", "Cloud", "Others"];

const certs = [
  { id: 1, title: "AWS Certified Solutions Architect", category: "Cloud", issuer: "Amazon Web Services", date: "2025", image: "https://images.unsplash.com/photo-1589330694653-06df36c05c09?q=80&w=1000&auto=format&fit=crop" },
  { id: 2, title: "TensorFlow Developer Certificate", category: "AI/ML", issuer: "Google", date: "2024", image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1000&auto=format&fit=crop" },
  { id: 3, title: "Deep Learning Specialization", category: "AI/ML", issuer: "Coursera", date: "2024", image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1000&auto=format&fit=crop" },
  { id: 4, title: "Meta Front-End Developer", category: "Development", issuer: "Meta", date: "2025", image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1000&auto=format&fit=crop" },
  { id: 5, title: "Google Cloud Data Engineer", category: "Cloud", issuer: "Google Cloud", date: "2026", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop" },
  { id: 6, title: "Agile Project Management", category: "Others", issuer: "PMI", date: "2023", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop" },
];

export default function CertsPage() {
  const [filter, setFilter] = useState("All");
  const [selectedCert, setSelectedCert] = useState<typeof certs[0] | null>(null);

  const filteredCerts = filter === "All" ? certs : certs.filter(cert => cert.category === filter);

  return (
    <div className="pt-32 pb-24 flex flex-col items-center w-full max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.15 }}
        className="w-full mb-12 flex flex-col items-center"
      >
        <h1 className="font-syne text-4xl md:text-5xl font-bold text-heading mb-4">
          Certifications
        </h1>
        <div className="h-1 w-20 bg-primary rounded shadow-[0_0_8px_var(--color-primary)] mb-8" />
        
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-4 py-2 rounded-full font-jetbrains text-sm transition-colors border",
                filter === cat 
                  ? "bg-primary text-background border-primary" 
                  : "bg-transparent text-foreground/70 border-white/10 hover:border-white/30"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        <AnimatePresence mode="popLayout">
          {filteredCerts.map(cert => (
            <motion.div
              layout
              key={cert.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              onClick={() => setSelectedCert(cert)}
              className="bg-white/[0.03] border border-white/10 rounded-xl p-6 flex flex-col hover:border-primary/50 transition-colors cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-rajdhani text-primary uppercase tracking-wider px-2 py-1 bg-primary/10 rounded">
                  {cert.category}
                </span>
                <span className="text-sm font-jetbrains text-foreground/50">{cert.date}</span>
              </div>
              <h3 className="text-xl font-syne font-bold text-heading mb-2 group-hover:text-primary transition-colors">{cert.title}</h3>
              <p className="text-sm font-jetbrains text-foreground/70 mt-auto pt-4 border-t border-white/5">
                Issued by: <span className="text-foreground">{cert.issuer}</span>
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setSelectedCert(null)}
          >
            <button className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors">
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="max-w-4xl w-full max-h-[80vh] flex flex-col items-center"
              onClick={e => e.stopPropagation()}
            >
              <div className="w-full bg-white/[0.03] border border-white/10 p-2 rounded-xl overflow-hidden shadow-2xl">
                {/* Lazy loaded image for performance */}
                <img 
                  src={selectedCert.image} 
                  alt={selectedCert.title} 
                  className="w-full h-auto object-contain rounded-lg max-h-[60vh]" 
                  loading="lazy" 
                />
              </div>
              <div className="mt-6 text-center">
                <h2 className="text-2xl font-syne font-bold text-heading mb-2">{selectedCert.title}</h2>
                <p className="font-jetbrains text-primary">{selectedCert.issuer} • {selectedCert.date}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
