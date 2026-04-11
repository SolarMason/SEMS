# SEMS

**Sustainable Energy Management Systems, LLC** — American-made, storm-hardened closed-form (tubular) solar racking and tracking systems.

This repository contains the SEMS public marketing website and the internal configurator toolset (Racking Configurator, Array Builder, GeoBuilder).

## Stack

- [Next.js 14](https://nextjs.org/) (App Router) + React 18
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Project structure

```
SEMS/
├── app/
│   ├── layout.tsx              # Root layout, Navbar + Footer
│   ├── page.tsx                # Marketing home
│   ├── about/                  # About page
│   ├── contact/                # Contact form
│   ├── products/
│   │   ├── avans-rac/          # Avans Rac Series
│   │   ├── utilitas-trac/      # Utilitas Trac Series
│   │   └── tst/                # Tilt Solar Tracker Series
│   └── tools/
│       ├── page.tsx            # Tools index
│       ├── racking-configurator/
│       ├── array-builder/
│       └── geo-builder/
├── components/
│   ├── Navbar.tsx
│   └── Footer.tsx
├── public/
│   ├── images/                 # Logos and assets
│   └── legacy/                 # Original HTML tools preserved verbatim
└── ...
```

## Legacy tools

The three configurator tools currently live in `public/legacy/` as standalone
HTML files and are embedded into the Next.js app via `<iframe>` on the
corresponding `/tools/*` routes. This preserves all existing functionality while
the tools are progressively rebuilt as native React modules.

## Running locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Roadmap

- [ ] Flesh out product pages with specs, photos, and downloads
- [ ] Wire up the contact form to a backend (email or CRM)
- [ ] Port Racking Configurator to a native React module
- [ ] Port Array Builder to a native React module
- [ ] Port GeoBuilder to a native React module
- [ ] Connect configurators to shared state / saved projects
- [ ] Auth + user accounts for internal tool access

## License

Proprietary © Sustainable Energy Management Systems, LLC
