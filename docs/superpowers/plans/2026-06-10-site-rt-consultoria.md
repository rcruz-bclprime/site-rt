# Site RT Consultoria — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static institutional website for RT Consultoria using Astro, with 3 pages (Home, Sobre, Serviços), full SEO, and WhatsApp/email contact via footer.

**Architecture:** Astro static site with component-based layout. A shared `Base.astro` layout wraps all pages with SEOHead, Header, Footer, and WhatsApp button. CSS custom properties define the brand palette. No JS at runtime except the WhatsApp link.

**Tech Stack:** Astro 5.x, CSS custom properties, `@astrojs/sitemap`

**Spec:** `docs/superpowers/specs/2026-06-10-site-rt-consultoria-design.md`

---

## File Map

| File | Responsibility |
|------|---------------|
| `astro.config.mjs` | Astro config with sitemap integration and site URL |
| `src/styles/global.css` | CSS reset, custom properties (colors, fonts), base typography, utilities |
| `src/components/SEOHead.astro` | `<head>` meta tags, OG, Twitter Cards, JSON-LD (receives props per page) |
| `src/components/Header.astro` | Logo + nav (Home, Sobre, Serviços) + WhatsApp CTA button, mobile hamburger |
| `src/components/Footer.astro` | Contact info (WhatsApp, email), nav links, copyright |
| `src/components/WhatsAppButton.astro` | Floating WhatsApp button, fixed bottom-right |
| `src/components/Hero.astro` | Hero section with headline, sub-headline, CTA button |
| `src/components/ServiceCard.astro` | Reusable card: icon + title + description |
| `src/layouts/Base.astro` | Shell: SEOHead + Header + `<main><slot/></main>` + Footer + WhatsApp |
| `src/pages/index.astro` | Home: Hero + "O que protegemos" + "Por que a RT" + CTA final |
| `src/pages/sobre.astro` | Sobre: Quem somos, Propósito, Missão, Visão, Valores, Fundadores |
| `src/pages/servicos.astro` | Serviços: 5 service cards with full descriptions |
| `public/favicon.svg` | RT logo as SVG favicon |
| `public/robots.txt` | Allow all crawlers |
| `public/og-image.png` | Social share image 1200x630 with RT brand |

---

### Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `public/robots.txt`
- Create: `public/favicon.svg`

- [ ] **Step 1: Initialize Astro project**

Run from the `Site RT` directory:

```bash
npm create astro@latest . -- --template minimal --no-install --no-git
```

If prompted to overwrite, accept. This creates the minimal Astro scaffold.

- [ ] **Step 2: Install dependencies**

```bash
npm install
npm install @astrojs/sitemap
```

- [ ] **Step 3: Configure Astro with sitemap**

Replace `astro.config.mjs` with:

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://example.com', // TODO: replace with {{SITE_URL}} before deploy
  integrations: [sitemap()],
});
```

- [ ] **Step 4: Create robots.txt**

Create `public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://example.com/sitemap-index.xml
```

- [ ] **Step 5: Create favicon.svg**

Create `public/favicon.svg`:

```svg
<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" rx="4" fill="#1C463C"/>
  <circle cx="16" cy="14" r="8" fill="none" stroke="#C5A24E" stroke-width="1"/>
  <text x="16" y="18" font-family="Georgia, serif" font-size="10" font-weight="600" fill="#F2EFE6" text-anchor="middle">RT</text>
</svg>
```

- [ ] **Step 6: Verify dev server starts**

```bash
npm run dev
```

Expected: Astro dev server starts on `http://localhost:4321` with default welcome page.

- [ ] **Step 7: Initialize git and commit**

```bash
git init
git add -A
git commit -m "chore: scaffold Astro project with sitemap and favicon"
```

---

### Task 2: Global Styles

**Files:**
- Create: `src/styles/global.css`

- [ ] **Step 1: Create global.css with CSS custom properties and base styles**

Create `src/styles/global.css`:

```css
/* ===== Custom Properties ===== */
:root {
  --color-green: #1C463C;
  --color-gold: #C5A24E;
  --color-cream: #F2EFE6;
  --color-white: #FFFFFF;
  --color-gray: #6B7280;
  --color-green-light: #234f44;

  --font-heading: Georgia, 'Times New Roman', serif;
  --font-body: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  --max-width: 1120px;
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 2rem;
  --spacing-lg: 4rem;
  --spacing-xl: 6rem;
}

/* ===== Reset ===== */
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* ===== Base ===== */
html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-green);
  background-color: var(--color-white);
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4 {
  font-family: var(--font-heading);
  line-height: 1.2;
  color: var(--color-green);
}

h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.25rem; }

a {
  color: var(--color-gold);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* ===== Utilities ===== */
.container {
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--spacing-sm);
}

.section {
  padding: var(--spacing-xl) 0;
}

.section--dark {
  background-color: var(--color-green);
  color: var(--color-cream);
}

.section--dark h2,
.section--dark h3 {
  color: var(--color-cream);
}

.section--cream {
  background-color: var(--color-cream);
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: 0.875rem 2rem;
  border-radius: 6px;
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  border: none;
  transition: opacity 0.2s ease;
}

.btn:hover {
  opacity: 0.9;
  text-decoration: none;
}

.btn--gold {
  background-color: var(--color-gold);
  color: var(--color-white);
}

.btn--outline {
  background-color: transparent;
  color: var(--color-gold);
  border: 2px solid var(--color-gold);
}

/* ===== Fade-in animation ===== */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  h1 { font-size: 1.875rem; }
  h2 { font-size: 1.5rem; }

  .section {
    padding: var(--spacing-lg) 0;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add global CSS with brand palette and base styles"
```

