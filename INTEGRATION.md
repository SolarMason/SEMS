# SEMS Configurator · SaaS Layer (Phases 1–3)

A drop-in module suite that adds 13 SaaS-style features to `configurator.html` without requiring any edits to the rest of the file.

This patch ships with the layer **already integrated** into `site/configurator.html`. The standalone source modules in this folder are provided for reference and future maintenance.

---

## What's already done

`site/configurator.html` has both SaaS modules pasted directly above its closing `</body>` tag. Reload the page in any modern browser to see all features active.

The original 5,584-line configurator is unchanged above the SaaS layer block; the new code occupies lines 5,589–9,402.

---

## What you get (13 features)

### Phase 1 · Foundation

| # | Feature | Access |
|---|---------|--------|
| 1 | Section nav rail (left side, sticky) | Click any icon |
| 2 | Sticky progress bar (kW DC, sections, undo/redo) | Below main nav |
| 3 | Validation badges on every card | Auto-injected |
| 4 | Command palette (~30 actions, fuzzy search) | `⌘K` / `Ctrl+K` |
| 5 | Undo / Redo (30-deep, layout + form changes) | `⌘Z` / `⌘⇧Z` |
| 6 | Multi-project workspace (save, rename, duplicate, delete) | `≡` rail icon, `⌘S` |

### Phase 2 · Walkthrough

| # | Feature | Access |
|---|---------|--------|
| 7 | First-run guided tour (6 steps, smart-gated for returning users) | Auto on first visit, replay via `?` button |
| 8 | Quick Start wizard (5 steps) | Bottom-right `⇆` button |
| 9 | Templates gallery (Blank, PA 250 kW, FL Hurricane 500 kW, Agri-PV 1 MW, CA Seismic 750 kW, Demo 100 kW) | Bottom-right `✦` button |

### Phase 3 · Intelligence

| # | Feature | Access |
|---|---------|--------|
| 10 | ZIP defaults — auto-suggest 7 ASCE 7-22 inputs from address | Type a 5-digit ZIP in Site Address; chip appears |
| 11 | Live engineering console — wind / snow / seismic / production with formulas | `Σ` rail icon or FAB |
| 12 | Year-1 PV production (PVWatts-style) — kWh, capacity factor, $ revenue | Auto card under Live Summary |
| 13 | Cost roll-up — 9-category breakdown with $/W toggle | Auto card under Live Summary |

---

## Keyboard shortcuts

| Shortcut | Action |
|----------|--------|
| `⌘K` / `Ctrl+K` | Open command palette |
| `⌘Z` / `Ctrl+Z` | Undo |
| `⌘⇧Z` / `Ctrl+Shift+Z` | Redo |
| `⌘S` / `Ctrl+S` | Save current project |
| `?` | Replay onboarding tour |
| `Esc` | Close any overlay |

---

## ZIP defaults coverage

The ZIP lookup uses a 3-digit ZIP-prefix → state map (covering all 50 states + DC + PR), with overlays for special hazard zones:

| ZIP range | Override |
|-----------|----------|
| 330–334 | South Florida coast / Keys (Cat 4–5 wind, exp D, 165–175 mph) |
| 275, 278 | NC Outer Banks (140–150 mph, exp D) |
| 770, 773–775, 779 | Texas Gulf Coast (140–150 mph, exp D) |
| 900, 902 | Greater Los Angeles (SDS up to 1.1) |
| 940, 941, 945, 946 | SF Bay Area (SDS 0.95–1.0) |
| 142 | Buffalo / lake-effect snow (80 psf) |
| 047 | Northern Maine (80 psf snow, 72" frost) |
| 814, 816 | Colorado mountains (60–70 psf snow) |

Override keys: wind, exp, snow, frost, sds, seismic. Fallback is the state-level baseline (which has 7 fields plus narrative description for every state).

---

## Engineering console formulas

The live console shows the actual ASCE 7-22 calculation chain:

- **Wind uplift**: `qz = 0.00256 × Kz × Kzt × Kd × Ke × V²` then `p = qz × G × |GCp − GCpi|`
- **Snow on collector**: `pf = 0.7 × Ce × Ct × Is × pg`, then `ps = Cs × pf`
- **Seismic component force**: `Fp/Wp = 0.4 × ap × SDS × (1 + 2·z/h) × Ip / Rp`
- **PV production (PVWatts-style)**: `E = kW_DC × I × 365 × η_temp × (1 − L) × η_inv`

Each block shows inputs, intermediate values, ASCE section citations, and includes a flag for the open ±10°/±1° tilt-tolerance discrepancy you noted earlier.

---

## Storage keys

The module uses its own keys, leaving your existing `sems_array_builder_v2` save untouched:

- `sems_saas_v1` — onboarding tour state, current project pointer
- `sems_saas_projects` — array of saved named projects (full state per project)

---

## Compatibility · what the SaaS layer reads from the host

**State** (read via `new Function()` accessors that resolve `let`-declared bindings):
- `layoutState`, `_nextSectionId`, `_nextRowId`

**Functions** (read or wrapped):
- `getFormState()`, `setFormState()`, `getSectionModuleCount()`, `toast()`, `syncPanelFields()`
- Wrapped for undo capture: `addRow`, `addSectionToRow`, `removeRow`, `removeSectionById`, `duplicateSection`, `quickAdd`, `clearLayout`, `autoBalance`, `convertAll`, `generateSystem`, `setFormState`, `resetAll`
- Called when available (graceful fallback): `renderCanvas`, `recalcAll`, `saveProject`, `restoreProject`, `printFull`, `printBom`, `exportBomCsv`, `exportSummaryCsv`, `copyBom`

**Constants**: `PANELS`, `INVERTERS`, `APP_DEFAULTS`

**DOM**: detects existing `card-project`, `card-builder`, `card-config`, `card-site`, `card-foundation`, `card-summary`, `card-bom`, `card-export` IDs and injects status pills + nav anchors.

---

## Print

The layer hides itself entirely under `@media print` so existing report layouts are unaffected. All your engineering reports, BOM exports, and PDF generation continue working as before.

---

## Removal

Delete the SaaS layer block (everything between `<!-- SEMS SAAS LAYER · Phase 1 + 2 -->` and the final closing comment) from `configurator.html`. No state is lost — your original `sems_array_builder_v2` save is preserved.

---

## What's coming next

**Phase 4 (Customer-facing):** URL-encoded share links, presentation mode (3-slide auto-build), branded PDF export, specifier mode (engineering-hidden view), full project package zip via JSZip.

**Phase 5 (Visual):** Three.js 3D preview tab, sun-path / shading sim, heatmap overlay, dark mode, mobile-first canvas.

---

## Brand fidelity

The module uses your existing CSS variables (`--blue-700`, `--gray-500`, `--font-body`, `--radius-lg`, `--shadow-md`, etc.) so it inherits any future theme tweaks. No standalone color or font definitions.

---

## Validation

Tested against the patched `configurator.html` in jsdom: 43/43 functional checks pass, including:

- All 16 host functions (`addRow`, `generateSystem`, `getFormState`, etc.) intact
- All 8 host card sections detected and tagged
- All 11 SaaS UI elements rendered
- ZIP lookups (PA, FL hurricane, FL Keys, CA seismic, LA, Buffalo) verified
- ASCE wind/snow/seismic compute returns sane values
- Production calc returns 100+ MWh/yr for 500 kW DC
- Cost roll-up returns sane $/W (0.50–2.00 range)
- Undo correctly reverts host's `layoutState` (proves cross-script `let` access via `new Function()` works)
- Redo restores
- One generation = one undo entry (template/wizard apply as single undo unit)
