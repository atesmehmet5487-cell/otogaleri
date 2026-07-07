"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  Minus,
  Plus,
  Quote,
  Star,
  Car,
  Share2,
  MessageSquareText,
  Tags,
  Landmark,
  BarChart3,
  Clock,
  TrendingUp,
  Database,
} from "lucide-react";
import appConfig from "@/app.config";
import { Icon } from "@/components/ui/icon";
import { VehicleArt, PortalIcon } from "@/components/app/vehicle-art";
import { InventoryDemo } from "@/components/marketing/inventory-demo";
import { ProductPreview, CompanyMark } from "@/components/marketing/marks";
import { useLang } from "@/components/i18n/language-provider";
import { cn, formatTRY } from "@/lib/utils";
import type { L } from "@/lib/i18n/config";
import type { BodyType, PortalKey } from "@/lib/demo/data";

/* ─────────────────────────────────────────────────────────────────────────────
   Local bilingual copy that doesn't belong in app.config.ts. Everything here is
   { tr, en } and resolved through the active language via tt().
   ───────────────────────────────────────────────────────────────────────────── */

const HERO_BENEFITS: L[] = [
  { tr: "Aracı bir kez gir — Sahibinden, Arabam ve Instagram'a tek tıkla yayınla", en: "Enter a vehicle once — publish to Sahibinden, Arabam and Instagram in one click" },
  { tr: "Lotta bekleme günlerini, gelen müşterileri ve kârı canlı izle", en: "Track days on lot, inbound leads and profit live" },
  { tr: "Her ilan, gelen her müşteri ve her anlaşma araca bağlanır", en: "Every listing, lead and deal ties back to the vehicle" },
];

const TRUSTED = ["AutoPlaza", "MotorWay", "DriveHub", "Galeri 34", "OtoMerkez", "PrimeCars", "ŞehirOto", "Velox"];

const HOW_STEPS: { n: string; icon: string; title: L; body: L }[] = [
  {
    n: "01",
    icon: "car-front",
    title: { tr: "Stoğa al", en: "Add stock" },
    body: { tr: "Şasi (VIN) gir, marka-model-yıl otomatik dolsun; maliyet ve fiyatı yaz, fotoğraf yerine net şablon kullan.", en: "Enter a VIN to auto-fill make-model-year; set cost and price, use a clean template instead of photos." },
  },
  {
    n: "02",
    icon: "share-2",
    title: { tr: "İlanı yayınla", en: "Publish listings" },
    body: { tr: "Tek tıkla Sahibinden, Arabam ve Instagram'a dağıt. Fiyat değişince her portalda anında güncellenir.", en: "Distribute to Sahibinden, Arabam and Instagram in one click. Change the price and every portal updates instantly." },
  },
  {
    n: "03",
    icon: "message-square-text",
    title: { tr: "Müşteriyi yakala", en: "Capture leads" },
    body: { tr: "Her portaldan gelen mesaj ve arama araca bağlı tek kuyruğa düşer; sıcak müşteriyi kaçırma.", en: "Messages and calls from every portal land in one vehicle-linked queue; never miss a hot lead." },
  },
  {
    n: "04",
    icon: "landmark",
    title: { tr: "Sat", en: "Sell" },
    body: { tr: "Peşinat, kredi ve takasla anlaşmayı topla, satışı kapat. İlan otomatik kapanır, raporlar güncellenir.", en: "Assemble the deal with down payment, finance and trade-in, then close. The listing auto-closes and reports update." },
  },
];

const ASSETS_PORTALS: { portal: PortalKey; label: L }[] = [
  { portal: "sahibinden", label: { tr: "Sahibinden", en: "Sahibinden" } },
  { portal: "arabam", label: { tr: "Arabam", en: "Arabam.com" } },
  { portal: "instagram", label: { tr: "Instagram", en: "Instagram" } },
  { portal: "web", label: { tr: "Autolot Web", en: "Autolot Web" } },
];

type CompareValue = boolean | L | string;
const COMPARE: { feature: L; manual: CompareValue; generic: CompareValue; autolot: CompareValue }[] = [
  { feature: { tr: "Tek kayıttan çoklu portal ilanı", en: "Multi-portal listing from one record" }, manual: { tr: "Elle, tek tek", en: "Manual, one by one" }, generic: { tr: "Kısmi", en: "Partial" }, autolot: true },
  { feature: { tr: "Fiyat senkronu", en: "Price sync across portals" }, manual: false, generic: { tr: "Manuel", en: "Manual" }, autolot: true },
  { feature: { tr: "Lotta bekleme takibi", en: "Days-on-lot tracking" }, manual: false, generic: false, autolot: true },
  { feature: { tr: "Araca bağlı müşteri kuyruğu", en: "Vehicle-linked lead queue" }, manual: { tr: "Dağınık", en: "Scattered" }, generic: { tr: "CRM ayrı", en: "Separate CRM" }, autolot: true },
  { feature: { tr: "Maliyet & kâr görünürlüğü", en: "Cost & profit visibility" }, manual: { tr: "Excel", en: "Spreadsheet" }, generic: false, autolot: true },
  { feature: { tr: "VIN otomatik doldurma", en: "VIN auto-fill" }, manual: false, generic: { tr: "Bazı", en: "Some" }, autolot: true },
  { feature: { tr: "Aylık ücret", en: "Monthly cost" }, manual: { tr: "Zaman kaybı", en: "Time sink" }, generic: "$249+", autolot: "$99" },
];

