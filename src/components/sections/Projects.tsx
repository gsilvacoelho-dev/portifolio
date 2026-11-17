import { motion } from 'framer-motion';
import { ExternalLink, Check, ArrowUpRight, Target, TrendingUp, Sparkles } from 'lucide-react';
import { resumeData } from '../../data/resume';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { TiltCard } from '../ui/TiltCard';
import { TechIcon } from '../ui/TechIcon';
import { getBrandHex } from '../../lib/techBrands';
import { GithubIcon } from '../ui/SocialIcons';
import { cn } from '../../lib/utils';

type Project = (typeof resumeData.projects)[number];

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const flipped = index % 2 === 1;

  return (
    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14">
      {/* ---- Visual ---- */}
      <Reveal
        direction={flipped ? 'left' : 'right'}
        className={cn(flipped && 'lg:order-2')}
      >
        <TiltCard className="rounded-3xl" intensity={9}>
          <div className="border-glow group relative overflow-hidden rounded-3xl">
            {/* number tag */}
            <span className="absolute left-5 top-5 z-20 font-display text-sm font-semibold text-white/70">
              0{index + 1}
            </span>

            {/* image */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
              {/* hover overlay CTA */}
              {(project.liveUrl || project.githubUrl) && (
                <a
                  href={project.liveUrl || project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-label={`Abrir ${project.title}`}
                >
                  <span className="flex items-center gap-2 rounded-full glass-strong px-5 py-2.5 text-sm font-medium text-white">
                    Visitar projeto <ArrowUpRight className="h-4 w-4" />
                  </span>
                </a>
              )}
            </div>
          </div>
        </TiltCard>
      </Reveal>

      {/* ---- Content ---- */}
      <Reveal
        direction={flipped ? 'right' : 'left'}
        delay={0.1}
        className={cn(flipped && 'lg:order-1')}
      >
        <div>
          <p className="mb-3 font-mono text-sm text-accent-cyan">{project.shortDesc}</p>
          <h3 className="font-display text-3xl font-bold text-white sm:text-4xl">
            {project.title}
            {project.note && (
              <span className="ml-2 text-lg font-normal text-text-secondary sm:text-xl">
                ({project.note})
              </span>
            )}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            {project.description}
          </p>

          {/* problema que o projeto resolve */}
          {project.problem && (
            <div className="mt-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
              <p className="mb-2 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent-purple">
                <Target className="h-3.5 w-3.5" />
                O problema
              </p>
              <p className="text-sm leading-relaxed text-text-secondary">{project.problem}</p>
            </div>
          )}

          {/* o que a IA faz aqui */}
          {project.aiHighlights.length > 0 && (
            <div className="mt-4 rounded-2xl border border-accent-cyan/20 bg-accent-cyan/[0.05] p-5">
              <p className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent-cyan">
                <Sparkles className="h-3.5 w-3.5" />
                O papel da IA
              </p>
              <ul className="grid gap-2">
                {project.aiHighlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm text-text-secondary">
                    <span className="mt-[0.45rem] h-1.5 w-1.5 flex-none rounded-full bg-accent-cyan" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* impacto / resultado */}
          {project.impact && (
            <p className="mt-4 flex items-start gap-2.5 text-sm leading-relaxed text-white/90">
              <TrendingUp className="mt-0.5 h-4 w-4 flex-none text-emerald-400" />
              {project.impact}
            </p>
          )}

          {/* features */}
          <ul className="mt-6 grid gap-2.5">
            {project.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-text-secondary">
                <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent-cyan/15 text-accent-cyan">
                  <Check className="h-3 w-3" />
                </span>
                {f}
              </li>
            ))}
          </ul>

          {/* tech chips */}
          <div className="mt-6 flex flex-wrap gap-2">
            {project.technologies.map((tech) => {
              const brand = getBrandHex(tech);
              return (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-text-secondary"
                >
                  <span className="h-3.5 w-3.5" style={{ color: brand ?? '#94a3b8' }}>
                    <TechIcon name={tech} />
                  </span>
                  {tech}
                </span>
              );
            })}
          </div>

          {/* links */}
          <div className="mt-8 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-cyan to-accent-purple px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_20px_-6px_rgba(99,102,241,0.7)] transition-transform hover:-translate-y-0.5"
              >
                <ExternalLink className="h-4 w-4" />
                Ver site
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan"
              >
                <GithubIcon className="h-4 w-4" />
                Código
              </a>
            )}
          </div>
        </div>
      </Reveal>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Portfólio"
          title="Projetos em destaque"
          subtitle="Três produtos no ar, feitos de ponta a ponta. Para cada um: o problema real, o que a IA resolveu e o resultado."
        />

        <motion.div className="mt-20 space-y-24 lg:space-y-32">
          {resumeData.projects.map((project, i) => (
            <ProjectRow key={project.id} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
