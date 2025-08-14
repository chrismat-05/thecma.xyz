import * as anime from 'animejs';

export const scrollReveal = (selector, delay = 0) => {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el, index) => {
    anime.default({
      targets: el,
      opacity: [0, 1],
      translateY: [30, 0],
      easing: 'easeOutExpo',
      duration: 800,
      delay: delay + index * 100,
    });
  });
};