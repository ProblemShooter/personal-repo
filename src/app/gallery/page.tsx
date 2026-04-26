"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { cn } from "@/utils/cn";

const categories = ["All", "Projects", "Events", "Personal"];

const galleryItems = [
  { id: 1, title: "Hackathon Win", category: "Events", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000&auto=format&fit=crop", description: "First place at the Global AI Hackathon." },
  { id: 2, title: "System Architecture", category: "Projects", image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1000&auto=format&fit=crop", description: "Designing the microservices architecture for our main product." },
  { id: 3, title: "Workspace", category: "Personal", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop", description: "My daily coding setup." },
  { id: 4, title: "Conference Talk", category: "Events", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop", description: "Speaking about machine learning at TechConf 2025." },
  { id: 5, title: "Data Visualization", category: "Projects", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop", description: "Creating interactive dashboards." },
  { id: 6, title: "Team Retreat", category: "Personal", image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1000&auto=format&fit=crop", description: "Annual team building trip." },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null);

  const filteredItems = useMemo(() => {
    let items = galleryItems;
    
    if (filter !== "All") {
      items = items.filter(item => item.category === filter);
    }
    
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      items = items.filter(item => 
        item.title.toLowerCase().includes(q) || 
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    }
    
    return items;
  }, [filter, searchQuery]);

  return (
    <div className="pt-32 pb-24 flex flex-col items-start w-full max-w-7xl mx-auto px-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.15 }}
        className="w-full mb-12"
      >
        <div className="inline-block relative mb-4">
          <h1 className="font-syne text-5xl md:text-7xl font-bold text-heading uppercase tracking-tight relative z-10">
            GALLERY
          </h1>
          <div className="absolute bottom-1 left-0 right-0 h-3 bg-primary/80 z-0" />
        </div>
        <p className="font-jetbrains text-lg text-foreground/70 max-w-2xl border-l-2 border-primary/50 pl-4 py-1">
          A visual collection of projects, events, and personal moments.
        </p>
      </motion.div>

      {/* Search and Filter */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.15, delay: 0.05 }}
        className="w-full mb-8 flex flex-col gap-6"
      >
        <div className="relative w-full">
          <input 
            type="text" 
            placeholder="SEARCH GALLERY..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-background border border-white/20 px-4 py-4 rounded-none font-jetbrains text-sm focus:outline-none focus:border-primary transition-colors"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-3 py-1.5 font-jetbrains text-xs font-bold uppercase transition-colors border",
                filter === cat
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background text-foreground border-white/20 hover:border-white/50"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="font-jetbrains text-xs text-foreground/50">
          {filteredItems.length} items found.
        </div>
      </motion.div>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        <AnimatePresence mode="popLayout">
          {filteredItems.map(item => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="group relative flex flex-col rounded-xl overflow-hidden cursor-pointer bg-white/[0.02] border border-white/10 hover:border-white/30 transition-colors"
              onClick={() => setSelectedItem(item)}
            >
              <div className="w-full aspect-square overflow-hidden relative">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
              </div>
              <div className="w-full p-4 border-t border-white/10 flex flex-col gap-1 bg-background/50">
                <span className="text-[10px] font-rajdhani text-primary uppercase tracking-wider">{item.category}</span>
                <h3 className="text-lg font-syne font-bold text-heading truncate">{item.title}</h3>
                <p className="text-xs font-jetbrains text-foreground/70 truncate">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setSelectedItem(null)}
          >
            <button className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors">
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="max-w-4xl w-full bg-black/50 border border-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row"
              onClick={e => e.stopPropagation()}
            >
              <div className="w-full md:w-2/3 aspect-video md:aspect-auto">
                <img src={selectedItem.image} alt={selectedItem.title} className="w-full h-full object-cover" />
              </div>
              <div className="w-full md:w-1/3 p-8 flex flex-col justify-center">
                <span className="text-sm font-jetbrains text-primary mb-2">{selectedItem.category}</span>
                <h2 className="text-3xl font-syne font-bold text-heading mb-4">{selectedItem.title}</h2>
                <p className="font-jetbrains text-foreground/80 leading-relaxed">{selectedItem.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
