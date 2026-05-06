# Changelog

## SaaS Layer Rollout · 2026-05-06

### Added — `site/configurator.html`

Five integrated modules adding 16 SaaS-grade features plus a critical structural correction. The original 5,584-line configurator is unchanged above the SaaS layer block; new code occupies lines 5,589–11,123.

**Phase 1 · Foundation:** nav rail, progress bar, validation badges, command palette (⌘K), undo/redo, multi-project workspace.

**Phase 2 · Walkthrough:** first-run tour (smart-gated for returning users), Quick Start wizard, templates gallery (6 starters).

**Phase 3 · Intelligence:** ZIP defaults (50 states + DC + PR + hazard overlays), live engineering console (ASCE 7-22 formulas), year-1 PV production, 9-category cost roll-up.

**Phase 4 · Visualization:**
- 3D preview tab — Three.js orbit-able scene with **same-direction continuous tilted plane** geometry matching SEMS Avans product reality. Both module rows of a section share a join line where the bearing rail and posts attach. Custom orbit/zoom/pan controls with touch support. Three.js lazy-loaded only when modal opens.
- Sun-path / shading toy — SunCalc-style astronomy inlined (~80 lines). Three sun arcs (summer / equinox / winter) projected onto polar SVG. Time-of-day slider drives both the SVG marker and the 3D scene's directional light, so adjacent-row shadows update realistically. Lat/lng auto-derived from site ZIP.
- Heatmap overlay — color sections by DC kW, panel count, section cost, or **wind load factor** with ASCE 7-22 zone amplification (corner = 1.5×, edge = 1.2×, interior = 1.0×).

**Phase 4.1 · Structural correction (BOM + engineering):**
- Patches `SECTION_RULES['8'].posts` and `['10'].posts` from 4 → 2 (per-section count, before sharing)
- Wraps `calculateProjectTotals` so `totals.posts = total_sections + num_layout_rows` (the correct material count given that adjacent sections share boundary posts)
- Wraps `generateBom` to add an explanatory note on the post line item ("adjacent sections share boundary posts")
- Wraps the engineering console refresh to inject a callout: corrected post count means each interior post supports a full section's tributary area (not 1/4), so uplift per post is ~4× higher than the host's stock ASCE calculation indicates — relevant for foundation sizing review

This corrects a long-standing misalignment between the host's BOM logic and SEMS's actual product geometry. Verified against multiple layouts:

| Layout | Old | Corrected |
|--------|-----|-----------|
| 5 sections × 1 row | 20 | 6 |
| 4 sections × 3 rows | 48 | 15 |
| 1 MW (~40 sections × 4 rows) | 160 | 44 |

### Architecture

- All features namespaced under `window.SAAS` with sub-namespaces: `palette`, `wizard`, `modal`, `drawer`, `tour`, `undo`, `engcon`, `zip`, `compute`, `intel`, `viz3d`
- Host's `let layoutState`, `_nextSectionId`, `_nextRowId`, `const SECTION_RULES` are reached via `new Function()` accessors that run in global scope
- Storage keys are namespaced — host's `sems_array_builder_v2` is untouched
- The entire layer is hidden under `@media print` — existing report layouts and PDF exports continue working unchanged
- Three.js is the only external dependency, loaded on demand. SunCalc is inlined.

### Validation

44/44 functional checks pass against the patched configurator running in jsdom. End-to-end coverage for all 4 phases, plus dedicated structural-correction tests verifying that `SECTION_RULES` is correctly patched, `calculateProjectTotals` returns the corrected formula, and the BOM line includes the explanatory note.

### Files

- **`site/configurator.html`** — patched (5,584 → 11,124 lines)
- `site/saas/sems-saas-phase-1-2.html` — Phases 1+2 source
- `site/saas/sems-saas-phase-3.html` — Phase 3 source
- `site/saas/sems-saas-phase-4.html` — Phase 4 source
- `site/saas/sems-saas-phase-4-1.html` — Phase 4.1 structural correction
- `site/saas/INTEGRATION.md` — full feature documentation
- `site/saas/sems-saas-DEMO.html` — standalone demo with mocked configurator API

### Roadmap

**Phase 5 (Customer-facing) — pending:** URL-encoded share links, presentation mode, branded PDF export, specifier mode, project package zip via JSZip.
