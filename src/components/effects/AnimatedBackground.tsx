import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Fixed, full-viewport animated backdrop:
 * - aurora blobs drifting + pulsing
 * - grid with radial fade mask
 * - mouse-parallax on the color orbs
 */
export function AnimatedBackground() {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });

  // Different parallax depths per orb
  const orb1X = useTransform(sx, [0, 1], [-40, 40]);
  const orb1Y = useTransform(sy, [0, 1], [-30, 30]);
  const orb2X = useTransform(sx, [0, 1], [30, -30]);
  const orb2Y = useTransform(sy, [0, 1], [24, -24]);
  const orb3X = useTransform(sx, [0, 1], [-20, 20]);
  const orb3Y = useTransform(sy, [0, 1], [20, -20]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-dark">
      {/* Grid with radial fade */}
      <div
        className="absolute inset-0 bg-grid"
        style={{
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 40%, #000 20%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 50% 40%, #000 20%, transparent 80%)',
        }}
      />

      {/* Aurora orbs */}
      <motion.div
        className="absolute -left-32 -top-24 h-[38rem] w-[38rem] rounded-full blur-[120px]"
        style={{
          x: orb1X,
          y: orb1Y,
          background:
            'radial-gradient(circle at center, rgba(34,211,238,0.35), transparent 70%)',
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[-10rem] top-1/4 h-[42rem] w-[42rem] rounded-full blur-[130px]"
        style={{
          x: orb2X,
          y: orb2Y,
          background:
            'radial-gradient(circle at center, rgba(168,85,247,0.30), transparent 70%)',
        }}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-12rem] left-1/3 h-[40rem] w-[40rem] rounded-full blur-[130px]"
        style={{
          x: orb3X,
          y: orb3Y,
          background:
            'radial-gradient(circle at center, rgba(99,102,241,0.28), transparent 70%)',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Vignette to deepen edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(6,8,21,0.9)_100%)]" />
    </div>
  );
}
