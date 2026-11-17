import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROFILE_PHOTO } from '../../lib/constants';

interface LoaderProps {
  onComplete: () => void;
}

/**
 * Opening loader: avatar + progress bar that counts to 100%, then curtains
 * away revealing the site. Cai para o monograma "G" se a imagem falhar.
 */
export function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [imgOk, setImgOk] = useState(true);

  useEffect(() => {
    const start = performance.now();
    const duration = 1600;
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 250);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-dark"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* ambient glow */}
          <div className="pointer-events-none absolute h-72 w-72 rounded-full bg-accent-purple/20 blur-[100px]" />

          {/* Avatar */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-8 h-24 w-24"
          >
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full bg-accent-cyan/25 blur-2xl"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {imgOk ? (
              <img
                src={PROFILE_PHOTO}
                alt=""
                onError={() => setImgOk(false)}
                className="relative h-full w-full object-contain"
                loading="eager"
              />
            ) : (
              <div className="relative flex h-full w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
                <span className="font-display text-5xl font-bold gradient-text-animated">G</span>
              </div>
            )}
          </motion.div>

          {/* Name */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 font-display text-sm uppercase tracking-[0.35em] text-text-secondary"
          >
            Gabriel Coelho Ferro
          </motion.p>

          {/* Progress bar */}
          <div className="h-[3px] w-56 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-accent-cyan to-accent-purple"
              style={{ width: `${progress}%` }}
            />
          </div>
          <motion.span
            className="mt-3 font-mono text-xs text-text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {progress}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
