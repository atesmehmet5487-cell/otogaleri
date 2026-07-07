import { cn } from "@/lib/utils";
import type { BodyType, PortalKey } from "@/lib/demo/data";

/**
 * VehicleArt — a bespoke inline-SVG car silhouette per body type, tinted with
 * the vehicle's paint color. NO photos anywhere in Autolot; every "image" is
 * drawn here. Used as the inventory thumbnail and (larger) the detail gallery.
 */
export function VehicleArt({
  body,
  color,
  className,
  rounded = "rounded-xl",
}: {
  body: BodyType;
  color: string;
  className?: string;
  rounded?: string;
}) {
  return (
    <div
      className={cn("relative grid place-items-center overflow-hidden border border-border", rounded, className)}
      style={{ background: "linear-gradient(160deg, oklch(97% 0.01 250), oklch(93% 0.012 250))" }}
    >
      {/* ground line */}
      <span className="absolute inset-x-3 bottom-[26%] h-px bg-foreground/10" aria-hidden />
      <svg viewBox="0 0 120 56" className="h-[78%] w-[88%]" role="img" aria-label={body}>
        <BodyShape body={body} color={color} />
        {/* wheels — shared across bodies */}
        <Wheel cx={36} cy={47} />
        <Wheel cx={88} cy={47} />
      </svg>
    </div>
  );
}

function Wheel({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="7.5" fill="#1f2733" />
      <circle cx={cx} cy={cy} r="3.4" fill="#9aa3b0" />
      <circle cx={cx} cy={cy} r="1.2" fill="#1f2733" />
    </g>
  );
}

function BodyShape({ body, color }: { body: BodyType; color: string }) {
  const glass = "oklch(72% 0.04 250)";
  const stroke = "oklch(35% 0.03 255 / 0.45)";
  switch (body) {
    case "suv":
      return (
        <g stroke={stroke} strokeWidth="1.1" strokeLinejoin="round">
          <path d="M14 44 V32 C14 28 17 25 22 24 L40 22 C44 18 52 15 64 15 C80 15 92 18 100 24 L108 26 C112 27 113 30 113 33 V44 Z" fill={color} />
          <path d="M44 22 C50 18 56 17 64 17 C72 17 79 19 84 23 L84 24 L43 24 Z" fill={glass} stroke="none" />
          <path d="M66 17 V24" stroke={stroke} strokeWidth="1" />
          <rect x="100" y="31" width="9" height="4" rx="1.5" fill="oklch(70% 0.18 25)" stroke="none" />
        </g>
      );
    case "pickup":
      return (
        <g stroke={stroke} strokeWidth="1.1" strokeLinejoin="round">
          <path d="M12 44 V36 C12 33 14 31 17 31 L40 31 L46 21 C48 19 50 18 53 18 L66 18 C69 18 71 19 72 21 L76 31 L113 31 C115 31 116 33 116 35 V44 Z" fill={color} />
          <path d="M50 21 C51 20 52 19 54 19 L65 19 C67 19 68 20 69 21 L72 30 L48 30 Z" fill={glass} stroke="none" />
          <rect x="80" y="33" width="32" height="6" rx="1" fill="oklch(40% 0.02 255 / 0.25)" stroke="none" />
          <rect x="107" y="35" width="8" height="3.5" rx="1.5" fill="oklch(70% 0.18 25)" stroke="none" />
        </g>
      );
    case "hatchback":
      return (
        <g stroke={stroke} strokeWidth="1.1" strokeLinejoin="round">
          <path d="M16 44 V34 C16 31 18 29 22 28 L38 26 C42 21 50 19 60 19 C72 19 82 22 89 28 L102 30 C106 31 107 33 107 36 V44 Z" fill={color} />
          <path d="M42 26 C47 22 53 21 60 21 C68 21 75 23 80 27 L80 28 L41 28 Z" fill={glass} stroke="none" />
          <path d="M61 21 V28" stroke={stroke} strokeWidth="1" />
          <rect x="98" y="33" width="8" height="3.5" rx="1.5" fill="oklch(70% 0.18 25)" stroke="none" />
        </g>
      );
    case "coupe":
      return (
        <g stroke={stroke} strokeWidth="1.1" strokeLinejoin="round">
          <path d="M12 44 V36 C12 33 15 31 19 30 L36 27 C42 21 52 18 66 18 C82 18 96 22 104 29 L110 31 C113 32 114 34 114 37 V44 Z" fill={color} />
          <path d="M40 27 C47 22 56 20 66 20 C78 20 88 23 95 28 L95 29 L39 29 Z" fill={glass} stroke="none" />
          <rect x="105" y="33" width="8" height="3.5" rx="1.5" fill="oklch(70% 0.18 25)" stroke="none" />
        </g>
      );
    case "van":
      return (
        <g stroke={stroke} strokeWidth="1.1" strokeLinejoin="round">
          <path d="M12 44 V22 C12 19 14 17 18 17 L70 17 C82 17 92 19 100 24 L110 28 C113 29 114 31 114 34 V44 Z" fill={color} />
          <path d="M72 19 C82 19 90 21 96 25 L96 26 L72 26 Z" fill={glass} stroke="none" />
          <rect x="20" y="22" width="44" height="9" rx="1.5" fill={glass} stroke="none" />
          <path d="M42 22 V31" stroke={stroke} strokeWidth="1" />
          <rect x="106" y="32" width="8" height="3.5" rx="1.5" fill="oklch(70% 0.18 25)" stroke="none" />
        </g>
      );
    case "sedan":
    default:
      return (
        <g stroke={stroke} strokeWidth="1.1" strokeLinejoin="round">
          <path d="M12 44 V35 C12 32 15 30 19 29 L38 26 C44 21 52 19 62 19 C74 19 84 22 91 28 L106 30 C110 31 112 33 112 36 V44 Z" fill={color} />
          <path d="M42 26 C48 22 55 21 62 21 C71 21 79 23 85 27 L85 28 L41 28 Z" fill={glass} stroke="none" />
          <path d="M63 21 V28" stroke={stroke} strokeWidth="1" />
          <rect x="103" y="33" width="8" height="3.5" rx="1.5" fill="oklch(70% 0.18 25)" stroke="none" />
          <rect x="13" y="36" width="5" height="3" rx="1.5" fill="oklch(82% 0.12 90)" stroke="none" />
        </g>
      );
  }
}

