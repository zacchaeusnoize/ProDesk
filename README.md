# Prodesk — Static HTML

Single-page static site. No build step required.

## Deploy to Vercel

1. Push this folder to a GitHub repo
2. In Vercel: **New Project → Import repo**
3. Framework Preset: **Other** (static)
4. Build Command: *(leave empty)*
5. Output Directory: *(leave empty — root)*
6. Deploy

Vercel will serve `index.html` directly. Done.

## Local preview

Open `index.html` in a browser, or run any static server:

```bash
npx serve .
```

## Files

- `index.html` — entry point
- `Site.jsx`, `MiniMock.jsx`, `Partners.jsx` — components (loaded via Babel standalone)
- `tweaks-panel.jsx` — design tweak controls
- `site.css`, `colors_and_type.css` — styles
- `assets/` — images, fonts, icons
- `_logo-inline.svg` — logo asset