---

### Task 3: SEOHead Component

**Files:**
- Create: `src/components/SEOHead.astro`

- [ ] **Step 1: Create SEOHead.astro**

Create `src/components/SEOHead.astro`:

```astro
---
interface Props {
  title: string;
  description: string;
  canonicalURL?: string;
  ogType?: string;
  jsonLD?: Record<string, unknown>;
}

const {
  title,
  description,
  canonicalURL = Astro.url.href,
  ogType = 'website',
  jsonLD,
} = Astro.props;

const siteName = 'RT Consultoria';
const ogImageURL = new URL('/og-image.png', Astro.site).href;
---

<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="generator" content={Astro.generator} />

<title>{title}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonicalURL} />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />

<!-- Open Graph -->
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={ogImageURL} />
<meta property="og:url" content={canonicalURL} />
<meta property="og:type" content={ogType} />
<meta property="og:site_name" content={siteName} />
<meta property="og:locale" content="pt_BR" />

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImageURL} />

<!-- Google Fonts: Inter -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

<!-- JSON-LD -->
{jsonLD && (
  <script type="application/ld+json" set:html={JSON.stringify(jsonLD)} />
)}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SEOHead.astro
git commit -m "feat: add SEOHead component with meta, OG, Twitter Cards, JSON-LD"
```

---

### Task 4: Header Component

**Files:**
- Create: `src/components/Header.astro`

- [ ] **Step 1: Create Header.astro**

Create `src/components/Header.astro`:

```astro
---
const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Serviços', href: '/servicos' },
];

const currentPath = Astro.url.pathname;
const whatsappURL = 'https://wa.me/5500000000000'; // TODO: replace {{WHATSAPP_NUMERO}}
---

<header class="header">
  <div class="container header__inner">
    <a href="/" class="header__logo" aria-label="RT Consultoria - Página inicial">
      <svg viewBox="0 0 100 40" class="header__logo-svg" aria-hidden="true">
        <circle cx="20" cy="20" r="14" fill="none" stroke="#C5A24E" stroke-width="1.2"/>
        <text x="20" y="25" font-family="Georgia, serif" font-size="14" font-weight="600" fill="#F2EFE6" text-anchor="middle">RT</text>
        <text x="62" y="24" font-family="Arial, sans-serif" font-size="6" letter-spacing="1.8" fill="#C5A24E" text-anchor="middle">CONSULTORIA</text>
      </svg>
    </a>

    <button class="header__toggle" aria-label="Abrir menu" aria-expanded="false">
      <span class="header__toggle-bar"></span>
      <span class="header__toggle-bar"></span>
      <span class="header__toggle-bar"></span>
    </button>

    <nav class="header__nav" aria-label="Navegação principal">
      <ul class="header__list">
        {navItems.map(item => (
          <li>
            <a
              href={item.href}
              class:list={['header__link', { 'header__link--active': currentPath === item.href }]}
            >
              {item.label}
            </a>
          </li>
        ))}
        <li>
          <a href={whatsappURL} target="_blank" rel="noopener noreferrer" class="btn btn--gold header__cta">
            Fale conosco
          </a>
        </li>
      </ul>
    </nav>
  </div>
</header>

<style>
  .header {
    background-color: var(--color-green);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .header__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }

  .header__logo-svg {
    width: 140px;
    height: 56px;
  }

  .header__toggle {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
  }

  .header__toggle-bar {
    display: block;
    width: 24px;
    height: 2px;
    background-color: var(--color-cream);
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .header__list {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    list-style: none;
  }

  .header__link {
    color: var(--color-cream);
    font-size: 0.9375rem;
    font-weight: 500;
    transition: color 0.2s ease;
  }

  .header__link:hover,
  .header__link--active {
    color: var(--color-gold);
    text-decoration: none;
  }

  .header__cta {
    padding: 0.625rem 1.5rem;
    font-size: 0.875rem;
  }

  @media (max-width: 768px) {
    .header__toggle {
      display: flex;
    }

    .header__nav {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background-color: var(--color-green);
      padding: var(--spacing-sm);
      border-top: 1px solid var(--color-green-light);
    }

    .header__nav.open {
      display: block;
    }

    .header__list {
      flex-direction: column;
      gap: var(--spacing-sm);
    }

    .header__cta {
      width: 100%;
      justify-content: center;
    }
  }
</style>

<script>
  const toggle = document.querySelector('.header__toggle');
  const nav = document.querySelector('.header__nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
  }
</script>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Header.astro
git commit -m "feat: add Header component with nav, mobile hamburger, WhatsApp CTA"
```

