# Site RT Consultoria — Design Spec

## Objetivo

Site institucional para a RT Consultoria, especializada em gestão financeira e compliance para OSCs que recebem repasses de recursos públicos. O site deve apresentar a empresa, seus serviços e gerar credibilidade, com canais de contato via WhatsApp e e-mail.

## Público-alvo

OSCs dos setores de Saúde e Educação que recebem repasses públicos e enfrentam dificuldades de compliance financeiro. Segmentação por porte:

- **Pequenas:** até R$ 300 mil/ano, 1-2 contratos, equipe enxuta, gestão informal.
- **Médias:** R$ 300 mil a 1,5 mi/ano, 3-8 contratos, setor administrativo estruturado, histórico de pendências.
- **Grandes / Reestruturação:** acima de R$ 1,5 mi/ano, múltiplos contratos, autuações anteriores ou novo contrato de alto valor.

## Dados de Contato (placeholders)

- **WhatsApp:** `{{WHATSAPP_NUMERO}}` (formato: 5511999999999)
- **E-mail:** `{{EMAIL_CONTATO}}`
- **URL do site:** `{{SITE_URL}}` (necessário para sitemap, canonical URLs, Open Graph e JSON-LD)

Substituir os placeholders pelos dados reais antes do deploy.

## Páginas

### 1. Home (`/`)

- **Hero:** headline "Gestão financeira segura para quem transforma o Brasil", sub-headline: "Prestação de contas organizada e no prazo, sem você precisar entender de TCE.", botão CTA "Fale conosco" direcionando para WhatsApp.
- **Seção "O que protegemos":** 4 cards com ícone + título + descrição curta:
  - **Conformidade com o TCE** — classificação correta e prestações no prazo.
  - **Aplicação correta por rubrica** — sem glosas nem abatimento de repasses.
  - **Segurança jurídica e financeira** — contra devoluções com juros e correção.
  - **Continuidade dos contratos** — elegibilidade preservada para novos editais.
- **Seção "Por que a RT":** 3 diferenciais com ícone + texto:
  - 100% remoto, com atendimento presencial quando necessário
  - Alcance nacional
  - Especialistas no Terceiro Setor — um nicho que contabilidades tradicionais não dominam
- **CTA final:** faixa com fundo verde escuro + botão dourado para WhatsApp.

### 2. Sobre (`/sobre`)

Conteúdo extraído do Brand Book:

- **Quem somos:** A RT Consultoria é especializada em gestão financeira e compliance para OSCs que recebem repasses de recursos públicos. Atuamos 100% remotamente, com alcance nacional e atendimento presencial quando necessário. Não somos uma contabilidade tradicional — somos especialistas em prestação de contas a Tribunais de Contas e órgãos financiadores.
- **Propósito:** Garantir que boas organizações não percam contratos por má gestão financeira.
- **Promessa:** Do risco à regularidade — com método. Acompanhamos cada organização do diagnóstico à rotina estável: prestação de contas organizada, no prazo e auditável.
- **Missão:** Garantir que boas organizações não percam contratos por má gestão financeira — traduzindo exigências complexas em rotina clara, segura e auditável.
- **Visão:** Ser a referência nacional em compliance financeiro para o Terceiro Setor, reconhecida pela autoridade técnica e pelo cuidado com cada organização atendida.
- **Valores (5 princípios):**
  1. **Rigor técnico** — domínio profundo das exigências de Tribunais de Contas.
  2. **Precisão** — cada rubrica conferida, cada prazo cumprido. O detalhe protege o contrato.
  3. **Transparência** — linguagem clara, sem "financês". O cliente entende cada passo.
  4. **Compromisso** — tratamos o propósito da OSC como nosso.
  5. **Segurança** — tranquilidade jurídica e financeira. Do risco à regularidade, sem sustos.
- **Nossos Fundadores:** bio curta de cada sócio com nome e descrição do papel na empresa:
  - **Rogério Duque** — bio + papel na RT (placeholder: conteúdo a fornecer).
  - **Thaiane Oliveira** — bio + papel na RT (placeholder: conteúdo a fornecer).

### 3. Serviços (`/servicos`)

Cada serviço com título, descrição e ícone:

- **Conformidade com o TCE** — classificação correta de despesas e prestações de contas no prazo, conforme exigências dos Tribunais de Contas.
- **Gestão de aplicação por rubrica** — acompanhamento da execução financeira para evitar glosas e abatimento de repasses.
- **Segurança jurídica e financeira** — proteção contra devoluções com juros e correção monetária, sanções administrativas.
- **Preservação de elegibilidade** — manutenção da regularidade para garantir participação em novos editais e contratos públicos.
- **Diagnóstico e reestruturação** — avaliação da situação atual e implementação de rotina estável de prestação de contas.

