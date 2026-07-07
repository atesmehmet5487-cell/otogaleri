"use client";

import { VehicleArt, PortalIcon } from "@/components/app/vehicle-art";
import { useLang } from "@/components/i18n/language-provider";
import { formatTRY, formatKm } from "@/lib/utils";

/* ── Inline-SVG fake dealer-group wordmarks for the trusted-by row ─────────── */
export function CompanyMark({ name }: { name: string }) {
  const glyphs: Record<string, React.ReactNode> = {
    "AutoPlaza": <path d="M3 17 L8 6 L12 13 L16 6 L21 17" />,
    "MotorWay": <path d="M4 12 h16 M12 5 v14" />,
    "DriveHub": <circle cx="12" cy="11" r="7" />,
    "Galeri 34": <path d="M4 5 h16 v4 h-6 v9 h-4 v-9 h-6 z" />,
    "OtoMerkez": <path d="M12 3 L20 18 H4 Z M12 9 L16 17 H8 Z" />,
    "PrimeCars": <path d="M6 4 v14 h10" />,
    "ŞehirOto": <path d="M12 4 c5 4 5 10 0 14 c-5 -4 -5 -10 0 -14 z" />,
    "Velox": <path d="M4 18 L9 6 L12 14 L15 6 L20 18" />,
  };
  return (
    <span className="inline-flex items-center gap-2 text-muted-foreground/70">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        {glyphs[name]}
      </svg>
      <span className="text-[15px] font-semibold tracking-tight">{name}</span>
    </span>
  );
}

/* ── Hero product-preview card: a mini inventory grid + a featured row ─────── */
export function ProductPreview() {
  const { lang } = useLang();
  const rows = [
    { body: "suv" as const, color: "#b6bcc4", title: "2021 VW Tiguan", price: 1_285_000, km: 52_100, dol: 57, status: lang === "tr" ? "müsait" : "available" },
    { body: "sedan" as const, color: "#c0392b", title: "2023 Tesla Model 3", price: 2_190_000, km: 14_900, dol: 9, status: lang === "tr" ? "rezerve" : "reserved" },
    { body: "hatchback" as const, color: "#f1c40f", title: "2024 Peugeot 208", price: 1_060_000, km: 3_100, dol: 1, status: lang === "tr" ? "müsait" : "available" },
  ];

  return (
    <div className="w-full rounded-2xl border border-border bg-card p-4 shadow-pop sm:p-5">
      {/* mini summary */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border bg-muted/40 p-3">
          <p className="text-[11px] font-medium text-muted-foreground">{lang === "tr" ? "Stoktaki araç" : "Vehicles in stock"}</p>
          <p className="mt-1 tnum text-lg font-bold leading-none">62</p>
        </div>
        <div className="rounded-xl border border-border bg-muted/40 p-3">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium text-muted-foreground">{lang === "tr" ? "Yeni müşteri" : "New leads"}</p>
            <span className="rounded-full bg-brandred/10 px-1.5 py-0.5 text-[9px] font-semibold text-brandred">9</span>
          </div>
          <p className="mt-1 tnum text-lg font-bold leading-none">{lang === "tr" ? "bugün" : "today"}</p>
        </div>
      </div>

      {/* mini inventory list */}
      <div className="mt-4 space-y-2">
        {rows.map((r, i) => (
          <div
            key={r.title}
            className={`flex items-center gap-3 rounded-xl border border-border p-2.5 ${i === 0 ? "bg-primary/[0.04]" : "bg-card"}`}
          >
            <VehicleArt body={r.body} color={r.color} className="h-10 w-16" rounded="rounded-lg" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12.5px] font-semibold leading-tight">{r.title}</p>
              <p className="tnum truncate text-[10.5px] text-muted-foreground">{formatKm(r.km)} · {r.dol}{lang === "tr" ? "g" : "d"}</p>
            </div>
            <div className="text-right">
              <p className="tnum text-[12px] font-semibold">{formatTRY(r.price)}</p>
              <span className="text-[9.5px] capitalize text-muted-foreground">{r.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* portal row */}
      <div className="mt-4 flex items-center gap-2 rounded-lg border border-border bg-muted/40 p-2.5">
        <span className="text-[11px] font-medium text-muted-foreground">{lang === "tr" ? "Yayında:" : "Live on:"}</span>
        <PortalIcon portal="sahibinden" size={18} />
        <PortalIcon portal="arabam" size={18} />
        <PortalIcon portal="instagram" size={18} />
        <PortalIcon portal="web" size={18} />
        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-stat-available/10 px-2 py-0.5 text-[10px] font-semibold text-stat-available">
          <span className="h-1.5 w-1.5 rounded-full bg-stat-available" />
          {lang === "tr" ? "senkron" : "synced"}
        </span>
      </div>
    </div>
  );
}
