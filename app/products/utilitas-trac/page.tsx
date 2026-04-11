import Link from "next/link";

export const metadata = {
  title: "Utilitas Trac Series — SEMS",
  description:
    "Storm-hardened single-axis solar tracker for commercial and utility-scale markets. Optimal steel + aluminum construction for maximum yield and minimum risk.",
};

export default function UtilitasTracPage() {
  return (
    <article className="container-xl py-20">
      <p className="text-sm uppercase tracking-[0.25em] text-sems-sun">Single-Axis Tracker</p>
      <h1 className="mt-3 text-4xl font-bold md:text-5xl">Utilitas Trac Series</h1>
      <p className="mt-6 max-w-3xl text-lg text-sems-steel">
        A ground-mounted, storm-hardened single-axis solar tracker engineered using
        an optimal combination of steel and aluminum for the commercial and
        utility-scale markets. Utilitas Trac maximizes energy yield while reducing
        risk from extreme weather events.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {[
          { t: "Steel + aluminum", b: "Optimized hybrid structure for resilience and cost." },
          { t: "Utility-scale ready", b: "Built for commercial and utility project economics." },
          { t: "Survives storms", b: "Meets NREL / FEMA / FEMP resilience guidance." },
        ].map((f) => (
          <div key={f.t} className="rounded-lg border border-sems-navy/10 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-wider text-sems-sun">{f.t}</div>
            <p className="mt-3 text-sm text-sems-steel">{f.b}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap gap-4">
        <Link href="/contact" className="btn-primary">Request a quote</Link>
        <Link href="/tools" className="btn-secondary">Open tools</Link>
      </div>
    </article>
  );
}
