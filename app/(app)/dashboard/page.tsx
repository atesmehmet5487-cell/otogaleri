"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Download,
  Filter,
  Search,
  X,
  ArrowUpRight,
  Car,
  Gauge,
  Wallet,
  Timer,
  CheckCircle2,
  Phone,
  Plus,
} from "lucide-react";
import { VehicleArt, PortalIcon } from "@/components/app/vehicle-art";
import { SalesChart, SegmentedBar } from "@/components/app/charts";
import { useLang } from "@/components/i18n/language-provider";
import { cn, formatTRY, formatCompactTRY, formatKm, formatRelative } from "@/lib/utils";
import {
  vehicles,
  daysOnLot,
  summary,
  sales,
  salesMeta,
  portalMeta,
  leadsBySource,
  deals,
  dealStageLabel,
  activity,
  AGING_THRESHOLD_DAYS,
  type Vehicle,
  type VehicleStatus,
  type PortalKey,
  type PortalState,
} from "@/lib/demo/data";

const STATUS_META: Record<VehicleStatus, { tr: string; en: string; tone: string }> = {
  available: { tr: "müsait", en: "available", tone: "text-stat-available bg-stat-available/10" },
  reserved: { tr: "rezerve", en: "reserved", tone: "text-warning-foreground bg-warning/15" },
  sold: { tr: "satıldı", en: "sold", tone: "text-primary bg-primary/10" },
};

const PORTAL_STATE_META: Record<PortalState, { tr: string; en: string; tone: string }> = {
  published: { tr: "yayında", en: "live", tone: "text-stat-available bg-stat-available/10" },
  pending: { tr: "bekliyor", en: "pending", tone: "text-warning-foreground bg-warning/15" },
  draft: { tr: "taslak", en: "draft", tone: "text-muted-foreground bg-muted" },
};

type FilterKey = "all" | VehicleStatus;

