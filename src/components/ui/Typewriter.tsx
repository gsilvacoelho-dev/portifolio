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
    let i = 0;
    let timer: number;
    const tick = () => {
      i += 1;
      setCount(i);
      if (i < text.length) timer = window.setTimeout(tick, speed);
    };
    timer = window.setTimeout(tick, speed);
    return () => window.clearTimeout(timer);
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
