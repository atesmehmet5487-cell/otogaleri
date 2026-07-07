/**
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │  app.config.ts — the single source of truth for this starter.            │
 * │                                                                          │
 * │  Every user-facing string is bilingual: { tr: "...", en: "..." }.        │
 * │  The guided setup (run `/setup`, or say "bu projeyi kur") edits this      │
 * │  file plus app/globals.css and .env.local.                               │
 * │                                                                          │
 * │  Autolot — car dealership inventory, listing & lead management.          │
 * └──────────────────────────────────────────────────────────────────────────┘
 */
import type { L } from "@/lib/i18n/config";

export type IconName = string;

export interface NavItem {
  label: L;
  href: string;
  icon: IconName;
  badge?: L;
  muted?: boolean;
}

export interface NavGroup {
  label: L;
  items: NavItem[];
}

export interface Feature {
  icon: IconName;
  title: L;
  body: L;
}

export interface Stat {
  value: string;
  label: L;
}

export interface PricingTier {
  name: string;
  price: string;
  period?: L;
  tagline: L;
  features: L[];
  cta: L;
  featured?: boolean;
}

export interface FaqItem {
  q: L;
  a: L;
}

export interface Integration {
  key: string;
  name: string;
  envVars: string[];
  required: boolean;
  docsUrl: string;
  purpose: string;
}

export interface AppConfig {
  name: string;
  tagline: L;
  description: L;
  domain: string;
  logoText: string;
  accentName: string;
  marketing: {
    badge: L;
    heroTitle: L;
    /** Accent line shown inside the hero title (rendered in the brand gradient). */
    heroAccent: L;
    heroSubtitle: L;
    heroCtaPrimary: L;
    heroCtaSecondary: L;
    features: Feature[];
    stats: Stat[];
    pricing: PricingTier[];
    faq: FaqItem[];
  };
  /** Flat list used for the topbar title lookup. */
  nav: NavItem[];
  /** Grouped sidebar navigation. */
  navGroups: NavGroup[];
  integrations: Integration[];
}

