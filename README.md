# PLL – Personal Portfolio 🎯

*A production-ready portfolio website showcasing Pedro Lubaszewski Lima
– Software & Machine Learning Engineer.*

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
-   [Quick reminders when editing 📝](#quick-reminders-when-editing-)

------------------------------------------------------------------------

## Project overview

This repository contains a production-ready personal portfolio website
built to present a professional brand online, currently targeted towards tech-finance, software engineering, and machine learning roles. The site is built with React +
TypeScript and optimized for performance, responsivity, accessibility (WCAG
2.1 AA), multilingual experience (Portuguese,English, French), and SEO/social
sharing (Open Graph, Twitter Card, JSON-LD). Key features include a dual
light/dark theme (accent color #A52834), typewriter effects, and
micro-interactions, Framer Motion animations with prefers-reduced-motion
support, a keyboard shortcut system (Alt+1..6, ?, Ctrl+P to print CV PDF), and a print warning
fallback to guide users to the official PDF. The repo stores global constants in `profile.ts` while maintaining static UI text within `react-i18next` locale files. All dynamic profile content (About, Experience, Education, Projects, Skills, Interests) is maintained in MongoDB and injected into the frontend using a **Build-Time Generation (SSG)** pattern. During the GitHub Actions build process, the data is fetched and compiled into static JSON, allowing the entire site to be hosted statically and securely on GitHub Pages without requiring a live backend. See the project feature overview for a complete breakdown.

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
-   **Backend (Build-Time):** Node.js, Express (Dev only), MongoDB (Mongoose)
-   **State/Data Fetching:** React Query (SSG mode)
-   **Other:** Custom hooks (theme, language, keyboard nav)

------------------------------------------------------------------------

## Quick start 🚀
> [!IMPORTANT]
> These commands assume `npm`. If you use `pnpm` or `yarn` replace commands accordingly.

### Install

```
npm install
```

### Run the application in Development (Live DB Fetching)

To edit your database and see live updates locally, you can run the Express API alongside the Vite dev server. Open two separate terminal windows:

**Terminal 1 (Backend API):**
```bash
node server/index.js
```

**Terminal 2 (Frontend Client):**
```bash
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

-   `server/` --- Node.js scripts for fetching MongoDB data during build and serving the API in development.
-   `src/hooks/usePortfolioData.ts` --- React Query hook to fetch dynamic profile data.
-   `src/types/database.ts` --- TypeScript interfaces for the MongoDB document structure. Note that `Projects` use a `briefDescription` field for the frontend display, while `description` is reserved for other outputs (like AI CV generation).
-   `src/hooks/` --- theme, language, motion, keyboard shortcuts.
-   `src/i18n/` --- static translations and i18n config.
-   `tailwind.config.*` --- theming, custom colors, transitions.
-   `public/` --- favicon and basic static assets. (Note: Resumes, profile photo, and OG images are hosted on Cloudinary, configured via `.env` and `src/config/assets.ts`).
-   `src/components/` --- UI pieces with animations and interactions.

------------------------------------------------------------------------

## Documentation 📚

To maintain a clean repository structure, detailed documentation regarding our data and asset architecture is stored in the `docs/` folder.

- **[Database Structure 🗄️](docs/database-structure.md)**: Detailed schema for our MongoDB collections (`professionals`, `resumes`, `coverLetters`).
- **[Cloudinary Asset Structure ☁️](docs/cloudinary-structure.md)**: Standardized folder patterns for static assets like profile pictures, OG images, and localized resumes/cover letters.

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
-   Multilingual sitemap and robots.txt (PDF indexing disabled for privacy)

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

-   The frontend builds completely statically via `npm run build`.
-   The build process automatically runs `node server/fetch-db.js` to dump the latest MongoDB data into the public folder.
-   **GitHub Pages**: Fully supported! You MUST add a repository secret named `MONGODB_URI` so the GitHub Action can authenticate during the build step.
-   **Environment Variables**: The project uses two environment files:
    1.  `.env` (Public): Contains your Cloudinary asset URLs (`VITE_PROFILE_PHOTO_URL`, etc.). This file **is committed to Git** so the GitHub Actions runner can access these public URLs during the frontend build.
    2.  `.env.local` (Private): Contains your sensitive database credentials (`MONGODB_URI`). This file is **ignored by Git** for security.
-   **Cloudflare**: Because the output is entirely static HTML/JS/JSON, it caches perfectly on Cloudflare. No backend configuration needed.

------------------------------------------------------------------------

## Quick reminders when editing 📝

-  ✅ Sync translations when adding new languages
-  ✅ Update Tailwind tokens when changing brand colors
-  ✅ Regenerate OG images when updating branding
-  ✅ Keep the shortcuts modal aligned with actual shortcuts
-  ✅ Note: The website experience section contains extra roles (e.g., Physics Tutor) omitted from the short PDF CV.
