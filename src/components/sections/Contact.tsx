import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Download, Send, ArrowUpRight } from 'lucide-react';
import { resumeData } from '../../data/resume';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { Magnetic } from '../ui/Magnetic';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';
import { CV_PATH } from '../../lib/constants';

const { personal } = resumeData;

const channels = [
  { icon: Mail, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
  { icon: Phone, label: 'Telefone', value: personal.phone, href: `tel:+5538984267179` },
  { icon: LinkedinIcon, label: 'LinkedIn', value: 'gabriel-coelho-ferro', href: personal.linkedin },
  { icon: GithubIcon, label: 'GitHub', value: 'gsilvacoelho-dev', href: personal.github },
];

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contato de ${form.name || 'Portfólio'}`);
    const body = encodeURIComponent(
      `Nome: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    );
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
  };

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <section id="contact" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Contato"
          title="Vamos construir algo juntos"
          subtitle="Disponível para oportunidades, freelas e colaborações. Me mande uma mensagem — respondo rápido."
        />

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
          {/* ---- Left: channels + CV ---- */}
          <Reveal direction="right">
            <div className="flex h-full flex-col gap-4">
              {channels.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 transition-colors duration-300 hover:border-accent-cyan/40 hover:bg-white/[0.04]"
                >
                  <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 text-accent-cyan transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-wider text-text-muted">{label}</p>
                    <p className="truncate text-sm font-medium text-white">{value}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 flex-none text-text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-cyan" />
                </a>
              ))}

              {/* CV download */}
              <Magnetic className="mt-auto">
                <a
                  href={CV_PATH}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2 rounded-2xl border border-dashed border-white/20 bg-white/[0.02] p-4 text-sm font-semibold text-white transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan"
                >
                  <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                  Baixar currículo completo
                </a>
              </Magnetic>
            </div>
          </Reveal>

          {/* ---- Right: form ---- */}
          <Reveal direction="left" delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="border-glow rounded-3xl p-7 sm:p-9"
            >
              <div className="grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Nome">
                    <input
                      required
                      value={form.name}
                      onChange={set('name')}
                      placeholder="Seu nome"
                      className="input"
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={set('email')}
                      placeholder="voce@email.com"
                      className="input"
                    />
                  </Field>
                </div>
                <Field label="Mensagem">
                  <textarea
                    required
                    value={form.message}
                    onChange={set('message')}
                    placeholder="Conte sobre o projeto ou a oportunidade..."
                    rows={5}
                    className="input resize-none"
                  />
                </Field>

                <motion.button
                  type="submit"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative mt-1 inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-accent-cyan via-accent-indigo to-accent-purple px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_rgba(99,102,241,0.7)]"
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <Send className="h-4 w-4" />
                  Enviar mensagem
                </motion.button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-text-muted">
        {label}
      </span>
      {children}
    </label>
  );
}
