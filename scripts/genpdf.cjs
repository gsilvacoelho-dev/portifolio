/**
 * Gera o PDF do currículo a partir do HTML em /public.
 * Uso: node genpdf.cjs
 */
const { chromium } = require('playwright');
const { pathToFileURL } = require('url');
const path = require('path');

const SRC = 'public/curriculo-gabriel-coelho-ferro.html';
const OUT = 'public/curriculo-gabriel-coelho-ferro.pdf';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(pathToFileURL(path.resolve(SRC)).href, { waitUntil: 'load' });
  await page.pdf({
    path: OUT,
    format: 'A4',
    printBackground: true,
    margin: { top: '12mm', bottom: '12mm', left: '14mm', right: '14mm' },
  });
  await browser.close();
  console.log('PDF gerado em ' + OUT);
})();