const TESTIMONIALS: { quote: L; name: string; role: L; initials: string; metric: L }[] = [
  { quote: { tr: "Aynı aracı üç portala elle giriyorduk, akşamı buluyordu. Şimdi tek tıkla hepsi yayında.", en: "We used to enter the same car into three portals by hand — it took all evening. Now it's all live in one click." }, name: "Emre Koçak", role: { tr: "Sahip · AutoPlaza", en: "Owner · AutoPlaza" }, initials: "EK", metric: { tr: "ilan başına 8 dk", en: "8 min/listing" } },
  { quote: { tr: "Lotta bekleme süresini görmeye başlayınca durağan araçları daha hızlı eritmeye başladık.", en: "Once we could see days on lot, we started moving stale cars far faster." }, name: "Selin Yıldırım", role: { tr: "Müdür · MotorWay", en: "Manager · MotorWay" }, initials: "SY", metric: { tr: "lot süresi −40%", en: "days on lot −40%" } },
  { quote: { tr: "Sahibinden ve Arabam'dan gelen her mesaj artık aracın altında. Tek bir müşteriyi bile kaçırmıyoruz.", en: "Every message from Sahibinden and Arabam now sits under the car. We don't lose a single lead." }, name: "Kerem Demir", role: { tr: "Satış · DriveHub", en: "Sales · DriveHub" }, initials: "KD", metric: { tr: "0 kaçan müşteri", en: "0 missed leads" } },
  { quote: { tr: "Maliyet, komisyon ve net kârı tek ekranda görmek fiyat verirken işimizi çok kolaylaştırdı.", en: "Seeing cost, fees and net profit on one screen made pricing decisions painless." }, name: "Aslı Şahin", role: { tr: "Finans · Galeri 34", en: "Finance · Galeri 34" }, initials: "AŞ", metric: { tr: "+%12 marj", en: "+12% margin" } },
  { quote: { tr: "Şasi numarasını giriyorum, geri kalanı kendisi dolduruyor. Stok girişi artık dert değil.", en: "I type the VIN and it fills in the rest. Stocking a car is no longer a chore." }, name: "Burak Aydın", role: { tr: "Sahip · PrimeCars", en: "Owner · PrimeCars" }, initials: "BA", metric: { tr: "VIN otomatik", en: "VIN auto-fill" } },
  { quote: { tr: "Aylık satış, kaynak başına müşteri ve kâr raporu tek bakışta. Patrona göstermesi çok kolay.", en: "Monthly sales, leads per source and profit in one view. Easy to show the boss." }, name: "Deniz Arslan", role: { tr: "Müdür · ŞehirOto", en: "Manager · ŞehirOto" }, initials: "DA", metric: { tr: "+18% satış", en: "+18% sales" } },
];

const VALUE_PROPS: { icon: typeof Clock; title: L; body: L }[] = [
  { icon: Clock, title: { tr: "Daha az çift giriş", en: "Less double entry" }, body: { tr: "Aracı bir kez gir, her yerde yayında. Portal portal kopyala-yapıştır yok.", en: "Enter once, live everywhere. No portal-by-portal copy-paste." } },
  { icon: TrendingUp, title: { tr: "Durağan stok yok", en: "No stale stock" }, body: { tr: "Lotta uzun bekleyen araçları otomatik işaretle, fiyatı zamanında ayarla.", en: "Auto-flag cars sitting too long and adjust the price in time." } },
  { icon: MessageSquareText, title: { tr: "Hızlı dönüş", en: "Faster follow-up" }, body: { tr: "Her müşteri araca bağlı; sıcak talebi anında gör ve hemen ara.", en: "Every lead is tied to the car; spot a hot request and call right away." } },
];

