"use client";

import { useInventory } from "@/lib/inventory-context";
import { useLang } from "@/components/i18n/language-provider";
import { VehicleArt, PortalIcon } from "@/components/app/vehicle-art";
import { Button } from "@/components/ui/button";
import { daysOnLot } from "@/lib/demo/data";
import { PlusCircle, Trash2, Clock, Eye } from "lucide-react";
import Link from "next/link";
import type { Vehicle } from "@/lib/demo/data";

const STATUS_STYLE: Record<Vehicle["status"], string> = {
  available: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  reserved:  "bg-amber-100  text-amber-700  dark:bg-amber-900/30  dark:text-amber-400",
  sold:      "bg-muted       text-muted-foreground",
};

export default function ListingsPage() {
  const { vehicles, removeVehicle, updateStatus } = useInventory();
  const { lang } = useLang();
  const tr = lang === "tr";

  const handleDelete = (v: Vehicle) => {
    const msg = tr
      ? `"${v.year} ${v.make} ${v.model}" ilanını silmek istediğinize emin misiniz?`
      : `Delete listing "${v.year} ${v.make} ${v.model}"?`;
    if (window.confirm(msg)) removeVehicle(v.id);
  };

  const statusLabel: Record<Vehicle["status"], string> = {
    available: tr ? "Satışta" : "Available",
    reserved:  tr ? "Rezerve" : "Reserved",
    sold:      tr ? "Satıldı" : "Sold",
  };

  const totalViews = (v: Vehicle) =>
    v.portals.reduce((s, p) => s + (p.views ?? 0), 0);

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold">
            {tr ? "İlan Yönetimi" : "Listing Management"}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {vehicles.length} {tr ? "araç stokta" : "vehicles in stock"}
          </p>
        </div>
        <Button asChild>
          <Link href="/ilan-ekle" className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            {tr ? "Yeni İlan Ekle" : "New Listing"}
          </Link>
        </Button>
      </div>

      {/* Stats bar */}
      <div className="mb-6 grid grid-cols-3 gap-3 sm:grid-cols-3">
        {[
          {
            label: tr ? "Satışta" : "Available",
            value: vehicles.filter((v) => v.status === "available").length,
            color: "text-emerald-600",
          },
          {
            label: tr ? "Rezerve" : "Reserved",
            value: vehicles.filter((v) => v.status === "reserved").length,
            color: "text-amber-600",
          },
          {
            label: tr ? "Satıldı" : "Sold",
            value: vehicles.filter((v) => v.status === "sold").length,
            color: "text-muted-foreground",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-border bg-card p-4 text-center"
          >
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {vehicles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 rounded-2xl border border-dashed border-border">
          <p className="text-muted-foreground text-sm">
            {tr ? "Henüz ilan eklenmedi." : "No listings yet."}
          </p>
          <Button asChild variant="outline">
            <Link href="/ilan-ekle">
              <PlusCircle className="h-4 w-4 mr-2" />
              {tr ? "İlk İlanı Ekle" : "Add First Listing"}
            </Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {vehicles.map((v) => {
            const days = daysOnLot(v.stockInDate);
            const views = totalViews(v);
            const publishedPortals = v.portals.filter((p) => p.state === "published");

            return (
              <div
                key={v.id}
                className="flex gap-4 items-center rounded-2xl border border-border bg-card p-3 hover:border-primary/20 transition-colors"
              >
                {/* Thumbnail */}
                <VehicleArt
                  body={v.body}
                  color={v.color}
                  className="h-20 w-28 shrink-0"
                  rounded="rounded-xl"
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 flex-wrap">
                    <h3 className="font-semibold text-sm leading-tight">
                      {v.year} {v.make} {v.model}
                    </h3>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${STATUS_STYLE[v.status]}`}
                    >
                      {statusLabel[v.status]}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">
                    {v.trim} · {v.mileageKm.toLocaleString("tr-TR")} km ·{" "}
                    {v.fuel[lang]} · {v.gearbox[lang]}
                  </p>

                  {/* Meta row */}
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <span className="text-sm font-bold">
                      ₺{v.price.toLocaleString("tr-TR")}
                    </span>
                    {views > 0 && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Eye className="h-3 w-3" />
                        {views.toLocaleString("tr-TR")}
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {days} {tr ? "gün" : "d"}
                    </span>
                    {publishedPortals.length > 0 && (
                      <span className="flex items-center gap-1">
                        {publishedPortals.map((p) => (
                          <PortalIcon key={p.portal} portal={p.portal} size={16} />
                        ))}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 shrink-0">
                  {/* Durum değiştir */}
                  <select
                    className="h-8 rounded-lg border border-input bg-background px-2 text-xs text-foreground focus-visible:outline-none"
                    value={v.status}
                    onChange={(e) =>
                      updateStatus(v.id, e.target.value as Vehicle["status"])
                    }
                  >
                    <option value="available">{statusLabel.available}</option>
                    <option value="reserved">{statusLabel.reserved}</option>
                    <option value="sold">{statusLabel.sold}</option>
                  </select>
                  <button
                    onClick={() => handleDelete(v)}
                    className="flex items-center justify-center gap-1.5 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    {tr ? "Sil" : "Delete"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
