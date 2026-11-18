import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Download, Mail, ChevronDown } from 'lucide-react';
import { resumeData } from '../../data/resume';
import { staggerContainer, fadeUp, wordReveal } from '../../lib/motion';
import { scrollToSection } from '../../lib/utils';
import { Button } from '../ui/Button';
import { Magnetic } from '../ui/Magnetic';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';
import { Typewriter } from '../ui/Typewriter';
import { CV_PATH, PROFILE_PHOTO } from '../../lib/constants';
import { useFinePointer } from '../../hooks/useFinePointer';

const ROLE = resumeData.personal.role;

export function Hero({ start = true }: { start?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // photo tilt toward cursor
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotX = useSpring(useTransform(py, [-0.5, 0.5], [12, -12]), {
    stiffness: 150,
    damping: 18,
  });
  const rotY = useSpring(useTransform(px, [-0.5, 0.5], [-12, 12]), {
    stiffness: 150,
    damping: 18,
  });

  const [imgOk, setImgOk] = useState(true);

  /**
   * No celular o cargo digitado usa o gradiente ESTATICO. O animado combina
   * `background-clip: text` com um `background-position` em loop infinito: o
   * Safari do iOS precisa rerrasterizar a mascara de texto a cada quadro, e o
   * texto ainda muda a cada 72 ms porque esta sendo digitado. Era o elemento
   * mais caro da pagina, exatamente no momento mais sensivel da abertura.
   */
  const fine = useFinePointer();

  const onPhotoMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const resetPhoto = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24 pb-16 sm:pt-28"
    >
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-7 sm:gap-12 lg:grid-cols-[1.15fr_0.85fr]"
      >
        {/* ---------- Left: text ---------- */}
        <motion.div
          variants={staggerContainer(0.12, 0.2)}
          initial="hidden"
          animate="visible"
          className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left"
        >
          {/* status pill */}
          <motion.div
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm text-text-secondary backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {resumeData.personal.location}
          </motion.div>

          {/* headline */}
          <h1
            className="font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.2rem]"
            style={{ perspective: 1000 }}
          >
            <span className="block overflow-hidden pb-1">
              <motion.span variants={wordReveal} className="inline-block text-text-primary">
                Gabriel Coelho
              </motion.span>
            </span>
            <span className="block pb-1">
              <Typewriter
                text={ROLE}
                start={start}
                className={fine ? 'gradient-text-animated' : 'gradient-text'}
              />
            </span>
          </h1>

          {/* subtitle role */}
          <motion.p
            variants={fadeUp}
            className="mt-4 font-mono text-sm text-accent-cyan sm:text-base"
          >
            &lt; {resumeData.personal.degree} / &gt;
          </motion.p>

          {/* intro */}
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg"
          >
            Construo <span className="text-white">produtos</span>,{' '}
            <span className="text-white">automações</span> e{' '}
            <span className="text-white">ferramentas internas</span> com{' '}
            <span className="gradient-text font-semibold">IA generativa</span> — da ideia ao
            ar em dias, não em meses.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <Magnetic>
              <Button
                onClick={() => scrollToSection('ai')}
                size="lg"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                Ver o que construí com IA
              </Button>
            </Magnetic>
            <Button
              href={CV_PATH}
              download
              target="_blank"
              variant="outline"
              size="lg"
              icon={<Download className="h-4 w-4" />}
            >
              Currículo
            </Button>
          </motion.div>

          {/* socials */}
          <motion.div variants={fadeUp} className="mt-8 flex items-center gap-3">
            {[
              { href: resumeData.personal.github, icon: GithubIcon, label: 'GitHub' },
              { href: resumeData.personal.linkedin, icon: LinkedinIcon, label: 'LinkedIn' },
              { href: `mailto:${resumeData.personal.email}`, icon: Mail, label: 'Email' },
            ].map(({ href, icon: Icon, label }) => (
              <Magnetic key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-text-secondary transition-colors duration-300 hover:border-accent-cyan/50 hover:text-accent-cyan"
                >
                  <Icon className="h-5 w-5" />
                </a>
              </Magnetic>
            ))}
          </motion.div>
        </motion.div>

        {/* ---------- Right: photo ---------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          className="order-1 flex justify-center lg:order-2"
          style={{ perspective: 1200 }}
        >
          <motion.div
            onMouseMove={onPhotoMove}
            onMouseLeave={resetPhoto}
            style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
            className="relative h-52 w-52 sm:h-80 sm:w-80 lg:h-96 lg:w-96"
          >
            {/* Halo ambiente. O avatar já traz o próprio anel neon, então aqui
                entra só um brilho difuso por trás — nada de segunda moldura. */}
            <motion.div
              aria-hidden
              className="absolute -inset-6 rounded-full bg-gradient-to-br from-accent-cyan/30 via-accent-indigo/20 to-accent-purple/30 blur-3xl"
              animate={{ opacity: [0.55, 0.9, 0.55], scale: [0.97, 1.03, 0.97] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />

            {imgOk ? (
              <img
                src={PROFILE_PHOTO}
                alt="Gabriel da Silva Coelho Ferro"
                onError={() => setImgOk(false)}
                width={900}
                height={900}
                fetchPriority="high"
                className="relative h-full w-full object-contain [transform:translateZ(40px)] drop-shadow-[0_18px_50px_rgba(34,211,238,0.28)]"
                loading="eager"
              />
            ) : (
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-white/15 bg-gradient-to-br from-dark-tertiary to-dark [transform:translateZ(40px)]">
                <span className="font-display text-8xl font-bold gradient-text">G</span>
              </div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* scroll indicator */}
      <motion.button
        onClick={() => scrollToSection('about')}
        aria-label="Rolar para baixo"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-text-muted"
      >
        <span className="hidden font-mono text-[0.65rem] uppercase tracking-[0.3em] sm:inline">
          Scroll
        </span>
        <span className="hidden h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1 sm:flex">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-accent-cyan"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </span>
        <ChevronDown className="h-4 w-4" />
      </motion.button>
    </section>
  );
}
