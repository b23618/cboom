# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

`CLAUDE.md` is a symlink to this file (`AGENTS.md`); edit `AGENTS.md`.

## Project overview

Astro marketing site for CBoom, a Thai business automation platform. Almost entirely static, SEO-heavy landing pages plus a blog. Content is bilingual: Thai body copy, English product/feature nouns. There is no backend — the one exception is a large client-only React demo dashboard under `src/react/`.

## Commands

Run from the project root.

- Install: `npm install` (Node >= 22.12)
- Dev server: `astro dev --background`; manage with `astro dev stop`, `astro dev status`, `astro dev logs`
- Production build: `npm run build` — the primary regression check; there are no tests
- Local preview: `npm run preview`

## Architecture

### Static marketing pages (the bulk of the site)

- `src/pages/` — one file per route. Home (`index.astro`) and each product page (`crm`, `marketplace`, `inventory`, `accounting`, `hr`, `ai`, `esg`), plus `pricing`, `contact`, `demo`.
- A page is a thin composition: import `Layout` + section components from `src/components/`, render them inside `<Layout>`. Product pages follow a tighter pattern — `Navbar` / `ProductHero` / `FeatureList` / `CTA` / `Footer` with a local `features` array. Copy `esg.astro` as the template for a new product page.
- `src/layouts/Layout.astro` — the site shell for every page. Owns: Google Tag Manager (`GTM-WJ6QFVBB`), the `<SEO>` component wiring, Google Fonts (Inter + Noto Sans Thai), an inline pre-paint theme script reading `localStorage["cboom-theme"]`, and two inline IntersectionObserver scripts that drive `.reveal` animations and `[data-counter]` number count-ups. Props: `title`, `description`, `image`, `keywords`, `noindex`, `breadcrumb`, `faq` — all have sensible CBoom defaults, so pass only what differs. The default `faq` array is injected as FAQ structured data on every page that doesn't override it.
- `src/components/SEO.astro` — canonical URL, OpenGraph/Twitter tags, and JSON-LD (`Organization`, `SoftwareApplication`, `BreadcrumbList`, `FAQPage`). Never hand-roll meta tags in a page; add props to `Layout`/`SEO` instead.
- `src/pages/og/[slug].ts` — generates OG images as raw SVG at build time. To give a new page a custom OG image, add its slug to both the `titles` map and `getStaticPaths()`. `SEO.astro` auto-points `og:image` at `/og/<first-path-segment>` (falling back to `home`).

### Blog (content collection)

- `src/content/blog/*.md` — posts. Schema in `src/content.config.ts` (glob loader). It carries many SEO fields (`focusKeyword`, `secondaryKeywords`, `ogTitle`, `canonical`, `updatedDate`, …). **Add a field to the schema before using it in frontmatter** or the build breaks.
- `src/pages/blog/[slug].astro` — renders a post from a heavy stack of `src/components/blog/*` widgets (TOC, reading progress, share, related posts/products, ROI calculator, newsletter, PDF download). `getStaticPaths` filters out `draft: true`. Reading time = `ceil(charCount / 500)`.
- `src/pages/rss.xml.js` and `@astrojs/sitemap` produce the feed and sitemap.

### React demo dashboard (`src/react/`)

A self-contained interactive product demo, mounted only on `/demo/` (`src/pages/demo.astro`) via `<DashboardApp client:only="react" />`. It never server-renders.

