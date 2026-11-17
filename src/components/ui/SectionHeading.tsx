import { motion } from 'framer-motion';
import { staggerContainer, wordReveal, fadeUp } from '../../lib/motion';
import { cn } from '../../lib/utils';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  className?: string;
}

/** Reusable section header: eyebrow chip + word-revealed gradient title + subtitle. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
}: SectionHeadingProps) {
  const words = title.split(' ');

  return (
    <motion.div
      variants={staggerContainer(0.08)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      className={cn(
        'flex flex-col',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {/* Eyebrow */}
      <motion.span
        variants={fadeUp}
        className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 font-mono text-xs uppercase tracking-[0.25em] text-accent-cyan"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
        {eyebrow}
      </motion.span>

      {/* Title */}
      <h2
        className={cn(
          'font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl',
          align === 'center' ? 'max-w-3xl' : 'max-w-2xl',
        )}
        style={{ perspective: 800 }}
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
            <motion.span
              variants={wordReveal}
              className={cn(
                'inline-block',
                i >= words.length - 2 ? 'gradient-text' : 'text-text-primary',
              )}
            >
              {word}
              {i < words.length - 1 && ' '}
            </motion.span>
          </span>
        ))}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className={cn(
            'mt-6 text-base leading-relaxed text-text-secondary sm:text-lg',
            align === 'center' ? 'max-w-2xl' : 'max-w-xl',
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
