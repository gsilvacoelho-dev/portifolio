import { motion } from 'framer-motion';
import { Code2, Rocket, Workflow, Building2 } from 'lucide-react';
import { resumeData } from '../../data/resume';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { Counter } from '../ui/Counter';
import { TiltCard } from '../ui/TiltCard';

/** Ícone + cor por posição; os números vêm de `resumeData.stats`. */
const statStyles = [
  { icon: Rocket, accent: 'text-accent-cyan' },
  { icon: Workflow, accent: 'text-accent-purple' },
  { icon: Building2, accent: 'text-accent-blue' },
  { icon: Code2, accent: 'text-accent-indigo' },
];

export function About() {
  return (
    <section id="about" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Sobre mim"
          title="Construo com IA para resolver problemas reais"
          align="left"
        />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
          {/* Text */}
          <Reveal direction="right">
            <div className="space-y-6 text-base leading-relaxed text-text-secondary sm:text-lg">
              <p>{resumeData.about}</p>
              <p>{resumeData.aboutSecondary}</p>

              {/* mini badges */}
              <div className="flex flex-wrap gap-3 pt-2">
                {[
                  'IA generativa',
                  'Prompt engineering',
                  'Automação de processos',
                  'Produto ponta a ponta',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm text-text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Stats grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -15% 0px' }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-2 gap-4"
          >
            {resumeData.stats.map((stat, i) => {
              const { icon: Icon, accent } = statStyles[i] ?? statStyles[0];
              return (
                <motion.div
                  key={stat.label}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                  }}
                >
                  <TiltCard className="h-full rounded-2xl" intensity={8}>
                    <div className="border-glow group h-full rounded-2xl p-6">
                      <Icon className={`mb-4 h-7 w-7 ${accent}`} />
                      <div className="font-display text-4xl font-bold text-white sm:text-5xl">
                        <Counter to={stat.value} suffix={stat.suffix} />
                      </div>
                      <p className="mt-1 text-sm text-text-secondary">{stat.label}</p>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
