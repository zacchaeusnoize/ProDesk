# ProDesk Marketing — Next.js

Next.js 14 (App Router) app deployable to Vercel.

## Local dev
```bash
npm install
npm run dev
```

## Deploy to Vercel
```bash
vercel
```
or push to GitHub and import the repo from the Vercel dashboard. No env vars required.

## Structure
- `app/layout.tsx` — root layout with Google Font links and metadata
- `app/page.tsx` — home page (renders the marketing site as a client component)
- `app/globals.css` — combined design tokens + site styles
- `components/Site.jsx` — main marketing site (client)
- `components/MiniMock.jsx` — hero product mock (client)
- `components/Partners.jsx` — Founding Partners section (client)
- `components/TweaksPanel.jsx` — in-design tweak controls (client)
- `public/assets/` — static assets (logos, icons)
