import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Default currency for this kit. The setup can switch this per project. */
export const CURRENCY = "TRY";

export function formatMoney(amount: number, currency: string = CURRENCY) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Compact Turkish-lira amount, e.g. ₺1.545.000. */
export function formatTRY(amount: number) {
  return `₺${new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 0 }).format(amount)}`;
}

/** Compact money for big totals, e.g. ₺18.4M. */
export function formatCompactTRY(amount: number) {
  if (amount >= 1_000_000) return `₺${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `₺${(amount / 1_000).toFixed(0)}K`;
  return `₺${amount}`;
}

/** Mileage with thousands separator + km, e.g. 38,400 km. */
export function formatKm(km: number) {
  return `${new Intl.NumberFormat("en-US").format(km)} km`;
}

export function formatNumber(n: number) {
  return new Intl.NumberFormat("en-US").format(n);
}

export function formatPercent(n: number, digits = 1) {
  return `${n > 0 ? "+" : ""}${n.toFixed(digits)}%`;
}

export function formatDate(d: Date | string, opts?: Intl.DateTimeFormatOptions) {
  const date = typeof d === "string" ? new Date(d) : d;
  return new Intl.DateTimeFormat(
    "en-US",
    opts ?? { day: "2-digit", month: "short", year: "numeric" },
  ).format(date);
}

export function formatRelative(d: Date | string) {
  const date = typeof d === "string" ? new Date(d) : d;
  const diff = Date.now() - date.getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const days = Math.floor(h / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(date);
}

export function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
