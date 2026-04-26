'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Github, Linkedin } from 'lucide-react';
import TypewriterText from '../ui/TypewriterText';
import emailjs from '@emailjs/browser';
const XLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function ContactSection() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const formCardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!formCardRef.current) return;
    const rect = formCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setRotate({
      x: (y / rect.height) * -15,   // tilt up/down
      y: (x / rect.width) * 15     // tilt left/right
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs.send(
      process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID as string,
      process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID as string,
      {
        user_name: formState.name,
        user_email: formState.email,
        message: formState.message
      },
      process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY as string
    ).then(
      () => {
        setIsSubmitting(false);
        setShowToast(true);
        setFormState({ name: '', email: '', message: '' });

        setTimeout(() => setShowToast(false), 3000);
      },
      (error) => {
        console.error('FAILED...', error);
        setIsSubmitting(false);
      }
    );
  };

  const socialLinks = [
    { icon: <Github className="w-6 h-6" />, href: '#', label: 'GitHub', color: '#FFFFFF' },
    { icon: <Linkedin className="w-6 h-6" />, href: '#', label: 'LinkedIn', color: '#0A66C2' },
    { icon: <XLogo />, href: '#', label: 'X', color: '#E7E9EA' },
  ];

  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center justify-center px-6 md:px-16 w-full max-w-7xl mx-auto py-24 z-10 overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row w-full gap-16 items-center lg:items-start justify-between">

        {/* Left Column: Text & Socials */}
        <div className="w-full lg:w-5/12 flex flex-col">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <h2 className="font-syne text-5xl md:text-6xl lg:text-7xl font-bold text-heading mb-6 relative">
              Get <span className="text-primary animate-pulse">In Touch</span>
            </h2>
            <p className="font-jetbrains text-lg text-foreground/80 leading-relaxed mb-12 max-w-lg">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of an amazing team. Feel free to reach out!
            </p>

            {/* Social Links */}
            <div className="flex gap-6 perspective-1000">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.3)] transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 + 0.15, duration: 0.25 }}
                  whileHover={{
                    scale: 1.1,
                    borderColor: social.color,
                    boxShadow: `0 0 20px ${social.color}60`,
                    transition: { duration: 0.15, ease: "easeOut" }
                  }}
                >
                  <div
                    className="text-foreground/80 group-hover:text-white transition-colors"
                  >
                    {social.icon}
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: 3D Contact Form */}
        <div className="w-full lg:w-6/12 perspective-1000 flex justify-center lg:justify-end">
          <motion.div
            ref={formCardRef}
            className="w-full max-w-md bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] relative transform-gpu"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ rotateX: rotate.x, rotateY: rotate.y }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            initial={{ opacity: 0, rotateY: -30, z: -100 }}
            whileInView={{ opacity: 1, rotateY: 0, z: 0 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Edge highlights */}
            <div className="absolute inset-0 rounded-3xl border top-0 left-0 border-white/20 pointer-events-none" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">

              {/* Name Field */}
              <div className="relative group/field">
                <input
                  type="text"
                  name="user_name"
                  required
                  placeholder="Name"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-foreground font-jetbrains text-sm focus:outline-none focus:border-primary transition-colors"
                  value={formState.name}
                  onChange={e => setFormState({ ...formState, name: e.target.value })}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                />
                {focusedField === 'name' && (
                  <motion.div
                    layoutId="scanline"
                    className="absolute bottom-0 left-0 h-[2px] bg-primary w-full shadow-[0_0_10px_#00D4FF]"
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                  />
                )}
              </div>

              {/* Email Field */}
              <div className="relative group/field">
                <input
                  type="email"
                  name="user_email"
                  required
                  placeholder="Email"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-foreground font-jetbrains text-sm focus:outline-none focus:border-primary transition-colors"
                  value={formState.email}
                  onChange={e => setFormState({ ...formState, email: e.target.value })}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                />
                {focusedField === 'email' && (
                  <motion.div
                    layoutId="scanline"
                    className="absolute bottom-0 left-0 h-[2px] bg-primary w-full shadow-[0_0_10px_#00D4FF]"
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                  />
                )}
              </div>

              {/* Message Field */}
              <div className="relative group/field">
                <textarea
                  name="message"
                  required
                  placeholder="Message"
                  rows={4}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-foreground font-jetbrains text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                  value={formState.message}
                  onChange={e => setFormState({ ...formState, message: e.target.value })}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                />
                {focusedField === 'message' && (
                  <motion.div
                    layoutId="scanline"
                    className="absolute bottom-0 left-0 h-[2px] bg-primary w-full shadow-[0_0_10px_#00D4FF]"
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                  />
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary/10 hover:bg-primary/20 border border-primary text-primary font-syne font-bold text-lg rounded-xl py-4 flex justify-center items-center gap-2 transition-all relative overflow-hidden group/submit"
              >
                {!isSubmitting ? (
                  <>
                    <span className="relative z-10">Send Message</span>
                    <Send className="w-5 h-5 relative z-10 group-hover/submit:translate-x-1 group-hover/submit:-translate-y-1 transition-transform" />
                  </>
                ) : (
                  <motion.div
                    animate={{ x: [0, 200, 500], y: [0, -50, -200], opacity: [1, 1, 0] }}
                    transition={{ duration: 0.75, ease: "easeIn" }}
                    className="absolute"
                  >
                    <Send className="w-6 h-6 text-primary" />
                  </motion.div>
                )}
              </button>
            </form>

            {/* Success Toast Overlay */}
            <AnimatePresence>
              {showToast && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-background/90 backdrop-blur-md z-20 rounded-3xl flex flex-col items-center justify-center border border-primary/50 shadow-[0_0_30px_rgba(0,212,255,0.2)]"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.1 }}
                    className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 border border-primary shadow-[0_0_20px_rgba(0,212,255,0.5)]"
                  >
                    <span className="text-primary text-3xl font-bold">✓</span>
                  </motion.div>
                  <TypewriterText text="Message sent to the cosmos" className="font-syne text-xl text-primary font-bold" speed={50} />
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
