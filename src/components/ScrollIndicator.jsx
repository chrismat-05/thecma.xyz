import React, { useEffect, useState } from 'react';
import { scrollReveal } from '../utils/ScrollReveal';

const ScrollIndicator = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScroll((scrolled / height) * 100);

      scrollReveal('.reveal', 200);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <div
        style={{ width: `${scroll}%` }}
        className="h-full bg-gradient-to-r from-orange-400 to-yellow-500 transition-all"
      ></div>
    </div>
  );
};

export default ScrollIndicator;