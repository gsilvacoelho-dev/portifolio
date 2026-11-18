import { useEffect, useState } from 'react';

const QUERY = '(hover: hover) and (pointer: fine)';

/**
 * `true` apenas em aparelho com mouse.
 *
 * Serve para desligar no celular os dois efeitos que o Safari do iOS
 * rasteriza quadro a quadro: o blur gigante animado do fundo e o gradiente
 * animado sob `background-clip: text`. Eram eles que faziam a digitação da
 * Hero parar no meio da palavra no iPhone.
 *
 * Começa em `false` de propósito: a primeira renderização é sempre a leve e
 * só o desktop liga os extras, um quadro depois de montar.
 */
export function useFinePointer(): boolean {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    setFine(mq.matches);

    const onChange = (e: MediaQueryListEvent) => setFine(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return fine;
}
