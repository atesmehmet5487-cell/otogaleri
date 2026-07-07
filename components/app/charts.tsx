"use client";

import { useId } from "react";

/* ── Mini line chart with a soft area fill (bespoke inline SVG) ────────────── */
export function MiniLineChart({
  data,
  color = "var(--color-primary)",
  height = 56,
  className,
}: {
  data: number[];
  color?: string;
  height?: number;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  const w = 200;
  const h = height;
  const pad = 4;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const span = max - min || 1;
  const step = (w - pad * 2) / (data.length - 1);
  const pts = data.map((v, i) => {
    const x = pad + i * step;
    const y = pad + (1 - (v - min) / span) * (h - pad * 2);
    return [x, y] as const;
  });
  const line = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const area = `${line} L${pts[pts.length - 1][0].toFixed(1)} ${h - pad} L${pts[0][0].toFixed(1)} ${h - pad} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} preserveAspectRatio="none" style={{ width: "100%", height }}>
      <defs>
        <linearGradient id={`fill-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#fill-${id})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="2.6" fill={color} />
    </svg>
  );
}

/* ── Bar + line combo (sales over time: bars = units, line = profit) ───────── */
export function SalesChart({
  bars,
  line,
  labels,
  height = 170,
  barColor = "var(--color-primary)",
  lineColor = "var(--color-brandred)",
}: {
  bars: number[];
  line: number[];
  labels: string[];
  height?: number;
  barColor?: string;
  lineColor?: string;
}) {
  const id = useId().replace(/:/g, "");
  const w = 560;
  const h = height;
  const padX = 14;
  const padTop = 14;
  const padBottom = 24;
  const innerW = w - padX * 2;
  const innerH = h - padTop - padBottom;
  const maxBar = Math.max(...bars) * 1.15;
  const maxLine = Math.max(...line) * 1.1;
  const slot = innerW / bars.length;
  const barW = slot * 0.46;

  const linePts = line.map((v, i) => {
    const x = padX + slot * i + slot / 2;
    const y = padTop + (1 - v / maxLine) * innerH;
    return [x, y] as const;
  });
  const linePath = linePts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height }} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`bar-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={barColor} stopOpacity="0.95" />
          <stop offset="100%" stopColor={barColor} stopOpacity="0.55" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={g} x1={padX} x2={w - padX} y1={padTop + g * innerH} y2={padTop + g * innerH} stroke="var(--color-border)" strokeWidth="1" />
      ))}
      {bars.map((v, i) => {
        const bh = (v / maxBar) * innerH;
        const x = padX + slot * i + (slot - barW) / 2;
        const y = padTop + innerH - bh;
        return <rect key={i} x={x} y={y} width={barW} height={bh} rx="3" fill={`url(#bar-${id})`} />;
      })}
      <path d={linePath} fill="none" stroke={lineColor} strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      {linePts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === linePts.length - 1 ? 3.4 : 2.4} fill="var(--color-card)" stroke={lineColor} strokeWidth="1.6" />
      ))}
      {labels.map((lab, i) => (
        <text key={lab + i} x={padX + slot * i + slot / 2} y={h - 7} textAnchor="middle" fontSize="9.5" fill="var(--color-muted-foreground)" fontFamily="var(--font-mono)">
          {lab}
        </text>
      ))}
    </svg>
  );
}

/* ── Multi-color segmented allocation bar ──────────────────────────────────── */
export function SegmentedBar({
  segments,
  className,
}: {
  segments: { label: string; value: number; color: string }[];
  className?: string;
}) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  return (
    <div className={className}>
      <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-muted">
        {segments.map((s, i) => (
          <span
            key={s.label}
            title={`${s.label} · ${s.value}`}
            style={{ width: `${(s.value / total) * 100}%`, background: s.color, marginLeft: i === 0 ? 0 : 1.5 }}
            className="h-full first:rounded-l-full last:rounded-r-full"
          />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
        {segments.map((s) => (
          <span key={s.label} className="inline-flex items-center gap-1.5 text-[11.5px] text-muted-foreground">
            <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Tiny radial gauge (e.g. monthly sales target) ─────────────────────────── */
export function RadialGauge({ pct, size = 84, color = "var(--color-primary)" }: { pct: number; size?: number; color?: string }) {
  const r = size / 2 - 7;
  const c = 2 * Math.PI * r;
  const off = c * (1 - Math.min(1, pct / 100));
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className="shrink-0">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-muted)" strokeWidth="7" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={off}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" fontSize="17" fontWeight="700" fill="var(--color-foreground)" fontFamily="var(--font-mono)">
        {pct}%
      </text>
    </svg>
  );
}
