# Changelog

## SaaS Layer Rollout · 2026-05-06

### Added — `site/configurator.html`

Four integrated modules adding 16 SaaS-grade features without modifying any of the original 5,584 lines of the configurator. The new code is appended as a single block immediately above `</body>`, extending the file from 5,584 → 10,845 lines.

**Phase 1 · Foundation**
- Section nav rail (left side, fixed) with scroll-spy active state
- Sticky progress bar with kW DC, section count, undo/redo, ⌘K trigger
- Validation badges on all 8 cards (empty / partial / complete / warning)
- Command palette (⌘K) with ~30 fuzzy-searchable actions
- Undo / Redo (⌘Z / ⌘⇧Z) with 30-deep stack, captures both layout mutations and form changes
- Multi-project workspace drawer with save / rename / duplicate / delete

**Phase 2 · Walkthrough**
- First-run guided tour (6 spotlight steps, smart-gated to skip for returning users)
- Quick Start wizard — 5-step flow that auto-fills 20+ ASCE 7-22 inputs from 3 high-level questions
- Templates gallery — 6 starter projects (Blank, PA 250 kW Commercial, FL Hurricane 500 kW Cat 4, Agri-PV 1 MW, CA Seismic 750 kW, Demo 100 kW)

**Phase 3 · Intelligence**
- ZIP defaults — auto-suggest wind speed, exposure, snow, frost, SDS, seismic Cat, irradiance from a 5-digit ZIP. Coverage: all 50 states + DC + PR via 3-digit prefix lookup, with hazard overlays for South FL, NC Outer Banks, TX Gulf Coast, SF Bay, LA, Buffalo, Northern Maine, and CO mountains
- Live engineering console — slide-out right rail showing ASCE 7-22 wind pressure, snow load, and seismic force calculations with full formula traceability and section citations. Includes the open ±10°/±1° tilt tolerance discrepancy as a flagged engineering note
- Year-1 PV production — PVWatts-style estimate with capacity factor and revenue at $0.10/kWh. Auto-detects ZIP from address for irradiance
- Cost roll-up — 9-category breakdown with $/W toggle and stacked bar visualization

**Phase 4 · Visualization**
- 3D preview tab — orbit-able Three.js scene built from the actual layout state, with realistic tilt, ground clearance, panel & section spacing, support posts, and panel outlining. Custom orbit/zoom/pan controls (mouse + touch). Three.js lazy-loaded from cdnjs only when the modal opens (zero impact on initial page load)
- Sun-path / shading toy — SunCalc-style astronomy inlined as ~80 lines (no external dependency). Three sun-path arcs (summer / equinox / winter) projected onto a polar SVG widget with current sun position marker. Time-of-day slider drives both the SVG marker and the 3D scene's directional light, so adjacent-row shadows appear realistically at any chosen hour. Lat/lng auto-derived from site ZIP via Phase 3 lookup; 50-state centroid table
- Heatmap overlay on 2D canvas — color sections by DC kW, panel count, section cost, or wind load factor. The wind-load mode applies ASCE 7-22 zone amplification (corner = 1.5×, edge = 1.2×, interior = 1.0×) for instant visual diagnostics. Inline color-scale legend with min/max readouts

### Architecture

- All features are namespaced under `window.SAAS` with sub-namespaces: `palette`, `wizard`, `modal`, `drawer`, `tour`, `undo`, `engcon`, `zip`, `compute`, `intel`, `viz3d`
- Host's `let layoutState`, `let _nextSectionId`, `let _nextRowId` are reached via `new Function()` accessors that run in global scope
- Mutator functions are wrapped via monkey-patching to capture undo snapshots
- `renderCanvas` is wrapped in Phases 3 and 4 to refresh derived UI (engineering console, intel cards, heatmap)
- Templates and wizard apply changes within a `withoutCapture()` block — one undo unit per multi-step apply
- Storage keys are namespaced (`sems_saas_v1`, `sems_saas_projects`) leaving the existing `sems_array_builder_v2` host save completely untouched
- All UI uses existing CSS variables — no standalone tokens
- The entire layer is hidden under `@media print` so existing report layouts and PDF exports are unaffected
- Three.js is the only external dependency, loaded on demand from `cdnjs.cloudflare.com`. SunCalc is inlined.

### Validation

20/20 functional checks pass for Phase 4 against the patched configurator running in jsdom, plus 43/43 from the prior phases. End-to-end coverage:
- All 16 host functions intact
- All 8 host card sections detected and tagged
- All UI surfaces from all 4 phases attach cleanly (rail, progress, palette, wizard, templates, drawer, tour, FABs, eng console, intel cards, heat toolbar, 3D modal, sun-path SVG)
- ZIP lookups correct (PA, FL hurricane, FL Keys, CA seismic, LA, Buffalo)
- ASCE compute returns sane wind/snow/seismic values
- Production calc returns 100+ MWh/yr for 500 kW DC
- Cost roll-up returns sane $/W (0.50–2.00 range)
- Undo/redo correctly mutates host's `layoutState` (proves cross-script `let` access)
- One generation = one undo entry (template/wizard apply as single undo unit)
- Heatmap colors real `.sec-block` elements in 4 modes
- Wind heatmap shows position-based variation (corner ≠ interior)

### Files

- **`site/configurator.html`** — patched (5,584 → 10,845 lines)
- `site/saas/sems-saas-phase-1-2.html` — source module Phases 1+2
- `site/saas/sems-saas-phase-3.html` — source module Phase 3
- `site/saas/sems-saas-phase-4.html` — source module Phase 4
- `site/saas/INTEGRATION.md` — full integration documentation
- `site/saas/sems-saas-DEMO.html` — standalone demo with mocked configurator API

### Roadmap

**Phase 5 (Customer-facing) — pending:** URL-encoded share links, presentation mode (3-slide auto-build), branded PDF export, specifier mode, project package zip via JSZip.
