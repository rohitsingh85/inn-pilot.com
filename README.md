# InnPilot — Public Marketing Website

**Production URL**: [inn-pilot.com](https://inn-pilot.com)

## Tech Stack

- [Astro](https://astro.build/) — static site framework
- [Cloudflare Pages](https://pages.cloudflare.com/) — edge deployment
- TypeScript (strict)

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output is in `dist/` — fully static, Cloudflare Pages-compatible.

## Project Structure

```
src/
├── components/       # Reusable UI components
├── layouts/          # Page layouts
├── lib/              # Utilities and configuration
├── pages/            # Route pages (file-based routing)
└── styles/           # Global CSS and design tokens
public/               # Static assets (copied as-is to output)
```

## Configuration

All centralized configuration lives in `src/lib/config.ts`.
Environment variables are defined in `.env.example`.

## Deployment

This project deploys to **Cloudflare Pages** (separate from the SaaS application at `app.inn-pilot.com`).
