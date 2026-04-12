/* ============================================================================
 * @author   Noel Segui, CEO of Solar Mason
 * @origin   This entire system was designed by Noel Segui (Solar Mason).
 * ============================================================================ */
import Link from "next/link";
import Image from "next/image";

const products = [
  { name: "Avans Rac", href: "/products/avans-rac" },
  { name: "Utilitas Trac", href: "/products/utilitas-trac" },
  { name: "TST Series", href: "/products/tst" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-sems-navy/10 bg-white/90 backdrop-blur">
      <nav className="container-xl flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="SEMS home">
          <Image
            src="/images/sems-logo.jpg"
            alt="SEMS"
            width={640}
            height={200}
            priority
            className="h-9 w-auto"
          />
          <span className="hidden text-xs uppercase tracking-widest text-sems-steel sm:inline">
            Sustainable Energy Management Systems
          </span>
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium">
          <div className="hidden gap-6 md:flex">
            {products.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="text-sems-steel hover:text-sems-navy"
              >
                {p.name}
              </Link>
            ))}
            <Link href="/about" className="text-sems-steel hover:text-sems-navy">
              About
            </Link>
            <Link href="/tools" className="text-sems-steel hover:text-sems-navy">
              Tools
            </Link>
          </div>
          <Link href="/contact" className="btn-primary">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
