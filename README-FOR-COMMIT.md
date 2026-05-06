# SEMS SaaS Layer Rollout · Phases 1-4 + Structural Correction

Drop-in zip for the `solarmason/SEMS` repo.

## Use

1. Extract this zip into your local clone of `solarmason/SEMS`.
2. Commit and push:
   ```bash
   git add site/configurator.html site/saas/ CHANGELOG.md
   git commit -m "Add SaaS layer Phases 1-4 + structural correction"
   git push origin main
   ```
3. GitHub Pages will redeploy in ~60 seconds.

## What's in this update

**3D rendering:** rows form one continuous tilted plane (same-direction tilt, joined at the rail line). One post per side per section, shared between adjacent sections. **Panels face the sun** (south in northern hemisphere, north in southern hemisphere — derived from the site ZIP).

**Sun-path widget:** rebuilt as a proper full-circle stereographic plot. North at top, south at bottom, east right, west left. SunCalc azimuth = 0 (south) now correctly plots at the bottom of the dome where the S label sits. A blue marker at center shows the panel direction so you can visually verify alignment.

**BOM:** post count corrected from `4 × sections` to `sections + layout_rows`.

**Engineering console:** flag added showing tributary area implications of the corrected post count.

## Validation

12/12 integration tests pass · 4/4 sun-path cardinal tests pass · Northern + southern hemisphere alignment verified.

## Rollback

```bash
git checkout HEAD~1 -- site/configurator.html
git commit -m "Rollback SaaS layer"
git push
```
