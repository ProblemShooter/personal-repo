'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/utils/cn';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'My Journey', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Certs', href: '/certs' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-300 ease-in-out px-6 py-4 md:px-12',
          isScrolled
            ? 'bg-background/80 backdrop-blur-md border-b border-white/5'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })} className="flex items-center group cursor-pointer relative h-8 overflow-hidden font-orbitron font-bold text-2xl tracking-widest text-[#00D4FF]">
            <motion.div
              animate={{
                textShadow: ["0px 0px 4px rgba(0, 212, 255, 0.4)", "0px 0px 12px rgba(0, 212, 255, 0.8)", "0px 0px 4px rgba(0, 212, 255, 0.4)"]
              }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="flex items-center h-full relative whitespace-nowrap"
            >
              <div className="relative group overflow-hidden flex items-center">
                <span className="transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] inline-block hover:opacity-0 translate-y-0 group-hover:-translate-y-8 absolute origin-left">
                  A.J
                </span>
                <span className="transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] inline-block opacity-0 translate-y-8 group-hover:translate-y-0 group-hover:opacity-100 origin-left">
                  Aditya Jauhari
                </span>
                {/* Spacer to maintain layout dimensions for A.J */}
                <span className="opacity-0 user-select-none pointer-events-none group-hover:hidden transition-all duration-300">A.J</span>
                <span className="opacity-0 user-select-none pointer-events-none hidden group-hover:inline-block transition-all duration-300">Aditya Jauhari</span>
              </div>
            </motion.div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative text-sm font-jetbrains text-foreground hover:text-primary transition-colors group"
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-underline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary shadow-[0_0_8px_var(--color-primary)]"
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                    />
                  )}
                  {!isActive && (
                    <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 shadow-[0_0_8px_var(--color-primary)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          <button
            className="md:hidden text-foreground hover:text-primary transition-colors focus:outline-none"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, zIndex: 100 }}
            animate={{ opacity: 1, zIndex: 100 }}
            exit={{ opacity: 0, zIndex: 100 }}
            transition={{ duration: 0.55, ease: 'easeInOut' }}
            className="fixed inset-0 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8"
            style={{ perspective: 1000 }}
          >
            <button
              className="absolute top-6 right-6 text-foreground hover:text-primary transition-colors focus:outline-none"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            {navLinks.map((link, i) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "text-3xl font-syne font-bold transition-colors drop-shadow-lg",
                    isActive ? "text-primary" : "text-foreground hover:text-primary"
                  )}
                >
                  <motion.div
                    initial={{ opacity: 0, translateZ: -200, rotateX: 45 }}
                    animate={{ opacity: 1, translateZ: 0, rotateX: 0 }}
                    exit={{ opacity: 0, translateZ: -200, rotateX: -45 }}
                    transition={{ delay: i * 0.08, duration: 0.55, ease: 'easeOut' }}
                  >
                    {link.name}
                  </motion.div>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
