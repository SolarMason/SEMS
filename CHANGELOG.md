# Changelog

## SaaS Layer Rollout · 2026-05-06

### Added — `site/configurator.html`

Three integrated modules adding 13 SaaS-grade features without modifying any of the original 5,584 lines of the configurator. The new code is appended as a single block immediately above `</body>`.

**Phase 1 · Foundation**
- Section nav rail (left side, fixed) with scroll-spy active state
- Sticky progress bar with kW DC, section count, undo/redo, ⌘K trigger
- Validation badges on all 8 cards (empty / partial / complete / warning)
- Command palette (⌘K) with ~30 fuzzy-searchable actions across Layout, Navigation, Project, Export, Help, Edit groups
- Undo / Redo (⌘Z / ⌘⇧Z) with 30-deep stack, captures both layout mutations and form changes (debounced)
- Multi-project workspace drawer with save / rename / duplicate / delete

**Phase 2 · Walkthrough**
- First-run guided tour (6 spotlight steps, smart-gated to skip for returning users with existing data)
- Quick Start wizard — 5-step flow that auto-fills 20+ ASCE 7-22 inputs from 3 high-level questions (terrain, soil, hazard zone)
- Templates gallery — 6 starter projects (Blank, PA 250 kW Commercial, FL Hurricane 500 kW Cat 4, Agri-PV 1 MW, CA Seismic 750 kW, Demo 100 kW)

**Phase 3 · Intelligence**
- ZIP defaults — type a 5-digit ZIP, get auto-suggested wind speed, exposure, snow, frost, SDS, seismic Cat, and irradiance. Coverage: all 50 states + DC + PR via 3-digit prefix lookup, with hazard overlays for South FL, NC Outer Banks, TX Gulf Coast, SF Bay, LA, Buffalo, Northern Maine, and CO mountains
- Live engineering console — slide-out right rail showing ASCE 7-22 wind pressure, snow load, and seismic force calculations with full formula traceability and section citations. Includes the open ±10°/±1° tilt tolerance discrepancy as a flagged engineering note
- Year-1 PV production — PVWatts-style estimate with capacity factor and revenue at $0.10/kWh. Auto-detects ZIP from address for irradiance
- Cost roll-up — 9-category breakdown (modules, inverters, optimizers, racking, foundation, BoS, labor, permitting, contingency) with $/W toggle and stacked bar visualization

### Architecture

- All features are namespaced under `window.SAAS` with sub-namespaces: `palette`, `wizard`, `modal`, `drawer`, `tour`, `undo`, `engcon`, `zip`, `compute`, `intel`
- Host's `let layoutState`, `let _nextSectionId`, `let _nextRowId` are reached via `new Function()` accessors that run in global scope (these bindings are not exposed on `window`)
- Mutator functions (`addRow`, `generateSystem`, etc.) are wrapped via monkey-patching to capture undo snapshots
- Templates and wizard apply changes within a `withoutCapture()` block so a multi-step apply produces a single undo unit
- Storage keys are namespaced (`sems_saas_v1`, `sems_saas_projects`) leaving the existing `sems_array_builder_v2` host save completely untouched
- All UI uses existing CSS variables (`--blue-700`, `--gray-500`, `--font-body`, `--radius-lg`, etc.) — no standalone tokens
- The entire layer is hidden under `@media print` so existing report layouts and PDF exports are unaffected

### Validation

43/43 functional checks pass against the patched configurator running in jsdom, covering host integrity (all 16 functions, all 8 cards), SAAS attachment (all 11 UI elements, status pills on every card), ZIP lookup correctness, ASCE compute, cost / production calc, and undo/redo round-trips on the real `layoutState`.

### Files

- **`site/configurator.html`** — patched (5,584 → 9,403 lines)
- `site/saas/sems-saas-phase-1-2.html` — source module for Phases 1+2
- `site/saas/sems-saas-phase-3.html` — source module for Phase 3
- `site/saas/INTEGRATION.md` — full integration documentation
- `site/saas/sems-saas-DEMO.html` — standalone demo with mocked configurator API for testing in isolation

### Roadmap

**Phase 4 (Customer-facing) — pending:** URL-encoded share links, presentation mode (3-slide auto-build), branded PDF export, specifier mode, project package zip via JSZip.

**Phase 5 (Visual) — pending:** Three.js 3D preview, sun-path / shading sim, heatmap overlay, dark mode, mobile-first canvas.
