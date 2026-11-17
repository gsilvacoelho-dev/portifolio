/**
 * Gera o card social (Open Graph) em public/og-image.png — 1200x630.
 * É a imagem que aparece quando o link do portfólio é compartilhado no
 * LinkedIn, WhatsApp, Slack ou Twitter.
 *
 * Uso: node scripts/gen-og-image.cjs
 */
const { chromium } = require('playwright');
const { pathToFileURL } = require('url');
const fs = require('fs');
const path = require('path');

const AVATAR = path.resolve('public/images/avatar-gabriel.webp');
const OUT = 'public/og-image.png';

const avatarDataUri =
  'data:image/webp;base64,' + fs.readFileSync(AVATAR).toString('base64');

const html = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Space+Grotesk:wght@700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; display: flex; align-items: center;
    gap: 64px; padding: 0 84px; overflow: hidden; position: relative;
    background: #060815;
    font-family: Inter, system-ui, sans-serif; color: #e2e8f0;
  }
  .aurora {
    position: absolute; border-radius: 50%; filter: blur(110px);
  }
  .a1 { width: 620px; height: 620px; background: rgba(34,211,238,.20); top: -220px; left: -160px; }
  .a2 { width: 560px; height: 560px; background: rgba(168,85,247,.22); bottom: -240px; right: -120px; }
  .grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px);
    background-size: 52px 52px;
  }
  .text { position: relative; flex: 1; }
  .pill {
    display: inline-flex; align-items: center; gap: 10px;
    border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.04);
    border-radius: 999px; padding: 9px 20px; font-size: 21px; color: #94a3b8;
    margin-bottom: 30px;
  }
  .dot { width: 9px; height: 9px; border-radius: 50%; background: #34d399; }
  h1 {
    font-family: 'Space Grotesk', sans-serif; font-size: 70px; font-weight: 700;
    line-height: 1.02; letter-spacing: -2px; color: #fff;
  }
  .role {
    font-family: 'Space Grotesk', sans-serif; font-size: 70px; font-weight: 700;
    line-height: 1.02; letter-spacing: -2px;
    background: linear-gradient(90deg, #22d3ee, #6366f1 55%, #a855f7);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  p { font-size: 25px; line-height: 1.45; color: #94a3b8; margin-top: 26px; max-width: 620px; }
  p b { color: #fff; font-weight: 600; }
  .avatar { position: relative; width: 352px; height: 352px; flex: none; }
  .avatar img { width: 100%; height: 100%; object-fit: contain; }
</style>
</head>
<body>
  <div class="aurora a1"></div>
  <div class="aurora a2"></div>
  <div class="grid"></div>

  <div class="text">
    <div class="pill"><span class="dot"></span>Disponível para novas oportunidades</div>
    <h1>Gabriel Coelho</h1>
    <div class="role">AI Builder</div>
    <p>Construo <b>produtos</b>, <b>automações</b> e <b>ferramentas internas</b> com IA generativa.</p>
  </div>

  <div class="avatar"><img src="${avatarDataUri}" alt=""></div>
</body>
</html>`;

(async () => {
  const tmp = path.resolve('public/.og-tmp.html');
  fs.writeFileSync(tmp, html, 'utf8');

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.goto(pathToFileURL(tmp).href, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600); // fontes do Google
  await page.screenshot({ path: OUT });
  await browser.close();

  fs.unlinkSync(tmp);
  console.log('card social gerado em ' + OUT);
})();
