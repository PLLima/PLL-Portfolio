# PLL – Personal Portfolio 🎯

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
fallback to guide users to the official PDF. The repo stores global constants in `profile.ts` while maintaining static UI text within `react-i18next` locale files. All dynamic profile content (About, Experience, Education, Projects, Skills) is fetched dynamically from a backend MongoDB database (`server/index.js`), which serves the localized data through an Express API. See the project feature overview for a complete breakdown.

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
-   **Backend:** Node.js, Express, MongoDB (Mongoose)
-   **State/Data Fetching:** React Query
-   **Other:** Custom hooks (theme, language, keyboard nav)

------------------------------------------------------------------------

## Quick start 🚀
> [!IMPORTANT]
> These commands assume `npm`. If you use `pnpm` or `yarn` replace commands accordingly.

### Install

```
npm install
```

### Run the application

The application requires both the Node.js backend and the Vite frontend to run simultaneously. Open two separate terminal windows.

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

-   `server/` --- Node.js Express backend and MongoDB Mongoose models.
-   `src/hooks/usePortfolioData.ts` --- React Query hook to fetch dynamic profile data.
-   `src/types/database.ts` --- TypeScript interfaces for the MongoDB document structure.
-   `src/hooks/` --- theme, language, motion, keyboard shortcuts.
-   `src/i18n/` --- static translations and i18n config.
-   `tailwind.config.*` --- theming, custom colors, transitions.
-   `public/` --- favicon, OG images, resume PDFs, profile photo.
-   `src/components/` --- UI pieces with animations and interactions.

------------------------------------------------------------------------

## Database Structure 🗄️

The application uses a MongoDB NoSQL database with the following structure for dynamic data and localization:

```json
{
  "_id": "UUID",
  "name": "string",
  "contact": { "email": "string", "phone": "string", "website": "string", "linkedin": "string", "github": "string" },
  "location": { "en": "string", "pt-br": "string", "fr": "string" },
  "metadata": { "profilePicturePath": "string", "defaultLanguage": "string" },
  "i18n_strings": {
    "tagline": { "en": "...", "pt-br": "...", "fr": "..." },
    "about": { "en": "...", "pt-br": "...", "fr": "..." }
  },
  "focusAreas": [ { "icon": "string", "metadata": { "displayOrder": 1, "isActive": true }, "title": { ... }, "description": { ... } } ],
  "skills": [ { "category": "hard_skill", "subCategory": "string", "proficiencyLevel": 5, "name": { ... } } ],
  "languages": [ { "language": { ... }, "level": { ... } } ],
  "experiences": [ { "title": { ... }, "company": { ... }, "timeline": { "startDate": "YYYY-MM", "endDate": null } } ],
  "education": [ { "degree": { ... }, "institution": { ... }, "timeline": { "startDate": "YYYY-MM", "endDate": "YYYY-MM" } } ],
  "projects": [ { "name": { ... }, "techStack": { ... } } ],
  "achievements": [ { "title": { ... }, "issuer": { ... }, "dateIssued": ["YYYY-MM"] } ]
}
```

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

-   The frontend can be built as a static bundle using `npm run build`.
-   The backend API (`server/index.js`) must be deployed as a Node.js web service.
-   Ensure Vite proxy configuration or CORS headers match your production environments.
-   Update canonical URL and OG assets when deploying under a different domain.

------------------------------------------------------------------------

## Quick reminders when editing 📝

-  ✅ Sync translations when adding new languages
-  ✅ Update Tailwind tokens when changing brand colors
-  ✅ Regenerate OG images when updating branding
-  ✅ Keep the shortcuts modal aligned with actual shortcuts
-  ✅ Note: The website experience section contains extra roles (e.g., Physics Tutor) omitted from the short PDF CV.