export const appConfig: AppConfig = {
  name: "Autolot",
  tagline: {
    tr: "Daha çok araç sat — stok, ilan ve müşteriyi tek yerden yönet.",
    en: "Move more metal — manage stock, listings, and leads in one place.",
  },
  description: {
    tr: "Galeriler için araç stok ve ilan yönetimi. Aracı stoğa al, ilanı portallara dağıt, gelen müşterileri ve satışları takip et — hepsi tek panelde.",
    en: "Car dealership inventory & listing management. Add a vehicle to stock, distribute listings to portals, and track leads & sales — all in one panel.",
  },
  domain: "autolot.app",
  logoText: "A",
  accentName: "deep blue",

  marketing: {
    badge: { tr: "Galeri yazılımı", en: "Dealership software" },
    heroTitle: {
      tr: "Stok, ilan ve müşteri —",
      en: "Stock, listings, and leads —",
    },
    heroAccent: {
      tr: "tek panelde, kontrol sende.",
      en: "one panel, fully in control.",
    },
    heroSubtitle: {
      tr: "Aracı bir kez gir, Sahibinden, Arabam ve Instagram'a tek tıkla yayınla. Lotta bekleyen günleri, gelen müşterileri ve kârı canlı izle — daha hızlı al, daha hızlı sat.",
      en: "Enter a vehicle once and publish to Sahibinden, Arabam and Instagram in one click. Watch days on lot, inbound leads and profit live — buy faster, sell faster.",
    },
    heroCtaPrimary: { tr: "Ücretsiz başla", en: "Start free" },
    heroCtaSecondary: { tr: "Nasıl çalıştığını gör", en: "See how it works" },
    features: [
      { icon: "car-front", title: { tr: "Stok yönetimi", en: "Inventory management" }, body: { tr: "Her aracı tek kayıtla yönet — maliyet, fiyat, kilometre, durum ve lotta bekleme günü canlı.", en: "Manage every vehicle as one record — cost, price, mileage, status and days on lot, live." } },
      { icon: "share-2", title: { tr: "Çoklu portal ilanı", en: "Multi-portal listing" }, body: { tr: "Bir aracı Sahibinden, Arabam ve Instagram'a tek tıkla dağıt; yayın durumunu tek yerden izle.", en: "Distribute one vehicle to Sahibinden, Arabam and Instagram in one click; track publish status in one place." } },
      { icon: "message-square-text", title: { tr: "Müşteri takibi", en: "Lead tracking" }, body: { tr: "Her ilandan gelen aramalar, mesajlar ve test sürüşü talepleri araca bağlı bir kuyruğa düşer.", en: "Calls, messages and test-drive requests from every listing land in one queue tied to the vehicle." } },
      { icon: "tags", title: { tr: "Fiyatlama & değerleme", en: "Pricing & valuation" }, body: { tr: "Piyasa verisiyle fiyat öner, kâr marjını gör, durağan stoğu otomatik işaretle.", en: "Suggest a price from market data, see your margin, and auto-flag aging stock." } },
      { icon: "landmark", title: { tr: "Finansman & anlaşmalar", en: "Financing & deals" }, body: { tr: "Peşinat, kredi ve takas kalemleriyle anlaşmayı topla; satışı tek akışta kapat.", en: "Assemble the deal with down payment, finance and trade-in lines; close the sale in one flow." } },
      { icon: "bar-chart-3", title: { tr: "Raporlar", en: "Reports" }, body: { tr: "Aylık satış, ortalama lot süresi, kaynak başına müşteri ve brüt kâr tek bakışta.", en: "Monthly sales, average days on lot, leads per source and gross profit at a glance." } },
    ],
    stats: [
      { value: "62", label: { tr: "stoktaki araç", en: "vehicles in stock" } },
      { value: "−40%", label: { tr: "lotta bekleme", en: "days on lot" } },
      { value: "3", label: { tr: "bağlı portal", en: "connected portals" } },
      { value: "8 dk", label: { tr: "ilan başına", en: "per listing" } },
    ],
    pricing: [
      { name: "Solo", price: "$0", period: { tr: "/ay", en: "/mo" }, tagline: { tr: "Tek satıcı, denemek için.", en: "One seller, kick the tires." }, features: [{ tr: "15 araca kadar", en: "Up to 15 vehicles" }, { tr: "1 portal bağlantısı", en: "1 portal connection" }, { tr: "Müşteri kuyruğu", en: "Lead inbox" }, { tr: "Topluluk desteği", en: "Community support" }], cta: { tr: "Başla", en: "Get started" } },
      { name: "Lot", price: "$99", period: { tr: "/ay", en: "/mo" }, tagline: { tr: "Büyüyen galeri için.", en: "For a growing lot." }, features: [{ tr: "150 araca kadar", en: "Up to 150 vehicles" }, { tr: "Tüm portallar (Sahibinden, Arabam, Instagram)", en: "All portals (Sahibinden, Arabam, Instagram)" }, { tr: "VIN/şasi otomatik doldurma", en: "VIN auto-fill" }, { tr: "Finansman & anlaşma akışı", en: "Financing & deal flow" }, { tr: "Öncelikli destek", en: "Priority support" }], cta: { tr: "Ücretsiz dene", en: "Start free trial" }, featured: true },
      { name: "Grup", price: "—", tagline: { tr: "Çoklu lokasyon galeri grubu.", en: "Multi-location dealer group." }, features: [{ tr: "Sınırsız araç & şube", en: "Unlimited vehicles & locations" }, { tr: "Roller & denetim kaydı", en: "Roles & audit log" }, { tr: "API & webhook erişimi", en: "API & webhook access" }, { tr: "Özel hesap yöneticisi", en: "Dedicated account manager" }], cta: { tr: "Bize ulaş", en: "Contact sales" } },
    ],
    faq: [
      { q: { tr: "Denemek için API anahtarı gerekli mi?", en: "Do I need any API keys to try it?" }, a: { tr: "Hayır. Gerçekçi araç, ilan ve müşteri verisiyle demo modda açılır; hemen tıklayabilirsin.", en: "No. It boots in demo mode with realistic vehicles, listings and leads so you can click around immediately." } },
      { q: { tr: "Hangi portallara ilan veriyor?", en: "Which portals can it post to?" }, a: { tr: "Sahibinden ve Arabam için API bağlantısı, Instagram için yayın akışı hazır. Anahtarları kurulumda bağlarsın.", en: "API connections for Sahibinden and Arabam, plus an Instagram publish flow. You connect the keys during setup." } },
      { q: { tr: "Şasi (VIN) ile araç bilgisi otomatik dolar mı?", en: "Does it auto-fill vehicle data from the VIN?" }, a: { tr: "Evet — bir araç-veri/VIN sağlayıcısı bağlandığında marka, model, yıl ve donanımı otomatik doldurur.", en: "Yes — wire a vehicle-data/VIN provider and it auto-fills make, model, year and trim." } },
      { q: { tr: "Gelen müşteriler nereye düşer?", en: "Where do inbound leads go?" }, a: { tr: "Her portaldan gelen mesaj ve arama, araca bağlı tek bir kuyruğa düşer; bir CRM e-posta'sına da iletilebilir.", en: "Every message and call lands in one vehicle-linked queue; it can also forward to a CRM email." } },
      { q: { tr: "Lotta bekleme süresini nasıl takip ediyor?", en: "How does it track days on lot?" }, a: { tr: "Stoğa giriş tarihinden bugüne otomatik sayar ve eşiği geçen durağan stoğu işaretler.", en: "It counts automatically from the stock-in date and flags aging stock past your threshold." } },
      { q: { tr: "Teknoloji nedir?", en: "What's the stack?" }, a: { tr: "Next.js 16 (App Router), React 19, Tailwind v4. Vendor kilidi yok.", en: "Next.js 16 (App Router), React 19, Tailwind v4. No vendor lock-in." } },
      { q: { tr: "Verilerimi taşıyabilir miyim?", en: "Can I import/export my data?" }, a: { tr: "Evet — CSV içe/dışa aktarım ve webhook'larla mevcut araçlarını taşıyıp muhasebene bağlayabilirsin.", en: "Yes — CSV import/export and webhooks let you migrate your existing stock and pipe it to your books." } },
      { q: { tr: "Yayına alabilir miyim?", en: "Can I deploy it?" }, a: { tr: "Evet — standart bir Next.js uygulaması. Vercel'e veya herhangi bir Node sunucusuna gönder.", en: "Yes — it's a standard Next.js app. Push to Vercel or any Node host." } },
    ],
  },

  nav: [
    { label: { tr: "Panel", en: "Dashboard" }, href: "/dashboard", icon: "layout-dashboard" },
    { label: { tr: "Envanter", en: "Inventory" }, href: "/inventory", icon: "car-front" },
    { label: { tr: "Müşteriler", en: "Leads" }, href: "/leads", icon: "message-square-text" },
    { label: { tr: "İlanlar", en: "Listings" }, href: "/listings", icon: "share-2" },
    { label: { tr: "Raporlar", en: "Reports" }, href: "/reports", icon: "bar-chart-3" },
    { label: { tr: "Ayarlar", en: "Settings" }, href: "/settings", icon: "settings" },
  ],

  navGroups: [
    {
      label: { tr: "Galeri", en: "Dealership" },
      items: [
        { label: { tr: "Panel", en: "Dashboard" }, href: "/dashboard", icon: "layout-dashboard" },
        { label: { tr: "Envanter", en: "Inventory" }, href: "/inventory", icon: "car-front" },
        { label: { tr: "İlanlar", en: "Listings" }, href: "/listings", icon: "list" },
        { label: { tr: "Yeni İlan", en: "New Listing" }, href: "/ilan-ekle", icon: "plus-circle" },
        { label: { tr: "Müşteriler", en: "Leads" }, href: "/leads", icon: "message-square-text", badge: { tr: "9", en: "9" } },
      ],
    },
    {
      label: { tr: "Pazarlama", en: "Marketing" },
      items: [
        { label: { tr: "İlanlar", en: "Listings" }, href: "/listings", icon: "share-2", muted: true },
        { label: { tr: "Fiyatlama", en: "Pricing" }, href: "/pricing", icon: "tags", muted: true },
      ],
    },
    {
      label: { tr: "Finans", en: "Finance" },
      items: [
        { label: { tr: "Anlaşmalar", en: "Deals" }, href: "/deals", icon: "landmark", muted: true },
        { label: { tr: "Raporlar", en: "Reports" }, href: "/reports", icon: "bar-chart-3", muted: true },
      ],
    },
  ],

  integrations: [
    {
      key: "supabase",
      name: "Supabase",
      envVars: ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"],
      required: false,
      docsUrl: "https://supabase.com/dashboard/project/_/settings/api",
      purpose: "Database & auth for your inventory, listings and leads. Without it, the app runs in demo mode.",
    },
    {
      key: "sahibinden",
      name: "Sahibinden API",
      envVars: ["SAHIBINDEN_API_KEY", "SAHIBINDEN_STORE_ID"],
      required: false,
      docsUrl: "https://api.sahibinden.com",
      purpose: "Publish & sync vehicle listings to Sahibinden, and pull inbound leads back in.",
    },
    {
      key: "arabam",
      name: "Arabam.com API",
      envVars: ["ARABAM_API_KEY", "ARABAM_DEALER_ID"],
      required: false,
      docsUrl: "https://www.arabam.com",
      purpose: "Distribute listings to Arabam.com and keep price & status in sync.",
    },
    {
      key: "vindata",
      name: "Vehicle Data / VIN API",
      envVars: ["VIN_API_KEY"],
      required: false,
      docsUrl: "https://vpic.nhtsa.dot.gov/api/",
      purpose: "Auto-fill make, model, year and trim from a VIN / chassis number when adding stock.",
    },
    {
      key: "leadmail",
      name: "Lead / CRM Email",
      envVars: ["RESEND_API_KEY", "LEADS_FORWARD_EMAIL"],
      required: false,
      docsUrl: "https://resend.com/docs",
      purpose: "Forward new inquiries to your CRM inbox and send instant replies to buyers.",
    },
  ],
};

export default appConfig;
