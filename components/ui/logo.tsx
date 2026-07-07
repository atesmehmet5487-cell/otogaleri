import { cn } from "@/lib/utils";
import appConfig from "@/app.config";

/**
 * Autolot brand mark — a bespoke inline-SVG logomark: a lot-pin tile holding a
 * crisp car silhouette with two wheels, in a deep-blue gradient with a confident
 * red headlight spark + the wordmark. No external image. The setup can swap
 * `appConfig.name` for the wordmark; drop a real file at public/logo.svg if you
 * have one.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("h-8 w-8 shrink-0", className)}
      aria-hidden
      fill="none"
    >
      <defs>
        <linearGradient id="autolot-mark" x1="3" y1="3" x2="29" y2="29" gradientUnits="userSpaceOnUse">
          <stop stopColor="oklch(54% 0.15 252)" />
          <stop offset="1" stopColor="oklch(43% 0.13 260)" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#autolot-mark)" />
      {/* car body + cabin silhouette */}
      <path
        d="M6.4 18.6 L8.7 13.7 C9 13.1 9.6 12.7 10.3 12.7 H20.4 C21 12.7 21.5 13 21.8 13.5 L24.1 17.3 L25.4 17.8 C25.9 18 26.2 18.5 26.2 19 V20.4 H5.8 V19.2 C5.8 18.9 6 18.7 6.4 18.6 Z"
        fill="#fff"
        fillOpacity="0.95"
      />
      {/* windshield split */}
      <path d="M11 13.9 L9.4 17.2 H15.3 V13.9 Z M16.5 13.9 V17.2 H22 L20 13.9 Z" fill="url(#autolot-mark)" />
      {/* confident red headlight spark */}
      <circle cx="24.3" cy="18.9" r="1.15" fill="oklch(64% 0.21 25)" />
      {/* two wheels */}
      <circle cx="11" cy="20.8" r="2.9" fill="oklch(43% 0.13 260)" stroke="#fff" strokeWidth="1.5" />
      <circle cx="21" cy="20.8" r="2.9" fill="oklch(43% 0.13 260)" stroke="#fff" strokeWidth="1.5" />
    </svg>
  );
}

export function Logo({
  className,
  withWordmark = true,
  withChevron = false,
  onDark = false,
}: {
  className?: string;
  withWordmark?: boolean;
  /** Render a small chevron after the wordmark (matches the sidebar header). */
  withChevron?: boolean;
  /** Use light wordmark on a dark surface (e.g. the auth brand panel). */
  onDark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-8 w-8 shadow-pill" />
      {withWordmark && (
        <span className="inline-flex items-center gap-1.5">
          <span
            className={cn(
              "font-display text-[17px] font-bold tracking-[-0.02em]",
              onDark ? "text-white" : "text-foreground",
            )}
          >
            {appConfig.name}
          </span>
          {withChevron && (
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-muted-foreground" aria-hidden>
              <path d="M5 6l3 3 3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          )}
        </span>
      )}
    </span>
  );
}
