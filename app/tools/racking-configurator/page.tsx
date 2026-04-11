import { withBase } from "../../../lib/basePath";

export const metadata = {
  title: "Racking Configurator — SEMS Tools",
};

const src = withBase("/legacy/SolarMason_Racking_Configurator.html");

export default function RackingConfiguratorPage() {
  return (
    <div className="container-xl py-10">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold">Racking Configurator</h1>
          <p className="mt-2 text-sems-steel">
            Legacy tool — preserved and embedded here until rebuilt as a native React module.
          </p>
        </div>
        <a
          href={src}
          target="_blank"
          rel="noreferrer"
          className="btn-secondary"
        >
          Open in new tab
        </a>
      </div>
      <div className="overflow-hidden rounded-xl border border-sems-navy/10 shadow-sm">
        <iframe
          src={src}
          className="h-[85vh] w-full"
          title="SEMS Racking Configurator"
        />
      </div>
    </div>
  );
}