---

### Task 5: Footer Component

**Files:**
- Create: `src/components/Footer.astro`

- [ ] **Step 1: Create Footer.astro**

Create `src/components/Footer.astro`:

```astro
---
const whatsappURL = 'https://wa.me/5500000000000'; // TODO: replace {{WHATSAPP_NUMERO}}
const email = 'contato@example.com'; // TODO: replace {{EMAIL_CONTATO}}
const currentYear = new Date().getFullYear();
---

<footer class="footer">
  <div class="container footer__inner">
    <div class="footer__brand">
      <svg viewBox="0 0 100 40" class="footer__logo" aria-hidden="true">
        <circle cx="20" cy="20" r="14" fill="none" stroke="#C5A24E" stroke-width="1.2"/>
        <text x="20" y="25" font-family="Georgia, serif" font-size="14" font-weight="600" fill="#F2EFE6" text-anchor="middle">RT</text>
        <text x="62" y="24" font-family="Arial, sans-serif" font-size="6" letter-spacing="1.8" fill="#C5A24E" text-anchor="middle">CONSULTORIA</text>
      </svg>
      <p class="footer__tagline">Gestão financeira e compliance para o Terceiro Setor.</p>
    </div>

    <nav class="footer__nav" aria-label="Navegação do rodapé">
      <h3 class="footer__heading">Navegação</h3>
      <ul class="footer__list">
        <li><a href="/">Home</a></li>
        <li><a href="/sobre">Sobre</a></li>
        <li><a href="/servicos">Serviços</a></li>
      </ul>
    </nav>

    <div class="footer__contact">
      <h3 class="footer__heading">Contato</h3>
      <ul class="footer__list">
        <li>
          <a href={whatsappURL} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </li>
        <li>
          <a href={`mailto:${email}`}>
            {email}
          </a>
        </li>
      </ul>
    </div>
  </div>

  <div class="footer__bottom">
    <div class="container">
      <p>&copy; {currentYear} RT Consultoria. Todos os direitos reservados.</p>
    </div>
  </div>
</footer>

<style>
  .footer {
    background-color: var(--color-green);
    color: var(--color-cream);
    padding-top: var(--spacing-lg);
  }

  .footer__inner {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: var(--spacing-md);
    padding-bottom: var(--spacing-lg);
  }

  .footer__logo {
    width: 120px;
    height: 48px;
    margin-bottom: var(--spacing-sm);
  }

  .footer__tagline {
    color: var(--color-gray);
    font-size: 0.875rem;
    max-width: 280px;
  }

  .footer__heading {
    font-family: var(--font-body);
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-gold);
    margin-bottom: var(--spacing-sm);
  }

  .footer__list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .footer__list a {
    color: var(--color-cream);
    font-size: 0.9375rem;
    opacity: 0.85;
    transition: opacity 0.2s ease;
  }

  .footer__list a:hover {
    opacity: 1;
    text-decoration: none;
  }

  .footer__bottom {
    border-top: 1px solid rgba(242, 239, 230, 0.1);
    padding: var(--spacing-sm) 0;
  }

  .footer__bottom p {
    font-size: 0.8125rem;
    opacity: 0.6;
    text-align: center;
  }

  @media (max-width: 768px) {
    .footer__inner {
      grid-template-columns: 1fr;
      text-align: center;
    }

    .footer__tagline {
      margin: 0 auto;
    }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat: add Footer component with contact info, nav, copyright"
```

---

### Task 6: WhatsApp Floating Button

**Files:**
- Create: `src/components/WhatsAppButton.astro`

- [ ] **Step 1: Create WhatsAppButton.astro**

Create `src/components/WhatsAppButton.astro`:

