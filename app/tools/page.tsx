import Link from "next/link";

export const metadata = {
  title: "Tools — SEMS",
  description:
    "SEMS internal configurator tools: Racking Configurator, Array Builder, and GeoBuilder.",
};

const tools = [
  {
    name: "Racking Configurator",
    href: "/tools/racking-configurator",
    body: "Configure Avans Rac, Utilitas Trac, and TST systems — materials, spans, foundations, and BOM output.",
  },
  {
    name: "Array Builder",
    href: "/tools/array-builder",
    body: "Lay out module groups and rows — quickly prototype array geometries for a given site.",
  },
  {
    name: "GeoBuilder",
    href: "/tools/geo-builder",
    body: "Define site geometry, boundaries, and terrain inputs for downstream configuration tools.",
  },
];

export default function ToolsIndexPage() {
  return (
    <article className="container-xl py-20">
      <h1 className="text-4xl font-bold md:text-5xl">Tools</h1>
      <p className="mt-6 max-w-3xl text-lg text-sems-steel">
        Internal SEMS configurator tools. These are the current-generation tools,
        preserved here and being progressively rebuilt as first-class React
        experiences.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {tools.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="group block rounded-xl border border-sems-navy/10 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="text-xl font-semibold text-sems-navy group-hover:underline">
              {t.name} →
            </div>
            <p className="mt-4 text-sm text-sems-steel">{t.body}</p>
          </Link>
        ))}
      </div>
    </article>
  );
}
