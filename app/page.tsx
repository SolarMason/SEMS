import Link from "next/link";

const products = [
  {
    name: "Avans Rac Series",
    href: "/products/avans-rac",
    tagline: "Fixed-tilt, ground-mount, storm-hardened.",
    body: "The most robust, cost-effective, and survivable fixed-tilt racking solution on the market.",
  },
  {
    name: "Utilitas Trac Series",
    href: "/products/utilitas-trac",
    tagline: "Single-axis tracker for commercial & utility scale.",
    body: "An optimal combination of steel and aluminum — maximizing energy yield while reducing risk.",
  },
  {
    name: "TST Series",
    href: "/products/tst",
    tagline: "Tilt Solar Tracker for higher latitudes.",
    body: "Adjusts to the sun's altitude throughout the day and season — purpose-built for high-latitude sites.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sems-navy via-sems-steel to-sems-navy text-white">
        <div className="container-xl py-24 md:py-32">
          <p className="text-sm uppercase tracking-[0.25em] text-sems-sun">
            American-made · Storm-hardened · Bankable
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            Solar infrastructure built to <span className="text-sems-sun">survive</span> the storm.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/80">
            SEMS manufactures closed-form tubular solar racking and tracking
            systems engineered to meet or exceed the resilience standards set
            by NREL, FEMA, FEMP, and the Rocky Mountain Institute.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/products/avans-rac" className="btn-primary">
              Explore our products
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center justify-center rounded-md border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Open configurator
            </Link>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="container-xl py-20">
        <div className="grid gap-8 md:grid-cols-4">
          {[
            {
              title: "Storm-hardened",
              body: "Arrays engineered to survive and keep generating after major weather events.",
            },
            {
              title: "Lower lifecycle cost",
              body: "Reduced planned and unplanned O&M over the asset lifetime.",
            },
            {
              title: "Bankable LCOE",
              body: "Predictable, favorable Levelized Cost of Energy for developers and investors.",
            },
            {
              title: "Kitted, closed-form",
              body: "Fully kitted systems — no third-party sourcing or on-site fabrication.",
            },
          ].map((v) => (
            <div
              key={v.title}
              className="rounded-lg border border-sems-navy/10 bg-white p-6 shadow-sm"
            >
              <div className="text-sm font-semibold uppercase tracking-wider text-sems-sun">
                {v.title}
              </div>
              <p className="mt-3 text-sm text-sems-steel">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="bg-sems-ash/50 py-20">
        <div className="container-xl">
          <h2 className="text-3xl font-bold md:text-4xl">Our product families</h2>
          <p className="mt-3 max-w-2xl text-sems-steel">
            Three core platforms serving residential, commercial, and
            utility-scale markets.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {products.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group block rounded-xl border border-sems-navy/10 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="text-xs font-semibold uppercase tracking-wider text-sems-sun">
                  {p.tagline}
                </div>
                <div className="mt-3 text-xl font-semibold text-sems-navy group-hover:underline">
                  {p.name} →
                </div>
                <p className="mt-4 text-sm text-sems-steel">{p.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-xl py-20">
        <div className="rounded-2xl bg-sems-navy p-10 text-white md:p-16">
          <h2 className="text-3xl font-bold md:text-4xl">
            Size a system in minutes.
          </h2>
          <p className="mt-3 max-w-2xl text-white/80">
            Our internal configurator tools — Racking Configurator, Array
            Builder, and GeoBuilder — are available in the Tools section.
          </p>
          <Link href="/tools" className="btn-primary mt-8">
            Open Tools
          </Link>
        </div>
      </section>
    </>
  );
}
