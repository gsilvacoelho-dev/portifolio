import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useFinePointer } from '../../hooks/useFinePointer';

/**
 * Fundo fixo de viewport inteira:
 * - orbs de aurora que derivam e pulsam
 * - grade com máscara radial
 * - paralaxe dos orbs seguindo o mouse
 *
 * No celular os orbs ficam PARADOS, de propósito. Animar `scale` num elemento
 * de ~600px com `filter: blur(130px)` obriga o Safari do iOS a rerrasterizar
 * três camadas enormes a cada quadro — o compositor satura e a thread
 * principal engasga junto, o que travava a abertura no iPhone. Parados eles
 * são rasterizados uma vez e não custam mais nada; o visual é o mesmo, só sem
 * a respiração.
 */
const ORBS = [
  {
    className: 'absolute -left-32 -top-24 h-[38rem] w-[38rem] rounded-full blur-[120px]',
    background: 'radial-gradient(circle at center, rgba(34,211,238,0.35), transparent 70%)',
    animate: { scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] },
    restOpacity: 0.85,
    duration: 12,
  },
  {
    className: 'absolute right-[-10rem] top-1/4 h-[42rem] w-[42rem] rounded-full blur-[130px]',
    background: 'radial-gradient(circle at center, rgba(168,85,247,0.30), transparent 70%)',
    animate: { scale: [1.1, 1, 1.1], opacity: [0.6, 0.9, 0.6] },
    restOpacity: 0.75,
    duration: 14,
  },
  {
    className: 'absolute bottom-[-12rem] left-1/3 h-[40rem] w-[40rem] rounded-full blur-[130px]',
    background: 'radial-gradient(circle at center, rgba(99,102,241,0.28), transparent 70%)',
    animate: { scale: [1, 1.2, 1], opacity: [0.5, 0.85, 0.5] },
    restOpacity: 0.68,
    duration: 16,
  },
];

export function AnimatedBackground() {
  const fine = useFinePointer();

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });

  // Profundidade de paralaxe diferente por orb.
  const orbX = [
    useTransform(sx, [0, 1], [-40, 40]),
    useTransform(sx, [0, 1], [30, -30]),
    useTransform(sx, [0, 1], [-20, 20]),
  ];
  const orbY = [
    useTransform(sy, [0, 1], [-30, 30]),
    useTransform(sy, [0, 1], [24, -24]),
    useTransform(sy, [0, 1], [20, -20]),
  ];

  useEffect(() => {
    if (!fine) return;
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [fine, mx, my]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-dark">
      {/* Grade com desvanecimento radial */}
      <div
        className="absolute inset-0 bg-grid"
        style={{
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 40%, #000 20%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 50% 40%, #000 20%, transparent 80%)',
        }}
      />

      {/* Orbs de aurora */}
      {ORBS.map((orb, i) =>
        fine ? (
          <motion.div
            key={orb.className}
            className={orb.className}
            style={{ x: orbX[i], y: orbY[i], background: orb.background }}
            animate={orb.animate}
            transition={{ duration: orb.duration, repeat: Infinity, ease: 'easeInOut' }}
          />
        ) : (
          <div
            key={orb.className}
            className={orb.className}
            style={{ background: orb.background, opacity: orb.restOpacity }}
          />
        ),
      )}

      {/* Vinheta para escurecer as bordas */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(6,8,21,0.9)_100%)]" />
    </div>
  );
}