/* Who Autolot is for — use-case cards. */
const USE_CASES: { icon: string; title: L; body: L }[] = [
  { icon: "store", title: { tr: "Bağımsız galeriler", en: "Independent dealers" }, body: { tr: "Küçük lotunu profesyonel gibi yönet — stok, ilan ve müşteri tek panelde.", en: "Run a small lot like a pro — stock, listings and leads in one panel." } },
  { icon: "building-2", title: { tr: "Çoklu lokasyon grupları", en: "Multi-location groups" }, body: { tr: "Şubeler arası stoğu paylaş, rolleri ayır, grup genelinde rapor al.", en: "Share stock across branches, separate roles, report group-wide." } },
  { icon: "repeat", title: { tr: "İkinci el ağırlıklı", en: "Used-car heavy" }, body: { tr: "Takas, ekspertiz ve hızlı devir için lot süresi ve marj görünürlüğü.", en: "Days-on-lot and margin visibility for trade-ins and fast turns." } },
  { icon: "wrench", title: { tr: "Servis + satış", en: "Service + sales" }, body: { tr: "Satılan aracı anlaşmaya, anlaşmayı müşteriye bağla; takip tek akışta.", en: "Tie the sold car to the deal and the deal to the buyer; follow-up in one flow." } },
];

/* Deep-dive feature blocks (alternating). */
const DEEP_DIVE: { eyebrow: L; title: L; body: L; points: L[]; reverse?: boolean; kind: "listing" | "leads" | "deal" }[] = [
  {
    eyebrow: { tr: "İlanlar", en: "Listings" },
    title: { tr: "Bir araç, her portal", en: "One vehicle, every portal" },
    body: { tr: "Aracı bir kez gir; Sahibinden, Arabam ve Instagram'a tek tıkla dağıt. Fiyat ya da durum değişince her portal anında güncellenir.", en: "Enter a vehicle once; distribute to Sahibinden, Arabam and Instagram in one click. Change the price or status and every portal updates instantly." },
    points: [
      { tr: "Tek tıkla çoklu portal yayını", en: "One-click multi-portal publish" },
      { tr: "Portallar arası fiyat & durum senkronu", en: "Price & status sync across portals" },
      { tr: "Yayın durumunu tek yerden izle", en: "Track publish status in one place" },
    ],
    kind: "listing",
  },
  {
    eyebrow: { tr: "Müşteriler", en: "Leads" },
    title: { tr: "Hiçbir talebi kaçırma", en: "Never miss an inquiry" },
    body: { tr: "Her portaldan gelen mesaj, arama ve test sürüşü talebi araca bağlı tek kuyruğa düşer. Sıcak müşteriyi işaretle, atamayı yap, dönüşü hızlandır.", en: "Messages, calls and test-drive requests from every portal land in one vehicle-linked queue. Flag hot leads, assign them, and follow up faster." },
    points: [
      { tr: "Araca bağlı tek müşteri kuyruğu", en: "One vehicle-linked lead queue" },
      { tr: "Sıcak müşteri işaretleme & atama", en: "Hot-lead flagging & assignment" },
      { tr: "CRM e-posta'sına otomatik iletim", en: "Auto-forward to your CRM email" },
    ],
    reverse: true,
    kind: "leads",
  },
  {
    eyebrow: { tr: "Anlaşmalar", en: "Deals" },
    title: { tr: "Kârı görerek sat", en: "Sell knowing your margin" },
    body: { tr: "Maliyet, komisyon ve net kâr tek ekranda. Peşinat, kredi ve takasla anlaşmayı topla; satışı kapat, ilan otomatik kapansın.", en: "Cost, fees and net profit on one screen. Assemble the deal with down payment, finance and trade-in; close the sale and the listing auto-closes." },
    points: [
      { tr: "Maliyet → fiyat → net kâr görünürlüğü", en: "Cost → price → net profit visibility" },
      { tr: "Peşinat, kredi & takas kalemleri", en: "Down payment, finance & trade-in lines" },
      { tr: "Satışta ilan otomatik kapanır", en: "Listing auto-closes on sale" },
    ],
    kind: "deal",
  },
];

/* Integration logos for the strip. */
const INTEGRATIONS: { name: string; glyph: "portal" | "vin" | "db" }[] = [
  { name: "Sahibinden + Arabam", glyph: "portal" },
  { name: "VIN / Vehicle Data", glyph: "vin" },
  { name: "Supabase", glyph: "db" },
];

const PRICING_DEMO: { body: BodyType; color: string; title: string; price: number }[] = [
  { body: "sedan", color: "#1f3a5f", title: "2022 BMW 320i", price: 1_545_000 },
  { body: "suv", color: "#b6bcc4", title: "2021 VW Tiguan", price: 1_285_000 },
];

