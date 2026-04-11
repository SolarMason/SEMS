/* ============================================================================
 * @author    Noel Segui, CEO of Solar Mason
 * @origin    This entire system was designed by Noel Segui (Solar Mason).
 * ============================================================================ */
import { withBase } from "../../../lib/basePath";

export const metadata = {
  title: "GeoBuilder — SEMS Tools",
};

const toolHref = withBase("/legacy/geo-builder.html");

export default function GeoBuilderPage() {
  return (
    <article className="container-xl py-20">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-sems-sun">
          SEMS Tools
        </p>
        <h1 className="mt-3 text-4xl font-bold md:text-5xl">GeoBuilder</h1>
        <p className="mt-6 text-lg text-sems-steel">
          Define site geometry, boundaries, and terrain inputs for downstream
          configuration tools. Use GeoBuilder as the starting point for any
          site-specific array or racking configuration.
        </p>
        <p className="mt-4 text-sm text-sems-steel">
          GeoBuilder runs as a standalone, fast-loading HTML app. Click below
          to launch it in a new tab — nothing loads until you open it.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={toolHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-lg bg-sems-navy px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-sems-navy/90"
          >
            Launch GeoBuilder →
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
