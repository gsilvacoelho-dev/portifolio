import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

interface TypewriterProps {
  text: string;
  /** Typing begins (once) when this flips to true. */
  start?: boolean;
  /** Milliseconds per character. */
  speed?: number;
  /** Classes applied to the typed text (e.g. a gradient). */
  className?: string;
  /** Keep the caret blinking after typing finishes. */
  keepCaret?: boolean;
}

/**
 * Types out `text` one character at a time, a single time, with a gentle
 * per-character fade-in and a soft blinking caret. Respects reduced-motion
 * (renders the full text instantly).
 */
export function Typewriter({
  text,
  start = true,
  speed = 72,
  className,
  keepCaret = true,
}: TypewriterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    // Honor users who prefer reduced motion — show it all at once.
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setCount(text.length);
      return;
    }

    setCount(0);

    // A posicao sai do relogio, nao de uma cadeia de setTimeout. Se uma tarefa
    // longa roubar a thread principal, o texto reaparece onde JA deveria estar
    // em vez de retomar de onde parou -- era o que fazia a palavra congelar no
    // meio ("AI Bui") e terminar segundos depois no iPhone.
    let raf = 0;
    let shown = 0;
    const t0 = performance.now();

    const tick = (now: number) => {
      const n = Math.min(Math.floor((now - t0) / speed), text.length);
      if (n !== shown) {
        shown = n;
        setCount(n);
      }
      if (n < text.length) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [start, text, speed]);

  const done = count >= text.length;

  return (
    <span aria-label={text}>
      <span aria-hidden className={className}>
        {text.slice(0, Math.max(0, count - 1))}
        {count > 0 && (
          <span key={count} style={{ animation: 'charin 0.16s ease-out' }}>
            {text[count - 1]}
          </span>
        )}
      </span>
      {(!done || keepCaret) && (
        <span
          aria-hidden
          className={cn(
            'ml-[0.12em] inline-block h-[0.78em] w-[3px] translate-y-[0.04em] rounded-full bg-accent-cyan align-baseline',
            'animate-caret',
          )}
        />
      )}
    </span>
  );
}
