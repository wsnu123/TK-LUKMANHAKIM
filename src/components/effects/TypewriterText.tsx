import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number; // ms per character
  delay?: number; // ms initial delay
  cursor?: boolean;
  className?: string;
  mode?: 'typewriter' | 'stagger-letters';
  triggerKey?: string | number;
  onComplete?: () => void;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 28,
  delay = 100,
  cursor = true,
  className = '',
  mode = 'typewriter',
  triggerKey,
  onComplete,
}) => {
  const [displayedLength, setDisplayedLength] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  // Reset when text or triggerKey changes
  useEffect(() => {
    setDisplayedLength(0);
    setIsTyping(true);

    const startTimeout = setTimeout(() => {
      let current = 0;
      const interval = setInterval(() => {
        current += 1;
        setDisplayedLength(current);
        if (current >= text.length) {
          clearInterval(interval);
          setIsTyping(false);
          if (onComplete) onComplete();
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, delay, triggerKey]);

  if (mode === 'stagger-letters') {
    return (
      <span className={`inline-block ${className}`} aria-label={text}>
        {text.split('').map((char, index) => {
          const charDisplay = char === ' ' ? '\u00A0' : char;
          return (
            <span
              key={`${index}-${char}`}
              className="inline-block transform transition-all duration-300"
              style={{
                animation: 'letterPopIn 0.35s cubic-bezier(0.2, 0.8, 0.2, 1) both',
                animationDelay: `${delay + index * speed}ms`,
              }}
            >
              {charDisplay}
            </span>
          );
        })}
      </span>
    );
  }

  // Typewriter mode
  const visibleText = text.slice(0, displayedLength);

  return (
    <span className={`inline ${className}`}>
      {visibleText}
      {cursor && (
        <span
          className={`inline-block ml-0.5 font-normal text-amber-300 transition-opacity duration-150 ${
            isTyping ? 'animate-pulse opacity-100' : 'opacity-0'
          }`}
          style={{ verticalAlign: 'baseline' }}
        >
          |
        </span>
      )}
    </span>
  );
};
