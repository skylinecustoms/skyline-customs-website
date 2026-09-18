/**
 * SKYLINE CUSTOMS — Tesla PPF Diagram Component
 * Renders a top-down Tesla Model 3/Y silhouette with highlighted panels
 * per PPF package. Orange = protected, dark = unprotected.
 */

interface TeslaPPFDiagramProps {
  package: "partial" | "full-front" | "full-front-plus" | "full-vehicle";
}

// Panel definitions — each panel is an SVG path/rect with an id
// Viewbox: 0 0 200 420 (portrait top-down Tesla silhouette)
const ORANGE = "#E85D04";
const DARK = "#1a1a1a";
const BODY = "#222";
const OUTLINE = "#444";

export default function TeslaPPFDiagram({ package: pkg }: TeslaPPFDiagramProps) {
  const isPartial = pkg === "partial";
  const isFullFront = pkg === "full-front" || pkg === "full-front-plus" || pkg === "full-vehicle";
  const isPlus = pkg === "full-front-plus" || pkg === "full-vehicle";
  const isFull = pkg === "full-vehicle";

  // Color helpers
  const c = (active: boolean) => (active ? ORANGE : DARK);
  const bodyC = (active: boolean) => (active ? ORANGE : BODY);

  return (
    <svg
      viewBox="0 0 200 430"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 12px rgba(232,93,4,0.15))" }}
    >
      {/* ── CAR BODY OUTLINE ─────────────────────────────────── */}
      {/* Main body shape — top-down Tesla Model 3 silhouette */}
      <g>
        {/* Rear bumper */}
        <rect x="42" y="370" width="116" height="22" rx="6" fill={bodyC(isFull)} stroke={OUTLINE} strokeWidth="1" />

        {/* Trunk lid */}
        <rect x="50" y="340" width="100" height="32" rx="4" fill={bodyC(isFull)} stroke={OUTLINE} strokeWidth="1" />

        {/* Rear doors */}
        <rect x="30" y="240" width="28" height="96" rx="3" fill={bodyC(isFull)} stroke={OUTLINE} strokeWidth="1" />
        <rect x="142" y="240" width="28" height="96" rx="3" fill={bodyC(isFull)} stroke={OUTLINE} strokeWidth="1" />

        {/* Front doors */}
        <rect x="30" y="148" width="28" height="88" rx="3" fill={bodyC(isFull)} stroke={OUTLINE} strokeWidth="1" />
        <rect x="142" y="148" width="28" height="88" rx="3" fill={bodyC(isFull)} stroke={OUTLINE} strokeWidth="1" />

        {/* Roof / cabin (center body) */}
        <rect x="58" y="148" width="84" height="192" rx="2" fill={bodyC(isFull)} stroke={OUTLINE} strokeWidth="1" />

        {/* Rocker panels (side sills) */}
        <rect x="22" y="160" width="10" height="160" rx="2" fill={c(isPlus)} stroke={OUTLINE} strokeWidth="1" />
        <rect x="168" y="160" width="10" height="160" rx="2" fill={c(isPlus)} stroke={OUTLINE} strokeWidth="1" />

        {/* Full fenders */}
        <rect x="30" y="100" width="30" height="52" rx="3" fill={c(isFullFront)} stroke={OUTLINE} strokeWidth="1" />
        <rect x="140" y="100" width="30" height="52" rx="3" fill={c(isFullFront)} stroke={OUTLINE} strokeWidth="1" />

        {/* Full hood */}
        <path
          d="M50 60 Q100 40 150 60 L155 148 L45 148 Z"
          fill={c(isFullFront)}
          stroke={OUTLINE}
          strokeWidth="1"
        />

        {/* Front bumper */}
        <path
          d="M48 38 Q100 20 152 38 L150 60 Q100 44 50 60 Z"
          fill={c(isFullFront || isPartial)}
          stroke={OUTLINE}
          strokeWidth="1"
        />

        {/* Hood leading edge highlight (partial coverage) */}
        {isPartial && !isFullFront && (
          <path
            d="M60 60 Q100 50 140 60 L138 80 Q100 70 62 80 Z"
            fill={ORANGE}
            stroke={OUTLINE}
            strokeWidth="0.5"
            opacity="0.7"
          />
        )}

        {/* Side mirrors */}
        <ellipse cx="24" cy="132" rx="8" ry="5" fill={c(isPartial || isFullFront)} stroke={OUTLINE} strokeWidth="1" />
        <ellipse cx="176" cy="132" rx="8" ry="5" fill={c(isPartial || isFullFront)} stroke={OUTLINE} strokeWidth="1" />

        {/* Headlights */}
        <path d="M50 60 Q58 52 72 56 L70 72 Q58 68 48 72 Z" fill={c(isFullFront)} stroke={OUTLINE} strokeWidth="0.5" />
        <path d="M150 60 Q142 52 128 56 L130 72 Q142 68 152 72 Z" fill={c(isFullFront)} stroke={OUTLINE} strokeWidth="0.5" />

        {/* Door edge guards (partial) */}
        <rect x="28" y="152" width="4" height="4" rx="1" fill={c(isPartial)} stroke={OUTLINE} strokeWidth="0.5" />
        <rect x="28" y="244" width="4" height="4" rx="1" fill={c(isPartial)} stroke={OUTLINE} strokeWidth="0.5" />
        <rect x="168" y="152" width="4" height="4" rx="1" fill={c(isPartial)} stroke={OUTLINE} strokeWidth="0.5" />
        <rect x="168" y="244" width="4" height="4" rx="1" fill={c(isPartial)} stroke={OUTLINE} strokeWidth="0.5" />

        {/* Door cups */}
        <ellipse cx="90" cy="192" rx="10" ry="4" fill={c(isPlus)} stroke={OUTLINE} strokeWidth="0.5" />
        <ellipse cx="90" cy="280" rx="10" ry="4" fill={c(isPlus)} stroke={OUTLINE} strokeWidth="0.5" />
        <ellipse cx="110" cy="192" rx="10" ry="4" fill={c(isPlus)} stroke={OUTLINE} strokeWidth="0.5" />
        <ellipse cx="110" cy="280" rx="10" ry="4" fill={c(isPlus)} stroke={OUTLINE} strokeWidth="0.5" />

        {/* Rear bumper top strip */}
        <rect x="50" y="338" width="100" height="6" rx="2" fill={c(isPlus)} stroke={OUTLINE} strokeWidth="0.5" />

        {/* Car center line (glass/windshield area) */}
        <rect x="62" y="62" width="76" height="82" rx="4" fill="#0d0d0d" stroke="#333" strokeWidth="1" opacity="0.8" />
        {/* Windshield glare */}
        <path d="M68 66 Q100 58 132 66 L130 100 Q100 94 70 100 Z" fill="#1a2a1a" opacity="0.4" />

        {/* Rear window */}
        <rect x="64" y="310" width="72" height="28" rx="3" fill="#0d0d0d" stroke="#333" strokeWidth="1" opacity="0.8" />

        {/* Center console line */}
        <line x1="100" y1="148" x2="100" y2="340" stroke="#333" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
      </g>

      {/* ── LEGEND ───────────────────────────────────────────── */}
      <g transform="translate(0, 400)">
        <rect x="20" y="0" width="12" height="12" rx="2" fill={ORANGE} />
        <text x="36" y="10" fill="#aaa" fontSize="9" fontFamily="monospace">PROTECTED</text>
        <rect x="110" y="0" width="12" height="12" rx="2" fill={DARK} stroke="#444" strokeWidth="1" />
        <text x="126" y="10" fill="#555" fontSize="9" fontFamily="monospace">UNPROTECTED</text>
      </g>
    </svg>
  );
}
