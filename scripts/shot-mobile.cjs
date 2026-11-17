/**
 * Screenshots da build em viewport de celular, para conferir responsividade.
 * Uso: node scripts/shot-mobile.cjs    (saída em ./shots, fora do git)
 */
const { chromium, devices } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.pdf': 'application/pdf', '.xml': 'application/xml', '.txt': 'text/plain' };

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const file = path.join('dist', p);
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) return res.writeHead(404).end();
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});

(async () => {
  fs.mkdirSync('shots', { recursive: true });
  await new Promise((r) => server.listen(4180, r));
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ ...devices['iPhone 13'] });
  const page = await ctx.newPage();

  await page.goto('http://localhost:4180/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3200);
  await page.screenshot({ path: 'shots/m-hero.png' });

  // scroll lento para montar as seções lazy e disparar os reveals
  for (let y = 0; y < 22000; y += 300) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await page.waitForTimeout(70);
  }
  await page.waitForTimeout(1200);

  // overflow horizontal é o defeito mobile mais comum
  const overflow = await page.evaluate(() => {
    const docW = document.documentElement.clientWidth;
    const bad = [];
    document.querySelectorAll('*').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && (r.right > docW + 1 || r.left < -1)) {
        bad.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className || '').toString().slice(0, 70),
          left: Math.round(r.left),
          right: Math.round(r.right),
        });
      }
    });
    return {
      scrollW: document.documentElement.scrollWidth,
      clientW: docW,
      offenders: bad.slice(0, 12),
    };
  });
  console.log('largura do documento:', overflow.clientW, '| scrollWidth:', overflow.scrollW);
  console.log(overflow.scrollW > overflow.clientW ? 'TEM OVERFLOW HORIZONTAL:' : 'sem overflow horizontal');
  overflow.offenders.forEach((o) => console.log('   ', o.tag, o.cls, `[${o.left}..${o.right}]`));

  for (const id of ['about', 'ai', 'technologies', 'projects', 'contact']) {
    await page.evaluate((s) => document.getElementById(s)?.scrollIntoView({ block: 'start' }), id);
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `shots/m-${id}.png` });
  }

  await browser.close();
  server.close();
  console.log('screenshots mobile em ./shots');
})();
