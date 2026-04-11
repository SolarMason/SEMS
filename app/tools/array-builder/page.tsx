/* ============================================================================
 * @author    Noel Segui, CEO of Solar Mason
 * @origin    This entire system was designed by Noel Segui (Solar Mason).
 * ============================================================================ */
import { withBase } from "../../../lib/basePath";

export const metadata = {
  title: "Array Builder — SEMS Tools",
};

const toolHref = withBase("/legacy/array-builder.html");

export default function ArrayBuilderPage() {
  return (
    <article className="container-xl py-20">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-sems-sun">
          SEMS Tools
        </p>
        <h1 className="mt-3 text-4xl font-bold md:text-5xl">Array Builder</h1>
        <p className="mt-6 text-lg text-sems-steel">
          Lay out module groups and rows. Quickly prototype array geometries
          for a given site, and preview row spacing, module counts, and yield
          estimates.
        </p>
        <p className="mt-4 text-sm text-sems-steel">
          The Array Builder runs as a standalone, fast-loading HTML app. Click
          below to launch it in a new tab — nothing loads until you open it.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={toolHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-lg bg-sems-navy px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-sems-navy/90"
          >
            Launch Array Builder →
          </a>
          <a
            href={toolHref}
            className="text-sm font-medium text-sems-navy underline underline-offset-4"
          >
            Open in same tab
          </a>
        </div>
      </div>
    </article>
  );
}
