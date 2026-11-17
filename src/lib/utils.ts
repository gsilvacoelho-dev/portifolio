/** Lightweight className joiner (truthy values only). */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/** Smooth-scroll to a section id, accounting for the fixed navbar height. */
export function scrollToSection(id: string, offset = 80): void {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}
