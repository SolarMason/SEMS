# SEMS Configurator · SaaS Layer (Phases 1–4)

A drop-in module suite that adds 16 SaaS-style features to `configurator.html` without requiring any edits to the rest of the file.

This patch ships with the layer **already integrated** into `site/configurator.html`. The standalone source modules in this folder are provided for reference and future maintenance.

---

## What's already done

`site/configurator.html` has all four SaaS modules pasted directly above its closing `</body>` tag. Reload the page in any modern browser to see all features active.

The original 5,584-line configurator is unchanged above the SaaS layer block; the new code occupies lines 5,589–10,845.

---

## What you get (16 features)

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
| 9 | Templates gallery (6 starter projects) | Bottom-right `✦` button |

### Phase 3 · Intelligence

| # | Feature | Access |
|---|---------|--------|
| 10 | ZIP defaults — auto-suggest 7 ASCE 7-22 inputs from address | Type a 5-digit ZIP in Site Address |
| 11 | Live engineering console — wind / snow / seismic / production with formulas | `Σ` rail icon or FAB |
| 12 | Year-1 PV production (PVWatts-style) — kWh, capacity factor, $ revenue | Auto card under Live Summary |
| 13 | Cost roll-up — 9-category breakdown with $/W toggle | Auto card under Live Summary |

### Phase 4 · Visualization

| # | Feature | Access |
|---|---------|--------|
| 14 | 3D preview — orbit-able Three.js scene with realistic tilt, ground clearance, posts, panel layout | "Open in 3D" button on builder card head, or `⊡` FAB |
| 15 | Sun-path / shading toy — solstice + equinox arcs, time-of-day slider, live shadow rendering at any date/hour | Right panel of 3D modal |
| 16 | Heatmap overlay on 2D canvas — color sections by DC kW, panels, cost, or wind load (with edge-effect amplification) | Dropdown on builder card head |

---

## Keyboard shortcuts

| Shortcut | Action |
|----------|--------|
| `⌘K` / `Ctrl+K` | Open command palette |
| `⌘Z` / `Ctrl+Z` | Undo |
| `⌘⇧Z` / `Ctrl+Shift+Z` | Redo |
| `⌘S` / `Ctrl+S` | Save current project |
| `?` | Replay onboarding tour |
| `Esc` | Close any overlay (including 3D modal) |

---

## Phase 4 specifics

### 3D preview

- Lazy-loads Three.js (r128) from cdnjs only when the modal opens, so initial page load is unaffected
- Reads tilt angle, ground clearance, panel dimensions, row spacing, section spacing, and layout row gap from your existing form fields and renders a geometrically accurate scene
- Each section: panels tilted, posts at corners, panels outlined for a crisp engineering look
- Custom orbit controls: drag to rotate, scroll to zoom, shift+drag to pan; touch support included
- Realistic directional sun light with PCF-soft shadows at user-selected date/time
- Ground plane receives shadows so adjacent-row shading is visible

### Sun-path & shading

- SunCalc-style astronomy inlined as ~80 lines (no external dependency)
- Picks lat/lng from your site's ZIP via Phase 3's lookup; falls back to Scranton, PA (SEMS HQ)
- Three preset dates: Jun 21 (summer solstice), Sep 21 (equinox), Dec 21 (winter solstice)
- Time-of-day slider: 6 AM – 6 PM, 15-minute resolution
- Live readout: lat, lng, sun azimuth (°), sun altitude (°)
- Polar sun-path SVG widget showing all three arcs colored: amber (summer), blue (equinox), white-dashed (winter), with current sun position marker
- 3D scene's directional light position derives from SunCalc → shadows on the array reflect actual sun geometry

### Heatmap overlay

Four metrics, with inline color-scale legend:

| Mode | Scale | Use case |
|------|-------|----------|
| **DC kW per section** | white → SEMS deep blue | Production planning |
| **Panel count** | white → SEMS primary blue | Procurement |
| **Section cost ($)** | cream → burnt orange | Budget visualization |
| **Wind load factor** | green → red, with edge effect | Engineering review (corner = 1.5×, edge = 1.2×, interior = 1.0×) |