```astro
---
const whatsappURL = 'https://wa.me/5500000000000'; // TODO: replace {{WHATSAPP_NUMERO}}
---

<a
  href={whatsappURL}
  target="_blank"
  rel="noopener noreferrer"
  class="whatsapp-btn"
  aria-label="Fale conosco pelo WhatsApp"
>
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="whatsapp-btn__icon" aria-hidden="true">
    <path d="M16.003 3.2A12.763 12.763 0 003.2 15.927a12.66 12.66 0 001.716 6.38L3.2 28.8l6.7-1.756a12.76 12.76 0 006.087 1.55h.016A12.764 12.764 0 0016.003 3.2zm0 23.37a10.59 10.59 0 01-5.4-1.48l-.388-.23-4.02 1.054 1.072-3.916-.252-.4a10.57 10.57 0 01-1.622-5.638A10.607 10.607 0 0116.003 5.36 10.607 10.607 0 0126.6 15.944 10.607 10.607 0 0116.003 26.57zm5.81-7.934c-.318-.16-1.882-.928-2.174-1.034-.292-.106-.505-.16-.718.16-.212.318-.824 1.034-1.01 1.246-.186.212-.372.238-.69.08-.318-.16-1.343-.495-2.559-1.578-.946-.844-1.584-1.886-1.77-2.204-.186-.318-.02-.49.14-.648.144-.142.318-.372.478-.558.16-.186.212-.318.318-.53.106-.212.054-.398-.026-.558-.08-.16-.718-1.73-.984-2.368-.26-.622-.524-.538-.718-.548-.186-.008-.398-.01-.61-.01a1.174 1.174 0 00-.85.398c-.292.318-1.114 1.088-1.114 2.652s1.14 3.076 1.3 3.29c.16.212 2.246 3.428 5.444 4.808.76.328 1.354.524 1.816.67.764.242 1.458.208 2.008.126.612-.092 1.882-.77 2.148-1.512.266-.744.266-1.38.186-1.512-.08-.134-.292-.212-.61-.372z" fill="currentColor"/>
  </svg>
</a>

<style>
  .whatsapp-btn {
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    width: 56px;
    height: 56px;
    background-color: #25D366;
    color: var(--color-white);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    z-index: 99;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .whatsapp-btn:hover {
    transform: scale(1.08);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
    text-decoration: none;
  }

  .whatsapp-btn__icon {
    width: 28px;
    height: 28px;
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/WhatsAppButton.astro
git commit -m "feat: add floating WhatsApp button component"
```

---

### Task 7: Base Layout

**Files:**
- Create: `src/layouts/Base.astro`

- [ ] **Step 1: Create Base.astro**

Create `src/layouts/Base.astro`:

```astro
---
import SEOHead from '../components/SEOHead.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import WhatsAppButton from '../components/WhatsAppButton.astro';
import '../styles/global.css';

interface Props {
  title: string;
  description: string;
  ogType?: string;
  jsonLD?: Record<string, unknown>;
}

const { title, description, ogType, jsonLD } = Astro.props;
---

<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <SEOHead
    title={title}
    description={description}
    ogType={ogType}
    jsonLD={jsonLD}
  />
</head>
<body>
  <Header />
  <main>
    <slot />
  </main>
  <Footer />
  <WhatsAppButton />

  <script>
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
  </script>
</body>
</html>
```

- [ ] **Step 2: Delete default Astro files**

Remove any default files created by the scaffold that are no longer needed:

```bash
rm -f src/pages/index.astro src/layouts/Layout.astro
```

(We will recreate `index.astro` in Task 9.)

- [ ] **Step 3: Commit**

```bash
git add src/layouts/Base.astro
git add -u
git commit -m "feat: add Base layout with SEOHead, Header, Footer, WhatsApp, fade-in observer"
```

---

### Task 8: ServiceCard and Hero Components

**Files:**
- Create: `src/components/ServiceCard.astro`
- Create: `src/components/Hero.astro`

- [ ] **Step 1: Create ServiceCard.astro**

Create `src/components/ServiceCard.astro`:

```astro
---
interface Props {
  title: string;
  description: string;
  icon: string;
}

const { title, description, icon } = Astro.props;
---

<div class="card fade-in">
  <div class="card__icon" aria-hidden="true" set:html={icon} />
  <h3 class="card__title">{title}</h3>
  <p class="card__description">{description}</p>
</div>

<style>
  .card {
    background-color: var(--color-white);
    border-radius: 8px;
    padding: var(--spacing-md);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
    text-align: center;
  }

  .card__icon {
    width: 48px;
    height: 48px;
    margin: 0 auto var(--spacing-sm);
    color: var(--color-gold);
  }

  .card__icon :global(svg) {
    width: 100%;
    height: 100%;
  }

  .card__title {
    margin-bottom: var(--spacing-xs);
  }

  .card__description {
    color: var(--color-gray);
    font-size: 0.9375rem;
    line-height: 1.5;
  }
</style>
```

- [ ] **Step 2: Create Hero.astro**

Create `src/components/Hero.astro`:

```astro
---
const whatsappURL = 'https://wa.me/5500000000000'; // TODO: replace {{WHATSAPP_NUMERO}}
---

<section class="hero">
  <div class="container hero__inner">
    <h1 class="hero__title">Gestão financeira segura para quem transforma o Brasil</h1>
    <p class="hero__subtitle">Prestação de contas organizada e no prazo, sem você precisar entender de TCE.</p>
    <a href={whatsappURL} target="_blank" rel="noopener noreferrer" class="btn btn--gold hero__cta">
      Fale conosco
    </a>
  </div>
</section>

<style>
  .hero {
    background-color: var(--color-green);
    color: var(--color-cream);
    padding: var(--spacing-xl) 0;
    text-align: center;
  }

  .hero__inner {
    max-width: 720px;
  }

  .hero__title {
    color: var(--color-cream);
    margin-bottom: var(--spacing-sm);
  }

  .hero__subtitle {
    font-size: 1.125rem;
    opacity: 0.9;
    margin-bottom: var(--spacing-md);
    line-height: 1.6;
  }

  .hero__cta {
    font-size: 1.0625rem;
    padding: 1rem 2.5rem;
  }

  @media (max-width: 768px) {
    .hero {
      padding: var(--spacing-lg) 0;
    }
  }
</style>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ServiceCard.astro src/components/Hero.astro
git commit -m "feat: add ServiceCard and Hero components"
```

---

### Task 9: Home Page

**Files:**
- Create: `src/pages/index.astro`

- [ ] **Step 1: Create index.astro**

Create `src/pages/index.astro`:

```astro
---
import Base from '../layouts/Base.astro';
import Hero from '../components/Hero.astro';
import ServiceCard from '../components/ServiceCard.astro';

const whatsappURL = 'https://wa.me/5500000000000'; // TODO: replace {{WHATSAPP_NUMERO}}

const services = [
  {
    title: 'Conformidade com o TCE',
    description: 'Classificação correta e prestações no prazo.',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"/><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9z"/></svg>',
  },
  {
    title: 'Aplicação correta por rubrica',
    description: 'Sem glosas nem abatimento de repasses.',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M4 12h16M4 17h10"/><circle cx="19" cy="17" r="2"/></svg>',
  },
  {
    title: 'Segurança jurídica e financeira',
    description: 'Contra devoluções com juros e correção.',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l8 4v6c0 5.25-3.5 9.74-8 11-4.5-1.26-8-5.75-8-11V6l8-4z"/></svg>',
  },
  {
    title: 'Continuidade dos contratos',
    description: 'Elegibilidade preservada para novos editais.',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>',
  },
];

const differentials = [
  {
    title: '100% remoto',
    description: 'Com atendimento presencial quando necessário.',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
  },
  {
    title: 'Alcance nacional',
    description: 'Atendemos OSCs em todo o Brasil.',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>',
  },
  {
    title: 'Especialistas no Terceiro Setor',
    description: 'Um nicho que contabilidades tradicionais não dominam.',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
  },
];

const jsonLD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'RT Consultoria',
  description: 'Gestão financeira e compliance para Organizações da Sociedade Civil (OSCs) que recebem repasses de recursos públicos.',
  url: 'https://example.com', // TODO: replace {{SITE_URL}}
  logo: 'https://example.com/favicon.svg', // TODO: replace {{SITE_URL}}
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: 'Portuguese',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Brazil',
  },
};
---

<Base
  title="RT Consultoria — Gestão Financeira e Compliance para OSCs"
  description="Especialistas em gestão financeira e compliance para Organizações da Sociedade Civil. Prestação de contas organizada, no prazo e auditável."
  jsonLD={jsonLD}
>
  <Hero />

  <!-- O que protegemos -->
  <section class="section section--cream">
    <div class="container">
      <h2 class="section-title fade-in">O que protegemos</h2>
      <div class="cards-grid">
        {services.map(service => (
          <ServiceCard
            title={service.title}
            description={service.description}
            icon={service.icon}
          />
        ))}
      </div>
    </div>
  </section>

  <!-- Por que a RT -->
  <section class="section">
    <div class="container">
      <h2 class="section-title fade-in">Por que a RT</h2>
      <div class="diff-grid">
        {differentials.map(diff => (
          <div class="diff-item fade-in">
            <div class="diff-item__icon" aria-hidden="true" set:html={diff.icon} />
            <h3 class="diff-item__title">{diff.title}</h3>
            <p class="diff-item__desc">{diff.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  <!-- CTA final -->
  <section class="section section--dark cta-section">
    <div class="container cta-inner fade-in">
      <h2>Proteja sua organização</h2>
      <p>Do risco à regularidade — com método.</p>
      <a href={whatsappURL} target="_blank" rel="noopener noreferrer" class="btn btn--gold">
        Fale conosco pelo WhatsApp
      </a>
    </div>
  </section>
</Base>

<style>
  .section-title {
    text-align: center;
    margin-bottom: var(--spacing-lg);
  }

  .cards-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--spacing-md);
  }

  .diff-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-md);
    text-align: center;
  }

  .diff-item__icon {
    width: 40px;
    height: 40px;
    margin: 0 auto var(--spacing-sm);
    color: var(--color-gold);
  }

  .diff-item__icon :global(svg) {
    width: 100%;
    height: 100%;
  }

  .diff-item__title {
    margin-bottom: var(--spacing-xs);
  }

  .diff-item__desc {
    color: var(--color-gray);
    font-size: 0.9375rem;
  }

  .cta-section {
    text-align: center;
  }

  .cta-inner h2 {
    margin-bottom: var(--spacing-xs);
  }

  .cta-inner p {
    margin-bottom: var(--spacing-md);
    font-size: 1.125rem;
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    .cards-grid {
      grid-template-columns: 1fr;
    }

    .diff-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    .cards-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
```