/* ── Portal glyphs — small inline-SVG marks for listing channels ───────────── */
const PORTAL_FILL: Record<PortalKey, string> = {
  sahibinden: "var(--color-portal-sahibinden)",
  arabam: "var(--color-portal-arabam)",
  instagram: "var(--color-portal-instagram)",
  web: "var(--color-portal-web)",
};

export function PortalIcon({
  portal,
  size = 22,
  className,
}: {
  portal: PortalKey;
  size?: number;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={cn("shrink-0", className)} role="img" aria-label={portal}>
      <rect width="24" height="24" rx="6" fill={PORTAL_FILL[portal]} />
      <g fill="#fff">
        {portal === "sahibinden" && (
          // a key (sahibinden = "owner") motif
          <path d="M9 7.5 a3 3 0 1 0 0 6 a3 3 0 0 0 2.8 -2 H14 v1.6 h1.6 V11.5 H17 V9.5 h-5.2 A3 3 0 0 0 9 7.5 Z M9 9.4 a1.1 1.1 0 1 1 0 2.2 a1.1 1.1 0 0 1 0 -2.2 Z" />
        )}
        {portal === "arabam" && (
          // a car-front motif
          <path d="M6.5 14.5 l1 -3.2 c.2 -.6 .7 -1 1.3 -1 h6.4 c.6 0 1.1 .4 1.3 1 l1 3.2 v2.2 h-1.6 v-1.2 H8.1 v1.2 H6.5 Z M8.4 11.5 l-.5 1.6 h8.2 l-.5 -1.6 Z" />
        )}
        {portal === "instagram" && (
          <>
            <rect x="6.4" y="6.4" width="11.2" height="11.2" rx="3.4" fill="none" stroke="#fff" strokeWidth="1.6" />
            <circle cx="12" cy="12" r="2.7" fill="none" stroke="#fff" strokeWidth="1.6" />
            <circle cx="15.4" cy="8.6" r="1" />
          </>
        )}
        {portal === "web" && (
          <path d="M12 5.5 a6.5 6.5 0 1 0 0 13 a6.5 6.5 0 0 0 0 -13 Z M12 7 c1.3 0 2.4 2 2.6 4.3 H9.4 C9.6 9 10.7 7 12 7 Z M9.4 12.7 h5.2 C14.4 15 13.3 17 12 17 s-2.4 -2 -2.6 -4.3 Z M7.1 11.3 h1.9 c.1 -1.6 .5 -3 .1 -2.9 A5 5 0 0 0 7.1 11.3 Z M15 11.3 h1.9 a5 5 0 0 0 -2 -2.9 c-.3 -.1 .1 1.3 .1 2.9 Z" fillRule="evenodd" />
        )}
      </g>
    </svg>
  );
}
