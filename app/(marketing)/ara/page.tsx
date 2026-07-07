"use client";

import { useState, useMemo } from "react";
import { vehicles as allVehicles } from "@/lib/demo/data";
import { VehicleArt, PortalIcon } from "@/components/app/vehicle-art";
import { useLang } from "@/components/i18n/language-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";

const nonSold = allVehicles.filter((v) => v.status !== "sold");

const MAKES = Array.from(new Set(nonSold.map((v) => v.make))).sort();
const BODIES = Array.from(new Set(nonSold.map((v) => v.body))).sort();

const selectCls =
  "flex h-10 w-full rounded-lg border border-input bg-card px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const SORT_OPTIONS = [
  { value: "newest", tr: "En yeni ilanlar", en: "Newest listings" },
  { value: "price_asc", tr: "Fiyat: Düşükten yükseğe", en: "Price: Low to high" },
  { value: "price_desc", tr: "Fiyat: Yüksekten düşüğe", en: "Price: High to low" },
  { value: "km_asc", tr: "En az kilometre", en: "Lowest mileage" },
  { value: "year_desc", tr: "En yeni model yılı", en: "Newest model year" },
];

export default function AraPage() {
  const { lang } = useLang();
  const tr = lang === "tr";

  const [q, setQ] = useState("");
  const [make, setMake] = useState("");
  const [body, setBody] = useState("");
  const [fuel, setFuel] = useState("");
  const [gearbox, setGearbox] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [yearMin, setYearMin] = useState("");
  const [sort, setSort] = useState("newest");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fuels = useMemo(
    () => Array.from(new Set(nonSold.map((v) => v.fuel[lang]))),
    [lang],
  );
  const gears = useMemo(
    () => Array.from(new Set(nonSold.map((v) => v.gearbox[lang]))),
    [lang],
  );

  const results = useMemo(() => {
    let list = nonSold.filter((v) => {
      if (
        q &&
        !`${v.make} ${v.model} ${v.trim}`
          .toLowerCase()
          .includes(q.toLowerCase())
      )
        return false;
      if (make && v.make !== make) return false;
      if (body && v.body !== body) return false;
      if (fuel && v.fuel[lang] !== fuel) return false;
      if (gearbox && v.gearbox[lang] !== gearbox) return false;
      if (priceMin && v.price < Number(priceMin)) return false;
      if (priceMax && v.price > Number(priceMax)) return false;
      if (yearMin && v.year < Number(yearMin)) return false;
      return true;
    });

    if (sort === "price_asc") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "price_desc") list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "km_asc") list = [...list].sort((a, b) => a.mileageKm - b.mileageKm);
    else if (sort === "year_desc") list = [...list].sort((a, b) => b.year - a.year);

    return list;
  }, [q, make, body, fuel, gearbox, priceMin, priceMax, yearMin, sort, lang]);

  const hasFilters = make || body || fuel || gearbox || priceMin || priceMax || yearMin;

  const clearFilters = () => {
    setMake(""); setBody(""); setFuel(""); setGearbox("");
    setPriceMin(""); setPriceMax(""); setYearMin("");
  };

  const bodyLabels: Record<string, string> = {
    sedan: "Sedan", suv: "SUV", hatchback: "Hatchback",
    pickup: "Pickup", coupe: "Coupe", van: tr ? "Panelvan" : "Van",
  };

  const FilterPanel = () => (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {tr ? "Filtreler" : "Filters"}
        </span>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-xs text-primary hover:underline"
          >
            <X className="h-3 w-3" />
            {tr ? "Temizle" : "Clear"}
          </button>
        )}
      </div>

      {/* Marka */}
      <div>
        <label className="text-xs text-muted-foreground mb-1.5 block font-medium">
          {tr ? "Marka" : "Make"}
        </label>
        <select className={selectCls} value={make} onChange={(e) => setMake(e.target.value)}>
          <option value="">{tr ? "Tüm markalar" : "All makes"}</option>
          {MAKES.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      {/* Kasa */}
      <div>
        <label className="text-xs text-muted-foreground mb-1.5 block font-medium">
          {tr ? "Kasa Tipi" : "Body Type"}
        </label>
        <select className={selectCls} value={body} onChange={(e) => setBody(e.target.value)}>
          <option value="">{tr ? "Tüm kasalar" : "All types"}</option>
          {BODIES.map((b) => <option key={b} value={b}>{bodyLabels[b]}</option>)}
        </select>
      </div>

      {/* Yakıt */}
      <div>
        <label className="text-xs text-muted-foreground mb-1.5 block font-medium">
          {tr ? "Yakıt" : "Fuel"}
        </label>
        <select className={selectCls} value={fuel} onChange={(e) => setFuel(e.target.value)}>
          <option value="">{tr ? "Tümü" : "All"}</option>
          {fuels.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>
      </div>

      {/* Vites */}
      <div>
        <label className="text-xs text-muted-foreground mb-1.5 block font-medium">
          {tr ? "Vites" : "Gearbox"}
        </label>
        <select className={selectCls} value={gearbox} onChange={(e) => setGearbox(e.target.value)}>
          <option value="">{tr ? "Tümü" : "All"}</option>
          {gears.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>
      </div>

      {/* Fiyat */}
      <div>
        <label className="text-xs text-muted-foreground mb-1.5 block font-medium">
          {tr ? "Fiyat (₺)" : "Price (₺)"}
        </label>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder={tr ? "En az" : "Min"}
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
          />
          <Input
            type="number"
            placeholder={tr ? "En fazla" : "Max"}
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
          />
        </div>
      </div>

      {/* Yıl */}
      <div>
        <label className="text-xs text-muted-foreground mb-1.5 block font-medium">
          {tr ? "Model Yılı (en erken)" : "Year (from)"}
        </label>
        <Input
          type="number"
          placeholder="2019"
          min={2000}
          max={2027}
          value={yearMin}
          onChange={(e) => setYearMin(e.target.value)}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="border-b border-border bg-muted/40 py-10 px-5">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-2xl font-bold mb-1">
            {tr ? "İkinci El Araç İlanları" : "Used Car Listings"}
          </h1>
          <p className="text-sm text-muted-foreground mb-5">
            {tr
              ? "Güvenli galeriden en iyi fiyatlı ikinci el araçlar"
              : "Best-priced used cars from a trusted dealership"}
          </p>
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
            <input
              type="search"
              placeholder={
                tr
                  ? "Marka, model veya donanım ara… (ör. BMW 320i)"
                  : "Search make, model or trim… (e.g. BMW 320i)"
              }
              className="flex h-12 w-full rounded-xl border border-input bg-background pl-12 pr-4 text-base text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shadow-sm"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-7xl px-5 py-8">
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-56 shrink-0">
            <FilterPanel />
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
              <div className="flex items-center gap-2">
                <button
                  className="lg:hidden flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium"
                  onClick={() => setSidebarOpen(true)}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  {tr ? "Filtrele" : "Filter"}
                  {hasFilters && (
                    <span className="ml-1 rounded-full bg-primary w-5 h-5 flex items-center justify-center text-[10px] text-primary-foreground font-bold">
                      !
                    </span>
                  )}
                </button>
                <span className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{results.length}</span>{" "}
                  {tr ? "araç listelendi" : "vehicles found"}
                </span>
              </div>
              <select
                className="h-9 rounded-lg border border-input bg-card px-3 text-sm text-foreground focus-visible:outline-none"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {tr ? o.tr : o.en}
                  </option>
                ))}
              </select>
            </div>

            {/* Grid */}
            {results.length === 0 ? (
              <div className="py-24 text-center text-muted-foreground">
                <Search className="mx-auto h-10 w-10 mb-3 opacity-30" />
                <p className="text-base font-medium">
                  {tr ? "Araç bulunamadı" : "No vehicles found"}
                </p>
                <p className="text-sm mt-1">
                  {tr ? "Filtrelerinizi değiştirmeyi deneyin." : "Try adjusting your filters."}
                </p>
                {hasFilters && (
                  <button onClick={clearFilters} className="mt-3 text-sm text-primary hover:underline">
                    {tr ? "Filtreleri temizle" : "Clear filters"}
                  </button>
                )}
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((v) => (
                  <article
                    key={v.id}
                    className="group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-200"
                  >
                    {/* Image */}
                    <div className="relative">
                      <VehicleArt
                        body={v.body}
                        color={v.color}
                        className="h-48 w-full"
                        rounded="rounded-none"
                      />
                      {v.status === "reserved" && (
                        <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                          <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white shadow">
                            {tr ? "Rezerve" : "Reserved"}
                          </span>
                        </div>
                      )}
                      {/* Portal badges */}
                      <div className="absolute bottom-2 right-2 flex gap-1">
                        {v.portals
                          .filter((p) => p.state === "published")
                          .map((p) => (
                            <PortalIcon key={p.portal} portal={p.portal} size={20} />
                          ))}
                      </div>
                    </div>

                    <div className="p-4">
                      {/* Title */}
                      <h3 className="font-bold text-base leading-tight mb-0.5">
                        {v.year} {v.make} {v.model}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-3">
                        {v.trim} · {v.colorName[lang]}
                      </p>

                      {/* Specs pills */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {[
                          `${v.mileageKm.toLocaleString("tr-TR")} km`,
                          v.fuel[lang],
                          v.gearbox[lang],
                          v.body.charAt(0).toUpperCase() + v.body.slice(1),
                        ].map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Price + CTA */}
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p className="text-lg font-extrabold text-foreground leading-none">
                            ₺{v.price.toLocaleString("tr-TR")}
                          </p>
                          {v.leadCount > 0 && (
                            <p className="text-[10px] text-muted-foreground mt-0.5">
                              {v.leadCount} {tr ? "kişi ilgilendi" : "interested"}
                            </p>
                          )}
                        </div>
                        <Button size="sm" asChild>
                          <Link href="/login">
                            {tr ? "İletişime Geç" : "Contact"}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-background border-l border-border p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <span className="font-semibold">{tr ? "Filtreler" : "Filters"}</span>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <FilterPanel />
            <Button className="mt-6 w-full" onClick={() => setSidebarOpen(false)}>
              {tr
                ? `${results.length} araç göster`
                : `Show ${results.length} vehicles`}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
