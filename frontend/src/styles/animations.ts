import type { Variants, Transition } from 'framer-motion';

// Smooth cubic bezier easing
export const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const defaultTransition: Transition = {
  duration: 0.6,
  ease: smoothEase,
};

// Check for reduced motion in environment
export const shouldReduceMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: shouldReduceMotion ? 0 : 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: smoothEase },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: shouldReduceMotion ? 0 : 0.12,
      delayChildren: 0.1,
    },
  },
};

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: shouldReduceMotion ? 1 : 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: defaultTransition,
  },
};

export const slideInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: shouldReduceMotion ? 0 : -35,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: defaultTransition,
  },
};

export const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: shouldReduceMotion ? 0 : 35,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: defaultTransition,
  },
};
