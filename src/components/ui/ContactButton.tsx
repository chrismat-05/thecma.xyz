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
      className={`group relative inline-flex items-center justify-center rounded-full font-medium uppercase tracking-widest text-white cursor-pointer select-none transition-all duration-300 ease-out hover:scale-105 active:scale-95 ${className}`}
      style={{
        background:
          "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
        boxShadow:
          "0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1",
        outline: "2px solid #FFFFFF",
        outlineOffset: "-3px",
      }}
      data-cursor="button"
      data-magnetic="true"
    >
      <span className="px-7 py-3 sm:px-9 sm:py-3.5 md:px-11 md:py-4 text-xs sm:text-sm md:text-base font-semibold tracking-wider">
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