- `DashboardApp.tsx` — the shell: sidebar nav, top bar, dark-mode toggle, notifications, and a **platform switcher** between two menu sets — the business suite (`businessMenuItems`: CRM, Marketplace, Warehouse, POS, Accounting, HR, Projects, AI, Reports, Automation, Integrations, Settings) and the ESG suite (`esgMenuItems`: carbon dashboard, emission sources, calculators, reports, targets, etc.). Each menu id maps to a view component in `src/react/demo/views/`.
- `src/react/demo/views/*.tsx` — one component per screen (~40). ESG views are prefixed `ESG*`.
- `src/react/demo/data.ts` + `dataGen.ts` + `esgData.ts` — large synthetic Thai datasets built at module load (`generateCustomers(520)`, `generateOrders(2100, …)`, etc.). All fake, deterministic-ish generators. Add new demo data here.
- `src/react/demo/useRealtime.ts` — `useRealtimeSimulation()` ticks every 5s, fabricating orders/notifications/toasts to make the dashboard feel live.
- `src/react/demo/ui.tsx` — shared demo UI primitives (`ToastContainer`, etc.). Charts use `recharts`; tables use `@tanstack/react-table`; animations use `framer-motion`; icons use `lucide-react` (Astro components use `@lucide/astro`).
- `src/react/demo/customerService/` — the Customer Service (omnichannel inbox) module: `types.ts` defines the channel-agnostic `CustomerServiceProvider` contract + RBAC types; `provider.ts` has `DemoCustomerServiceProvider` (backed by demo data) plus stubbed per-channel adapters (`TikTokShopCustomerServiceProvider`, etc.) that all delegate to the demo store — no external API calls; `data.ts` holds the fictional conversations. Views: `CustomerServiceInboxView` (3-column inbox, responsive drill-down) and `CustomerServiceOverviewView` (analytics), plus `customerServiceShared.tsx`. Conversations are org-scoped in the provider. CS also extends `SettingsView` (roles + audit log) and `IntegrationsView` (TikTok Shop CS section).
- This subtree is demo theater — no real API calls, no persistence. Keep it isolated from the marketing pages.

### Analytics

- Meta Pixel ("CBoom Web", ID `1652154163003052`) is bootstrapped once in `src/layouts/Layout.astro`, gated on the `PUBLIC_META_PIXEL_ID` env var (see `.env.example`) — unset it to disable the pixel (e.g. local dev without a `.env`). It's client-only browser tracking; there is no server-side Conversions API here and none should be added to this repo.
- The site has no client-side router (every navigation, including into `/demo/`, is a full page load), so the inline bootstrap script's `fbq("track", "PageView")` covers every page exactly once — there's no SPA route-change case to wire up.
- Use `trackMetaEvent` / `trackMetaCustomEvent` from `src/lib/metaPixel.ts` for any event beyond the automatic PageView, instead of calling `window.fbq` directly. Never pass email/phone/first name/last name in the `parameters` object — Advanced Matching is intentionally off, and the helper strips those keys defensively anyway.
- No cookie-consent/CMP exists in this project yet, so the pixel currently fires unconditionally like the existing GTM snippet above it. If a consent system is added later, gate the Meta Pixel script on it the same way GTM would be gated.

## Styling

- Tailwind v4, configured only via `@tailwindcss/vite` in `astro.config.mjs` — there is no `tailwind.config`. All theme tokens live in `@theme` in `src/styles/global.css` (`--color-primary` green ramp, `--color-background`, `--color-ink`, `--radius-card`, `--container-page`, custom keyframes).
- Dark mode is class-based: `@custom-variant dark (&:where(.dark, .dark *))`, toggled by `.dark` on `<html>`. Use `dark:` variants.
- Prefer utility classes and the shared component classes in `@layer components` of `global.css` (`.container-page`, `.btn-primary`, `.btn-secondary`, `.section-eyebrow`, `.reveal`, `.glass`, `.card-lift`, `.gradient-glow`). Avoid new custom CSS unless a component genuinely needs it.
- `.reveal` and `[data-counter]` elements are animated by the observer scripts in `Layout.astro` — add the class/attribute and they just work.

## Conventions

- `astro.config.mjs`: `site: "https://cboom.in.th"`, `trailingSlash: "always"` — internal links must end with `/`.
- Keep the Thai/English bilingual tone: Thai prose, English for product and feature names.
- New pages: wrap in `Layout`, keep SEO defaults aligned with existing pages, add a `breadcrumb` prop, and add an OG slug in `src/pages/og/[slug].ts` if it needs a distinct social image.
- `src/assets/` is imported (optimized by Astro); `public/` is served verbatim (logos, favicons).

## References

- Astro docs: https://docs.astro.build — routing https://docs.astro.build/en/guides/routing/, components https://docs.astro.build/en/basics/astro-components/, content collections https://docs.astro.build/en/guides/content-collections/, Tailwind https://docs.astro.build/en/guides/styling/
