import React from 'react';
import { motion } from 'framer-motion';
import { EASE } from '../../lib/motion';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface RevealProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
}

const offset = (dir: Direction, d: number) => {
  switch (dir) {
    case 'up':
      return { x: 0, y: d };
    case 'down':
      return { x: 0, y: -d };
    case 'left':
      return { x: d, y: 0 };
    case 'right':
      return { x: -d, y: 0 };
    default:
      return { x: 0, y: 0 };
  }
};

/** Scroll-reveal wrapper: fades + slides its children into view once. */
export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  distance = 32,
  className,
  once = true,
}: RevealProps) {
  const initial = offset(direction, distance);
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...initial }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: '0px 0px -12% 0px' }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
