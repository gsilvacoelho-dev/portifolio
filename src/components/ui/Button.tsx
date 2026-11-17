import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

type Variant = 'primary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: React.ReactNode;
}

interface ButtonAsButton extends BaseProps {
  href?: undefined;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

interface ButtonAsLink extends BaseProps {
  href: string;
  download?: boolean | string;
  target?: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-[0.95rem] gap-2',
  lg: 'px-8 py-4 text-base gap-2.5',
};

const variants: Record<Variant, string> = {
  primary:
    'text-white bg-gradient-to-r from-accent-cyan via-accent-indigo to-accent-purple shadow-[0_8px_30px_-8px_rgba(99,102,241,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(99,102,241,0.8)]',
  outline:
    'text-text-primary border border-white/15 bg-white/[0.03] hover:border-accent-cyan/60 hover:bg-white/[0.06]',
  ghost: 'text-text-secondary hover:text-white hover:bg-white/[0.05]',
};

export function Button(props: ButtonProps) {
  const { children, variant = 'primary', size = 'md', className, icon } = props;

  const classes = cn(
    'group relative inline-flex items-center justify-center overflow-hidden rounded-full font-medium tracking-tight transition-colors duration-300',
    sizes[size],
    variants[variant],
    className,
  );

  const content = (
    <>
      {/* Shine sweep for primary */}
      {variant === 'primary' && (
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      )}
      <span className="relative z-10 inline-flex items-center gap-[inherit]">
        {children}
        {icon && (
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">
            {icon}
          </span>
        )}
      </span>
    </>
  );

  if ('href' in props && props.href !== undefined) {
    const { href, target, download } = props;
    return (
      <motion.a
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        download={download}
        className={classes}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
      >
        {content}
      </motion.a>
    );
  }

  const { onClick, type = 'button', disabled } = props;
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(classes, disabled && 'cursor-not-allowed opacity-60')}
      whileHover={!disabled ? { y: -2 } : undefined}
      whileTap={!disabled ? { scale: 0.97 } : undefined}
    >
      {content}
    </motion.button>
  );
}
