import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useActiveSection } from '../../hooks/useActiveSection';
import { scrollToSection, cn } from '../../lib/utils';
import { Magnetic } from '../ui/Magnetic';

const NAV_ITEMS = [
  { id: 'home', label: 'Início' },
  { id: 'about', label: 'Sobre' },
  { id: 'ai', label: 'IA na prática' },
  { id: 'technologies', label: 'Stack' },
  { id: 'projects', label: 'Projetos' },
  { id: 'experience', label: 'Trajetória' },
  { id: 'contact', label: 'Contato' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(NAV_ITEMS.map((i) => i.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    scrollToSection(id);
    setOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-[9995] flex justify-center px-4 pt-4"
      >
        <nav
          className={cn(
            'flex w-full max-w-5xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-6',
            scrolled ? 'glass-strong shadow-[0_8px_32px_rgba(0,0,0,0.4)]' : 'bg-transparent',
          )}
        >
          {/* Logo */}
          <button
            onClick={() => go('home')}
            className="group flex items-center gap-2"
            aria-label="Ir para o início"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 font-display text-lg font-bold gradient-text transition-transform duration-300 group-hover:scale-110">
              G
            </span>
            <span className="hidden font-display text-sm font-semibold tracking-tight text-text-primary sm:block">
              Gabriel<span className="text-accent-cyan">.</span>
            </span>
          </button>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => go(item.id)}
                  className={cn(
                    'relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300',
                    active === item.id
                      ? 'text-white'
                      : 'text-text-secondary hover:text-white',
                  )}
                >
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.06]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-2">
            <Magnetic className="hidden md:block">
              <button
                onClick={() => go('contact')}
                className="rounded-full bg-gradient-to-r from-accent-cyan to-accent-purple px-5 py-2 text-sm font-semibold text-white shadow-[0_6px_20px_-6px_rgba(99,102,241,0.7)] transition-shadow hover:shadow-[0_10px_28px_-6px_rgba(99,102,241,0.9)]"
              >
                Vamos conversar
              </button>
            </Magnetic>
            <button
              onClick={() => setOpen((o) => !o)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white md:hidden"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9994] flex flex-col items-center justify-center gap-2 bg-dark/95 backdrop-blur-xl md:hidden"
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.05 * i }}
                onClick={() => go(item.id)}
                className={cn(
                  'font-display text-3xl font-semibold transition-colors',
                  active === item.id ? 'gradient-text' : 'text-text-secondary',
                )}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
