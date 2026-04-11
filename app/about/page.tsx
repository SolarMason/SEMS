export const metadata = {
  title: "About — SEMS",
  description:
    "Sustainable Energy Management Systems, LLC is an American manufacturer of storm-hardened solar racking and tracking systems, headquartered in Scranton, PA.",
};

export default function AboutPage() {
  return (
    <article className="container-xl max-w-4xl py-20">
      <h1 className="text-4xl font-bold md:text-5xl">About SEMS</h1>
      <p className="mt-6 text-lg text-sems-steel">
        Sustainable Energy Management Systems, LLC (SEMS) is an American
        manufacturer of robust, cost-effective closed-form (tubular) solar
        racking and solar tracking systems, headquartered in Scranton,
        Pennsylvania.
      </p>

      <h2 className="mt-12 text-2xl font-semibold">The problem we solve</h2>
      <p className="mt-4 text-sems-steel">
        The solar industry has long faced a critical vulnerability — conventional
        racking systems are not designed to withstand the extreme weather
        conditions that are becoming more frequent and destructive. As highlighted
        by NREL, FEMA, FEMP, and the Rocky Mountain Institute, improvements in the
        construction of PV arrays are urgently needed, with solar racking
        identified as a critical area requiring storm-hardened design.
      </p>

      <h2 className="mt-12 text-2xl font-semibold">Our solution</h2>
      <p className="mt-4 text-sems-steel">
        SEMS products meet or exceed the standards outlined in recent reports
        published by FEMA, FEMP, the Rocky Mountain Institute, and NREL. Our
        patent-pending, field-proven technologies are built into every product
        we manufacture — delivering storm-hardened performance, lower lifecycle
        costs, bankable LCOE, and fully kitted, closed-form systems.
      </p>

      <h2 className="mt-12 text-2xl font-semibold">Who we serve</h2>
      <p className="mt-4 text-sems-steel">
        SEMS serves solar project developers, EPC contractors, asset owners, and
        investors who demand more from their infrastructure — systems that
        protect capital, extend asset life, and deliver on financial projections
        even in the face of climate-driven risk.
      </p>

      <h2 className="mt-12 text-2xl font-semibold">Our vision</h2>
      <p className="mt-4 text-sems-steel">
        SEMS is building the future of resilient solar infrastructure. As climate
        risk grows and energy resilience becomes a national priority, SEMS stands
        at the intersection of innovation and necessity — manufacturing
        American-made solar racking solutions that don&rsquo;t just generate power, but
        <em> survive</em> to keep generating it.
      </p>
    </article>
  );
}