The wind-load mode is especially valuable: ASCE 7-22 zone-based pressure coefficients mean corner sections see ~50% more uplift than interior sections. The heatmap makes this immediately visible — useful for engineering reviews and design discussions.

---

## ZIP defaults coverage (Phase 3)

The ZIP lookup uses a 3-digit ZIP-prefix → state map (covering all 50 states + DC + PR), with overlays for special hazard zones:

| ZIP range | Override |
|-----------|----------|
| 330–334 | South Florida coast / Keys (Cat 4–5 wind, exp D) |
| 275, 278 | NC Outer Banks |
| 770, 773–775, 779 | Texas Gulf Coast |
| 900, 902 | Greater Los Angeles (SDS up to 1.1) |
| 940, 941, 945, 946 | SF Bay Area (SDS 0.95–1.0) |
| 142 | Buffalo / lake-effect snow (80 psf) |
| 047 | Northern Maine |
| 814, 816 | Colorado mountains |

---

## Engineering console formulas (Phase 3)

The live console shows the actual ASCE 7-22 calculation chain:

- **Wind uplift**: `qz = 0.00256 × Kz × Kzt × Kd × Ke × V²` then `p = qz × G × |GCp − GCpi|`
- **Snow on collector**: `pf = 0.7 × Ce × Ct × Is × pg`, then `ps = Cs × pf`
- **Seismic component force**: `Fp/Wp = 0.4 × ap × SDS × (1 + 2·z/h) × Ip / Rp`
- **PV production (PVWatts-style)**: `E = kW_DC × I × 365 × η_temp × (1 − L) × η_inv`

Each block shows inputs, intermediate values, ASCE section citations, and includes a flag for the open ±10°/±1° tilt-tolerance discrepancy.

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
- Wrapped for heatmap re-application: `renderCanvas`
- Called when available (graceful fallback): `recalcAll`, `saveProject`, `restoreProject`, `printFull`, `printBom`, `exportBomCsv`, `exportSummaryCsv`, `copyBom`

**Constants**: `PANELS`, `INVERTERS`, `APP_DEFAULTS`

**DOM**: detects existing `card-project`, `card-builder`, `card-config`, `card-site`, `card-foundation`, `card-summary`, `card-bom`, `card-export` IDs and injects status pills + nav anchors. Reads `.sec-block[data-secid]` elements for heatmap.

---

## External dependencies (Phase 4 only)

- **Three.js r128** (~600 KB) lazy-loaded from `cdnjs.cloudflare.com` when the user opens the 3D modal. If the CDN is unreachable, an error message is shown but the rest of the configurator continues working.

---

## Print

The layer hides itself entirely under `@media print` so existing report layouts are unaffected.

---

## Removal

Delete the SaaS layer block (everything between `<!-- SEMS SAAS LAYER · Phase 1 + 2 -->` and the final `<!-- END SEMS SAAS LAYER · Phase 4 (Visualization) -->` comment) from `configurator.html`. No state is lost.

---

## What's coming next

**Phase 5 (Customer-facing) — pending:** URL-encoded share links, presentation mode (3-slide auto-build), branded PDF export, specifier mode (engineering-hidden view), full project package zip via JSZip.

---

## Validation

Tested against the patched `configurator.html` running in jsdom: 20/20 functional checks pass for Phase 4 against the real host. Heatmap actually colors `.sec-block` elements (kW, wind, and cost modes verified), wind-load heatmap shows position-based variation (corner ≠ interior), reset cleanly clears colors. Combined with prior phases, 60+ checks total against the real configurator.

---

## Brand fidelity

The module uses your existing CSS variables (`--blue-700`, `--gray-500`, `--font-body`, `--radius-lg`, `--shadow-md`, etc.) so it inherits any future theme tweaks. The 3D modal uses a dark navy gradient (`#0a1828` → `#1B3A5C`) consistent with the SEMS deep blue palette. Sun arc colors: amber (summer), brand blue (equinox), white (winter).
