#!/usr/bin/env python3
"""
generate.py — SEMS Site-Wide Layout & Structure Generator
=========================================================
Run this script any time you need to enforce consistent layout rules
across every page in the SEMS site.  It applies the canonical set of
CSS values so that content fills the full browser width and compresses
fluidly as the window shrinks.

Usage:
    python3 generate.py                # apply to all pages
    python3 generate.py --dry-run      # preview changes without writing
    python3 generate.py about-us.html  # apply to a single page

Layout Rules (the "canon"):
    - Primary containers (.wrap, .nav-inner, .hero-content, .stats-inner)
      use  max-width: 1800px  with fluid clamp() padding
    - Page content sections (.content-section) use  max-width: 1440px
    - Card / CTA containers (.cfg-cta-card) use  max-width: 1400px
    - Supplementary containers (800px class) widen to 1000px
    - Supplementary containers (900px class) widen to 1140px
    - Text-readability max-widths (.section-body, .inner-hero p,
      .solution-intro) stay narrow for line-length comfort
"""

import os, sys, re

SITE = os.path.dirname(os.path.abspath(__file__))

# ── REPLACEMENT RULES ──────────────────────────────────────────────
# Each rule is (old_string, new_string, description).
# Rules are applied in order; earlier rules take priority when patterns overlap.

RULES = [
    # ═══════ PRIMARY CONTAINERS: 1320 → 1800 ═══════
    # .nav-inner
    (
        ".nav-inner {\n  max-width: 1320px;\n  margin: 0 auto;\n  padding: 0 32px;",
        ".nav-inner {\n  max-width: 1800px;\n  margin: 0 auto;\n  padding: 0 clamp(24px, 3vw, 48px);",
        "nav-inner: widen to 1800px with fluid padding"
    ),
    # .hero-content
    (
        "max-width: 1320px;\n  margin: 0 auto;\n  padding: 0 32px;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 80px;",
        "max-width: 1800px;\n  margin: 0 auto;\n  padding: 0 clamp(24px, 3vw, 48px);\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 80px;",
        "hero-content: widen to 1800px with fluid padding"
    ),
    # .stats-inner
    (
        ".stats-inner {\n  max-width: 1320px;\n  margin: 0 auto;\n  padding: 0 32px;",
        ".stats-inner {\n  max-width: 1800px;\n  margin: 0 auto;\n  padding: 0 clamp(24px, 3vw, 48px);",
        "stats-inner: widen to 1800px with fluid padding"
    ),
    # .wrap  (the master content wrapper)
    (
        ".wrap { max-width: 1320px; margin: 0 auto; padding: 0 32px; }",
        ".wrap { max-width: 1800px; margin: 0 auto; padding: 0 clamp(24px, 3vw, 48px); }",
        "wrap: widen to 1800px with fluid padding"
    ),

    # ═══════ RESPONSIVE .wrap PADDING ═══════
    # The old breakpoints had fixed padding values; replace with fluid clamp
    # that works at any width.  We keep the breakpoints but adjust values.
    (
        "  .wrap { padding: 0 28px; }",
        "  .wrap { padding: 0 clamp(20px, 2.5vw, 40px); }",
        "wrap responsive 1279: fluid padding"
    ),
    (
        "  .wrap { padding: 0 24px; }",
        "  .wrap { padding: 0 clamp(18px, 2.5vw, 36px); }",
        "wrap responsive 1023: fluid padding"
    ),
    (
        "  .wrap { padding: 0 20px; }",
        "  .wrap { padding: 0 clamp(16px, 3vw, 28px); }",
        "wrap responsive 767: fluid padding"
    ),
    (
        "  .wrap { padding: 0 16px; }",
        "  .wrap { padding: 0 clamp(14px, 4vw, 20px); }",
        "wrap responsive 479: fluid padding"
    ),

    # ═══════ PAGE CONTENT SECTIONS ═══════
    # .content-section  (inner-page body content)
    (
        ".content-section {\n  max-width: 1100px; margin: 0 auto;",
        ".content-section {\n  max-width: 1440px; margin: 0 auto;",
        "content-section: widen to 1440px"
    ),

    # ═══════ CTA CARD ═══════
    (
        ".cfg-cta-card {\n  max-width: 1080px;\n  margin: 0 auto;",
        ".cfg-cta-card {\n  max-width: 1400px;\n  margin: 0 auto;",
        "cfg-cta-card: widen to 1400px"
    ),

    # ═══════ SUPPLEMENTARY CONTAINERS ═══════
    # Various section-specific elements at 800px and 900px
    # These are grid containers, FAQ lists, etc. — not prose text.
    # We match them by their surrounding context to avoid false hits.
    #
    # .timeline-grid and similar at max-width: 800px
    # We use regex for these since the context varies by page.

    # .solution-grid max-width if present at 1100px
    (
        "max-width: 1100px; margin: 0 auto;",
        "max-width: 1440px; margin: 0 auto;",
        "solution-grid / generic 1100: widen to 1440px"
    ),
]

# Regex-based rules for things that appear in varied contexts
REGEX_RULES = [
    # Widen standalone max-width: 800px on grid/layout containers
    # but NOT on text elements (.section-body, p, .inner-hero p, etc.)
    # Match lines where max-width: 800px is in a class block that also has
    # display: grid, or is a known layout class
    (
        r'(\.(?:timeline-grid|faq-list|comparison-grid|resource-grid|program-grid|benefits-grid|team-grid|process-steps|cert-grid|partners-grid|contact-grid)[^}]*?)max-width:\s*800px',
        r'\g<1>max-width: 1000px',
        "grid containers at 800px → 1000px"
    ),
    (
        r'(\.(?:timeline-grid|faq-list|comparison-grid|resource-grid|program-grid|benefits-grid|team-grid|process-steps|cert-grid|partners-grid)[^}]*?)max-width:\s*900px',
        r'\g<1>max-width: 1140px',
        "grid containers at 900px → 1140px"
    ),
]


def apply_rules(content, filename, dry_run=False):
    """Apply all layout rules to a page's content. Returns (new_content, changes_list)."""
    changes = []

    for old, new, desc in RULES:
        if old in content:
            content = content.replace(old, new)
            changes.append(desc)

    for pattern, repl, desc in REGEX_RULES:
        new_content = re.sub(pattern, repl, content, flags=re.DOTALL)
        if new_content != content:
            content = new_content
            changes.append(desc)

    return content, changes


def main():
    dry_run = "--dry-run" in sys.argv
    target = None
    for arg in sys.argv[1:]:
        if not arg.startswith("--") and arg.endswith(".html"):
            target = arg

    if target:
        pages = [target]
    else:
        pages = sorted(f for f in os.listdir(SITE) if f.endswith('.html'))

    total_changed = 0
    total_rules = 0

    for page in pages:
        path = os.path.join(SITE, page)
        if not os.path.exists(path):
            print(f"  ✗ {page} — file not found")
            continue

        with open(path, 'r', encoding='utf-8') as f:
            original = f.read()

        updated, changes = apply_rules(original, page, dry_run)

        if changes:
            total_changed += 1
            total_rules += len(changes)
            if not dry_run:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(updated)
            status = "would update" if dry_run else "updated"
            print(f"  ✓ {page} — {status} ({len(changes)} rules)")
            for c in changes:
                print(f"      · {c}")
        else:
            print(f"    {page} — already up to date")

    print(f"\n{'='*60}")
    mode = "DRY RUN — no files written" if dry_run else "COMPLETE"
    print(f"  {mode}")
    print(f"  Files changed: {total_changed}/{len(pages)}")
    print(f"  Rules applied: {total_rules}")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
