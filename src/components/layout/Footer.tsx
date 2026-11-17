import { Mail, ArrowUp } from 'lucide-react';
import { resumeData } from '../../data/resume';
import { scrollToSection } from '../../lib/utils';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';

const links = [
  { id: 'about', label: 'Sobre' },
  { id: 'technologies', label: 'Stack' },
  { id: 'projects', label: 'Projetos' },
  { id: 'experience', label: 'Trajetória' },
  { id: 'contact', label: 'Contato' },
];

const socials = [
  { icon: GithubIcon, href: resumeData.personal.github, label: 'GitHub' },
  { icon: LinkedinIcon, href: resumeData.personal.linkedin, label: 'LinkedIn' },
  { icon: Mail, href: `mailto:${resumeData.personal.email}`, label: 'Email' },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] px-6 py-14">
      {/* top glow line */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          {/* brand */}
          <div className="text-center md:text-left">
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-2 md:justify-start"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 font-display text-lg font-bold gradient-text">
                G
              </span>
              <span className="font-display text-base font-semibold text-white">
                Gabriel Coelho Ferro
              </span>
            </button>
            <p className="mt-3 max-w-xs text-sm text-text-muted">
              Desenvolvedor Web · Bacharel em Sistemas de Informação
            </p>
          </div>

          {/* nav */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollToSection(l.id)}
                className="text-sm text-text-secondary transition-colors hover:text-accent-cyan"
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* socials */}
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-text-secondary transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-6 sm:flex-row">
          <p className="text-center text-xs text-text-muted">
            © {new Date().getFullYear()} Gabriel da Silva Coelho Ferro. Feito com{' '}
            <span className="text-accent-cyan">React</span>,{' '}
            <span className="text-accent-purple">TypeScript</span> &{' '}
            <span className="text-accent-blue">Framer Motion</span>.
          </p>
          <button
            onClick={() => scrollToSection('home')}
            className="group flex items-center gap-2 text-xs text-text-secondary transition-colors hover:text-accent-cyan"
          >
            Voltar ao topo
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 transition-transform group-hover:-translate-y-0.5">
              <ArrowUp className="h-3.5 w-3.5" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