export default function LandingPage() {
  const { t, lang } = useLang();
  const m = appConfig.marketing;
  const tt = (v: L) => v[lang];

  const sectionCopy = {
    demoTitle: { tr: "Bir aracın yayına yolculuğu", en: "Watch a vehicle reach every buyer" } as L,
    demoSub: { tr: "Aracı ekle; Sahibinden, Arabam ve Instagram'a düşsün, lotta bekleme saymaya başlasın — sen hiçbir şey yapmadan.", en: "Add a vehicle; it lands on Sahibinden, Arabam and Instagram and the days-on-lot timer starts — without you lifting a finger." } as L,
    featuresTitle: { tr: "Bir galeriyi yönetmek için ihtiyacın olan her şey", en: "Everything you need to run a lot" } as L,
    featuresSub: { tr: "Stok girişinden ilan dağıtımına, müşteriden satışa kadar tek panel.", en: "From stock entry to listing distribution to leads to the sale, in one panel." } as L,
    howTitle: { tr: "Dört adımda satış", en: "Selling in four steps" } as L,
    howSub: { tr: "Stoğa al, ilanı yayınla, müşteriyi yakala, sat. Autolot aradaki her şeyi halleder.", en: "Add stock, publish listings, capture leads, sell. Autolot handles everything in between." } as L,
    portalsTitle: { tr: "Sattığın yerlerin hepsi tek yerde", en: "Every channel you sell on, in one place" } as L,
    portalsSub: { tr: "Tek araç, dört kanal. Fiyatı bir kez değiştir, her yerde güncellensin.", en: "One vehicle, four channels. Change the price once, update everywhere." } as L,
    useCasesTitle: { tr: "Autolot kimler için?", en: "Who Autolot is for" } as L,
    useCasesSub: { tr: "Araç satan her galeri için bir akış.", en: "A flow for every lot that moves metal." } as L,
    deepTitle: { tr: "İlandan deftere kadar", en: "From listing to the ledger" } as L,
    deepSub: { tr: "Üç katman, tek panel: yayınla, müşteriyi yakala, kârı görerek sat.", en: "Three layers, one panel: publish, capture leads, sell with margin in view." } as L,
    integrationsTitle: { tr: "Kullandığın araçlarla çalışır", en: "Works with the tools you use" } as L,
    integrationsSub: { tr: "Sahibinden, Arabam, bir VIN sağlayıcısı ve Supabase'i dakikalar içinde bağla.", en: "Wire Sahibinden, Arabam, a VIN provider and Supabase in minutes." } as L,
    valueTitle: { tr: "Galeriler neden Autolot'a geçiyor", en: "Why dealers switch to Autolot" } as L,
    valueSub: { tr: "Tablolar ve elle ilan vermenin getirdiği yükü kaldırır.", en: "It lifts the weight of spreadsheets and manual posting." } as L,
    compareTitle: { tr: "Neden Autolot?", en: "Why Autolot?" } as L,
    compareSub: { tr: "Tablo + elle ilan ve genel CRM'lerle karşılaştır.", en: "Compared to spreadsheets + manual posting and generic CRMs." } as L,
    testimonialsTitle: { tr: "Galeriler Autolot'u seviyor", en: "Dealers love Autolot" } as L,
    testimonialsSub: { tr: "Daha az çift giriş, daha hızlı satış.", en: "Less double entry, faster sales." } as L,
    pricingTitle: { tr: "Araç sayına göre basit fiyatlandırma", en: "Simple pricing by vehicle count" } as L,
    pricingSub: { tr: "Ücretsiz başla. Lotun büyüdükçe büyüt.", en: "Start free. Scale as your lot grows." } as L,
    popular: { tr: "En popüler", en: "Most popular" } as L,
    faqTitle: { tr: "Sıkça sorulanlar", en: "Frequently asked" } as L,
    faqSub: { tr: "Cevabını bulamadın mı? Ekibimize yaz.", en: "Can't find an answer? Reach our team." } as L,
    ctaTitle: { tr: "Bugün daha çok araç sat", en: "Move more metal today" } as L,
    ctaSub: { tr: "Anahtarsız demo modda aç, hazır olunca Sahibinden, Arabam ve VIN sağlayıcını bağla.", en: "Open the keyless demo, then wire Sahibinden, Arabam and your VIN provider when you're ready." } as L,
  };

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: "var(--grad-hero)" }} aria-hidden />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:py-24 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left copy */}
          <div className="stagger">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-pill">
              <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-dot" />
              {t(m.badge)}
            </span>
            <h1 className="mt-5 max-w-xl font-display text-[40px] font-extrabold leading-[1.03] tracking-[-0.03em] sm:text-[56px]">
              {t(m.heroTitle)}{" "}
              <span className="bg-gradient-to-br from-[oklch(50%_0.14_250)] to-[oklch(58%_0.2_25)] bg-clip-text text-transparent">
                {t(m.heroAccent)}
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-muted-foreground">{t(m.heroSubtitle)}</p>

            <ul className="mt-6 space-y-2.5">
              {HERO_BENEFITS.map((b) => (
                <li key={tt(b)} className="flex items-start gap-2.5 text-[15px]">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-stat-available/12 text-stat-available">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {tt(b)}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-[15px] font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
              >
                {t(m.heroCtaPrimary)} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 text-[15px] font-semibold text-foreground shadow-pill transition-colors hover:bg-muted"
              >
                {t(m.heroCtaSecondary)}
              </Link>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              {lang === "tr" ? "Kredi kartı gerekmez · Anahtarsız demo · 5 dakikada kurulum" : "No credit card · Keyless demo · 5-minute setup"}
            </p>
          </div>

          {/* Right floating product preview */}
          <div className="relative animate-float-up lg:pl-4">
            <div className="absolute -left-6 -top-6 -z-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl drift" aria-hidden />
            <div className="absolute -bottom-8 -right-4 -z-10 h-44 w-44 rounded-full bg-[oklch(58%_0.2_25)]/10 blur-3xl" aria-hidden />
            <ProductPreview />
          </div>
        </div>

        {/* Trusted-by row */}
        <div className="border-y border-border bg-card/50">
          <div className="mx-auto max-w-6xl px-5 py-6">
            <p className="text-center text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {lang === "tr" ? "Büyüyen galeriler tarafından kullanılıyor" : "Used by growing dealerships"}
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
              {TRUSTED.map((c) => (
                <CompanyMark key={c} name={c} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAND ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border shadow-soft sm:grid-cols-4">
          {[
            { value: "62", label: { tr: "stoktaki araç", en: "vehicles in stock" } as L },
            { value: "−40%", label: { tr: "lotta bekleme", en: "days on lot" } as L },
            { value: "+18%", label: { tr: "aylık satış", en: "monthly sales" } as L },
            { value: "8 dk", label: { tr: "ilan başına", en: "per listing" } as L },
          ].map((s) => (
            <div key={s.value} className="bg-card px-5 py-8 text-center">
              <p className="font-display text-3xl font-extrabold tracking-tight">{s.value}</p>
              <p className="mt-1.5 text-xs text-muted-foreground">{tt(s.label)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── INTERACTIVE DEMO ──────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="label-mono text-brandred">{lang === "tr" ? "Canlı akış" : "Live flow"}</p>
            <h2 className="mt-2 max-w-md font-display text-3xl font-bold tracking-tight sm:text-4xl">{tt(sectionCopy.demoTitle)}</h2>
            <p className="mt-3 max-w-md text-muted-foreground">{tt(sectionCopy.demoSub)}</p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {m.stats.slice(0, 3).map((s) => (
                <div key={s.value} className="rounded-xl border border-border bg-card p-3 shadow-soft">
                  <p className="tnum text-xl font-bold leading-none">{s.value}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">{t(s.label)}</p>
                </div>
              ))}
            </div>
          </div>
          <InventoryDemo />
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────── */}
      <section id="features" className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{tt(sectionCopy.featuresTitle)}</h2>
            <p className="mt-3 text-muted-foreground">{tt(sectionCopy.featuresSub)}</p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {m.features.map((f) => (
              <div key={tt(f.title)} className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-pop">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon name={f.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-semibold tracking-tight">{t(f.title)}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t(f.body)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEEP-DIVE FEATURE BLOCKS ──────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{tt(sectionCopy.deepTitle)}</h2>
          <p className="mt-3 text-muted-foreground">{tt(sectionCopy.deepSub)}</p>
        </div>
        <div className="mt-14 space-y-16">
          {DEEP_DIVE.map((d) => (
            <div
              key={tt(d.title)}
              className={cn("grid items-center gap-10 lg:grid-cols-2", d.reverse && "lg:[&>*:first-child]:order-2")}
            >
              <div>
                <p className="label-mono text-brandred">{tt(d.eyebrow)}</p>
                <h3 className="mt-2 max-w-md font-display text-2xl font-bold tracking-tight sm:text-3xl">{tt(d.title)}</h3>
                <p className="mt-3 max-w-md text-muted-foreground">{tt(d.body)}</p>
                <ul className="mt-5 space-y-2.5">
                  {d.points.map((p) => (
                    <li key={tt(p)} className="flex items-start gap-2.5 text-[15px]">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {tt(p)}
                    </li>
                  ))}
                </ul>
              </div>
              {/* a small illustrative panel */}
              <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                {d.kind === "listing" && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 p-3">
                      <VehicleArt body="sedan" color="#1f3a5f" className="h-11 w-16" rounded="rounded-lg" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold">2022 BMW 320i</p>
                        <p className="tnum text-xs text-muted-foreground">{formatTRY(1_545_000)}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {ASSETS_PORTALS.map((p) => (
                        <div key={p.portal} className="grid place-items-center gap-1 rounded-lg border border-border bg-card py-2.5">
                          <PortalIcon portal={p.portal} size={22} />
                          <span className="inline-flex items-center gap-0.5 text-[9px] font-semibold text-stat-available">
                            <Check className="h-2.5 w-2.5" strokeWidth={3} />
                            {lang === "tr" ? "yayında" : "live"}
                          </span>
                        </div>
                      ))}
                    </div>
                    <button className="w-full rounded-lg bg-primary py-2.5 text-[13px] font-semibold text-primary-foreground">
                      {lang === "tr" ? "Hepsine yayınla" : "Publish to all"}
                    </button>
                  </div>
                )}
                {d.kind === "leads" && (
                  <div className="space-y-2.5">
                    {[
                      { name: "Kerem Aslan", portal: "sahibinden" as PortalKey, msg: lang === "tr" ? "Takas düşünür müsünüz?" : "Would you take a trade-in?", hot: true },
                      { name: "Selin Korkmaz", portal: "arabam" as PortalKey, msg: lang === "tr" ? "Son fiyat nedir?" : "What's your final price?", hot: false },
                      { name: "Aylin Şahin", portal: "instagram" as PortalKey, msg: lang === "tr" ? "Hâlâ satılık mı?" : "Still available?", hot: true },
                    ].map((r) => (
                      <div key={r.name} className="flex items-center gap-2.5 rounded-xl border border-border bg-muted/40 p-3">
                        <PortalIcon portal={r.portal} size={22} />
                        <div className="min-w-0 flex-1">
                          <p className="text-[13px] font-semibold leading-tight">{r.name}</p>
                          <p className="truncate text-[11px] text-muted-foreground">{r.msg}</p>
                        </div>
                        {r.hot && <span className="rounded-full bg-brandred/10 px-1.5 py-0.5 text-[9px] font-bold uppercase text-brandred">{lang === "tr" ? "sıcak" : "hot"}</span>}
                      </div>
                    ))}
                  </div>
                )}
                {d.kind === "deal" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-xl border border-border bg-muted/40 p-3">
                      <span className="text-[13px] text-muted-foreground">{lang === "tr" ? "Liste fiyatı" : "List price"}</span>
                      <span className="tnum text-base font-bold">{formatTRY(1_545_000)}</span>
                    </div>
                    {[
                      { c: "var(--seg-1)", l: lang === "tr" ? "Maliyet" : "Cost", v: formatTRY(1_320_000) },
                      { c: "var(--seg-4)", l: lang === "tr" ? "Komisyon" : "Fees", v: formatTRY(46_350) },
                      { c: "var(--seg-3)", l: lang === "tr" ? "Net kâr" : "Net profit", v: formatTRY(178_650) },
                    ].map((r) => (
                      <div key={r.l} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ background: r.c }} />
                        <span className="flex-1 text-[13px]">{r.l}</span>
                        <span className="tnum text-[13px] font-semibold">{r.v}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────── */}
      <section id="how" className="mx-auto max-w-6xl px-5 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{tt(sectionCopy.howTitle)}</h2>
          <p className="mt-3 text-muted-foreground">{tt(sectionCopy.howSub)}</p>
        </div>
        <div className="relative mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {HOW_STEPS.map((s, i) => (
            <div key={s.n} className="relative rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon name={s.icon} className="h-5 w-5" />
                </span>
                <span className="font-display text-3xl font-extrabold text-primary/15">{s.n}</span>
              </div>
              <h3 className="mt-4 font-semibold tracking-tight">{tt(s.title)}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{tt(s.body)}</p>
              {i < HOW_STEPS.length - 1 && (
                <span className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 place-items-center rounded-full border border-border bg-card text-muted-foreground lg:grid">
                  <ArrowRight className="h-3 w-3" />
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── PORTALS DEEP-DIVE STRIP ───────────────────────────────── */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{tt(sectionCopy.portalsTitle)}</h2>
              <p className="mt-3 max-w-md text-muted-foreground">{tt(sectionCopy.portalsSub)}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {ASSETS_PORTALS.map((p) => (
                  <span key={p.portal} className="inline-flex items-center gap-2 rounded-full border border-border bg-card py-1 pl-1 pr-3 text-sm font-medium shadow-pill">
                    <PortalIcon portal={p.portal} size={22} />
                    {tt(p.label)}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {ASSETS_PORTALS.map((p) => (
                <div key={p.portal} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft">
                  <PortalIcon portal={p.portal} size={40} />
                  <div className="min-w-0">
                    <p className="font-semibold tracking-tight">{tt(p.label)}</p>
                    <p className="text-xs text-muted-foreground">
                      {lang === "tr" ? "tek tıkla yayın · fiyat senkronu" : "one-click publish · price sync"}
                    </p>
                  </div>
                  <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-stat-available/10 px-2 py-0.5 text-[11px] font-semibold text-stat-available">
                    <span className="h-1.5 w-1.5 rounded-full bg-stat-available" />
                    {lang === "tr" ? "Bağlı" : "Connected"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── USE CASES ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{tt(sectionCopy.useCasesTitle)}</h2>
          <p className="mt-3 text-muted-foreground">{tt(sectionCopy.useCasesSub)}</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {USE_CASES.map((u) => (
            <div key={tt(u.title)} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon name={u.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-semibold tracking-tight">{tt(u.title)}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{tt(u.body)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── VALUE PROPS STRIP ─────────────────────────────────────── */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{tt(sectionCopy.valueTitle)}</h2>
            <p className="mt-3 text-muted-foreground">{tt(sectionCopy.valueSub)}</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {VALUE_PROPS.map((s) => {
              const I = s.icon;
              return (
                <div key={tt(s.title)} className="rounded-2xl border border-border bg-card p-6 text-center shadow-soft">
                  <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                    <I className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-semibold tracking-tight">{tt(s.title)}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{tt(s.body)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ──────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-5 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{tt(sectionCopy.compareTitle)}</h2>
          <p className="mt-3 text-muted-foreground">{tt(sectionCopy.compareSub)}</p>
        </div>
        <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-5 py-4 text-left font-medium text-muted-foreground"></th>
                  <th className="px-5 py-4 text-center font-medium text-muted-foreground">{lang === "tr" ? "Tablo + elle" : "Spreadsheets"}</th>
                  <th className="px-5 py-4 text-center font-medium text-muted-foreground">{lang === "tr" ? "Genel CRM" : "Generic CRM"}</th>
                  <th className="bg-primary/[0.04] px-5 py-4 text-center">
                    <span className="inline-flex items-center gap-1.5 font-semibold text-primary">
                      <Car className="h-4 w-4" />
                      {appConfig.name}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row, i) => (
                  <tr key={tt(row.feature)} className={cn("border-b border-border/60 last:border-0", i % 2 === 1 && "bg-muted/20")}>
                    <td className="px-5 py-3.5 font-medium">{tt(row.feature)}</td>
                    <CompareCell value={row.manual} lang={lang} />
                    <CompareCell value={row.generic} lang={lang} />
                    <CompareCell value={row.autolot} lang={lang} highlight />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── INTEGRATIONS ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h3 className="font-display text-2xl font-bold tracking-tight">{tt(sectionCopy.integrationsTitle)}</h3>
          <p className="mt-2 text-muted-foreground">{tt(sectionCopy.integrationsSub)}</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {INTEGRATIONS.map((it) => (
            <div key={it.name} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft">
              <IntegrationGlyph glyph={it.glyph} />
              <div>
                <p className="font-semibold tracking-tight">{it.name}</p>
                <p className="text-xs text-muted-foreground">
                  {it.glyph === "portal" ? (lang === "tr" ? "İlan portalları" : "Listing portals") : it.glyph === "vin" ? (lang === "tr" ? "Araç verisi" : "Vehicle data") : (lang === "tr" ? "Veritabanı & auth" : "Database & auth")}
                </p>
              </div>
              <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-stat-available/10 px-2 py-0.5 text-[11px] font-semibold text-stat-available">
                <span className="h-1.5 w-1.5 rounded-full bg-stat-available" />
                {lang === "tr" ? "Hazır" : "Ready"}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{tt(sectionCopy.testimonialsTitle)}</h2>
          <p className="mt-3 text-muted-foreground">{tt(sectionCopy.testimonialsSub)}</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((tm) => (
            <figure key={tm.name} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft">
              <Quote className="h-5 w-5 text-primary/30" />
              <blockquote className="mt-3 flex-1 text-[14.5px] leading-relaxed text-foreground/90">
                {tt(tm.quote)}
              </blockquote>
              <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-xs font-bold text-white" style={{ backgroundImage: "var(--grad-brand)" }}>
                  {tm.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <figcaption className="text-sm font-semibold leading-tight">{tm.name}</figcaption>
                  <p className="truncate text-xs text-muted-foreground">{tt(tm.role)}</p>
                </div>
                <span className="rounded-full bg-stat-available/10 px-2 py-1 text-[11px] font-semibold text-stat-available">{tt(tm.metric)}</span>
              </div>
            </figure>
          ))}
        </div>
        <div className="mt-8 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-warning text-warning" />
          ))}
          <span className="ml-2">{lang === "tr" ? "4.9/5 · 300+ galeri" : "4.9/5 · 300+ dealers"}</span>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────────── */}
      <section id="pricing" className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{tt(sectionCopy.pricingTitle)}</h2>
            <p className="mt-3 text-muted-foreground">{tt(sectionCopy.pricingSub)}</p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {m.pricing.map((tier) => (
              <div
                key={tier.name}
                className={cn(
                  "flex flex-col rounded-2xl border bg-card p-7 shadow-soft",
                  tier.featured ? "border-primary/40 shadow-pop ring-1 ring-primary/20" : "border-border",
                )}
              >
                {tier.featured && (
                  <span className="mb-3 inline-flex w-fit items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-semibold text-primary-foreground">
                    <Star className="h-3 w-3 fill-current" />
                    {tt(sectionCopy.popular)}
                  </span>
                )}
                <h3 className="font-semibold tracking-tight">{tier.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-extrabold tracking-tight">{tier.price}</span>
                  {tier.period && <span className="text-sm text-muted-foreground">{t(tier.period)}</span>}
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground">{t(tier.tagline)}</p>
                <ul className="mt-6 flex-1 space-y-3 text-sm">
                  {tier.features.map((f) => (
                    <li key={t(f)} className="flex items-start gap-2.5">
                      <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-stat-available/12 text-stat-available">
                        <Check className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                      {t(f)}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className={cn(
                    "mt-7 inline-flex h-11 items-center justify-center rounded-xl text-sm font-semibold transition-all",
                    tier.featured
                      ? "bg-primary text-primary-foreground shadow-sm hover:opacity-90"
                      : "border border-border bg-card text-foreground hover:bg-muted",
                  )}
                >
                  {t(tier.cta)}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <section id="faq" className="mx-auto max-w-3xl px-5 py-20">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{tt(sectionCopy.faqTitle)}</h2>
          <p className="mt-3 text-muted-foreground">{tt(sectionCopy.faqSub)}</p>
        </div>
        <div className="mt-10 space-y-3">
          {m.faq.map((f) => (
            <details key={t(f.q)} className="group rounded-xl border border-border bg-card px-5 py-4 shadow-soft">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                {t(f.q)}
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors group-open:border-primary group-open:bg-primary group-open:text-primary-foreground">
                  <Plus className="h-3.5 w-3.5 group-open:hidden" />
                  <Minus className="hidden h-3.5 w-3.5 group-open:block" />
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t(f.a)}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-8 py-16 text-center shadow-pop">
          <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: "var(--grad-hero)" }} aria-hidden />
          <span className="pointer-events-none absolute -left-10 top-0 -z-10 h-48 w-48 rounded-full bg-primary/10 blur-3xl drift" aria-hidden />
          <span className="pointer-events-none absolute -right-10 bottom-0 -z-10 h-48 w-48 rounded-full bg-[oklch(58%_0.2_25)]/10 blur-3xl" aria-hidden />
          <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-pill">
            {ASSETS_PORTALS.map((p) => (
              <PortalIcon key={p.portal} portal={p.portal} size={18} />
            ))}
            <span>{lang === "tr" ? "4 kanal · canlı" : "4 channels · live"}</span>
          </div>
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{tt(sectionCopy.ctaTitle)}</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{tt(sectionCopy.ctaSub)}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-7 text-[15px] font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
            >
              {t(m.heroCtaPrimary)} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/login"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-card px-7 text-[15px] font-semibold text-foreground shadow-pill transition-colors hover:bg-muted"
            >
              {t(m.heroCtaSecondary)}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function IntegrationGlyph({ glyph }: { glyph: "portal" | "vin" | "db" }) {
  const color =
    glyph === "portal" ? "var(--color-portal-arabam)" : glyph === "vin" ? "var(--color-primary)" : "var(--color-success)";
  return (
    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl" style={{ background: color }}>
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        {glyph === "portal" && <path d="M5 13 l1.5 -4.5 c.3 -.9 1 -1.5 2 -1.5 h7 c1 0 1.7 .6 2 1.5 L20 13 v5 h-2 v-2 H7 v2 H5 Z M8 9 l-1 4 h10 l-1 -4 Z" />}
        {glyph === "vin" && <path d="M4 7 h16 v10 H4 Z M7 7 v10 M11 7 v10 M15 7 v10 M19 7 v10" />}
        {glyph === "db" && <path d="M4 6 c0 -1.7 3.6 -3 8 -3 s8 1.3 8 3 v12 c0 1.7 -3.6 3 -8 3 s-8 -1.3 -8 -3 z M4 6 c0 1.7 3.6 3 8 3 s8 -1.3 8 -3 M4 12 c0 1.7 3.6 3 8 3 s8 -1.3 8 -3" />}
      </svg>
    </span>
  );
}

function CompareCell({
  value,
  lang,
  highlight = false,
}: {
  value: boolean | L | string;
  lang: "tr" | "en";
  highlight?: boolean;
}) {
  const text = typeof value === "string" ? value : typeof value === "object" ? value[lang] : null;
  return (
    <td className={cn("px-5 py-3.5 text-center", highlight && "bg-primary/[0.04]")}>
      {typeof value === "boolean" ? (
        value ? (
          <span className={cn("mx-auto grid h-5 w-5 place-items-center rounded-full", highlight ? "bg-primary text-primary-foreground" : "bg-stat-available/12 text-stat-available")}>
            <Check className="h-3 w-3" strokeWidth={3} />
          </span>
        ) : (
          <span className="mx-auto grid h-5 w-5 place-items-center rounded-full bg-muted text-muted-foreground">
            <Minus className="h-3 w-3" />
          </span>
        )
      ) : (
        <span className={cn("text-[13px] font-medium", highlight ? "text-primary" : "text-muted-foreground")}>{text}</span>
      )}
    </td>
  );
}
