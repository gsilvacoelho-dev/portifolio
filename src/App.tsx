import { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { AnimatedBackground } from './components/effects/AnimatedBackground';
import { CustomCursor } from './components/effects/CustomCursor';
import { ScrollProgress } from './components/effects/ScrollProgress';
import { ScrollToTop } from './components/effects/ScrollToTop';
import { Loader } from './components/effects/Loader';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';

// Below-the-fold sections are code-split / lazy-loaded.
const About = lazy(() => import('./components/sections/About').then((m) => ({ default: m.About })));
const AiPractice = lazy(() =>
  import('./components/sections/AiPractice').then((m) => ({ default: m.AiPractice })),
);
const Technologies = lazy(() =>
  import('./components/sections/Technologies').then((m) => ({ default: m.Technologies })),
);
const Projects = lazy(() =>
  import('./components/sections/Projects').then((m) => ({ default: m.Projects })),
);
const Experience = lazy(() =>
  import('./components/sections/Experience').then((m) => ({ default: m.Experience })),
);
const Education = lazy(() =>
  import('./components/sections/Education').then((m) => ({ default: m.Education })),
);
const Skills = lazy(() => import('./components/sections/Skills').then((m) => ({ default: m.Skills })));
const Differentials = lazy(() =>
  import('./components/sections/Differentials').then((m) => ({ default: m.Differentials })),
);
const Contact = lazy(() =>
  import('./components/sections/Contact').then((m) => ({ default: m.Contact })),
);

const SectionFallback = () => <div className="min-h-[40vh]" />;

export default function App() {
  const [loading, setLoading] = useState(true);
  const reveal = useCallback(() => setLoading(false), []);

  /**
   * Trava o scroll só enquanto a cortina é opaca. O Loader chama `onReveal`
   * no início do fade, não no fim — antes, a página ficava presa por mais de
   * meio segundo com o site já visível, o que no celular parece travamento.
   *
   * O timeout é rede de segurança: a trava nunca pode sobreviver ao loader,
   * nem se a animação não completar (iOS em baixo consumo, aba em segundo
   * plano, falha ao carregar a foto).
   */
  useEffect(() => {
    if (!loading) return;
    document.body.style.overflow = 'hidden';
    const failsafe = setTimeout(reveal, 2600);
    return () => {
      clearTimeout(failsafe);
      document.body.style.overflow = '';
    };
  }, [loading, reveal]);

  return (
    <>
      <Loader onReveal={reveal} />

      <AnimatedBackground />
      <CustomCursor />
      <ScrollProgress />
      <ScrollToTop />

      <Navbar />

      <main className="relative">
        <Hero start={!loading} />

        <Suspense fallback={<SectionFallback />}>
          <About />
          <AiPractice />
          <Technologies />
          <Projects />
          <Experience />
          <Education />
          <Skills />
          <Differentials />
          <Contact />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}
