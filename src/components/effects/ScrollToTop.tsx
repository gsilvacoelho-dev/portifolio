import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useFinePointer } from '../../hooks/useFinePointer';

/**
 * Anel de progresso ao redor do botão.
 *
 * Vive num componente separado de propósito: só monta no desktop, e assim o
 * `useSpring` nem é criado no celular. Ele anima o `pathLength` de um SVG a
 * cada quadro de scroll, dentro de um elemento `fixed` — no iPhone isso
 * significa reconstruir o traço do SVG em todo quadro da rolagem, do primeiro
 * ao último. O anel é decorativo; o botão funciona igual sem ele.
 */
function ProgressRing() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 48 48">
      <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(148,163,184,0.15)" strokeWidth="2" />
      <motion.circle
        cx="24"
        cy="24"
        r="22"
        fill="none"
        stroke="url(#stg)"
        strokeWidth="2"
        strokeLinecap="round"
        pathLength={1}
        style={{ pathLength: progress }}
      />
      <defs>
        <linearGradient id="stg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Floating "back to top" button that appears after scrolling down. */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const fine = useFinePointer();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Voltar ao topo"
          className="group fixed bottom-6 right-6 z-[9990] flex h-12 w-12 items-center justify-center rounded-full glass-strong text-text-primary"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {fine && <ProgressRing />}
          <ArrowUp className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
