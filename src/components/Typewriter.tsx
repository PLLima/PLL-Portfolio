import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { parseTextToTokens } from '@/utils/formatText';

interface TypewriterProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
}

export function Typewriter({ text, delay = 0, speed = 40, className = '' }: TypewriterProps) {
  const [displayedChars, setDisplayedChars] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  
  const tokens = useMemo(() => parseTextToTokens(text), [text]);
  const totalLength = useMemo(() => tokens.reduce((acc, t) => acc + t.text.length, 0), [tokens]);

  useEffect(() => {
    setDisplayedChars(0);
    setIsTyping(false);
    
    const startTimer = setTimeout(() => {
      setIsTyping(true);
    }, delay * 1000);

    return () => clearTimeout(startTimer);
  }, [text, delay]);

  useEffect(() => {
    if (!isTyping) return;

    if (displayedChars < totalLength) {
      const timer = setTimeout(() => {
        setDisplayedChars(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [displayedChars, totalLength, speed, isTyping]);

  const renderTokens = () => {
    let remaining = displayedChars;
    return tokens.map((token, index) => {
      if (remaining <= 0) return null;
      const content = token.text.slice(0, remaining);
      remaining -= token.text.length;
      
      if (token.type === 'italic') {
        return <em key={index} className="italic text-foreground">{content}</em>;
      }
      if (token.type === 'bold') {
        return <strong key={index} className="font-bold text-foreground">{content}</strong>;
      }
      return <React.Fragment key={index}>{content}</React.Fragment>;
    });
  };

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={className}
    >
      {renderTokens()}
      {displayedChars < totalLength && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.6 }}
          className="inline-block w-[2px] h-[1em] bg-primary ml-1 align-middle"
          aria-hidden="true"
        />
      )}
    </motion.span>
  );
}
