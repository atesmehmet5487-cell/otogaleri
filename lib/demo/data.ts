/**
 * Demo data — what makes Autolot feel alive with zero API keys. Labels are
 * bilingual ({ tr, en }); the UI resolves them to the active language. Proper
 * nouns (makes, models, names, emails) stay as-is. Replace with real queries
 * once setup wires your integrations (Supabase, Sahibinden, Arabam, VIN, CRM).
 *
 * No real photos anywhere — every vehicle "image" is an inline CSS/SVG car
 * silhouette rendered from `body` + `color`. See components/app/vehicle-art.tsx.
 */
import type { L } from "@/lib/i18n/config";

/* ── Vehicle status ─────────────────────────────────────────────────────────── */
export type VehicleStatus = "available" | "reserved" | "sold";
export type BodyType = "sedan" | "suv" | "hatchback" | "pickup" | "coupe" | "van";
export type PortalKey = "sahibinden" | "arabam" | "instagram" | "web";
export type PortalState = "published" | "pending" | "draft";

export interface PortalListing {
  portal: PortalKey;
  state: PortalState;
  views?: number;
}

export interface VehicleLead {
  id: string;
  name: string;
  channel: PortalKey | "phone" | "walkin";
  message: L;
  at: string;
  hot?: boolean;
}

export interface Vehicle {
  id: string;
  stockNo: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  body: BodyType;
  color: string; // CSS color for the SVG silhouette
  colorName: L;
  price: number;
  cost: number;
  mileageKm: number;
  fuel: L;
  gearbox: L;
  stockInDate: string; // ISO; days on lot computed from this
  status: VehicleStatus;
  vin: string;
  portals: PortalListing[];
  leadCount: number;
  leads: VehicleLead[];
  specs: { label: L; value: L }[];
}

/* Today's anchor (matches demo dates). */
const NOW = new Date("2026-06-14T10:00:00Z");

export function daysOnLot(stockInDate: string): number {
  const d = new Date(stockInDate);
  return Math.max(0, Math.round((NOW.getTime() - d.getTime()) / 86_400_000));
}

const fuelPetrol: L = { tr: "Benzin", en: "Petrol" };
const fuelDiesel: L = { tr: "Dizel", en: "Diesel" };
const fuelHybrid: L = { tr: "Hibrit", en: "Hybrid" };
const fuelElectric: L = { tr: "Elektrik", en: "Electric" };
const gxAuto: L = { tr: "Otomatik", en: "Automatic" };
const gxManual: L = { tr: "Manuel", en: "Manual" };

function specRow(year: number, fuel: L, gx: L, body: L, hp: string): { label: L; value: L }[] {
  return [
    { label: { tr: "Yıl", en: "Year" }, value: { tr: String(year), en: String(year) } },
    { label: { tr: "Yakıt", en: "Fuel" }, value: fuel },
    { label: { tr: "Vites", en: "Gearbox" }, value: gx },
    { label: { tr: "Kasa", en: "Body" }, value: body },
    { label: { tr: "Motor gücü", en: "Power" }, value: { tr: `${hp} hp`, en: `${hp} hp` } },
  ];
}

const bodyLabel: Record<BodyType, L> = {
  sedan: { tr: "Sedan", en: "Sedan" },
  suv: { tr: "SUV", en: "SUV" },
  hatchback: { tr: "Hatchback", en: "Hatchback" },
  pickup: { tr: "Pickup", en: "Pickup" },
  coupe: { tr: "Coupe", en: "Coupe" },
  van: { tr: "Panelvan", en: "Van" },
};

