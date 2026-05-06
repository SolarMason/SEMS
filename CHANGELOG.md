# Changelog

## SaaS Layer Rollout · 2026-05-06

### Added — `site/configurator.html`

Five integrated modules adding 16 SaaS-grade features plus a structural correction. The original 5,584-line configurator is unchanged above the SaaS layer block; new code occupies lines 5,589–11,162.

**Phase 1 · Foundation:** nav rail, progress bar, validation badges, command palette (⌘K), undo/redo, multi-project workspace.

**Phase 2 · Walkthrough:** first-run tour, Quick Start wizard, templates gallery.

**Phase 3 · Intelligence:** ZIP defaults, live engineering console (ASCE 7-22), year-1 PV production, cost roll-up.

**Phase 4 · Visualization:**
- 3D preview tab — orbit-able Three.js scene with hemisphere-aware sun-facing orientation. Northern hemisphere → panels face south (rotation.x = +tilt, south edge low, north edge high). Southern hemisphere → panels face north. Geometry is one continuous tilted plane per section with a structural rail at the join line and posts shared between adjacent sections.
- Sun-path / shading toy — full-circle stereographic projection with proper compass cardinal placement (N up, E right, S down, W left). SunCalc azimuth correctly maps to compass azimuth (compass = az + π). Includes a panel-direction marker at center so the visual alignment between sun arc and panel orientation is unambiguous.
- Heatmap overlay — color sections by DC kW, panel count, cost, or wind load factor with ASCE 7-22 zone amplification.

**Phase 4.1 · Structural correction:**
- `SECTION_RULES['8'].posts` and `['10'].posts` patched from 4 → 2
- `calculateProjectTotals` wrapped so `totals.posts = total_sections + num_layout_rows`
- `generateBom` wrapped to add explanatory note on the post line
- Engineering console callout: corrected post count means each interior post supports a full section's tributary area, not 1/4 — uplift per post is ~4× higher than the host's stock ASCE calculation indicates

### Validation

- All 4 cardinal sun-path projection tests pass (south plots at S label, north at N label, east at E label, west at W label)
- Northern hemisphere noon: sun plots below center, panel direction marker also below center → ALIGNED
- Southern hemisphere noon (Sydney summer solstice): sun plots above center, panel direction marker also above center → ALIGNED
- 12/12 integration tests pass against the patched configurator: SECTION_RULES correctly patched, post formula correct, BOM line has share note, heatmap functional, undo/redo functional, all phases attached
- Multi-row math: 3 rows × 4 sections = 12 sections + 3 rows = **15 posts** (was 48)

### Files

- **`site/configurator.html`** — patched (5,584 → 11,163 lines)
- `site/saas/sems-saas-phase-1-2.html` — Phases 1+2 source
- `site/saas/sems-saas-phase-3.html` — Phase 3 source
- `site/saas/sems-saas-phase-4.html` — Phase 4 source (with corrected geometry + sun-path widget)
- `site/saas/sems-saas-phase-4-1.html` — Phase 4.1 structural correction
- `site/saas/INTEGRATION.md` — full feature documentation
- `site/saas/sems-saas-DEMO.html` — standalone demo with mocked configurator API