## Elementos Globais

- **Header:** logo RT Consultoria + navegação (Home, Sobre, Serviços, Contato).
- **Footer:** dados de contato (WhatsApp e e-mail), links de navegação, copyright. O footer substitui a página dedicada de contato.
- **Botão flutuante de WhatsApp:** fixo no canto inferior direito, presente em todas as páginas.

**Nota:** não há página dedicada de Contato — as informações de contato ficam no footer (presente em todas as páginas) e no botão flutuante de WhatsApp. A navegação do header fica: Home, Sobre, Serviços (3 itens, com o CTA de contato via WhatsApp sempre visível).

## Visual e Tom

**Tom:** moderno e acessível — profissional com leveza, diferenciando-se do tom corporativo pesado tradicional. Linguagem clara, sem "financês" (alinhado aos valores da marca).

**Paleta de cores (do Brand Book):**

| Cor | Hex | Uso |
|-----|-----|-----|
| Verde escuro | `#1C463C` | Backgrounds principais, header, footer |
| Dourado | `#C5A24E` | Destaques, CTAs, ícones |
| Creme | `#F2EFE6` | Fundo de seções claras, texto sobre fundo escuro |
| Branco | `#FFFFFF` | Cards, áreas de respiro |
| Cinza suave | `#6B7280` | Texto secundário |

**Tipografia:**

- Títulos: serif (Georgia ou similar) — transmite tradição e confiança.
- Corpo: sans-serif (Inter ou similar) — legibilidade e modernidade.

**Estilo:**

- Layout limpo e arejado com bastante espaço em branco.
- Seções alternando fundo claro/escuro para ritmo visual.
- Ícones simples e lineares nos cards de serviço.
- Animações sutis no scroll (fade-in).
- Responsivo (mobile-first).

## SEO

O site deve ter SEO funcional e bem implementado:

- **Meta tags por página:** `title`, `description` únicos e otimizados para cada página.
- **Open Graph:** `og:title`, `og:description`, `og:image`, `og:url`, `og:type` em todas as páginas.
- **Twitter Cards:** `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`.
- **og:image:** imagem estática gerada com logo RT + cores da marca (1200x630px), armazenada em `public/og-image.png`.
- **Structured Data (JSON-LD):** schema `Organization` na home com nome, logo, descrição, contato e área de atuação. Usar `{{SITE_URL}}` como base.
- **Sitemap:** geração automática via Astro (`@astrojs/sitemap`). Requer `site: '{{SITE_URL}}'` em `astro.config.mjs`.
- **robots.txt:** permitir indexação completa.
- **Canonical URLs:** em todas as páginas.
- **HTML semântico:** uso correto de `<header>`, `<main>`, `<nav>`, `<section>`, `<footer>`.
- **Alt text:** em todas as imagens.
- **Heading hierarchy:** `h1` único por página, hierarquia `h2`/`h3` correta.
- **Performance:** Lighthouse score alvo > 90 em todas as categorias (performance, accessibility, best practices, SEO).

## Stack Técnica

- **Framework:** Astro (geração estática).
- **Estilos:** CSS puro (sem Tailwind ou frameworks CSS).
- **JavaScript de runtime:** zero, exceto botão de WhatsApp.
- **Performance:** HTML estático pré-renderizado, sem JS desnecessário no bundle.
- **SEO:** `@astrojs/sitemap` para geração automática de sitemap.

## Estrutura do Projeto

```
Site RT/
├── src/
│   ├── layouts/
│   │   └── Base.astro          # Layout base (head, meta tags, header, footer, WhatsApp)
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── WhatsAppButton.astro
│   │   ├── ServiceCard.astro
│   │   ├── Hero.astro
│   │   └── SEOHead.astro       # Meta tags, OG, Twitter Cards, JSON-LD
│   ├── pages/
│   │   ├── index.astro         # Home
│   │   ├── sobre.astro         # Sobre
│   │   └── servicos.astro      # Serviços
│   └── styles/
│       └── global.css          # Estilos globais + variáveis CSS
├── public/
│   ├── favicon.svg             # Logo RT do Brand Book
│   ├── og-image.png            # Imagem para compartilhamento social (1200x630)
│   └── robots.txt
├── astro.config.mjs
└── package.json
```

## Funcionalidades

- Site 100% estático, apenas informativo.
- Sem área de cliente, agendamento ou chat.
- Canais de contato: WhatsApp (botão flutuante + links no footer) e e-mail (no footer).
- Hospedagem e domínio a definir posteriormente.

## Fora de Escopo

- Blog / área de conteúdo.
- Cases / depoimentos.
- Área de cliente.
- Integração com CRM ou ferramentas externas.
- Página dedicada de contato (contato fica no footer).
