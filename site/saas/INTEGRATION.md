# SEMS Configurator · SaaS Layer (Phases 1–4 + Structural Correction)

A drop-in module suite that adds 16 SaaS-style features to `configurator.html` plus a structural correction for the BOM's post counting and panel/sun orientation. Already integrated into `site/configurator.html`.

The original 5,584-line configurator is unchanged above the SaaS layer block. New code occupies lines 5,589–11,162.

---

## Features

### Phase 1 · Foundation
1. Section nav rail · 2. Sticky progress bar · 3. Validation badges · 4. Command palette (⌘K) · 5. Undo / Redo · 6. Multi-project workspace

### Phase 2 · Walkthrough
7. First-run guided tour · 8. Quick Start wizard · 9. Templates gallery

### Phase 3 · Intelligence
10. ZIP defaults · 11. Live engineering console · 12. Year-1 PV production · 13. Cost roll-up

### Phase 4 · Visualization
14. **3D preview** · panels rendered with proper sun-facing orientation (south-facing in northern hemisphere, north-facing in southern hemisphere — derived from the site ZIP's lat/lng), one continuous tilted plane per section, posts shared at section boundaries
15. **Sun-path / shading toy** · full-circle stereographic plot with proper compass cardinal placement (N up, E right, S down, W left). The widget includes a panel-direction marker showing which way the panels face, so you can visually verify alignment with the sun arc
16. **Heatmap overlay** · DC kW, panel count, cost, or wind load factor (with edge-effect amplification)

### Phase 4.1 · Structural correction
- Patches `SECTION_RULES['8'].posts` and `['10'].posts` from 4 → 2
- Wraps `calculateProjectTotals` so `totals.posts = sections + rows`
- Adds clarifying note to BOM post line
- Adds engineering correction callout in the live console

---

## What's correct now

The 3D rendering uses hemisphere-aware tilt direction so panels always face the sun:

| Hemisphere | Panel face | 3D rotation |
|------------|-----------|-------------|
| Northern (lat ≥ 0) | South | rotation.x = +tilt |
| Southern (lat < 0) | North | rotation.x = −tilt |

The sun-path widget uses a proper full-circle stereographic projection where SunCalc's azimuth = 0 (south) plots at the south side of the dome. A blue marker at the center shows which way panels are facing — at noon, the sun marker should sit close to or align with the panel direction marker.

---

## Post count correction

| Layout | Old stock count | Corrected count |
|--------|-----------------|-----------------|
| 1 row × 5 sections | 20 posts | **6 posts** (5 + 1) |
| 3 rows × 4 sections | 48 posts | **15 posts** (12 + 3) |
| 1 MW typical (40 sections, 4 rows) | 160 posts | **44 posts** |

**Formula:** `total_posts = total_sections + num_layout_rows`

---

## Keyboard shortcuts

| Shortcut | Action |
|----------|--------|
| `⌘K` / `Ctrl+K` | Command palette |
| `⌘Z` / `⌘⇧Z` | Undo / Redo |
| `⌘S` | Save current project |
| `?` | Replay tour |
| `Esc` | Close any overlay |

---

## File order

The 5 modules must load in this order (already correct in the patched configurator):

1. `sems-saas-phase-1-2.html`
2. `sems-saas-phase-3.html`
3. `sems-saas-phase-4.html`
4. `sems-saas-phase-4-1.html`

---

## Storage

- `sems_saas_v1` — tour state, current project pointer
- `sems_saas_projects` — saved named projects

The host's `sems_array_builder_v2` is untouched.

---

## External dependencies

Three.js r128 lazy-loaded from cdnjs only when the 3D modal opens. SunCalc is inlined.

---

## Print

The entire SaaS layer hides under `@media print`. Existing report layouts unaffected.
