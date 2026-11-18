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

/** Os mesmos nove chunks acima, pedidos de uma vez atrás da cortina. */
const preloadSections = () =>
  Promise.all([
    import('./components/sections/About'),
    import('./components/sections/AiPractice'),
    import('./components/sections/Technologies'),
    import('./components/sections/Projects'),
    import('./components/sections/Experience'),
    import('./components/sections/Education'),
    import('./components/sections/Skills'),
    import('./components/sections/Differentials'),
    import('./components/sections/Contact'),
  ]);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const reveal = useCallback(() => setLoading(false), []);

  /**
   * As seções abaixo da dobra são baixadas E montadas enquanto a cortina
   * ainda cobre a tela.
   *
   * Antes, os nove chunks chegavam depois da abertura e o React montava as
   * nove seções num único commit — umas cinquenta componentes de animação,
   * mais de trinta springs e uma dúzia de IntersectionObservers de uma vez.
   * No iPhone essa tarefa longa caía exatamente em cima da digitação da Hero:
   * a palavra parava no meio e só terminava segundos depois. Agora o commit
   * caro acontece atrás da cortina, que é para isso que ela existe.
   *
   * Os dois `requestAnimationFrame` encadeados marcam "pronto" DEPOIS do
   * quadro em que o React comita as seções, não no mesmo.
   */
  useEffect(() => {
    let alive = true;
    const done = () => {
      if (!alive) return;
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          if (alive) setReady(true);
        }),
      );
    };
    // Falha de rede não pode prender a abertura — segue de qualquer jeito.
    preloadSections().then(done, done);
    return () => {
      alive = false;
    };
  }, []);

  /**
   * Trava o scroll só enquanto a cortina é opaca. O Loader chama `onReveal`
   * no início do fade, não no fim — antes, a página ficava presa por mais de
   * meio segundo com o site já visível, o que no celular parece travamento.
   *
   * O timeout é a rede de segurança de fora: a trava nunca pode sobreviver ao
   * loader, nem se nada completar (iOS em baixo consumo, aba em segundo
   * plano, falha ao carregar a foto ou os chunks).
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
      <Loader ready={ready} onReveal={reveal} />

      <AnimatedBackground />
      <CustomCursor />
      <ScrollProgress />
      <ScrollToTop />

      <Navbar />

      <main className="relative">
        <Hero start={!loading} />

        {/*
          Um Suspense por seção, não um só para as nove. Com uma fronteira
          única o React espera o último chunk e comita tudo junto; separadas,
          cada seção entra sozinha e o trabalho se divide em nove tarefas
          curtas em vez de uma longa.
        */}
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <AiPractice />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Technologies />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Education />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Differentials />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}
