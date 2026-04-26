"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { blogCategories } from "@/data/blogs";
import { BlogPost } from "@/utils/mdx";

export default function BlogClient({ posts }: { posts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    let currentPosts = posts;
    
    if (activeCategory !== "ALL") {
      currentPosts = currentPosts.filter(p => p.category === activeCategory);
    }
    
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      currentPosts = currentPosts.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.preview.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    
    return currentPosts;
  }, [activeCategory, searchQuery, posts]);

  return (
    <div className="pt-32 pb-24 flex flex-col items-start w-full max-w-7xl mx-auto px-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full mb-12"
      >
        <div className="inline-block relative mb-4">
          <h1 className="font-syne text-5xl md:text-7xl font-bold text-heading uppercase tracking-tight relative z-10">
            BLOG
          </h1>
          <div className="absolute bottom-1 left-0 right-0 h-3 bg-primary/80 z-0" />
        </div>
        <p className="font-jetbrains text-lg text-foreground/70 max-w-2xl border-l-2 border-primary/50 pl-4 py-1">
          Thoughts on web development, design systems, and building things that matter.
        </p>
      </motion.div>

      {/* Search and Filter */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full mb-8 flex flex-col gap-6"
      >
        <div className="relative w-full">
          <input 
            type="text" 
            placeholder="SEARCH POSTS..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-background border border-white/20 px-4 py-4 rounded-none font-jetbrains text-sm focus:outline-none focus:border-primary transition-colors"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
        </div>

        <div className="flex flex-wrap gap-2">
          {blogCategories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={cn(
                "px-3 py-1.5 font-jetbrains text-xs font-bold uppercase transition-colors border",
                activeCategory === cat.name
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background text-foreground border-white/20 hover:border-white/50"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
        
        <div className="font-jetbrains text-xs text-foreground/50">
          {filteredPosts.length} posts found.
        </div>
      </motion.div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post) => (
            <motion.div
              layout
              key={post.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.45 }}
            >
              <Link 
                href={`/blog/${post.slug}`}
                className="flex flex-col h-full group cursor-pointer bg-white/[0.02] border border-white/10 hover:border-white/30 transition-colors"
              >
                {/* Top Graphic Area */}
                <div className={cn("relative w-full h-48 border-b border-white/10 p-4 overflow-hidden flex flex-col justify-between", post.color || 'bg-primary/10 border-primary/50')}>
                  <span className="bg-green-500 text-black font-jetbrains text-[10px] font-bold px-2 py-1 uppercase self-start z-10">
                    {post.readTime}
                  </span>
                  <h3 className="font-syne text-xl font-bold text-white z-10 uppercase leading-tight mt-auto">
                    {post.title}
                  </h3>
                  
                  {/* Decorative shapes */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute right-4 top-4 w-12 h-12 border-2 border-white rotate-12" />
                    <div className="absolute left-1/2 bottom-8 w-16 h-16 rounded-full border-2 border-white -translate-x-1/2" />
                    <div className="absolute right-12 bottom-4 w-8 h-8 bg-white rotate-45" />
                  </div>
                </div>

                {/* Bottom Content Area */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-xs font-jetbrains text-foreground/50 mb-2">{post.date}</div>
                  <h3 className="text-xl font-syne font-bold text-heading group-hover:text-primary transition-colors mb-3 uppercase leading-tight">
                    {post.title}
                  </h3>
                  <p className="font-jetbrains text-sm text-foreground/70 leading-relaxed mb-6 flex-grow line-clamp-3">
                    {post.preview}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {post.tags.map(tag => (
                      <span key={tag} className="border border-white/20 px-2 py-1 text-[10px] font-jetbrains text-foreground/70 uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
