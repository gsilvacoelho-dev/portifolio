import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { PROFILE_PHOTO } from '../../lib/constants';

interface LoaderProps {
  /**
   * O site já pode aparecer: os chunks das seções chegaram e o React já as
   * montou atrás da cortina. A barra enche no tempo dela e espera por isto
   * antes de subir — assim o commit caro nunca cai em cima da abertura.
   */
  ready: boolean;
  /**
   * Dispara quando a cortina COMEÇA a subir — não quando termina.
   * É o sinal de "o site já pode rolar": a página destrava junto com o fade,
   * em vez de ficar presa atrás de uma cortina translúcida.
   */
  onReveal: () => void;
}

const DURATION = 900;
const HOLD = 100;
const FADE = 0.45;
/** Teto absoluto da cortina: pronto ou não, ela sai daqui. */
const MAX_WAIT = DURATION + HOLD + 1200;

/**
 * Opening loader: avatar + progress bar that counts to 100%, then curtains
 * away revealing the site. Cai para o monograma "G" se a imagem falhar.
 *
 * Regras de acessibilidade/mobile:
 *  - respeita `prefers-reduced-motion` (sem abertura nenhuma);
 *  - solta o scroll no início do fade, com `pointer-events: none` na cortina;
 *  - só sobe quando o site está montado atrás dela (`ready`), para não
 *    entregar a tela no exato quadro em que a thread está ocupada;
 *  - tem rede de segurança de relógio de parede, porque `requestAnimationFrame`
 *    é estrangulado no iOS em modo de baixo consumo e em aba de segundo plano.
 */
export function Loader({ ready, onReveal }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [barDone, setBarDone] = useState(false);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);
  const [imgOk, setImgOk] = useState(true);

  const revealRef = useRef(onReveal);
  revealRef.current = onReveal;

  const finishedRef = useRef(false);
  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setProgress(100);
    setDone(true);
    revealRef.current();
  }, []);

  // 1. Barra de progresso — e atalho para quem pede menos movimento.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish();
      setGone(true);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setBarDone(true);
    };
    raf = requestAnimationFrame(tick);

    const safety = setTimeout(finish, MAX_WAIT);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(safety);
    };
  }, [finish]);

  // 2. A cortina sobe quando a barra encheu E o site está montado atrás dela.
  useEffect(() => {
    if (!barDone || !ready) return;
    const hold = setTimeout(finish, HOLD);
    return () => clearTimeout(hold);
  }, [barDone, ready, finish]);

  if (gone) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-dark"
      // a cortina para de capturar toque no instante em que começa a sumir
      style={{ pointerEvents: done ? 'none' : 'auto' }}
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: FADE, ease: 'easeInOut' }}
      onAnimationComplete={() => {
        if (done) setGone(true);
      }}
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
  );
}
