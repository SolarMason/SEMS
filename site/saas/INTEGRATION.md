# SEMS Configurator · SaaS Layer (Phases 1–4 + Structural Correction)

A drop-in module suite that adds 16 SaaS-style features to `configurator.html` plus a critical structural correction to the BOM's post counting. Already integrated into `site/configurator.html`.

The original 5,584-line configurator is unchanged above the SaaS layer block. New code occupies lines 5,589–11,123.

---

## Critical correction · post counting (Phase 4.1)

The host configurator (and its inline README at line 3527) assumed **4 posts per section** — corner-style placement.

The actual SEMS Avans product geometry uses **2 posts per section** (one each side, centered on the rail join line where the two module rows meet), and **adjacent sections share their boundary post**.

| Layout | Old stock count | Corrected count |
|--------|-----------------|-----------------|
| 1 row × 5 sections | 20 posts | **6 posts** (5 + 1) |
| 3 rows × 4 sections | 48 posts | **15 posts** (12 + 3) |
| 1 MW typical (40 sections, 4 rows) | 160 posts | **44 posts** (40 + 4) |

**Formula:** `total_posts = total_sections + num_layout_rows`

The 3D preview (Phase 4) renders this geometry correctly: same-direction continuous tilted plane, posts shared at section boundaries. The BOM, summary, and CSV exports now all reflect the corrected count. The engineering console shows a flagged note that interior post tributary area is ~4× higher than the stock host calculation, which has implications for foundation sizing.

---

## What you get (16 features + structural correction)

### Phase 1 · Foundation
1. Section nav rail · 2. Sticky progress bar · 3. Validation badges · 4. Command palette (⌘K) · 5. Undo / Redo · 6. Multi-project workspace

### Phase 2 · Walkthrough
7. First-run guided tour · 8. Quick Start wizard · 9. Templates gallery

### Phase 3 · Intelligence
10. ZIP defaults · 11. Live engineering console · 12. Year-1 PV production · 13. Cost roll-up

### Phase 4 · Visualization
14. 3D preview · 15. Sun-path / shading toy · 16. Heatmap overlay (4 modes including wind-load with edge effects)

### Phase 4.1 · Structural correction
- Patches `SECTION_RULES['8'].posts` and `['10'].posts` from 4 → 2
- Wraps `calculateProjectTotals` so `totals.posts = sections + rows`
- Adds clarifying note to BOM post line ("adjacent sections share boundary posts")
- Adds engineering correction callout in the live console

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
4. `sems-saas-phase-4-1.html` ← runs after host BOM functions are defined; patches `SECTION_RULES` and wraps `calculateProjectTotals`

Phase 4.1 has a built-in `whenReady()` poller (50ms × 200 attempts max) so it patches the host as soon as `SECTION_RULES` and `calculateProjectTotals` exist, regardless of script execution timing.

---

## Compatibility

**State** (read via `new Function()` accessors): `layoutState`, `_nextSectionId`, `_nextRowId`, `SECTION_RULES`

**Functions wrapped:** `addRow`, `addSectionToRow`, `removeRow`, `removeSectionById`, `duplicateSection`, `quickAdd`, `clearLayout`, `autoBalance`, `convertAll`, `generateSystem`, `setFormState`, `resetAll`, `renderCanvas`, **`calculateProjectTotals`** (new), **`generateBom`** (new)

**Constants read:** `PANELS`, `INVERTERS`, `APP_DEFAULTS`

**External CDN:** Three.js r128 (lazy-loaded only when 3D modal opens)

---

## Storage

- `sems_saas_v1` — tour state, current project pointer
- `sems_saas_projects` — saved named projects

The host's `sems_array_builder_v2` is untouched.

---

## Print

The entire SaaS layer hides under `@media print`. Existing report layouts are unaffected.

---

## Removal

Delete the SaaS layer block from `</body>` upward (between the `<!-- SEMS SAAS LAYER · Phase 1 + 2 -->` opening comment and the closing `<!-- END SEMS SAAS LAYER · Phase 4.1 -->` comment). The host's `SECTION_RULES` will then revert to its hardcoded values on page reload.

---

## Validation

44/44 functional tests pass against the patched `configurator.html` running in jsdom:

- 20 structural correction tests: SECTION_RULES patched, `totals.posts` correctly computes N+M, BOM line updated with explanatory note, multi-row layouts produce correct counts (e.g., 3×4 = 15 posts)
- 24 regression tests: all 4 phases still work end-to-end, undo/redo functional, ZIP lookups correct, heatmap colors `.sec-block` elements, all UI surfaces attach

---

## Brand fidelity

All UI uses existing CSS variables. The 3D modal uses dark navy gradient consistent with SEMS deep blue. Sun arc colors: amber (summer), brand blue (equinox), white (winter).
