import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace("#", "");
      if (targetId === "hero" || targetId === "top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      let attempts = 0;
      const maxAttempts = 30; // 30 * 50ms = 1500ms (survives 450ms page exit transition + DOM mount)
      let pollTimer: ReturnType<typeof setTimeout>;

      const performScroll = () => {
        const element = document.getElementById(targetId);
        if (element) {
          const yOffset = -70;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });

          // Secondary alignment check after dynamic layouts/fonts settle
          setTimeout(() => {
            const recheckEl = document.getElementById(targetId);
            if (recheckEl) {
              const currentY = recheckEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
              if (Math.abs(window.pageYOffset - currentY) > 80) {
                window.scrollTo({ top: Math.max(0, currentY), behavior: "smooth" });
              }
            }
          }, 250);
          return;
        }

        if (attempts < maxAttempts) {
          attempts++;
          pollTimer = setTimeout(performScroll, 50);
        }
      };

      // Start polling
      pollTimer = setTimeout(performScroll, 50);

      return () => clearTimeout(pollTimer);
    }

    // Default scroll to top when there is no hash
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
