import Link from "next/link";

export const metadata = {
  title: "Avans Rac Series — SEMS",
  description:
    "Fixed-tilt, ground-mount, storm-hardened solar racking system. The most robust, cost-effective, and survivable fixed-tilt solution on the market.",
};

export default function AvansRacPage() {
  return (
    <article className="container-xl py-20">
      <p className="text-sm uppercase tracking-[0.25em] text-sems-sun">Fixed-Tilt Ground Mount</p>
      <h1 className="mt-3 text-4xl font-bold md:text-5xl">Avans Rac Series</h1>
      <p className="mt-6 max-w-3xl text-lg text-sems-steel">
        A fixed-tilt, ground-mount storm-hardened solar racking system engineered
        to be the most robust, cost-effective, efficient, and survivable fixed-tilt
        racking solution on the market. Avans Rac is purpose-built for sites where
        reliability and total lifecycle cost are non-negotiable.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {[
          { t: "Closed-form tubular", b: "Superior strength-to-weight ratio vs open-section racking." },
          { t: "Kitted delivery", b: "No third-party sourcing or on-site fabrication required." },
          { t: "Bankable LCOE", b: "Predictable capex and long-term O&M performance." },
        ].map((f) => (
          <div key={f.t} className="rounded-lg border border-sems-navy/10 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-wider text-sems-sun">{f.t}</div>
            <p className="mt-3 text-sm text-sems-steel">{f.b}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap gap-4">
        <Link href="/contact" className="btn-primary">Request a quote</Link>
        <Link href="/tools/racking-configurator" className="btn-secondary">Open configurator</Link>
      </div>
    </article>
  );
}