export default function DashboardPage() {
  const { ui, lang } = useLang();
  const tl = (v: { tr: string; en: string }) => v[lang];

  const [selected, setSelected] = useState<string | null>("v1");
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");

  // ── Derived stats ──────────────────────────────────────────────────────
  const inStock = vehicles.filter((v) => v.status !== "sold");
  const inventoryValue = inStock.reduce((s, v) => s + v.price, 0);
  const avgDays = Math.round(inStock.reduce((s, v) => s + daysOnLot(v.stockInDate), 0) / inStock.length);
  const soldThisMonth = vehicles.filter((v) => v.status === "sold").length + 10; // demo: closed deals this month
  const aging = inStock
    .filter((v) => daysOnLot(v.stockInDate) >= AGING_THRESHOLD_DAYS)
    .sort((a, b) => daysOnLot(b.stockInDate) - daysOnLot(a.stockInDate));

  // ── Filtered table rows ────────────────────────────────────────────────
  const rows = useMemo(
    () =>
      vehicles.filter((v) => {
        if (filter !== "all" && v.status !== filter) return false;
        if (!query) return true;
        const hay = `${v.year} ${v.make} ${v.model} ${v.trim} ${v.stockNo}`.toLowerCase();
        return hay.includes(query.toLowerCase());
      }),
    [filter, query],
  );

  const current = vehicles.find((v) => v.id === selected) ?? vehicles[0];

  const statCards = [
    { label: summary.inStock.label, value: String(inStock.length), icon: Car, hint: { tr: `${vehicles.length} toplam kayıt`, en: `${vehicles.length} total records` }, tone: "text-primary bg-primary/10" },
    { label: summary.inventoryValue.label, value: formatCompactTRY(inventoryValue), icon: Wallet, hint: { tr: "açık stok değeri", en: "open stock value" }, tone: "text-stat-available bg-stat-available/10" },
    { label: summary.avgDaysOnLot.label, value: `${avgDays}`, icon: Timer, hint: { tr: `${aging.length} araç durağan`, en: `${aging.length} aging units` }, tone: "text-warning-foreground bg-warning/15" },
    { label: summary.soldThisMonth.label, value: String(soldThisMonth), icon: CheckCircle2, hint: salesMeta.delta + (lang === "tr" ? " geçen aya göre" : " vs last month"), tone: "text-brandred bg-brandred/10" },
  ];

  const filters: { key: FilterKey; label: { tr: string; en: string } }[] = [
    { key: "all", label: { tr: "Tümü", en: "All" } },
    { key: "available", label: { tr: "Müsait", en: "Available" } },
    { key: "reserved", label: { tr: "Rezerve", en: "Reserved" } },
    { key: "sold", label: { tr: "Satıldı", en: "Sold" } },
  ];

  const maxSource = Math.max(...leadsBySource.map((l) => l.count));

  return (
    <div className="mx-auto max-w-[1500px] animate-fade-in">
      <div className={cn("grid gap-6", drawerOpen ? "xl:grid-cols-[1fr_380px]" : "grid-cols-1")}>
        {/* ── Main column ──────────────────────────────────────────── */}
        <div className="min-w-0 space-y-6">
          {/* Page header */}
          <div className="flex flex-wrap items-center gap-3">
            <div>
              <h1 className="font-display text-2xl font-bold tracking-tight">
                {lang === "tr" ? "Galeri paneli" : "Dealership cockpit"}
              </h1>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {lang === "tr"
                  ? "Stok, ilan dağıtımı, müşteriler ve satışlar — tek bakışta."
                  : "Stock, listing distribution, leads and sales — at a glance."}
              </p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-3.5 text-[13px] font-medium text-foreground shadow-pill transition-colors hover:bg-muted">
                <Download className="h-4 w-4 text-muted-foreground" />
                {ui.importStock}
              </button>
              <button className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3.5 text-[13px] font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90">
                <Plus className="h-4 w-4" />
                {ui.addVehicle}
              </button>
            </div>
          </div>

          {/* Stat row */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map((s) => {
              const I = s.icon;
              return (
                <div key={tl(s.label)} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <div className="flex items-center justify-between">
                    <p className="text-[13px] font-medium text-muted-foreground">{tl(s.label)}</p>
                    <span className={cn("grid h-8 w-8 place-items-center rounded-lg", s.tone)}>
                      <I className="h-4 w-4" />
                    </span>
                  </div>
                  <p className="mt-3 tnum text-[26px] font-bold leading-none text-foreground">{s.value}</p>
                  <p className="mt-2 line-clamp-1 text-[11.5px] text-muted-foreground">
                    {typeof s.hint === "string" ? s.hint : tl(s.hint)}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Vehicle inventory list */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
            <div className="flex flex-wrap items-center gap-2.5 border-b border-border p-4">
              <h2 className="font-display text-[15px] font-semibold tracking-tight">
                {lang === "tr" ? "Envanter" : "Inventory"}
              </h2>
              {/* status filter (useState) */}
              <div className="inline-flex rounded-lg border border-border bg-muted/40 p-0.5">
                {filters.map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    className={cn(
                      "rounded-md px-2.5 py-1 text-[12px] font-medium transition-colors",
                      filter === f.key ? "bg-card text-foreground shadow-pill" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {tl(f.label)}
                  </button>
                ))}
              </div>
              <div className="ml-auto flex flex-wrap items-center gap-2">
                <div className="flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={lang === "tr" ? "Marka, model, stok…" : "Make, model, stock…"}
                    className="w-32 bg-transparent text-foreground placeholder:text-muted-foreground/70 focus:outline-none sm:w-44"
                  />
                </div>
                <button className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-card px-3 text-[13px] font-medium text-foreground transition-colors hover:bg-muted">
                  <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                  {ui.filter}
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="label-mono py-2.5 pl-4 font-medium text-muted-foreground">{lang === "tr" ? "Araç" : "Vehicle"}</th>
                    <th className="label-mono py-2.5 font-medium text-muted-foreground">{lang === "tr" ? "Kilometre" : "Mileage"}</th>
                    <th className="label-mono py-2.5 font-medium text-muted-foreground">{lang === "tr" ? "Lot" : "On lot"}</th>
                    <th className="label-mono py-2.5 font-medium text-muted-foreground">{lang === "tr" ? "İlan" : "Listed"}</th>
                    <th className="label-mono py-2.5 text-right font-medium text-muted-foreground">{lang === "tr" ? "Fiyat" : "Price"}</th>
                    <th className="label-mono py-2.5 pr-4 text-right font-medium text-muted-foreground">{lang === "tr" ? "Durum" : "Status"}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((v) => {
                    const isSel = v.id === selected;
                    const dol = daysOnLot(v.stockInDate);
                    const st = STATUS_META[v.status];
                    const live = v.portals.filter((p) => p.state === "published").length;
                    return (
                      <tr
                        key={v.id}
                        onClick={() => {
                          setSelected(v.id);
                          setDrawerOpen(true);
                        }}
                        className={cn(
                          "cursor-pointer border-b border-border/60 transition-colors last:border-0",
                          isSel ? "bg-primary/[0.04]" : "hover:bg-muted/50",
                        )}
                      >
                        <td className="py-3 pl-4">
                          <div className="flex items-center gap-3">
                            <VehicleArt body={v.body} color={v.color} className="h-11 w-16" rounded="rounded-lg" />
                            <div className="min-w-0">
                              <p className="font-semibold leading-tight">
                                {v.year} {v.make} {v.model}
                              </p>
                              <p className="truncate text-xs text-muted-foreground">{v.trim} · {v.stockNo}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3"><span className="tnum whitespace-nowrap text-[13px] text-muted-foreground">{formatKm(v.mileageKm)}</span></td>
                        <td className="py-3">
                          <span className={cn("tnum text-[13px] font-medium", dol >= AGING_THRESHOLD_DAYS ? "text-brandred" : "text-foreground/80")}>
                            {dol} {lang === "tr" ? "gün" : "d"}
                          </span>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-1">
                            {v.portals.filter((p) => p.state === "published").slice(0, 4).map((p) => (
                              <PortalIcon key={p.portal} portal={p.portal} size={18} />
                            ))}
                            {live === 0 && <span className="text-xs text-muted-foreground">—</span>}
                          </div>
                        </td>
                        <td className="py-3 pr-4 text-right">
                          <p className="tnum font-semibold">{formatTRY(v.price)}</p>
                        </td>
                        <td className="py-3 pr-4 text-right">
                          <span className={cn("inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize", st.tone)}>
                            {tl(st)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {rows.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-10 text-center text-sm text-muted-foreground">
                        {lang === "tr" ? "Bu filtreye uyan araç yok." : "No vehicles match this filter."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sales over time + Leads by source */}
          <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-[15px] font-semibold tracking-tight">{tl(salesMeta.title)}</h3>
                  <p className="text-xs text-muted-foreground">{tl(salesMeta.subtitle)}</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-stat-available/10 px-2 py-0.5 text-[11px] font-semibold text-stat-available">
                  <ArrowUpRight className="h-3 w-3" />
                  {salesMeta.delta}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-4 text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-primary" />{lang === "tr" ? "Adet" : "Units"}</span>
                <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-brandred" />{lang === "tr" ? "Brüt kâr" : "Gross profit"}</span>
              </div>
              <div className="mt-3">
                <SalesChart bars={sales.map((s) => s.units)} line={sales.map((s) => s.profit)} labels={sales.map((s) => s.label)} height={170} />
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <h3 className="font-display text-[15px] font-semibold tracking-tight">
                {lang === "tr" ? "Kaynağa göre müşteri" : "Leads by source"}
              </h3>
              <div className="mt-4 space-y-3.5">
                {leadsBySource.map((l) => (
                  <div key={l.source}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="font-medium">{tl(l.label)}</span>
                      <span className="tnum text-muted-foreground">{l.count}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full" style={{ width: `${(l.count / maxSource) * 100}%`, background: "var(--grad-brand)" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Listings distribution + Aging inventory */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Listings distribution */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-[15px] font-semibold tracking-tight">
                  {lang === "tr" ? "İlan dağıtımı" : "Listing distribution"}
                </h3>
                <Link href="/listings" className="inline-flex items-center gap-1 text-[13px] font-medium text-primary hover:underline">
                  {ui.viewAll}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="mt-4 space-y-2.5">
                {(Object.keys(portalMeta) as PortalKey[]).map((pk) => {
                  const published = vehicles.filter((v) => v.portals.some((p) => p.portal === pk && p.state === "published")).length;
                  const pending = vehicles.filter((v) => v.portals.some((p) => p.portal === pk && p.state === "pending")).length;
                  return (
                    <div key={pk} className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-3">
                      <PortalIcon portal={pk} size={30} />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold leading-tight">{portalMeta[pk].label}</p>
                        <p className="text-[11.5px] text-muted-foreground">
                          {published} {lang === "tr" ? "yayında" : "live"}
                          {pending > 0 && ` · ${pending} ${lang === "tr" ? "bekliyor" : "pending"}`}
                        </p>
                      </div>
                      <span className="tnum text-sm font-semibold">{published}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Aging inventory */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-[15px] font-semibold tracking-tight">
                  {lang === "tr" ? "Durağan stok" : "Aging inventory"}
                </h3>
                <span className="inline-flex items-center gap-1 rounded-full bg-brandred/10 px-2 py-0.5 text-[11px] font-semibold text-brandred">
                  {aging.length} {lang === "tr" ? "araç" : "units"}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {lang === "tr" ? `${AGING_THRESHOLD_DAYS}+ gündür lotta` : `On lot for ${AGING_THRESHOLD_DAYS}+ days`}
              </p>
              <div className="mt-3 space-y-2.5">
                {aging.slice(0, 4).map((v) => {
                  const dol = daysOnLot(v.stockInDate);
                  const pct = Math.min(100, (dol / 120) * 100);
                  return (
                    <button
                      key={v.id}
                      onClick={() => { setSelected(v.id); setDrawerOpen(true); }}
                      className="flex w-full items-center gap-3 rounded-xl border border-border bg-card p-2.5 text-left transition-colors hover:bg-muted/40"
                    >
                      <VehicleArt body={v.body} color={v.color} className="h-9 w-14" rounded="rounded-md" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-semibold leading-tight">{v.year} {v.make} {v.model}</p>
                        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                          <div className="h-full rounded-full bg-brandred" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                      <span className="tnum shrink-0 text-[13px] font-semibold text-brandred">{dol}{lang === "tr" ? "g" : "d"}</span>
                    </button>
                  );
                })}
                {aging.length === 0 && (
                  <p className="py-4 text-center text-sm text-muted-foreground">{lang === "tr" ? "Durağan stok yok." : "No aging stock."}</p>
                )}
              </div>
            </div>
          </div>

          {/* Financing / deals */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
            <div className="flex items-center justify-between border-b border-border p-4">
              <h3 className="font-display text-[15px] font-semibold tracking-tight">
                {lang === "tr" ? "Finansman & anlaşmalar" : "Financing & deals"}
              </h3>
              <Link href="/deals" className="inline-flex items-center gap-1 text-[13px] font-medium text-primary hover:underline">
                {ui.viewAll}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="divide-y divide-border/60">
              {deals.map((d) => {
                const stageTone =
                  d.stage === "funded" ? "text-stat-available bg-stat-available/10" :
                  d.stage === "approved" ? "text-info bg-info/10" :
                  d.stage === "signed" ? "text-primary bg-primary/10" :
                  "text-warning-foreground bg-warning/15";
                return (
                  <div key={d.id} className="flex items-center gap-3 px-4 py-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[11px] font-bold text-white" style={{ backgroundImage: "var(--grad-brand)" }}>
                      {d.buyer.split(" ").map((p) => p[0]).join("").slice(0, 2)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold leading-tight">{d.buyer}</p>
                      <p className="truncate text-xs text-muted-foreground">{d.vehicle} · {lang === "tr" ? "peşinat" : "down"} %{d.downPct} · {d.termMonths} {lang === "tr" ? "ay" : "mo"}</p>
                    </div>
                    <span className="tnum hidden text-sm font-semibold sm:block">{formatTRY(d.amount)}</span>
                    <span className={cn("inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold", stageTone)}>
                      {tl(dealStageLabel[d.stage])}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Right detail drawer ──────────────────────────────────── */}
        {drawerOpen && (
          <aside className="animate-float-up xl:sticky xl:top-2 xl:self-start">
            <div className="space-y-5 rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-[15px] font-semibold tracking-tight">
                  {lang === "tr" ? "Araç detayı" : "Vehicle details"}
                </h2>
                <button
                  onClick={() => setDrawerOpen(false)}
                  aria-label={ui.close}
                  className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <VehicleDetail vehicle={current} lang={lang} />
            </div>

            {/* Activity feed */}
            <div className="mt-5 rounded-2xl border border-border bg-card p-5 shadow-soft">
              <h3 className="font-display text-[15px] font-semibold tracking-tight">{ui.recentActivity}</h3>
              <div className="mt-3.5 space-y-3.5">
                {activity.map((a) => (
                  <div key={a.id} className="flex items-start gap-2.5">
                    <span
                      className={cn(
                        "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                        a.tone === "success" ? "bg-stat-available" : a.tone === "warning" ? "bg-warning" : a.tone === "info" ? "bg-info" : "bg-muted-foreground",
                      )}
                    />
                    <div className="min-w-0 text-[13px]">
                      <p className="leading-snug">
                        <span className="font-semibold">{a.who}</span>{" "}
                        <span className="text-muted-foreground">{tl(a.action)}</span>{" "}
                        <span className="font-medium">{a.target}</span>
                      </p>
                      <p className="text-[11px] text-muted-foreground">{formatRelative(a.at)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

/* ── Drawer body: gallery, specs, cost/markup/profit, portals, leads ───────── */
function VehicleDetail({ vehicle: v, lang }: { vehicle: Vehicle; lang: "tr" | "en" }) {
  const tl = (x: { tr: string; en: string }) => x[lang];
  const dol = daysOnLot(v.stockInDate);
  const profit = v.price - v.cost;
  const markup = (profit / v.cost) * 100;
  const fees = Math.round(v.price * 0.03);
  const net = profit - fees;
  const st = STATUS_META[v.status];

  return (
    <>
      {/* SVG photo gallery — main + thumbnail strip (all inline, no photos) */}
      <VehicleArt body={v.body} color={v.color} className="h-40 w-full" />
      <div className="-mt-2 flex gap-2">
        {["front", "side", "rear"].map((angle, i) => (
          <div key={angle} className="relative flex-1">
            <VehicleArt body={v.body} color={v.color} className={cn("h-12 w-full", i !== 1 && "opacity-70")} rounded="rounded-md" />
          </div>
        ))}
      </div>

      {/* Title + status */}
      <div>
        <div className="flex items-center justify-between gap-2">
          <p className="font-display text-lg font-bold leading-tight">{v.year} {v.make} {v.model}</p>
          <span className={cn("inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize", st.tone)}>{tl(st)}</span>
        </div>
        <p className="text-xs text-muted-foreground">{v.trim} · {v.stockNo} · {tl(v.colorName)}</p>
      </div>

      {/* Key facts */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <Fact icon={<Gauge className="h-4 w-4" />} label={lang === "tr" ? "Km" : "Mileage"} value={formatKm(v.mileageKm).replace(" km", "")} />
        <Fact icon={<Timer className="h-4 w-4" />} label={lang === "tr" ? "Lotta" : "On lot"} value={`${dol}${lang === "tr" ? "g" : "d"}`} tone={dol >= AGING_THRESHOLD_DAYS ? "text-brandred" : undefined} />
        <Fact icon={<Car className="h-4 w-4" />} label={lang === "tr" ? "Müşteri" : "Leads"} value={String(v.leadCount)} />
      </div>

      {/* Specs */}
      <div>
        <p className="label-mono mb-2 text-muted-foreground">{lang === "tr" ? "Teknik" : "Specs"}</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[13px]">
          {v.specs.map((s) => (
            <div key={tl(s.label)} className="flex items-center justify-between border-b border-border/60 pb-1.5">
              <span className="text-muted-foreground">{tl(s.label)}</span>
              <span className="font-medium">{tl(s.value)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Cost / markup / profit */}
      <div className="rounded-xl border border-border bg-muted/30 p-3.5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{lang === "tr" ? "Liste fiyatı" : "List price"}</span>
          <span className="tnum text-lg font-bold">{formatTRY(v.price)}</span>
        </div>
        <div className="mt-3">
          <SegmentedBar
            segments={[
              { label: lang === "tr" ? "Maliyet" : "Cost", value: v.cost, color: "var(--seg-1)" },
              { label: lang === "tr" ? "Komisyon" : "Fees", value: fees, color: "var(--seg-4)" },
              { label: lang === "tr" ? "Net kâr" : "Net profit", value: Math.max(0, net), color: "var(--seg-3)" },
            ]}
          />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-[13px]">
          <Money label={lang === "tr" ? "Maliyet" : "Cost"} value={v.cost} />
          <Money label={lang === "tr" ? "Brüt kâr" : "Gross profit"} value={profit} tone="text-stat-available" />
          <Money label={lang === "tr" ? "Komisyon" : "Fees"} value={fees} />
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{lang === "tr" ? "Marj" : "Markup"}</span>
            <span className="tnum font-semibold text-stat-available">{markup.toFixed(1)}%</span>
          </div>
        </div>
      </div>

      {/* Listing distribution to portals */}
      <div>
        <p className="label-mono mb-2 text-muted-foreground">{lang === "tr" ? "İlan dağıtımı" : "Listing distribution"}</p>
        <div className="space-y-2">
          {v.portals.map((p) => {
            const meta = PORTAL_STATE_META[p.state];
            return (
              <div key={p.portal} className="flex items-center gap-2.5 rounded-lg border border-border bg-card p-2.5">
                <PortalIcon portal={p.portal} size={24} />
                <span className="flex-1 text-[13px] font-medium capitalize">{p.portal === "web" ? "Autolot Web" : p.portal}</span>
                {p.views !== undefined && p.state === "published" && (
                  <span className="tnum text-[11px] text-muted-foreground">{p.views.toLocaleString("en-US")} {lang === "tr" ? "görüntülenme" : "views"}</span>
                )}
                <span className={cn("inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold", meta.tone)}>{tl(meta)}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Leads / inquiries */}
      <div>
        <p className="label-mono mb-2 text-muted-foreground">{lang === "tr" ? "Gelen müşteriler" : "Inquiries"}</p>
        <div className="space-y-2">
          {v.leads.length === 0 && (
            <p className="rounded-lg border border-dashed border-border py-3 text-center text-xs text-muted-foreground">
              {lang === "tr" ? "Henüz müşteri yok." : "No inquiries yet."}
            </p>
          )}
          {v.leads.map((l) => (
            <div key={l.id} className="rounded-lg border border-border bg-card p-2.5">
              <div className="flex items-center gap-2">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                  {l.name.split(" ").map((p) => p[0]).join("").slice(0, 2)}
                </span>
                <span className="text-[13px] font-semibold">{l.name}</span>
                {l.hot && <span className="rounded-full bg-brandred/10 px-1.5 py-0.5 text-[9px] font-bold uppercase text-brandred">{lang === "tr" ? "sıcak" : "hot"}</span>}
                <span className="ml-auto text-[11px] text-muted-foreground">{formatRelative(l.at)}</span>
              </div>
              <p className="mt-1.5 text-[12.5px] leading-snug text-foreground/80">{tl(l.message)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button className="flex items-center justify-center gap-1.5 rounded-lg bg-primary py-2.5 text-[13px] font-semibold text-primary-foreground transition-opacity hover:opacity-90">
          <CheckCircle2 className="h-4 w-4" />
          {lang === "tr" ? "Satışı kapat" : "Mark sold"}
        </button>
        <button className="flex items-center justify-center gap-1.5 rounded-lg border border-border bg-card py-2.5 text-[13px] font-semibold text-foreground transition-colors hover:bg-muted">
          <Phone className="h-4 w-4 text-muted-foreground" />
          {lang === "tr" ? "Müşteriyi ara" : "Call lead"}
        </button>
      </div>
    </>
  );
}

function Fact({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: string; tone?: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-2.5">
      <span className="mx-auto grid h-7 w-7 place-items-center rounded-lg bg-muted text-muted-foreground">{icon}</span>
      <p className={cn("mt-1.5 tnum text-sm font-bold leading-none", tone)}>{value}</p>
      <p className="mt-1 text-[10.5px] text-muted-foreground">{label}</p>
    </div>
  );
}

function Money({ label, value, tone }: { label: string; value: number; tone?: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={cn("tnum font-semibold", tone)}>{formatTRY(value)}</span>
    </div>
  );
}
