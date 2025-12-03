import Lenis from 'lenis';

// smooth scroll
export const lenis = new Lenis({
  duration: 0.8,
});

export function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}


