import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface CursorContextType {
  setCursorText: (text: string | null) => void;
  setCursorVariant: (variant: "default" | "button" | "hidden") => void;
  setCursorColor: (color: string | null) => void;
}

const CursorContext = createContext<CursorContextType>({
  setCursorText: () => {},
  setCursorVariant: () => {},
  setCursorColor: () => {},
});

export const useCursor = () => useContext(CursorContext);

export const MagneticCustomCursor: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [cursorColor, setCursorColor] = useState<string | null>(null);
  const [cursorVariant, setCursorVariant] = useState<"default" | "button" | "hidden">("default");
  const [isCoarse, setIsCoarse] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Damped spring following mouse smoothly
  const springConfig = { stiffness: 250, damping: 20 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect coarse pointer (mobile / touchscreen)
    const checkCoarse = () => {
      const match = window.matchMedia("(pointer: coarse)");
      setIsCoarse(match.matches);
    };
    checkCoarse();
    window.addEventListener("resize", checkCoarse);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check hover targets for data attributes
      const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        "[data-cursor='button'], [data-magnetic='true'], button, a"
      ) as HTMLElement | null;

      const textAttr = target.closest("[data-cursor-text]")?.getAttribute("data-cursor-text");
      const colorAttr = target.closest("[data-cursor-color]")?.getAttribute("data-cursor-color");

      setCursorText(textAttr || null);
      setCursorColor(colorAttr || null);

      if (interactive) {
        setCursorVariant("button");
      } else {
        setCursorVariant("default");
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", checkCoarse);
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isCoarse) {
    return (
      <CursorContext.Provider value={{ setCursorText, setCursorVariant, setCursorColor }}>
        {children}
      </CursorContext.Provider>
    );
  }

  return (
    <CursorContext.Provider value={{ setCursorText, setCursorVariant, setCursorColor }}>
      {children}
      {isVisible && (
        <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
          {/* Inner small dot */}
          <motion.div
            className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-10"
            style={{
              x: mouseX,
              y: mouseY,
              translateX: "-50%",
              translateY: "-50%",
              opacity: cursorVariant === "button" ? 0 : 1,
              backgroundColor: cursorColor || "#ffffff",
            }}
          />

          {/* Outer trailing magnetic ring / expanding pill */}
          <motion.div
            className="fixed top-0 left-0 rounded-full pointer-events-none flex items-center justify-center font-mono text-[10px] tracking-wider uppercase font-bold transition-colors duration-200"
            style={{
              x: smoothX,
              y: smoothY,
              translateX: "-50%",
              translateY: "-50%",
              backgroundColor: cursorColor
                ? cursorColor
                : cursorText
                ? "#ffffff"
                : cursorVariant === "button"
                ? "rgba(255, 255, 255, 0.9)"
                : "rgba(255, 255, 255, 0.04)",
              color: cursorColor ? "#ffffff" : "#000000",
              borderColor: cursorColor ? "transparent" : cursorVariant === "button" ? "transparent" : "rgba(255, 255, 255, 0.4)",
              borderWidth: cursorColor || cursorVariant === "button" ? "0px" : "1px",
              boxShadow: cursorColor
                ? `0 0 25px ${cursorColor}aa, inset 0 0 10px rgba(255, 255, 255, 0.3)`
                : cursorText
                ? "0 8px 25px rgba(255, 255, 255, 0.35)"
                : undefined,
            }}
            animate={{
              width: cursorColor ? 56 : cursorText ? 72 : cursorVariant === "button" ? 46 : 34,
              height: cursorColor ? 56 : cursorText ? 72 : cursorVariant === "button" ? 46 : 34,
              scale: cursorVariant === "button" ? 1.15 : 1,
            }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
          >
            {cursorText && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center px-1 leading-none text-black font-semibold"
              >
                {cursorText}
              </motion.span>
            )}
          </motion.div>
        </div>
      )}
    </CursorContext.Provider>
  );
};
