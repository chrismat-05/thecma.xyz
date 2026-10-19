import React from "react";
import { Link as ScrollLink } from "react-scroll";

interface ContactButtonProps {
  onClick?: () => void;
  className?: string;
  label?: string;
  href?: string;
  isScroll?: boolean;
  to?: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  onClick,
  className = "",
  label = "Contact Me",
  href,
  isScroll = true,
  to = "contact",
}) => {
  const buttonContent = (
    <span
      className={`group relative inline-flex items-center justify-center rounded-full font-medium uppercase tracking-widest text-white cursor-pointer select-none transition-all duration-300 ease-out hover:scale-105 active:scale-95 hover:shadow-[0_0_25px_rgba(229,9,20,0.45)] ${className}`}
      style={{
        background:
          "linear-gradient(135deg, #1f232b 0%, #111317 50%, #050608 100%)",
        boxShadow:
          "0 10px 30px -10px rgba(0, 0, 0, 0.9), inset 0 1px 1px rgba(255, 255, 255, 0.25), inset 0 -2px 6px rgba(0, 0, 0, 0.8)",
        outline: "1.5px solid rgba(215, 226, 234, 0.7)",
        outlineOffset: "-2px",
      }}
      data-cursor="button"
      data-magnetic="true"
    >
      <span className="px-7 py-3 sm:px-9 sm:py-3.5 md:px-11 md:py-4 text-xs sm:text-sm md:text-base font-semibold tracking-wider text-[#D7E2EA] group-hover:text-white transition-colors">
        {label}
      </span>
    </span>
  );

  if (isScroll) {
    return (
      <ScrollLink
        to={to}
        smooth={true}
        offset={-70}
        duration={600}
        className="inline-block"
      >
        {buttonContent}
      </ScrollLink>
    );
  }

  if (href) {
    return (
      <a href={href} className="inline-block">
        {buttonContent}
      </a>
    );
  }

  return (
    <button onClick={onClick} className="inline-block">
      {buttonContent}
    </button>
  );
};

export default ContactButton;
