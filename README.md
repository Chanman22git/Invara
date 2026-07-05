# INVARA — Reproducibility Proof for AI Agents

INVARA is continuous **reproducibility proof** for AI agents: same intent → same plan →
same execution, proven per intent, read straight from the traces you already emit. It measures
*reliability* (same path taken, required steps ran, cost within norms) — explicitly **not**
correctness, safety, or a single health score. Demo data follows a fictional "ShopBot"
customer-service agent.

## Live

Hosted on GitHub Pages: **https://chanman22git.github.io/Invara/**

- **`/`** — the pitch deck (9-slide scroll presentation). The "Open the live demo" button
  launches the dashboard.
- **`/dashboard/Demo.dc.html`** — the interactive Lineage Proof dashboard (the mockup).

## What's here

- **`index.html`** — the standalone pitch deck (all assets inlined). This is the landing page.
- **`dashboard/`** — the interactive dashboard and its runtime:
  - `Demo.dc.html` — the dashboard (the deck's demo button navigates here)
  - `Capability Tree.dc.html`, `lineage-data.js`, `support.js` — its runtime siblings
- **`source/`** — original design-reference files, including the deck source
  (`Invara v2 (standalone).html`) and the dashboard prototype.
- **`.nojekyll`** — serve assets (including the space-containing filenames) as-is.

## Updating the site

Edit the files and push to `main`; GitHub Pages redeploys automatically (~30–60s).

## Notes

The dashboard is a `dc-runtime` design prototype. Its headline stat bindings
(`classifierVal`, `measuredVal`, …) were patched so they resolve on first render while
`lineage-data.js` loads asynchronously (see `dashboard/Demo.dc.html`, `renderVals()` loading
branch).
