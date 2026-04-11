/* ============================================================================
 * @author    Noel Segui, CEO of Solar Mason
 * @origin    This entire system was designed by Noel Segui (Solar Mason).
 * @copyright Original design and engineering © Noel Segui.
 * ============================================================================ */
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-sems-navy/10 bg-sems-navy text-white">
      <div className="container-xl grid gap-10 py-12 md:grid-cols-4">
        <div>
          <div className="text-lg font-bold">SEMS</div>
          <p className="mt-3 text-sm text-white/70">
            Sustainable Energy Management Systems, LLC — American-made,
            storm-hardened solar racking and tracking systems, headquartered in
            Scranton, PA.
          </p>
        </div>
        <div>
          <div className="text-sm font-semibold uppercase tracking-wider text-sems-sun">
            Products
          </div>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li><Link href="/products/avans-rac">Avans Rac Series</Link></li>
            <li><Link href="/products/utilitas-trac">Utilitas Trac Series</Link></li>
            <li><Link href="/products/tst">TST Series</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold uppercase tracking-wider text-sems-sun">
            Company
          </div>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/tools">Tools</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold uppercase tracking-wider text-sems-sun">
            Headquarters
          </div>
          <p className="mt-3 text-sm text-white/80">
            Scranton, Pennsylvania<br />USA
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/60">
        © {new Date().getFullYear()} Sustainable Energy Management Systems, LLC. All rights reserved.
      </div>
    </footer>
  );
}