export const vehicles: Vehicle[] = [
  {
    id: "v1", stockNo: "AL-2041", year: 2022, make: "BMW", model: "320i", trim: "M Sport",
    body: "sedan", color: "#1f3a5f", colorName: { tr: "Lacivert", en: "Navy blue" },
    price: 1_545_000, cost: 1_320_000, mileageKm: 38_400, fuel: fuelPetrol, gearbox: gxAuto,
    stockInDate: "2026-05-30T00:00:00Z", status: "available", vin: "WBA8E9C50JNU12345",
    portals: [
      { portal: "sahibinden", state: "published", views: 3120 },
      { portal: "arabam", state: "published", views: 1840 },
      { portal: "instagram", state: "published", views: 640 },
      { portal: "web", state: "published" },
    ],
    leadCount: 7,
    leads: [
      { id: "v1l1", name: "Kerem Aslan", channel: "sahibinden", message: { tr: "Takas düşünür müsünüz? 2019 Passat var.", en: "Would you consider a trade-in? I have a 2019 Passat." }, at: "2026-06-14T08:20:00Z", hot: true },
      { id: "v1l2", name: "Deniz Yıldız", channel: "phone", message: { tr: "Hafta sonu test sürüşü mümkün mü?", en: "Is a weekend test drive possible?" }, at: "2026-06-13T16:05:00Z" },
      { id: "v1l3", name: "Onur Çelik", channel: "arabam", message: { tr: "Boyasız mı? Ekspertiz var mı?", en: "Is it paint-free? Any inspection report?" }, at: "2026-06-12T11:40:00Z" },
    ],
    specs: specRow(2022, fuelPetrol, gxAuto, bodyLabel.sedan, "184"),
  },
  {
    id: "v2", stockNo: "AL-2038", year: 2021, make: "Volkswagen", model: "Tiguan", trim: "Elegance",
    body: "suv", color: "#b6bcc4", colorName: { tr: "Gümüş", en: "Silver" },
    price: 1_285_000, cost: 1_120_000, mileageKm: 52_100, fuel: fuelDiesel, gearbox: gxAuto,
    stockInDate: "2026-04-18T00:00:00Z", status: "available", vin: "WVGZZZ5NZMW801234",
    portals: [
      { portal: "sahibinden", state: "published", views: 5240 },
      { portal: "arabam", state: "pending" },
      { portal: "instagram", state: "draft" },
      { portal: "web", state: "published" },
    ],
    leadCount: 11,
    leads: [
      { id: "v2l1", name: "Selin Korkmaz", channel: "sahibinden", message: { tr: "Son fiyat nedir? Peşin alacağım.", en: "What's your final price? Paying cash." }, at: "2026-06-14T07:55:00Z", hot: true },
      { id: "v2l2", name: "Mert Demir", channel: "walkin", message: { tr: "Showroom'da gördüm, kredi seçeneği var mı?", en: "Saw it in the showroom — is financing available?" }, at: "2026-06-13T13:30:00Z" },
    ],
    specs: specRow(2021, fuelDiesel, gxAuto, bodyLabel.suv, "150"),
  },
  {
    id: "v3", stockNo: "AL-2033", year: 2023, make: "Tesla", model: "Model 3", trim: "Long Range",
    body: "sedan", color: "#c0392b", colorName: { tr: "Kırmızı", en: "Red" },
    price: 2_190_000, cost: 1_980_000, mileageKm: 14_900, fuel: fuelElectric, gearbox: gxAuto,
    stockInDate: "2026-06-05T00:00:00Z", status: "reserved", vin: "5YJ3E1EA7PF123456",
    portals: [
      { portal: "sahibinden", state: "published", views: 8910 },
      { portal: "arabam", state: "published", views: 4120 },
      { portal: "instagram", state: "published", views: 2310 },
      { portal: "web", state: "published" },
    ],
    leadCount: 19,
    leads: [
      { id: "v3l1", name: "Aylin Şahin", channel: "instagram", message: { tr: "Rezervasyon depozitosu ne kadar?", en: "How much is the reservation deposit?" }, at: "2026-06-14T09:10:00Z", hot: true },
      { id: "v3l2", name: "Burak Aydın", channel: "arabam", message: { tr: "Garanti devam ediyor mu?", en: "Is the warranty still active?" }, at: "2026-06-13T20:15:00Z" },
    ],
    specs: specRow(2023, fuelElectric, gxAuto, bodyLabel.sedan, "498"),
  },
  {
    id: "v4", stockNo: "AL-2029", year: 2020, make: "Ford", model: "Focus", trim: "Titanium",
    body: "hatchback", color: "#2c3e50", colorName: { tr: "Antrasit", en: "Anthracite" },
    price: 845_000, cost: 720_000, mileageKm: 78_300, fuel: fuelPetrol, gearbox: gxManual,
    stockInDate: "2026-03-02T00:00:00Z", status: "available", vin: "WF05XXGCC5LB12345",
    portals: [
      { portal: "sahibinden", state: "published", views: 2010 },
      { portal: "arabam", state: "published", views: 980 },
      { portal: "instagram", state: "draft" },
      { portal: "web", state: "published" },
    ],
    leadCount: 4,
    leads: [
      { id: "v4l1", name: "Ece Polat", channel: "phone", message: { tr: "Kilometre düşük görünüyor, garaj arabası mı?", en: "Mileage looks low — was it a garage car?" }, at: "2026-06-11T10:25:00Z" },
    ],
    specs: specRow(2020, fuelPetrol, gxManual, bodyLabel.hatchback, "125"),
  },
  {
    id: "v5", stockNo: "AL-2044", year: 2024, make: "Toyota", model: "Corolla", trim: "Hybrid Dream",
    body: "sedan", color: "#ecf0f1", colorName: { tr: "Beyaz", en: "White" },
    price: 1_420_000, cost: 1_290_000, mileageKm: 6_200, fuel: fuelHybrid, gearbox: gxAuto,
    stockInDate: "2026-06-10T00:00:00Z", status: "available", vin: "NMTBZ3BE70R123456",
    portals: [
      { portal: "sahibinden", state: "pending" },
      { portal: "arabam", state: "pending" },
      { portal: "instagram", state: "draft" },
      { portal: "web", state: "published" },
    ],
    leadCount: 5,
    leads: [
      { id: "v5l1", name: "Cem Koç", channel: "web", message: { tr: "Sıfır ayarında, ne zaman görebilirim?", en: "Looks brand new — when can I see it?" }, at: "2026-06-13T18:40:00Z", hot: true },
    ],
    specs: specRow(2024, fuelHybrid, gxAuto, bodyLabel.sedan, "140"),
  },
  {
    id: "v6", stockNo: "AL-2018", year: 2019, make: "Mercedes-Benz", model: "C200", trim: "AMG Line",
    body: "coupe", color: "#1c1c1c", colorName: { tr: "Siyah", en: "Black" },
    price: 1_690_000, cost: 1_510_000, mileageKm: 61_500, fuel: fuelPetrol, gearbox: gxAuto,
    stockInDate: "2026-02-09T00:00:00Z", status: "available", vin: "WDD2050461R123456",
    portals: [
      { portal: "sahibinden", state: "published", views: 4400 },
      { portal: "arabam", state: "published", views: 1620 },
      { portal: "instagram", state: "published", views: 1180 },
      { portal: "web", state: "published" },
    ],
    leadCount: 6,
    leads: [
      { id: "v6l1", name: "Gizem Ünal", channel: "sahibinden", message: { tr: "Lastikler yeni mi? Kış lastiği var mı?", en: "Are the tyres new? Any winter set?" }, at: "2026-06-10T09:05:00Z" },
    ],
    specs: specRow(2019, fuelPetrol, gxAuto, bodyLabel.coupe, "184"),
  },
  {
    id: "v7", stockNo: "AL-2046", year: 2023, make: "Ford", model: "Ranger", trim: "Wildtrak",
    body: "pickup", color: "#e67e22", colorName: { tr: "Turuncu", en: "Orange" },
    price: 2_050_000, cost: 1_870_000, mileageKm: 22_800, fuel: fuelDiesel, gearbox: gxAuto,
    stockInDate: "2026-06-12T00:00:00Z", status: "available", vin: "6FPPXXMJ2PNW12345",
    portals: [
      { portal: "sahibinden", state: "published", views: 1290 },
      { portal: "arabam", state: "pending" },
      { portal: "instagram", state: "published", views: 510 },
      { portal: "web", state: "published" },
    ],
    leadCount: 3,
    leads: [
      { id: "v7l1", name: "Hakan Er", channel: "instagram", message: { tr: "Çekme kapasitesi nedir?", en: "What's the towing capacity?" }, at: "2026-06-13T14:50:00Z" },
    ],
    specs: specRow(2023, fuelDiesel, gxAuto, bodyLabel.pickup, "205"),
  },
  {
    id: "v8", stockNo: "AL-2012", year: 2018, make: "Renault", model: "Clio", trim: "Touch",
    body: "hatchback", color: "#27ae60", colorName: { tr: "Yeşil", en: "Green" },
    price: 615_000, cost: 540_000, mileageKm: 94_700, fuel: fuelPetrol, gearbox: gxManual,
    stockInDate: "2026-01-15T00:00:00Z", status: "available", vin: "VF15RPN0H59123456",
    portals: [
      { portal: "sahibinden", state: "published", views: 1560 },
      { portal: "arabam", state: "published", views: 720 },
      { portal: "instagram", state: "draft" },
      { portal: "web", state: "published" },
    ],
    leadCount: 2,
    leads: [
      { id: "v8l1", name: "Pınar Acar", channel: "arabam", message: { tr: "İlk araba için ideal mi sizce?", en: "Would you say it's ideal as a first car?" }, at: "2026-06-08T12:10:00Z" },
    ],
    specs: specRow(2018, fuelPetrol, gxManual, bodyLabel.hatchback, "90"),
  },
  {
    id: "v9", stockNo: "AL-2026", year: 2021, make: "Volkswagen", model: "Transporter", trim: "City Van",
    body: "van", color: "#7f8c8d", colorName: { tr: "Gri", en: "Grey" },
    price: 1_180_000, cost: 1_040_000, mileageKm: 112_400, fuel: fuelDiesel, gearbox: gxManual,
    stockInDate: "2026-02-22T00:00:00Z", status: "available", vin: "WV1ZZZ7HZMH123456",
    portals: [
      { portal: "sahibinden", state: "published", views: 880 },
      { portal: "arabam", state: "draft" },
      { portal: "instagram", state: "draft" },
      { portal: "web", state: "published" },
    ],
    leadCount: 1,
    leads: [
      { id: "v9l1", name: "İlker Şen", channel: "phone", message: { tr: "Ticari kullanıma uygun mu, fatura kesiliyor mu?", en: "Suitable for commercial use, can you issue an invoice?" }, at: "2026-06-05T15:30:00Z" },
    ],
    specs: specRow(2021, fuelDiesel, gxManual, bodyLabel.van, "150"),
  },
  {
    id: "v10", stockNo: "AL-2009", year: 2022, make: "Audi", model: "A4", trim: "S line",
    body: "sedan", color: "#34495e", colorName: { tr: "Füme", en: "Smoke grey" },
    price: 1_780_000, cost: 1_600_000, mileageKm: 41_200, fuel: fuelDiesel, gearbox: gxAuto,
    stockInDate: "2026-05-12T00:00:00Z", status: "sold", vin: "WAUZZZF40MA123456",
    portals: [
      { portal: "sahibinden", state: "published", views: 6010 },
      { portal: "arabam", state: "published", views: 2440 },
      { portal: "instagram", state: "published", views: 1320 },
      { portal: "web", state: "published" },
    ],
    leadCount: 14,
    leads: [
      { id: "v10l1", name: "Yusuf Tan", channel: "sahibinden", message: { tr: "Anlaşıldı, kapora için arıyorum.", en: "We're agreed — calling about the deposit." }, at: "2026-06-09T11:00:00Z" },
    ],
    specs: specRow(2022, fuelDiesel, gxAuto, bodyLabel.sedan, "190"),
  },
  {
    id: "v11", stockNo: "AL-2002", year: 2020, make: "Hyundai", model: "Tucson", trim: "Elite",
    body: "suv", color: "#2980b9", colorName: { tr: "Mavi", en: "Blue" },
    price: 1_150_000, cost: 1_010_000, mileageKm: 67_800, fuel: fuelPetrol, gearbox: gxAuto,
    stockInDate: "2025-12-28T00:00:00Z", status: "available", vin: "TMAJ3815AMJ123456",
    portals: [
      { portal: "sahibinden", state: "published", views: 3300 },
      { portal: "arabam", state: "published", views: 1410 },
      { portal: "instagram", state: "draft" },
      { portal: "web", state: "published" },
    ],
    leadCount: 5,
    leads: [
      { id: "v11l1", name: "Sibel Kaya", channel: "arabam", message: { tr: "Fiyatta esneklik var mı? Uzun süredir ilanda.", en: "Any flexibility on price? It's been listed a while." }, at: "2026-06-07T17:20:00Z" },
    ],
    specs: specRow(2020, fuelPetrol, gxAuto, bodyLabel.suv, "177"),
  },
  {
    id: "v12", stockNo: "AL-2047", year: 2024, make: "Peugeot", model: "208", trim: "GT",
    body: "hatchback", color: "#f1c40f", colorName: { tr: "Sarı", en: "Yellow" },
    price: 1_060_000, cost: 960_000, mileageKm: 3_100, fuel: fuelPetrol, gearbox: gxAuto,
    stockInDate: "2026-06-13T00:00:00Z", status: "available", vin: "VF3UDHNS5RT123456",
    portals: [
      { portal: "sahibinden", state: "pending" },
      { portal: "arabam", state: "draft" },
      { portal: "instagram", state: "draft" },
      { portal: "web", state: "published" },
    ],
    leadCount: 0,
    leads: [],
    specs: specRow(2024, fuelPetrol, gxAuto, bodyLabel.hatchback, "130"),
  },
];

