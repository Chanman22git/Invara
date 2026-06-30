# INVARA — Lineage Proof Dashboard

A reliability dashboard for AI agents. INVARA measures **reliability** — same path
taken, required steps ran, cost within norms — explicitly *not* correctness, safety,
or a single health score. The demo data follows a fictional "ShopBot" customer-service agent.

## Live demo

Hosted on GitHub Pages: **https://chanman22git.github.io/Invara/**

## What's here

- **`index.html`** — fully self-contained, single-file build of the dashboard (all JS,
  runtime, and data inlined; only external request is Google Fonts). This is what Pages serves.
- **`source/`** — original design-reference prototypes and data model, for rebuilding the
  dashboard in a real framework later.
- **`.nojekyll`** — tells GitHub Pages to serve assets as-is.

## Updating the site

Edit `index.html` (or regenerate it) and push to `main`. Pages redeploys automatically.

## Rebuilding it properly

See `source/` for the full design spec — `Lineage Proof.dc.html` (markup + logic),
`lineage-data.js` (dataset), and `Lineage Proof - Requirements.dc.html` (PRD). React +
Vite is a clean fit; set `base: '/Invara/'` in `vite.config.js` when deploying to Pages.
