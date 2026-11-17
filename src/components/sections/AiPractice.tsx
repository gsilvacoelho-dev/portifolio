import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, MessagesSquare, Workflow, Zap, LayoutDashboard, type LucideIcon } from 'lucide-react';
import { resumeData } from '../../data/resume';
import { SectionHeading } from '../ui/SectionHeading';

/** One icon per `aiPractice` entry, matched by its `id`. */
const iconById: Record<string, LucideIcon> = {
  prompt: Sparkles,
  grounding: ShieldCheck,
  assistant: MessagesSquare,
  automation: Workflow,
  velocity: Zap,
  dashboards: LayoutDashboard,
};

/**
 * "IA na prática" — cada capacidade com a evidência de onde foi aplicada.
 * Formato deliberadamente sóbrio (nota de engenharia, não card de marketing):
 * quem avalia uma vaga de IA quer ver o "como", não adjetivos.
 */
export function AiPractice() {
  return (
    <section id="ai" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="IA na prática"
          title="O que eu já construí com IA generativa"
          subtitle="Cada item abaixo é uma capacidade com o projeto real onde ela foi aplicada."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -12% 0px' }}
          variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
          className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-2"
        >
          {resumeData.aiPractice.map((item, i) => {
            const Icon = iconById[item.id] ?? Sparkles;
            return (
              <motion.article
                key={item.id}
                variants={{
                  hidden: { opacity: 0, y: 26 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7 transition-colors duration-300 hover:border-accent-cyan/30"
              >
                {/* left accent rail — lights up on hover */}
                <span className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-accent-cyan/0 via-accent-cyan/40 to-accent-purple/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* index + icon */}
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-accent-cyan/15 to-accent-purple/15 text-accent-cyan transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-xs text-text-muted">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                </div>

                <h3 className="font-display text-lg font-bold leading-snug text-white sm:text-xl">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {item.description}
                </p>

                {/* evidence — onde isso foi aplicado de verdade */}
                <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-accent-cyan/20 bg-accent-cyan/[0.07] px-3 py-1.5 font-mono text-xs text-accent-cyan">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan" />
                  {item.evidence}
                </p>

                {/* tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-[0.7rem] text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
