import { motion } from 'framer-motion';
import { Languages } from 'lucide-react';
import { resumeData } from '../../data/resume';
import { SectionHeading } from '../ui/SectionHeading';
import { TiltCard } from '../ui/TiltCard';

/** Maps a language proficiency to filled dots (out of 5). */
const levelDots: Record<string, number> = {
  Nativo: 5,
  Avançado: 4,
  Intermediário: 3,
  Básico: 2,
};

export function Skills() {
  return (
    <section id="skills" className="relative px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Comunicação"
          title="Idiomas que falo"
          subtitle="Preparado para colaborar em equipes e projetos com alcance internacional."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -12% 0px' }}
          variants={{ visible: { transition: { staggerChildren: 0.14 } } }}
          className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-3"
        >
          {resumeData.languages.map((lang) => {
            const dots = levelDots[lang.level] ?? 2;
            return (
              <motion.div
                key={lang.language}
                variants={{
                  hidden: { opacity: 0, y: 26 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
              >
                <TiltCard className="h-full rounded-3xl" intensity={7}>
                  <div className="border-glow group relative flex h-full flex-col items-center overflow-hidden rounded-3xl p-7 text-center">
                    {/* corner glow */}
                    <div className="pointer-events-none absolute -top-10 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-accent-cyan/10 blur-2xl transition-all duration-500 group-hover:bg-accent-cyan/25" />

                    <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 text-accent-cyan transition-transform duration-300 group-hover:scale-110">
                      <Languages className="h-6 w-6" />
                    </span>

                    <h3 className="font-display text-xl font-bold text-white">
                      {lang.language}
                    </h3>
                    <p className="mt-1 text-sm text-text-secondary">{lang.level}</p>

                    <div className="mt-5 flex gap-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <motion.span
                          key={i}
                          initial={{ scale: 0, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 + i * 0.08 }}
                          className={`h-2.5 w-2.5 rounded-full ${
                            i < dots
                              ? 'bg-gradient-to-r from-accent-cyan to-accent-purple'
                              : 'bg-white/10'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
