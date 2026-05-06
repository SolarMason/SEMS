# SEMS SaaS Layer Rollout · Phases 1-4 + Structural Correction

Drop-in zip for the `solarmason/SEMS` repo.

## Use

1. Extract this zip into your local clone of `solarmason/SEMS`.
2. Commit and push:
   ```bash
   git add site/configurator.html site/saas/ CHANGELOG.md
   git commit -m "Add SaaS layer Phases 1-4 + structural correction (post count fix)"
   git push origin main
   ```
3. GitHub Pages will redeploy in ~60 seconds.

## What this fixes

**3D rendering:** rows now form one continuous tilted plane (same-direction tilt, joined at the rail line), with one post per side per section, posts shared between adjacent sections.

**BOM:** post count corrected from `4 × sections` to `sections + layout_rows`. For typical layouts, that's a 70-75% reduction in overstated posts.

**Engineering console:** flag added showing the implications of the corrected post count for tributary area and per-post uplift loads.

## Validation

44/44 tests pass: 20 structural correction tests (multi-row math, BOM line accuracy, SECTION_RULES patching) plus 24 regression tests across all prior phases.

## Rollback

```bash
git checkout HEAD~1 -- site/configurator.html
git commit -m "Rollback SaaS layer"
git push
```

User saves under `sems_array_builder_v2` are untouched by this layer.
