'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export default function TypewriterText({ text, className = '', delay = 0, speed = 80 }: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let blickInterval: NodeJS.Timeout;

    timeout = setTimeout(() => {
      setIsTyping(true);
      
      let currentIndex = 0;
      const typeInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
        }
      }, speed);
      
      return () => clearInterval(typeInterval);
    }, delay * 1000);

    blickInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearTimeout(timeout);
      clearInterval(blickInterval);
    };
  }, [text, delay, speed]);

  return (
    <motion.span
      className={className}
    >
      {displayText}
      <span className={`inline-block ml-1 w-2 h-[1em] bg-current align-middle ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}></span>
    </motion.span>
  );
}
