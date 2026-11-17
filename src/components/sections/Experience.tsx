import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Briefcase, Check, Calendar } from 'lucide-react';
import { resumeData } from '../../data/resume';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 70%', 'end 60%'],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="experience" className="relative px-6 py-28">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Trajetória"
          title="Experiência profissional"
          subtitle="Onde apliquei tecnologia para gerar resultados reais."
        />

        <div ref={ref} className="relative mt-16 pl-8 sm:pl-12">
          {/* track */}
          <div className="absolute left-[7px] top-2 h-full w-px bg-white/10 sm:left-[15px]" />
          {/* animated fill */}
          <motion.div
            className="absolute left-[7px] top-2 w-px origin-top bg-gradient-to-b from-accent-cyan via-accent-indigo to-accent-purple sm:left-[15px]"
            style={{ height: '100%', scaleY: lineScale }}
          />

          {resumeData.experience.map((exp) => (
            <div key={exp.id} className="relative pb-4">
              {/* node */}
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className="absolute -left-8 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-dark ring-2 ring-accent-cyan sm:-left-12"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
              </motion.span>

              <Reveal direction="left">
                <div className="border-glow rounded-2xl p-6 sm:p-8">
                  {/* date badge */}
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs text-accent-cyan">
                    <Calendar className="h-3 w-3" />
                    {exp.startDate} — {exp.endDate}
                    {exp.duration && ` · ${exp.duration}`}
                  </span>

                  <div className="mt-4 flex items-start gap-4">
                    <span className="hidden h-12 w-12 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 text-accent-cyan sm:flex">
                      <Briefcase className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                        {exp.title}
                      </h3>
                      <p className="mt-1 text-accent-purple">{exp.company}</p>
                    </div>
                  </div>

                  <ul className="mt-5 grid gap-2.5">
                    {exp.description.map((d) => (
                      <li key={d} className="flex items-start gap-3 text-sm text-text-secondary sm:text-base">
                        <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent-purple/15 text-accent-purple">
                          <Check className="h-3 w-3" />
                        </span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
