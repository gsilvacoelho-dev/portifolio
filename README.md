# Portfólio — Gabriel da Silva Coelho Ferro

Portfólio pessoal desenvolvido com **React 19 + TypeScript + Tailwind CSS v4 + Framer Motion**.

**Posicionamento: AI Builder** — produtos, automações e ferramentas internas construídos
com IA generativa. A seção `IA na prática` é a peça central: cada capacidade aparece com a
evidência do projeto real onde foi aplicada.

> Candidatando-se a uma vaga de IA? Veja **[CANDIDATURA-IFOOD.md](./CANDIDATURA-IFOOD.md)** —
> mapeamento requisito a requisito, carta de apresentação e o que ainda falta fechar.

## 🚀 Rodando o projeto

```bash
npm install      # instala as dependências
npm run dev      # inicia o servidor de desenvolvimento (http://localhost:5173)
npm run build    # gera a build de produção em /dist
npm run preview  # visualiza a build de produção localmente
```

## ✏️ Como personalizar

Todo o conteúdo vem de **um único arquivo**, fácil de editar:

- **`src/data/resume.ts`** — nome, cargo, sobre, experiências, formação, projetos, tecnologias, habilidades, diferenciais, idiomas e contato.

### Foto de perfil
Coloque sua foto em **`public/profile.jpg`**. Enquanto o arquivo não existir, a Hero mostra
um monograma "G" elegante como fallback (nada quebra). Formato recomendado: quadrado, ~800×800px.

### Currículo para download
O currículo vive em **`public/curriculo-gabriel-coelho-ferro.html`** (fonte editável,
print-ready em A4). Para regerar o PDF depois de editar:

```bash
npm run cv          # gera public/curriculo-gabriel-coelho-ferro.pdf
```

O botão "Currículo" aponta para o PDF — é o formato que recrutador espera. O caminho fica
em `CV_PATH`, em `src/lib/constants.ts`.

## 🎨 Design system

Tokens de cor, fontes e animações ficam em **`src/index.css`** (bloco `@theme` do Tailwind v4).
Paleta: fundo escuro `#060815`, com destaques em cyan, índigo e roxo.

## 🧩 Estrutura

```
src/
├── components/
│   ├── effects/      AnimatedBackground, CustomCursor, Loader, ScrollProgress, ScrollToTop
│   ├── layout/       Navbar, Footer
│   ├── sections/     Hero, About, AiPractice, Technologies, Projects,
│   │                 Experience, Education, Skills, Differentials, Contact
│   └── ui/           Button, Magnetic, Reveal, SectionHeading, TiltCard,
│                     Counter, TechIcon, SocialIcons
├── data/resume.ts    ← conteúdo do portfólio (edite aqui)
├── hooks/            useMousePosition, useActiveSection
├── lib/              constants, motion (variants), techBrands, utils
├── App.tsx           monta as seções + lazy loading
└── index.css         tema Tailwind v4 + animações
```

## ✨ Destaques técnicos

- **Animações**: scroll reveal, parallax, cursor personalizado, cards 3D com tilt,
  botões magnéticos, contadores animados, timeline que se desenha no scroll,
  background com aurora reativa ao mouse.
- **Ícones de marca**: logos reais via `simple-icons` (tree-shaking — só o necessário
  entra no bundle). GitHub/LinkedIn são SVGs próprios em `SocialIcons.tsx`.
- **Performance**: seções abaixo da dobra com `React.lazy` + `Suspense` (code splitting),
  imagens com `loading="lazy"`, respeito a `prefers-reduced-motion`.
- **SEO**: meta tags, Open Graph, Twitter Card e dados estruturados JSON-LD
  (`schema.org/Person`) em `index.html`, com vocabulário de IA generativa.
- **Acessibilidade**: `aria-label`s, navegação por teclado, contraste adequado.

## 🌐 Deploy — Hostinger

O site é 100% estático: o que vai para o servidor é o conteúdo de `dist/`.

### 1. Trocar o domínio nos 3 arquivos

Depois de registrar o domínio, substitua `SEU-DOMINIO.com.br` em:

| Arquivo | O que é |
|---|---|
| `index.html` | canonical, `og:url` e `og:image` (5 ocorrências) |
| `public/robots.txt` | endereço do sitemap |
| `public/sitemap.xml` | URL da página |

### 2. Gerar a build

```bash
npm install
npm run build
```

### 3. Subir para a Hostinger

No **hPanel → Gerenciador de Arquivos**, abra `public_html` e envie **o conteúdo
de dentro de `dist/`** — não a pasta `dist` em si. A estrutura final deve ficar:

```
public_html/
├── index.html
├── .htaccess
├── assets/
├── images/
├── og-image.png
├── robots.txt
├── sitemap.xml
├── curriculo-gabriel-coelho-ferro.pdf
└── favicon.svg
```

> O `.htaccess` é um arquivo oculto. Se o Gerenciador de Arquivos não mostrar,
> ative **Configurações → Mostrar arquivos ocultos** antes de enviar.

### 4. Ativar o SSL

Em **hPanel → Segurança → SSL**, instale o certificado gratuito. Depois que ele
estiver ativo, descomente o bloco de redirecionamento HTTPS no topo do
`.htaccess` e reenvie o arquivo.

### O que o `.htaccess` faz

- Compressão gzip de HTML, CSS, JS e SVG
- Cache de 1 ano para assets com hash no nome; `index.html` nunca é cacheado
  (senão o deploy novo não aparece para quem já visitou)
- Cabeçalhos de segurança: `X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`
- Qualquer rota desconhecida cai no `index.html`

### Card social

`public/og-image.png` (1200×630) é a imagem que aparece ao compartilhar o link
no LinkedIn, WhatsApp ou Slack. Para regerar depois de mudar o texto da Hero:

```bash
node scripts/gen-og-image.cjs
```

---

Feito com React, TypeScript e Framer Motion.
