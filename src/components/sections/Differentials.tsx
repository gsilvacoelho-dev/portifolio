import { motion } from 'framer-motion';
import { Brain, Rocket, Briefcase, Workflow, Building2, Layers, type LucideIcon } from 'lucide-react';
import { resumeData } from '../../data/resume';
import { SectionHeading } from '../ui/SectionHeading';
import { cn } from '../../lib/utils';

const iconMap: LucideIcon[] = [Brain, Rocket, Briefcase, Workflow, Building2, Layers];

export function Differentials() {
  return (
    <section id="differentials" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Diferenciais"
          title="Por que me chamar para um time de IA"
          subtitle="Seis coisas que eu já fiz — e que explicam como eu trabalho."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -12% 0px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {resumeData.differentials.map((item, i) => {
            const Icon = iconMap[i] ?? Brain;
            const featured = i === 0;
            return (
              <motion.div
                key={item.title}
                variants={{
                  hidden: { opacity: 0, y: 28 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
                whileHover={{ y: -6 }}
                className={cn(
                  'border-glow group relative overflow-hidden rounded-3xl p-7',
                  featured && 'sm:col-span-2 lg:col-span-1 lg:row-span-2 lg:flex lg:flex-col lg:justify-between',
                )}
              >
                {/* animated glow blob */}
                <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-accent-purple/10 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:bg-accent-cyan/20" />

                <div>
                  <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 text-accent-cyan transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <Icon className="h-7 w-7" />
                  </span>
                  <h3 className="font-display text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {item.description}
                  </p>
                </div>

                {featured && (
                  <div className="mt-8 hidden items-center gap-2 font-mono text-xs text-accent-cyan lg:flex">
                    <span className="h-px w-10 bg-gradient-to-r from-accent-cyan to-transparent" />
                    Destaque
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