/* ── Top-line stats (dashboard stat row) ──────────────────────────────────── */
export const summary = {
  inStock: { label: { tr: "Stoktaki araç", en: "Vehicles in stock" } as L },
  inventoryValue: { label: { tr: "Envanter değeri", en: "Inventory value" } as L },
  avgDaysOnLot: { label: { tr: "Ort. lot süresi", en: "Avg days on lot" } as L },
  soldThisMonth: { label: { tr: "Bu ay satılan", en: "Sold this month" } as L },
};

/* ── Sales over time (last 8 months, units + gross profit) ─────────────────── */
export const salesMeta = {
  title: { tr: "Aylık satış", en: "Sales over time" } as L,
  subtitle: { tr: "Son 8 ay · adet", en: "Last 8 months · units" } as L,
  delta: "+18%",
};
export const sales: { label: string; units: number; profit: number }[] = [
  { label: "Nov", units: 9, profit: 410_000 },
  { label: "Dec", units: 7, profit: 320_000 },
  { label: "Jan", units: 11, profit: 540_000 },
  { label: "Feb", units: 8, profit: 380_000 },
  { label: "Mar", units: 12, profit: 610_000 },
  { label: "Apr", units: 10, profit: 470_000 },
  { label: "May", units: 14, profit: 720_000 },
  { label: "Jun", units: 11, profit: 560_000 },
];

