# PLL – Personal Portfolio (Private) 🎯

*A production-ready portfolio website showcasing Pedro Lubaszewski Lima
– Tech Leader & Computer Engineer.*

------------------------------------------------------------------------

## Table of contents

-   [Project overview](#project-overview)
-   [Key features ✨](#key-features-)
-   [Tech stack 🧰](#tech-stack-)
-   [Quick start 🚀](#quick-start-)
-   [Important files and where to edit things 🗂️](#important-files-and-where-to-edit-things-%EF%B8%8F)
-   [Design and theming notes 🎨](#design-and-theming-notes-)
-   [Accessibility and keyboard navigation ♿️⌨️](#accessibility-and-keyboard-navigation-%EF%B8%8F%EF%B8%8F)
-   [SEO and social sharing 🔎📣](#seo-and-social-sharing-)
-   [Print / PDF optimization 🖨️](#print--pdf-optimization-%EF%B8%8F)
-   [Deployment notes 📦](#deployment-notes-)
-   [For future-me: quick reminders 📝](#for-future-me-quick-reminders-)
-   [Private / Contributing](#private--contributing)

------------------------------------------------------------------------

## Project overview

This repository contains a production-ready personal portfolio website
built to present a professional brand online. The site is built with React +
TypeScript and optimized for performance, responsivity, accessibility (WCAG
2.1 AA), multilingual experience (Portuguese,English, French), and SEO/social
sharing (Open Graph, Twitter Card, JSON-LD). Key features include a dual
light/dark theme (accent color #A52834), typewriter effects, and
micro-interactions, Framer Motion animations with prefers-reduced-motion
support, a keyboard shortcut system (Alt+1..6, ?), and a print-optimized
CV export. The repo centralizes content in profile.ts and uses react-i18next
for translations. See the project feature overview for a complete breakdown.

------------------------------------------------------------------------

## Key features ✨

-   **Internationalization**: Browser language detection + manual
    selector (PT-BR, EN, FR). Dynamic resume download per language.
-   **Dual-theme**: Light / Dark theme with system preference fallback
    and manual toggle. Accent color: **Mexican Red --- `#A52834`**.
-   **Animations**: Framer Motion scroll-triggered animations, parallax
    hero, typewriter effect, reduced-motion support.
-   **Accessibility**: Skip-to-content, semantic markup, ARIA
    attributes, strong keyboard navigation, focus indicators.
-   **Keyboard shortcuts**: Alt+1..6 to jump to sections, Home/End, `?`
    or `/` to open help modal, Escape to close.
-   **SEO / Social**: OG & Twitter meta tags, JSON-LD person schema,
    canonical url, multilingual sitemap.
-   **Print optimized**: Dedicated print stylesheet for clean CV export.

------------------------------------------------------------------------

## Tech stack 🧰

-   **Framework:** React 18 + TypeScript
-   **Build:** Vite
-   **Styling:** TailwindCSS
-   **Components:** shadcn/ui + Radix UI
-   **Animations:** Framer Motion
-   **I18n:** react-i18next + i18next-browser-languagedetector
-   **Other:** Centralized profile.ts data, custom hooks (theme, language, keyboard nav)

------------------------------------------------------------------------

## Quick start 🚀
> [!IMPORTANT]
> These commands assume `npm`. If you use `pnpm` or `yarn` replace commands accordingly.

### Install

```
npm install
```

### Dev server

```
npm run dev
```

### Build for production

```
npm run build
```

### Preview production build locally

```
npm run preview
```

### Format / lint (if present)

```
npm run format
npm run lint
```

------------------------------------------------------------------------

## Important files and where to edit things 🗂️
> [!NOTE]
> Quick map to help you remember where to change common items later.

-   `src/profile.ts` --- centralized profile/content source.
-   `src/hooks/` --- theme, language, motion, keyboard shortcuts.
-   `src/i18n/` --- translations and i18n config.
-   `tailwind.config.*` --- theming, custom colors, transitions.
-   `public/` --- favicon, OG images, resume PDFs.
-   `src/components/` --- UI pieces with animations and interactions.

------------------------------------------------------------------------

## Design and theming notes 🎨

-   Accent color: **Mexican Red `#A52834`**
-   Typography: *Playfair Display* (titles) & *Source Sans 3* (body)
-   Motion: Framer Motion with reduced-motion fallbacks
-   Hero: Parallax + typewriter headline

------------------------------------------------------------------------

## Accessibility and keyboard navigation ♿️⌨️

-   Skip-to-content
-   Semantic HTML structure
-   ARIA enhancements
-   Strong focus rings
-   Keyboard shortcuts with discoverability modal

------------------------------------------------------------------------

## SEO and social sharing 🔎📣

-   OG/Twitter meta tags
-   JSON-LD schema
-   Canonical tags
-   Multilingual sitemap and robots.txt

> [!IMPORTANT]
> When changing meta content, update meta component and Open Graph image; regenerate the social image if needed.

------------------------------------------------------------------------

## Print / PDF optimization 🖨️

The print stylesheet ensures: - Clean layout
- Hidden UI chrome
- Proper typography scaling
- Preserves accent color where appropriate
- Page-break control
- Optional link URL visibility

> [!IMPORTANT]
> Test "Print → Save as PDF" regularly when you update the About/Experience sections.

------------------------------------------------------------------------

## Deployment notes 📦

-   Static export from `npm run build`
-   Ensure correct SPA fallback configuration
-   Update canonical URL and OG assets when deploying under a different
    domain

------------------------------------------------------------------------

## For future-me: quick reminders 📝

-  ✅ Edit `profile.ts` first when updating content
-  ✅ Sync translations when adding new languages
-  ✅ Update Tailwind tokens when changing brand colors
-  ✅ Regenerate OG images when updating branding
-  ✅ Keep the shortcuts modal aligned with actual shortcuts

------------------------------------------------------------------------

## Private / Contributing

This is a private repository. If opened later for collaboration, add
CONTRIBUTING.md and CODE_OF_CONDUCT.md.
