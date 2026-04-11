import Link from "next/link";

export const metadata = {
  title: "TST Series — SEMS",
  description:
    "Tilt Solar Tracker engineered for higher latitudes. Tracks the sun's altitude through the day and the seasons for maximum yield.",
};

export default function TstPage() {
  return (
    <article className="container-xl py-20">
      <p className="text-sm uppercase tracking-[0.25em] text-sems-sun">Tilt Solar Tracker</p>
      <h1 className="mt-3 text-4xl font-bold md:text-5xl">TST Series</h1>
      <p className="mt-6 max-w-3xl text-lg text-sems-steel">
        The Tilt Solar Tracker (TST) is a ground-mounted storm-hardened tracker
        designed to adjust to the sun&rsquo;s altitude throughout the day, purpose-built
        for higher latitudes where seasonal variation in the sun&rsquo;s altitude is
        significant.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {[
          { t: "Altitude tracking", b: "Follows the sun's vertical arc through the day and year." },
          { t: "High-latitude ready", b: "Built for sites where seasonal tilt matters most." },
          { t: "Storm-hardened", b: "The same resilience standard as the rest of the SEMS line." },
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