/* ── Portal distribution roll-up (dashboard panel) ─────────────────────────── */
export const portalMeta: Record<PortalKey, { label: string; color: string }> = {
  sahibinden: { label: "Sahibinden", color: "var(--color-portal-sahibinden)" },
  arabam: { label: "Arabam", color: "var(--color-portal-arabam)" },
  instagram: { label: "Instagram", color: "var(--color-portal-instagram)" },
  web: { label: "Autolot Web", color: "var(--color-portal-web)" },
};

/* ── Leads roll-up by source (dashboard panel) ─────────────────────────────── */
export const leadsBySource: { source: PortalKey | "phone" | "walkin"; label: L; count: number }[] = [
  { source: "sahibinden", label: { tr: "Sahibinden", en: "Sahibinden" }, count: 38 },
  { source: "arabam", label: { tr: "Arabam", en: "Arabam" }, count: 24 },
  { source: "instagram", label: { tr: "Instagram", en: "Instagram" }, count: 17 },
  { source: "phone", label: { tr: "Telefon", en: "Phone" }, count: 12 },
  { source: "walkin", label: { tr: "Showroom", en: "Walk-in" }, count: 6 },
];

/* ── Financing / deals pipeline (dashboard panel) ──────────────────────────── */
export interface Deal {
  id: string;
  buyer: string;
  vehicle: string;
  stage: "application" | "approved" | "signed" | "funded";
  amount: number;
  downPct: number;
  termMonths: number;
}
export const deals: Deal[] = [
  { id: "d1", buyer: "Yusuf Tan", vehicle: "2022 Audi A4", stage: "funded", amount: 1_780_000, downPct: 30, termMonths: 36 },
  { id: "d2", buyer: "Selin Korkmaz", vehicle: "2021 VW Tiguan", stage: "approved", amount: 1_285_000, downPct: 40, termMonths: 24 },
  { id: "d3", buyer: "Cem Koç", vehicle: "2024 Toyota Corolla", stage: "signed", amount: 1_420_000, downPct: 25, termMonths: 48 },
  { id: "d4", buyer: "Aylin Şahin", vehicle: "2023 Tesla Model 3", stage: "application", amount: 2_190_000, downPct: 35, termMonths: 36 },
];
export const dealStageLabel: Record<Deal["stage"], L> = {
  application: { tr: "Başvuru", en: "Application" },
  approved: { tr: "Onaylandı", en: "Approved" },
  signed: { tr: "İmzalandı", en: "Signed" },
  funded: { tr: "Finanse edildi", en: "Funded" },
};

