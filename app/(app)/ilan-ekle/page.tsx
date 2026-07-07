"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLang } from "@/components/i18n/language-provider";
import { useInventory } from "@/lib/inventory-context";
import { CheckCircle2, PlusCircle } from "lucide-react";
import type { Vehicle, BodyType } from "@/lib/demo/data";

type FormData = {
  make: string;
  model: string;
  year: string;
  trim: string;
  body: string;
  color: string;
  vin: string;
  mileage: string;
  fuel: string;
  gearbox: string;
  price: string;
  cost: string;
  portals: string[];
  notes: string;
};

const INITIAL: FormData = {
  make: "",
  model: "",
  year: "",
  trim: "",
  body: "sedan",
  color: "",
  vin: "",
  mileage: "",
  fuel: "",
  gearbox: "",
  price: "",
  cost: "",
  portals: ["sahibinden", "arabam", "web"],
  notes: "",
};

const selectCls =
  "flex h-10 w-full rounded-lg border border-input bg-card px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export default function IlanEklePage() {
  const { lang } = useLang();
  const { addVehicle } = useInventory();
  const router = useRouter();
  const [form, setForm] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const tr = lang === "tr";

  const set = (key: keyof FormData, val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const togglePortal = (p: string) =>
    setForm((f) => ({
      ...f,
      portals: f.portals.includes(p)
        ? f.portals.filter((x) => x !== p)
        : [...f.portals, p],
    }));

  const margin =
    form.price && form.cost && Number(form.price) > Number(form.cost)
      ? Number(form.price) - Number(form.cost)
      : null;

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 px-5">
        <div className="grid h-16 w-16 place-items-center rounded-2xl border border-border bg-card">
          <CheckCircle2 className="h-8 w-8 text-green-500" />
        </div>
        <h2 className="text-xl font-bold">
          {tr ? "İlan oluşturuldu!" : "Listing created!"}
        </h2>
        <p className="text-sm text-muted-foreground text-center max-w-sm">
          {tr
            ? "Demo modda kaydedildi. Supabase bağlandığında gerçek veritabanına işlenir."
            : "Saved in demo mode. Will persist to the real database once Supabase is connected."}
        </p>
        <div className="flex gap-2 mt-2">
          <Button
            variant="outline"
            onClick={() => {
              setForm(INITIAL);
              setSubmitted(false);
            }}
          >
            {tr ? "Yeni İlan Ekle" : "Add Another"}
          </Button>
          <Button asChild>
            <a href="/dashboard">{tr ? "Panele Dön" : "Back to Dashboard"}</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-10">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border bg-card">
          <PlusCircle className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold">
            {tr ? "Yeni İlan Ekle" : "New Listing"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {tr
              ? "Aracı stoğa ekle ve portallara yayınla"
              : "Add vehicle to stock and publish to portals"}
          </p>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const fuelMap: Record<string, { tr: string; en: string }> = {
            benzin: { tr: "Benzin", en: "Petrol" },
            dizel: { tr: "Dizel", en: "Diesel" },
            hibrit: { tr: "Hibrit", en: "Hybrid" },
            elektrik: { tr: "Elektrik", en: "Electric" },
          };
          const gxMap: Record<string, { tr: string; en: string }> = {
            otomatik: { tr: "Otomatik", en: "Automatic" },
            manuel: { tr: "Manuel", en: "Manual" },
          };
          const colorMap: Record<string, { name: { tr: string; en: string }; hex: string }> = {
            Beyaz: { name: { tr: "Beyaz", en: "White" }, hex: "#f5f5f5" },
            Siyah: { name: { tr: "Siyah", en: "Black" }, hex: "#1a1a1a" },
            Kırmızı: { name: { tr: "Kırmızı", en: "Red" }, hex: "#c0392b" },
            Mavi: { name: { tr: "Mavi", en: "Blue" }, hex: "#2980b9" },
            Gümüş: { name: { tr: "Gümüş", en: "Silver" }, hex: "#b6bcc4" },
            Gri: { name: { tr: "Gri", en: "Grey" }, hex: "#7f8c8d" },
          };
          const colorEntry = colorMap[form.color] ?? {
            name: { tr: form.color, en: form.color },
            hex: "#888",
          };
          const id = `v-${Date.now()}`;
          const newVehicle: Vehicle = {
            id,
            stockNo: `AL-${id.slice(-4)}`,
            year: Number(form.year),
            make: form.make,
            model: form.model,
            trim: form.trim,
            body: form.body as BodyType,
            color: colorEntry.hex,
            colorName: colorEntry.name,
            price: Number(form.price),
            cost: Number(form.cost) || 0,
            mileageKm: Number(form.mileage),
            fuel: fuelMap[form.fuel] ?? { tr: form.fuel, en: form.fuel },
            gearbox: gxMap[form.gearbox] ?? { tr: form.gearbox, en: form.gearbox },
            stockInDate: new Date().toISOString(),
            status: "available",
            vin: form.vin,
            portals: form.portals.map((p) => ({
              portal: p as import("@/lib/demo/data").PortalKey,
              state: "draft" as import("@/lib/demo/data").PortalState,
            })),
            leadCount: 0,
            leads: [],
            specs: [],
          };
          addVehicle(newVehicle);
          setSubmitted(true);
          setTimeout(() => router.push("/listings"), 1800);
        }}
        className="space-y-8"
      >
        {/* Araç Bilgileri */}
        <section>
          <h2 className="label-mono text-muted-foreground mb-3">
            {tr ? "Araç Bilgileri" : "Vehicle Info"}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                {tr ? "Marka" : "Make"} *
              </label>
              <Input
                placeholder="BMW, Toyota…"
                value={form.make}
                onChange={(e) => set("make", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                {tr ? "Model" : "Model"} *
              </label>
              <Input
                placeholder="320i, Corolla…"
                value={form.model}
                onChange={(e) => set("model", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                {tr ? "Yıl" : "Year"} *
              </label>
              <Input
                type="number"
                placeholder="2022"
                min={1990}
                max={2027}
                value={form.year}
                onChange={(e) => set("year", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                {tr ? "Donanım / Versiyon" : "Trim"}
              </label>
              <Input
                placeholder="M Sport, Elegance…"
                value={form.trim}
                onChange={(e) => set("trim", e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                {tr ? "Kasa Tipi" : "Body Type"}
              </label>
              <select
                className={selectCls}
                value={form.body}
                onChange={(e) => set("body", e.target.value)}
              >
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="hatchback">Hatchback</option>
                <option value="coupe">Coupe</option>
                <option value="pickup">Pickup</option>
                <option value="van">{tr ? "Panelvan" : "Van"}</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                {tr ? "Renk" : "Color"}
              </label>
              <Input
                placeholder={tr ? "Beyaz, Siyah…" : "White, Black…"}
                value={form.color}
                onChange={(e) => set("color", e.target.value)}
              />
            </div>
          </div>
          <div className="mt-3">
            <label className="text-xs text-muted-foreground mb-1 block">
              {tr ? "Şasi No (VIN)" : "VIN / Chassis"}
            </label>
            <Input
              placeholder="WBA8E9C50JNU12345"
              value={form.vin}
              onChange={(e) => set("vin", e.target.value)}
              className="font-mono"
            />
          </div>
        </section>

        {/* Teknik */}
        <section>
          <h2 className="label-mono text-muted-foreground mb-3">
            {tr ? "Teknik Özellikler" : "Specs"}
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                {tr ? "Kilometre" : "Mileage (km)"} *
              </label>
              <Input
                type="number"
                placeholder="45000"
                value={form.mileage}
                onChange={(e) => set("mileage", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                {tr ? "Yakıt Tipi" : "Fuel Type"}
              </label>
              <select
                className={selectCls}
                value={form.fuel}
                onChange={(e) => set("fuel", e.target.value)}
              >
                <option value="">{tr ? "Seçin" : "Select"}</option>
                <option value="benzin">{tr ? "Benzin" : "Petrol"}</option>
                <option value="dizel">{tr ? "Dizel" : "Diesel"}</option>
                <option value="hibrit">{tr ? "Hibrit" : "Hybrid"}</option>
                <option value="elektrik">{tr ? "Elektrik" : "Electric"}</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                {tr ? "Vites" : "Gearbox"}
              </label>
              <select
                className={selectCls}
                value={form.gearbox}
                onChange={(e) => set("gearbox", e.target.value)}
              >
                <option value="">{tr ? "Seçin" : "Select"}</option>
                <option value="otomatik">
                  {tr ? "Otomatik" : "Automatic"}
                </option>
                <option value="manuel">{tr ? "Manuel" : "Manual"}</option>
              </select>
            </div>
          </div>
        </section>

        {/* Fiyat */}
        <section>
          <h2 className="label-mono text-muted-foreground mb-3">
            {tr ? "Fiyatlandırma" : "Pricing"}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                {tr ? "Satış Fiyatı (₺)" : "Sale Price (₺)"} *
              </label>
              <Input
                type="number"
                placeholder="1450000"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                {tr ? "Alış Maliyeti (₺)" : "Cost (₺)"}
              </label>
              <Input
                type="number"
                placeholder="1280000"
                value={form.cost}
                onChange={(e) => set("cost", e.target.value)}
              />
            </div>
          </div>
          {margin !== null && (
            <p className="mt-2 text-xs font-medium text-green-600 dark:text-green-400">
              {tr ? "Tahmini kâr: " : "Est. margin: "}₺
              {margin.toLocaleString("tr-TR")} (
              {Math.round((margin / Number(form.price)) * 100)}%)
            </p>
          )}
        </section>

        {/* Portals */}
        <section>
          <h2 className="label-mono text-muted-foreground mb-3">
            {tr ? "Yayın Platformları" : "Publish To"}
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              ["sahibinden", "Sahibinden"],
              ["arabam", "Arabam.com"],
              ["instagram", "Instagram"],
              ["web", "Autolot Web"],
            ].map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => togglePortal(key)}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                  form.portals.includes(key)
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </section>

        {/* Notlar */}
        <section>
          <label className="text-xs text-muted-foreground mb-1 block">
            {tr ? "Notlar / Açıklama" : "Notes / Description"}
          </label>
          <textarea
            className="flex w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
            rows={3}
            placeholder={
              tr
                ? "Araç hakkında ek bilgi, tramer, aksesuar…"
                : "Extra notes: paint history, accessories…"
            }
            value={form.notes}
            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
          />
        </section>

        <Button type="submit" className="w-full" size="lg">
          {tr ? "İlanı Oluştur" : "Create Listing"}
        </Button>
      </form>
    </div>
  );
}
