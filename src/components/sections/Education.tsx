import { motion } from 'framer-motion';
import { GraduationCap, MapPin } from 'lucide-react';
import { resumeData } from '../../data/resume';
import { SectionHeading } from '../ui/SectionHeading';
import { TiltCard } from '../ui/TiltCard';

export function Education() {
  return (
    <section id="education" className="relative px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Formação acadêmica"
          title="Educação e base técnica"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -12% 0px' }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {resumeData.education.map((edu) => (
            <motion.div
              key={edu.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
            >
              <TiltCard className="h-full rounded-3xl" intensity={7}>
                <div className="border-glow group relative h-full overflow-hidden rounded-3xl p-8">
                  {/* corner glow */}
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent-cyan/10 blur-2xl transition-opacity duration-500 group-hover:bg-accent-cyan/20" />

                  <div className="mb-6 flex items-center justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 text-accent-cyan">
                      <GraduationCap className="h-7 w-7" />
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        edu.status === 'Em andamento'
                          ? 'bg-emerald-400/10 text-emerald-400'
                          : 'bg-white/[0.06] text-text-secondary'
                      }`}
                    >
                      {edu.status}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold leading-snug text-white">
                    {edu.degree}
                  </h3>
                  <p className="mt-3 flex items-start gap-2 text-sm text-text-secondary">
                    <MapPin className="mt-0.5 h-4 w-4 flex-none text-accent-purple" />
                    {edu.institution}
                  </p>

                  {edu.highlight && (
                    <p className="mt-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5 text-sm leading-relaxed text-text-secondary">
                      {edu.highlight}
                    </p>
                  )}

                  <div className="mt-6 flex items-center gap-2 font-mono text-sm text-text-muted">
                    <span className="h-px w-8 bg-gradient-to-r from-accent-cyan to-transparent" />
                    {edu.startDate} — {edu.endDate}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
