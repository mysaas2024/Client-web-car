import Link from "next/link";
import { Phone, ShieldCheck } from "lucide-react";
import { PHONE, TEL } from "@/lib/data";

const nav = [
  ["Fleet", "#fleet"],
  ["Services", "#services"],
  ["Make an Offer", "#fare-bid"],
  ["Airport", "#airport"],
  ["Areas", "#areas"],
  ["FAQ", "#faq"],
  ["Contact", "#contact"],
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(201,165,92,0.2)] bg-[#0a0a0f]/95 backdrop-blur-xl shadow-lg">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="group flex items-center gap-3" aria-label="Classicontariolimo home">
          <div className="grid size-11 place-items-center rounded-lg border border-primary/60 bg-primary/10 font-display text-2xl font-bold text-primary shadow-[0_0_15px_rgba(201,165,92,0.25)] transition-transform group-hover:scale-105">
            C
          </div>
          <span className="flex flex-col">
            <span className="font-display text-xl font-bold tracking-tight text-white transition-colors group-hover:text-primary sm:text-2xl">
              Classicontariolimo
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/80">
              <ShieldCheck className="size-3" /> Luxury Executive Service
            </span>
          </span>
        </Link>

        <nav className="hidden gap-7 text-[13px] font-medium text-white/70 lg:flex">
          {nav.map(([l, h]) => (
            <a
              key={h}
              href={h}
              className="transition-colors hover:text-primary hover:drop-shadow-[0_0_8px_rgba(201,165,92,0.5)]"
            >
              {l}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={TEL}
            className="hidden items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white/90 transition-all hover:border-primary hover:bg-primary/10 hover:text-primary sm:inline-flex"
            title="Call Abdul Jabbar Chaudrey"
          >
            <Phone className="size-3.5 text-primary" />
            <span>{PHONE}</span>
          </a>

          <a
            href="#quote"
            className="cta-primary inline-flex h-10 items-center justify-center rounded-lg px-5 text-xs font-bold uppercase tracking-wider text-black shadow-md"
          >
            Book Now
          </a>
        </div>
      </div>
    </header>
  );
}
