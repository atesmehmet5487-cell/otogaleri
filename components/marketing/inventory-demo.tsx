"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Check, Loader2 } from "lucide-react";
import { VehicleArt, PortalIcon } from "@/components/app/vehicle-art";
import { useLang } from "@/components/i18n/language-provider";
import { cn, formatTRY } from "@/lib/utils";
import type { BodyType, PortalKey } from "@/lib/demo/data";

interface DemoVehicle {
  id: number;
  title: string;
  body: BodyType;
  color: string;
  price: number;
  addedAt: number; // ms timestamp the user "added" it
  portals: { portal: PortalKey; live: boolean }[];
}

const CATALOG: Omit<DemoVehicle, "id" | "addedAt" | "portals">[] = [
  { title: "2022 BMW 320i", body: "sedan", color: "#1f3a5f", price: 1_545_000 },
  { title: "2023 Ford Ranger", body: "pickup", color: "#e67e22", price: 2_050_000 },
  { title: "2024 Toyota Corolla", body: "sedan", color: "#ecf0f1", price: 1_420_000 },
  { title: "2021 VW Tiguan", body: "suv", color: "#2980b9", price: 1_285_000 },
  { title: "2020 Renault Clio", body: "hatchback", color: "#27ae60", price: 615_000 },
];

const PORTALS: PortalKey[] = ["sahibinden", "arabam", "instagram", "web"];

export function InventoryDemo() {
  const { lang } = useLang();
  const [list, setList] = useState<DemoVehicle[]>(() => [
    {
      id: 0,
      ...CATALOG[3],
      addedAt: Date.now() - 1000 * 60 * 60 * 24 * 6, // 6 days ago
      portals: PORTALS.map((p) => ({ portal: p, live: true })),
    },
  ]);
  const [adding, setAdding] = useState(false);
  const [tick, setTick] = useState(0);
  const nextId = useRef(1);

  // re-render every second so "days on lot" + portal publish progress advance
  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 1000);
    return () => clearInterval(t);
  }, []);

  // stagger portals going live for freshly-added vehicles
  useEffect(() => {
    if (!list.some((v) => v.portals.some((p) => !p.live))) return;
    const t = setInterval(() => {
      setList((prev) =>
        prev.map((v) => {
          const idx = v.portals.findIndex((p) => !p.live);
          if (idx === -1) return v;
          const portals = v.portals.map((p, i) => (i === idx ? { ...p, live: true } : p));
          return { ...v, portals };
        }),
      );
    }, 750);
    return () => clearInterval(t);
  }, [list]);

  function addVehicle() {
    setAdding(true);
    setTimeout(() => {
      const pick = CATALOG[nextId.current % CATALOG.length];
      setList((prev) => [
        {
          id: nextId.current++,
          ...pick,
          addedAt: Date.now(),
          portals: PORTALS.map((p) => ({ portal: p, live: false })),
        },
        ...prev,
      ]);
      setAdding(false);
    }, 550);
  }

  function daysOnLot(addedAt: number) {
    const d = (Date.now() - addedAt) / 86_400_000;
    return d < 1 ? `${Math.floor((Date.now() - addedAt) / 1000)}${lang === "tr" ? "sn" : "s"}` : `${Math.floor(d)}${lang === "tr" ? "g" : "d"}`;
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-pop">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold leading-tight">{lang === "tr" ? "Hızlı stok girişi" : "Quick stock entry"}</p>
          <p className="text-xs text-muted-foreground">{lang === "tr" ? "Bir araç ekle — anında her portala düşsün." : "Add a vehicle — watch it hit every portal."}</p>
        </div>
        <button
          onClick={addVehicle}
          disabled={adding}
          className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3.5 text-[13px] font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
          {lang === "tr" ? "Araç ekle" : "Add vehicle"}
        </button>
      </div>

      <div className="mt-4 max-h-[340px] space-y-2.5 overflow-y-auto pr-1">
        {list.map((v) => {
          const liveCount = v.portals.filter((p) => p.live).length;
          const allLive = liveCount === v.portals.length;
          const fresh = Date.now() - v.addedAt < 6000;
          return (
            <div
              key={v.id}
              className={cn(
                "rounded-xl border border-border bg-card p-3 transition-colors",
                fresh && "animate-float-up bg-primary/[0.04]",
              )}
            >
              <div className="flex items-center gap-3">
                <VehicleArt body={v.body} color={v.color} className="h-11 w-16" rounded="rounded-lg" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold leading-tight">{v.title}</p>
                  <p className="tnum text-[11px] text-muted-foreground">
                    {formatTRY(v.price)} · {daysOnLot(v.addedAt)} {lang === "tr" ? "lotta" : "on lot"}
                  </p>
                </div>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                    allLive ? "bg-stat-available/10 text-stat-available" : "bg-warning/15 text-warning-foreground",
                  )}
                >
                  {allLive ? (lang === "tr" ? "yayında" : "live") : (lang === "tr" ? "yayınlanıyor" : "publishing")}
                </span>
              </div>
              {/* portal chips */}
              <div className="mt-2.5 flex items-center gap-1.5">
                {v.portals.map((p) => (
                  <span
                    key={p.portal}
                    className={cn(
                      "relative inline-flex items-center transition-opacity",
                      p.live ? "opacity-100" : "opacity-30",
                    )}
                  >
                    <PortalIcon portal={p.portal} size={20} />
                    {p.live && (
                      <span className="absolute -bottom-0.5 -right-0.5 grid h-3 w-3 place-items-center rounded-full bg-stat-available text-white">
                        <Check className="h-2 w-2" strokeWidth={4} />
                      </span>
                    )}
                  </span>
                ))}
                <span className="ml-auto tnum text-[10px] text-muted-foreground">
                  {liveCount}/{v.portals.length} {lang === "tr" ? "portal" : "portals"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-center text-[11px] text-muted-foreground" aria-hidden>
        {/* tick keeps the timer fresh */}
        <span className="hidden">{tick}</span>
        {lang === "tr" ? "Demo · tek araç → Sahibinden, Arabam, Instagram, Web" : "Demo · one vehicle → Sahibinden, Arabam, Instagram, Web"}
      </p>
    </div>
  );
}
