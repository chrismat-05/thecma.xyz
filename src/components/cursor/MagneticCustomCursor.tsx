import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface CursorContextType {
  setCursorText: (text: string | null) => void;
  setCursorVariant: (variant: "default" | "button" | "hidden") => void;
}

const CursorContext = createContext<CursorContextType>({
  setCursorText: () => {},
  setCursorVariant: () => {},
});

export const useCursor = () => useContext(CursorContext);

export const MagneticCustomCursor: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cursorText, setCursorText] = useState<string | null>(null);
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
      if (textAttr) {
        setCursorText(textAttr);
      } else {
        setCursorText(null);
      }

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
    return <CursorContext.Provider value={{ setCursorText, setCursorVariant }}>{children}</CursorContext.Provider>;
  }

  return (
    <CursorContext.Provider value={{ setCursorText, setCursorVariant }}>
      {children}
      {isVisible && (
        <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
          {/* Inner small dot */}
          <motion.div
            className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-10"
            style={{
              x: mouseX,
              y: mouseY,
              translateX: "-50%",
              translateY: "-50%",
              opacity: cursorVariant === "button" ? 0 : 1,
            }}
          />

          {/* Outer trailing magnetic ring / expanding pill */}
          <motion.div
            className={`fixed top-0 left-0 rounded-full pointer-events-none flex items-center justify-center font-mono text-[10px] tracking-wider uppercase text-black font-semibold transition-colors duration-200 ${
              cursorText
                ? "bg-white text-black shadow-lg shadow-white/30"
                : cursorVariant === "button"
                ? "bg-white/90 text-black backdrop-blur-md"
                : "border border-white/40 bg-white/[0.04]"
            }`}
            style={{
              x: smoothX,
              y: smoothY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={{
              width: cursorText ? 72 : cursorVariant === "button" ? 48 : 36,
              height: cursorText ? 72 : cursorVariant === "button" ? 48 : 36,
              scale: cursorVariant === "button" ? 1.15 : 1,
            }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
          >
            {cursorText && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center px-1 leading-none"
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
