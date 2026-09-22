import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  scrollOffset?: [string, string];
}

interface CharSpanProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const CharSpan: React.FC<CharSpanProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      {/* Hidden placeholder to preserve spacing layout */}
      <span className="opacity-0 select-none">{char}</span>
      {/* Absolute animated character */}
      <motion.span
        style={{ opacity }}
        className="absolute left-0 top-0 text-[#D7E2EA] transition-colors"
      >
        {char}
      </motion.span>
    </span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = "",
  scrollOffset = ["start 0.85", "end 0.35"],
}) => {
  const containerRef = useRef<HTMLParagraphElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: scrollOffset as any,
  });

  const words = text.split(" ");
  const totalChars = text.length;
  let charCounter = 0;

  return (
    <p
      ref={containerRef}
      className={`leading-relaxed select-none ${className}`}
    >
      {words.map((word, wordIndex) => {
        const wordChars = word.split("");
        const elements = (
          <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.28em]">
            {wordChars.map((char, charIndex) => {
              const start = charCounter / totalChars;
              const end = start + 1 / totalChars;
              charCounter++;

              return (
                <CharSpan
                  key={`${wordIndex}-${charIndex}-${char}`}
                  char={char}
                  progress={scrollYProgress}
                  range={[start, Math.min(end + 0.05, 1)]}
                />
              );
            })}
          </span>
        );
        charCounter++; // Account for the space
        return elements;
      })}
    </p>
  );
};

export default AnimatedText;