/* ── Recent activity feed (dashboard drawer) ───────────────────────────────── */
export interface DActivity {
  id: string;
  who: string;
  action: L;
  target: string;
  at: string;
  tone: "neutral" | "success" | "warning" | "info";
}
export const activity: DActivity[] = [
  { id: "a1", who: "Aylin Şahin", action: { tr: "rezerve etti:", en: "reserved" }, target: "Tesla Model 3", at: "2026-06-14T09:10:00Z", tone: "info" },
  { id: "a2", who: "Sistem", action: { tr: "durağan işaretledi:", en: "flagged as aging" }, target: "Hyundai Tucson", at: "2026-06-14T07:00:00Z", tone: "warning" },
  { id: "a3", who: "Yusuf Tan", action: { tr: "satın aldı:", en: "purchased" }, target: "Audi A4", at: "2026-06-13T15:20:00Z", tone: "success" },
  { id: "a4", who: "Sahibinden", action: { tr: "yayınlandı:", en: "published" }, target: "Ford Ranger", at: "2026-06-12T11:48:00Z", tone: "neutral" },
  { id: "a5", who: "Selin Korkmaz", action: { tr: "mesaj attı:", en: "messaged about" }, target: "VW Tiguan", at: "2026-06-12T08:05:00Z", tone: "info" },
];

/* ── Aging inventory (vehicles past the days-on-lot threshold) ─────────────── */
export const AGING_THRESHOLD_DAYS = 60;