- [ ] **Step 2: Verify dev server renders home page**

```bash
npm run dev
```

Open `http://localhost:4321` — verify Hero, 4 service cards, 3 differentials, CTA, header, footer, WhatsApp button all render.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: add Home page with hero, services, differentials, CTA"
```

---

### Task 10: Sobre Page

**Files:**
- Create: `src/pages/sobre.astro`

- [ ] **Step 1: Create sobre.astro**

Create `src/pages/sobre.astro`:

```astro
---
import Base from '../layouts/Base.astro';
---

<Base
  title="Sobre — RT Consultoria"
  description="Conheça a RT Consultoria: especialistas em gestão financeira e compliance para OSCs. Nossa missão, valores e os fundadores Rogério Duque e Thaiane Oliveira."
>
  <!-- Quem somos -->
  <section class="section">
    <div class="container content fade-in">
      <h1>Sobre a RT Consultoria</h1>
      <p>A RT Consultoria é especializada em gestão financeira e compliance para Organizações da Sociedade Civil (OSCs) que recebem repasses de recursos públicos. Atuamos 100% remotamente, com alcance nacional e atendimento presencial quando necessário.</p>
      <p>Não somos uma contabilidade tradicional — somos especialistas em prestação de contas a Tribunais de Contas e órgãos financiadores.</p>
    </div>
  </section>

  <!-- Propósito e Promessa -->
  <section class="section section--cream">
    <div class="container content fade-in">
      <h2>Nosso Propósito</h2>
      <p class="highlight">Garantir que boas organizações não percam contratos por má gestão financeira.</p>
      <h2>Nossa Promessa</h2>
      <p>Do risco à regularidade — com método. Acompanhamos cada organização do diagnóstico à rotina estável: prestação de contas organizada, no prazo e auditável.</p>
    </div>
  </section>

  <!-- Missão e Visão -->
  <section class="section">
    <div class="container missao-visao fade-in">
      <div class="mv-card">
        <h2>Missão</h2>
        <p>Garantir que boas organizações não percam contratos por má gestão financeira — traduzindo exigências complexas em rotina clara, segura e auditável.</p>
      </div>
      <div class="mv-card">
        <h2>Visão</h2>
        <p>Ser a referência nacional em compliance financeiro para o Terceiro Setor, reconhecida pela autoridade técnica e pelo cuidado com cada organização atendida.</p>
      </div>
    </div>
  </section>

  <!-- Valores -->
  <section class="section section--dark">
    <div class="container fade-in">
      <h2 class="valores-title">Nossos Valores</h2>
      <div class="valores-grid">
        <div class="valor">
          <h3>Rigor Técnico</h3>
          <p>Domínio profundo das exigências de Tribunais de Contas. Profundidade onde o mercado é raso.</p>
        </div>
        <div class="valor">
          <h3>Precisão</h3>
          <p>Cada rubrica conferida, cada prazo cumprido. O detalhe é o que protege o contrato.</p>
        </div>
        <div class="valor">
          <h3>Transparência</h3>
          <p>Linguagem clara, sem "financês". O cliente entende cada passo da jornada.</p>
        </div>
        <div class="valor">
          <h3>Compromisso</h3>
          <p>Tratamos o propósito da OSC como nosso. Por trás de cada conta há uma causa.</p>
        </div>
        <div class="valor">
          <h3>Segurança</h3>
          <p>Tranquilidade jurídica e financeira. Do risco à regularidade, sem sustos.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Fundadores -->
  <section class="section">
    <div class="container fade-in">
      <h2 class="fundadores-title">Nossos Fundadores</h2>
      <div class="fundadores-grid">
        <div class="fundador">
          <div class="fundador__avatar" aria-hidden="true">RD</div>
          <h3>Rogério Duque</h3>
          <p>Bio a ser fornecida.</p> <!-- TODO: replace with actual bio -->
        </div>
        <div class="fundador">
          <div class="fundador__avatar" aria-hidden="true">TO</div>
          <h3>Thaiane Oliveira</h3>
          <p>Bio a ser fornecida.</p> <!-- TODO: replace with actual bio -->
        </div>
      </div>
    </div>
  </section>
</Base>

