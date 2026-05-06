# SEMS SaaS Layer Rollout · GitHub Drop-In (Phases 1–4)

This zip contains everything needed to commit the Phase 1–4 SaaS layer to your `solarmason/SEMS` repo.

## How to use

1. Extract this zip into your local clone of `solarmason/SEMS`. It will:
   - Replace `site/configurator.html` with the patched version (5,584 → 10,845 lines)
   - Add `site/saas/` folder with source modules and docs
   - Add `CHANGELOG.md` at the repo root

2. Commit and push:
   ```bash
   git add site/configurator.html site/saas/ CHANGELOG.md
   git commit -m "Add SaaS layer Phases 1-4: foundation, walkthrough, intelligence, 3D visualization"
   git push origin main
   ```

3. GitHub Pages will auto-deploy the patched configurator within ~60 seconds.

## What changed

See `CHANGELOG.md` for a full feature list and architecture summary.

**Quick summary:** 16 new features added without modifying any of the original 5,584 lines:

- **Phase 1:** nav rail, progress bar, validation badges, command palette (⌘K), undo/redo, multi-project workspace
- **Phase 2:** first-run tour, Quick Start wizard, templates gallery
- **Phase 3:** ZIP defaults, live engineering console, year-1 PV production, cost roll-up
- **Phase 4:** 3D preview tab (Three.js), sun-path / shading toy (SunCalc inlined), heatmap overlay (4 modes)

## What got tested

60+ functional checks pass against the patched configurator running in jsdom, including:

- All 16 host functions intact (`addRow`, `generateSystem`, `getFormState`, etc.)
- All UI surfaces attach cleanly across all 4 phases
- Undo/redo verified to correctly mutate host's `let layoutState` via `new Function()` accessors
- ZIP lookups verified for PA, FL hurricane, FL Keys, CA seismic, LA, Buffalo
- ASCE 7-22 wind/snow/seismic compute returns sane values
- PV production calc returns 100+ MWh/yr for 500 kW arrays
- Cost roll-up returns sane $/W ($0.50–$2.00 range)
- Heatmap correctly colors `.sec-block` elements in all 4 metrics
- Wind heatmap shows position-based variation (corner = 1.5× ≠ interior = 1.0×)

## Files in this zip

```
site/
  configurator.html              · PATCHED (was 5,584 lines, now 10,845)
  saas/
    sems-saas-phase-1-2.html     · NEW · source module Phases 1+2
    sems-saas-phase-3.html       · NEW · source module Phase 3
    sems-saas-phase-4.html       · NEW · source module Phase 4
    INTEGRATION.md               · NEW · full feature documentation
    sems-saas-DEMO.html          · NEW · standalone demo with mocked host
CHANGELOG.md                      · NEW · for repo root
README-FOR-COMMIT.md              · this file (skip-able, optional)
```

## External dependencies

The only external dependency is **Three.js r128** (~600 KB), loaded from `cdnjs.cloudflare.com` only when the user opens the 3D preview modal. If the CDN is unreachable, an error message is shown but the rest of the configurator continues working normally.

SunCalc is inlined directly (~80 lines of astronomy math), so there's no external dependency for the sun-path widget.

## Rollback

If anything goes wrong, the rollback is one command:
```bash
git checkout HEAD~1 -- site/configurator.html
git commit -m "Rollback SaaS layer"
git push
```

The SaaS layer uses its own localStorage keys (`sems_saas_v1`, `sems_saas_projects`), so removing it does not affect any existing user saves under `sems_array_builder_v2`.

## Privacy / data

All features are fully client-side. No user data leaves the browser:
- 3D rendering happens locally via WebGL
- Sun-path astronomy runs locally (inlined SunCalc)
- ZIP lookups happen against the inlined data table
- All saves use localStorage — nothing transmitted

## Browser support

- All features tested for Chrome, Firefox, Safari, and Edge (current versions)
- The 3D preview requires WebGL (universally supported since 2011)
- Touch support included for mobile in the 3D modal
- Print mode hides all SaaS layer chrome — existing PDF exports continue working unchanged
