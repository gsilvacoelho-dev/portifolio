import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Code2, Server, Database, Workflow, Wrench, type LucideIcon } from 'lucide-react';
import { resumeData } from '../../data/resume';
import { SectionHeading } from '../ui/SectionHeading';
import { TechIcon } from '../ui/TechIcon';
import { getBrandHex } from '../../lib/techBrands';
import { cn } from '../../lib/utils';

interface Tech {
  name: string;
}

const categories: {
  key: keyof typeof resumeData.technologies;
  label: string;
  icon: LucideIcon;
  accent: string;
}[] = [
  // IA primeiro: é o que importa para a vaga e o que me diferencia.
  { key: 'ai', label: 'IA & LLMs', icon: Brain, accent: '#22d3ee' },
  { key: 'automation', label: 'Automação', icon: Workflow, accent: '#a855f7' },
  { key: 'frontend', label: 'Frontend', icon: Code2, accent: '#3b82f6' },
  { key: 'backend', label: 'Backend', icon: Server, accent: '#6366f1' },
  { key: 'database', label: 'Banco de Dados', icon: Database, accent: '#22d3ee' },
  { key: 'tools', label: 'Ferramentas', icon: Wrench, accent: '#a855f7' },
];

function TechCard({ tech }: { tech: Tech }) {
  const [hover, setHover] = useState(false);
  const brand = getBrandHex(tech.name);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 text-center transition-colors duration-300 hover:border-white/15"
      style={{
        boxShadow: hover && brand ? `0 12px 40px -12px ${brand}80` : undefined,
      }}
    >
      {/* hover glow backdrop */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: brand
            ? `radial-gradient(circle at 50% 0%, ${brand}22, transparent 70%)`
            : 'radial-gradient(circle at 50% 0%, rgba(148,163,184,0.12), transparent 70%)',
        }}
      />
      <div
        className="relative h-10 w-10 transition-transform duration-300 group-hover:scale-110"
        style={{ color: hover && brand ? brand : '#e2e8f0' }}
      >
        <TechIcon name={tech.name} />
      </div>
      <p className="relative text-sm font-semibold text-white">{tech.name}</p>
    </motion.div>
  );
}

export function Technologies() {
  return (
    <section id="technologies" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Stack técnico"
          title="Stack que uso para construir"
          subtitle="De integração de LLM e automação de processos até frontend, backend e banco — tudo o que preciso para levar uma ideia ao ar sozinho."
        />

        <div className="mt-16 space-y-12">
          {categories.map((cat) => {
            const items = resumeData.technologies[cat.key] as Tech[];
            const Icon = cat.icon;
            return (
              <div key={cat.key}>
                {/* category header */}
                <div className="mb-5 flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10"
                    style={{ backgroundColor: `${cat.accent}1a`, color: cat.accent }}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-white">
                    {cat.label}
                  </h3>
                  <span className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                </div>

                {/* tech grid */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '0px 0px -12% 0px' }}
                  variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
                  className={cn(
                    'grid gap-4',
                    'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
                  )}
                >
                  {items.map((tech) => (
                    <TechCard key={tech.name} tech={tech} />
                  ))}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