<style>
  .content {
    max-width: 720px;
  }

  .content h1 {
    margin-bottom: var(--spacing-md);
  }

  .content h2 {
    margin-top: var(--spacing-md);
    margin-bottom: var(--spacing-sm);
  }

  .content p {
    margin-bottom: var(--spacing-sm);
    color: var(--color-gray);
  }

  .content p:last-child {
    margin-bottom: 0;
  }

  .highlight {
    font-family: var(--font-heading);
    font-size: 1.375rem;
    color: var(--color-green) !important;
    font-style: italic;
  }

  .missao-visao {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-md);
  }

  .mv-card {
    background-color: var(--color-cream);
    padding: var(--spacing-md);
    border-radius: 8px;
    border-left: 4px solid var(--color-gold);
  }

  .mv-card h2 {
    margin-bottom: var(--spacing-sm);
  }

  .mv-card p {
    color: var(--color-gray);
  }

  .valores-title {
    text-align: center;
    margin-bottom: var(--spacing-lg);
  }

  .valores-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: var(--spacing-md);
    text-align: center;
  }

  .valor h3 {
    color: var(--color-gold);
    margin-bottom: var(--spacing-xs);
  }

  .valor p {
    font-size: 0.875rem;
    opacity: 0.85;
  }

  .fundadores-title {
    text-align: center;
    margin-bottom: var(--spacing-lg);
  }

  .fundadores-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-md);
    max-width: 640px;
    margin: 0 auto;
    text-align: center;
  }

  .fundador__avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: var(--color-green);
    color: var(--color-cream);
    font-family: var(--font-heading);
    font-size: 1.5rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto var(--spacing-sm);
  }

  .fundador h3 {
    margin-bottom: var(--spacing-xs);
  }

  .fundador p {
    color: var(--color-gray);
    font-size: 0.9375rem;
  }

  @media (max-width: 768px) {
    .missao-visao {
      grid-template-columns: 1fr;
    }

    .valores-grid {
      grid-template-columns: 1fr 1fr;
    }

    .fundadores-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
```

- [ ] **Step 2: Verify at http://localhost:4321/sobre**

Check all sections render: Quem somos, Propósito/Promessa, Missão/Visão, Valores, Fundadores.

- [ ] **Step 3: Commit**

```bash
git add src/pages/sobre.astro
git commit -m "feat: add Sobre page with mission, values, founders"
```

---

### Task 11: Serviços Page

**Files:**
- Create: `src/pages/servicos.astro`

- [ ] **Step 1: Create servicos.astro**

Create `src/pages/servicos.astro`:

```astro
---
import Base from '../layouts/Base.astro';
import ServiceCard from '../components/ServiceCard.astro';

const whatsappURL = 'https://wa.me/5500000000000'; // TODO: replace {{WHATSAPP_NUMERO}}

const services = [
  {
    title: 'Conformidade com o TCE',
    description: 'Classificação correta de despesas e prestações de contas no prazo, conforme exigências dos Tribunais de Contas.',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"/><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9z"/></svg>',
  },
  {
    title: 'Gestão de aplicação por rubrica',
    description: 'Acompanhamento da execução financeira para evitar glosas e abatimento de repasses.',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M4 12h16M4 17h10"/><circle cx="19" cy="17" r="2"/></svg>',
  },
  {
    title: 'Segurança jurídica e financeira',
    description: 'Proteção contra devoluções com juros e correção monetária, sanções administrativas.',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l8 4v6c0 5.25-3.5 9.74-8 11-4.5-1.26-8-5.75-8-11V6l8-4z"/></svg>',
  },
  {
    title: 'Preservação de elegibilidade',
    description: 'Manutenção da regularidade para garantir participação em novos editais e contratos públicos.',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>',
  },
  {
    title: 'Diagnóstico e reestruturação',
    description: 'Avaliação da situação atual e implementação de rotina estável de prestação de contas.',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>',
  },
];
---

<Base
  title="Serviços — RT Consultoria"
  description="Conheça os serviços da RT Consultoria: conformidade com TCE, gestão por rubrica, segurança jurídica, preservação de elegibilidade e diagnóstico financeiro para OSCs."
>
  <section class="section">
    <div class="container">
      <h1 class="page-title fade-in">Nossos Serviços</h1>
      <p class="page-subtitle fade-in">Especialistas em compliance financeiro para OSCs — um terreno que contabilidades tradicionais não dominam.</p>
    </div>
  </section>

  <section class="section section--cream">
    <div class="container">
      <div class="services-grid">
        {services.map(service => (
          <ServiceCard
            title={service.title}
            description={service.description}
            icon={service.icon}
          />
        ))}
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="section section--dark cta-section">
    <div class="container cta-inner fade-in">
      <h2>Precisa de ajuda com compliance financeiro?</h2>
      <p>Fale com a nossa equipe e descubra como podemos proteger sua organização.</p>
      <a href={whatsappURL} target="_blank" rel="noopener noreferrer" class="btn btn--gold">
        Fale conosco pelo WhatsApp
      </a>
    </div>
  </section>
</Base>

<style>
  .page-title {
    text-align: center;
    margin-bottom: var(--spacing-sm);
  }

  .page-subtitle {
    text-align: center;
    color: var(--color-gray);
    font-size: 1.125rem;
    max-width: 600px;
    margin: 0 auto;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-md);
  }

  .cta-section {
    text-align: center;
  }

  .cta-inner h2 {
    margin-bottom: var(--spacing-xs);
  }

  .cta-inner p {
    margin-bottom: var(--spacing-md);
    font-size: 1.125rem;
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    .services-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    .services-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
```

- [ ] **Step 2: Verify at http://localhost:4321/servicos**

Check all 5 service cards render with icons, titles, and descriptions. Check CTA section.

- [ ] **Step 3: Commit**

```bash
git add src/pages/servicos.astro
git commit -m "feat: add Serviços page with 5 service cards and CTA"
```

---

### Task 12: OG Image and Final Verification

**Files:**
- Create: `public/og-image.png`

- [ ] **Step 1: Generate og-image.png**

Create a simple SVG and convert it to PNG using a script. Create a temporary file `scripts/generate-og-image.js`:

```bash
mkdir -p scripts
```

Create `scripts/generate-og-image.js`:

```js
import { writeFileSync } from 'fs';

// Generate SVG for og:image (1200x630)
const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#1C463C"/>
  <circle cx="600" cy="260" r="80" fill="none" stroke="#C5A24E" stroke-width="3"/>
  <circle cx="600" cy="260" r="68" fill="none" stroke="#C5A24E" stroke-width="1.5" opacity="0.5"/>
  <text x="600" y="285" font-family="Georgia, serif" font-size="72" font-weight="600" fill="#F2EFE6" text-anchor="middle">RT</text>
  <text x="600" y="390" font-family="Arial, sans-serif" font-size="22" letter-spacing="8" fill="#C5A24E" text-anchor="middle">CONSULTORIA</text>
  <text x="600" y="440" font-family="Arial, sans-serif" font-size="16" fill="#F2EFE6" text-anchor="middle" opacity="0.7">Gestão financeira e compliance para o Terceiro Setor</text>
</svg>`;

// Save as SVG fallback (browsers and social platforms that support SVG)
writeFileSync('public/og-image.svg', svg);
console.log('Created public/og-image.svg');
console.log('NOTE: For best social media compatibility, convert to PNG 1200x630.');
console.log('You can use: npx svgexport public/og-image.svg public/og-image.png 1200:630');
```

Run:

```bash
node scripts/generate-og-image.js
```

Then convert to PNG:

```bash
npx svgexport public/og-image.svg public/og-image.png 1200:630
```

If `svgexport` fails (needs Chromium), keep the SVG and update SEOHead to reference `og-image.svg` instead:

In `src/components/SEOHead.astro`, change:
```js
const ogImageURL = new URL('/og-image.png', Astro.site).href;
```
to:
```js
const ogImageURL = new URL('/og-image.svg', Astro.site).href;
```

- [ ] **Step 2: Build the site and verify**

```bash
npm run build
```

Expected: Build succeeds, output in `dist/` with:
- `index.html`
- `sobre/index.html`
- `servicos/index.html`
- `sitemap-index.xml`
- `robots.txt`
- `favicon.svg`
- `og-image.png` (or `.svg`)

- [ ] **Step 3: Preview the built site**

```bash
npm run preview
```

Open `http://localhost:4321` and verify:
- All 3 pages render correctly
- Navigation works between pages
- WhatsApp button is visible on all pages
- Footer shows contact info
- Mobile responsive (resize browser)
- Fade-in animations trigger on scroll

- [ ] **Step 4: Clean up and commit**

```bash
rm -rf scripts
git add -A
git commit -m "feat: add og-image, verify build and all pages"
```

---

### Task 13: Lighthouse Audit

- [ ] **Step 1: Run Lighthouse audit**

With the preview server running (`npm run preview`), open Chrome DevTools > Lighthouse tab and run an audit on `http://localhost:4321` for all categories:
- Performance
- Accessibility
- Best Practices
- SEO

Target: all scores > 90.

- [ ] **Step 2: Fix any issues found**

Common issues and fixes:
- **Missing `lang` attribute** — already set to `pt-BR` in Base.astro
- **Missing alt text** — all SVG icons use `aria-hidden="true"`
- **Color contrast** — verify gold on green passes WCAG AA (may need to lighten gold for text)
- **Tap targets too small** — check mobile nav links are at least 48x48px

- [ ] **Step 3: Commit any fixes**

```bash
git add -A
git commit -m "fix: address Lighthouse audit findings"
```
