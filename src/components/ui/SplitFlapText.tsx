import React, { useState, useEffect, useRef, useCallback } from "react";

interface SplitFlapCharProps {
  char: string;
  delay?: number;
  triggerKey: number;
}

const CHAR_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*_-+=/?:., ";

export const SplitFlapChar: React.FC<SplitFlapCharProps> = ({
  char,
  delay = 0,
  triggerKey,
}) => {
  const [displayedChar, setDisplayedChar] = useState<string>(char);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout[]>([]);

  const isSpace = char === " ";

  const startAnimation = useCallback(() => {
    timerRef.current.forEach(clearTimeout);
    timerRef.current = [];

    if (isSpace) {
      setDisplayedChar(" ");
      return;
    }

    const startTimer = setTimeout(() => {
      const totalFlaps = Math.floor(Math.random() * 4) + 4;
      let currentStep = 0;

      const flipInterval = setInterval(() => {
        currentStep++;
        setIsFlipping(true);

        if (currentStep >= totalFlaps) {
          clearInterval(flipInterval);
          setDisplayedChar(char);
          setTimeout(() => setIsFlipping(false), 80);
        } else {
          const randomChar = CHAR_SET[Math.floor(Math.random() * (CHAR_SET.length - 1))];
          setDisplayedChar(randomChar);
        }
      }, 45);

      timerRef.current.push(flipInterval as unknown as NodeJS.Timeout);
    }, delay);

    timerRef.current.push(startTimer);
  }, [char, delay, isSpace]);

  useEffect(() => {
    startAnimation();

    return () => {
      timerRef.current.forEach(clearTimeout);
    };
  }, [triggerKey, startAnimation]);

  if (isSpace) {
    return <span className="inline-block w-[0.32em]">&nbsp;</span>;
  }

  return (
    <span
      className="inline-flex flex-col relative overflow-hidden select-none font-inherit"
      style={{
        perspective: "600px",
        display: "inline-block",
      }}
    >
      <span
        className={`inline-block transition-transform duration-75 ${
          isFlipping
            ? "scale-y-90 text-neutral-300 -translate-y-0.5"
            : "scale-y-100 text-inherit translate-y-0"
        }`}
        style={{
          transformOrigin: "50% 50%",
        }}
      >
        {displayedChar}
      </span>
    </span>
  );
};

interface SplitFlapTextProps {
  text: string;
  className?: string;
  triggerKey?: number;
  onHoverTrigger?: boolean;
}

export const SplitFlapText: React.FC<SplitFlapTextProps> = ({
  text,
  className = "",
  triggerKey = 0,
  onHoverTrigger = true,
}) => {
  const [internalKey, setInternalKey] = useState<number>(triggerKey);

  useEffect(() => {
    setInternalKey(triggerKey);
  }, [triggerKey]);

  const handleMouseEnter = () => {
    if (onHoverTrigger) {
      setInternalKey((prev) => prev + 1);
    }
  };

  const characters = text.split("");

  return (
    <span
      onMouseEnter={handleMouseEnter}
      className={`inline-flex flex-wrap items-center cursor-pointer transition-colors duration-200 ${className}`}
      data-cursor="text"
    >
      {characters.map((char, index) => (
        <SplitFlapChar
          key={`${index}-${char}`}
          char={char}
          delay={index * 28}
          triggerKey={internalKey}
        />
      ))}
    </span>
  );
};

export default SplitFlapText;
