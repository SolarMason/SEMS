# SEMS SaaS Layer Rollout · GitHub Drop-In

This zip contains everything needed to commit the Phase 1–3 SaaS layer to your `solarmason/SEMS` repo.

## How to use

1. Extract this zip into your local clone of `solarmason/SEMS`. It will:
   - Replace `site/configurator.html` with the patched version (5,584 → 9,403 lines)
   - Add `site/saas/` folder with source modules and docs
   - Add `CHANGELOG.md` at the repo root

2. Commit and push:
   ```bash
   git add site/configurator.html site/saas/ CHANGELOG.md
   git commit -m "Add SaaS layer Phases 1-3: nav rail, command palette, undo/redo, multi-project, tour, wizard, templates, ZIP defaults, engineering console, PV production, cost roll-up"
   git push origin main
   ```

3. GitHub Pages will auto-deploy the patched configurator within ~60 seconds.

## What changed

See `CHANGELOG.md` (at the zip root, lands at the repo root) for a full feature list and architecture summary.

## What got tested

- `site/configurator.html` runs cleanly in jsdom with all 16 host functions intact
- All 11 SAAS UI elements attach without errors
- Undo/redo verified to correctly mutate the host's `let layoutState` via `new Function()` accessors
- ZIP defaults verified for PA, FL hurricane, FL Keys, CA seismic, LA, Buffalo
- ASCE 7-22 compute returns sane wind/snow/seismic values
- Production calc returns 100+ MWh/yr for 500 kW DC arrays
- 43/43 functional checks pass

## Files in this zip

```
site/
  configurator.html              · PATCHED (was 5584 lines, now 9403)
  saas/
    sems-saas-phase-1-2.html     · NEW · source module Phase 1+2
    sems-saas-phase-3.html       · NEW · source module Phase 3
    INTEGRATION.md               · NEW · full feature documentation
    sems-saas-DEMO.html          · NEW · standalone demo with mocked host
CHANGELOG.md                      · NEW · for repo root
README-FOR-COMMIT.md              · this file (you can skip committing it)
```

## Rollback

If anything goes wrong, the rollback is one command:
```bash
git checkout HEAD~1 -- site/configurator.html
git commit -m "Rollback SaaS layer"
git push
```

The SaaS layer uses its own localStorage keys (`sems_saas_v1`, `sems_saas_projects`), so removing it does not affect any existing user saves under `sems_array_builder_v2`.
