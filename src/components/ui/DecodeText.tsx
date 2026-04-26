'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface DecodeTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

export default function DecodeText({ text, className = '', delay = 0 }: DecodeTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isDecoding, setIsDecoding] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    timeout = setTimeout(() => {
      setIsDecoding(true);
      
      let iteration = 0;
      const interval = setInterval(() => {
        setDisplayText((prev) => 
          text.split('')
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              if (letter === ' ') return ' ';
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );

        if (iteration >= text.length) {
          clearInterval(interval);
          setIsDecoding(false);
          setDisplayText(text);
        }

        iteration += 1 / 3; // speed of decoding
      }, 30);
      
      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, delay }}
    >
      {displayText || text.replace(/./g, ' ')}
    </motion.div>
  );
}
