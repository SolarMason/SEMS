export const metadata = {
  title: "GeoBuilder — SEMS Tools",
};

export default function GeoBuilderPage() {
  return (
    <div className="container-xl py-10">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold">GeoBuilder</h1>
          <p className="mt-2 text-sems-steel">
            Legacy tool — preserved and embedded here until rebuilt as a native React module.
          </p>
        </div>
        <a
          href="/legacy/SolarMason_GeoBuilder.html"
          target="_blank"
          rel="noreferrer"
          className="btn-secondary"
        >
          Open in new tab
        </a>
      </div>
      <div className="overflow-hidden rounded-xl border border-sems-navy/10 shadow-sm">
        <iframe
          src="/legacy/SolarMason_GeoBuilder.html"
          className="h-[85vh] w-full"
          title="SEMS GeoBuilder"
        />
      </div>
    </div>
  );
}
