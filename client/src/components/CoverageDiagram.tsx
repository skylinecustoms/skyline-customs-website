/**
 * Top-down car outline that shows what a package covers: the full front PPF
 * panels in solid orange (hood, front bumper, both fenders, mirrors,
 * headlights) and, when the package includes it, a ceramic tint over every
 * painted panel. Pure inline SVG, so it is crisp at any size and weighs nothing.
 */
interface Props {
  /** Tint every painted panel for the ceramic coating. */
  ceramic?: boolean;
  className?: string;
}

const ORANGE = "#E85D04";
const CERAMIC = "rgba(255, 255, 255, 0.13)";
const PANEL = "#141414";
const LINE = "#3F3F46";

export default function CoverageDiagram({ ceramic = false, className = "" }: Props) {
  const bodyFill = ceramic ? CERAMIC : PANEL;
  return (
    <svg
      viewBox="0 0 460 520"
      role="img"
      aria-label={`Coverage map: full front paint protection film on the hood, front bumper, both fenders, mirrors, and headlights${ceramic ? ", plus ceramic coating on every painted panel" : ""}.`}
      className={className}
    >
      <defs>
        <pattern id="cov-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke={ORANGE} strokeWidth="1.2" opacity="0.55" />
        </pattern>
      </defs>

      <g transform="translate(70 0)">
      {/* Wheels sit behind the body */}
      {[[62, 118], [226, 118], [62, 392], [226, 392]].map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="32" height="64" rx="8" fill="#0A0A0A" stroke={LINE} strokeWidth="2" />
      ))}

      {/* Body shell (ceramic tints the whole thing) */}
      <path
        d="M98 36 Q160 18 222 36 L238 110 L240 400 Q240 470 206 476 L114 476 Q80 470 80 400 L82 110 Z"
        fill={bodyFill}
        stroke={LINE}
        strokeWidth="2"
      />

      {/* Rear: trunk, rear glass, roof, windshield */}
      <path d="M100 404 L220 404 L222 448 Q220 462 204 464 L116 464 Q100 462 98 448 Z" fill={bodyFill} stroke={LINE} strokeWidth="1.5" />
      <path d="M104 358 L216 358 L220 400 L100 400 Z" fill="#0B0B0B" stroke={LINE} strokeWidth="1.5" />
      <path d="M104 230 L216 230 L216 354 L104 354 Z" fill={bodyFill} stroke={LINE} strokeWidth="1.5" />
      <path d="M110 176 L210 176 L216 226 L104 226 Z" fill="#0B0B0B" stroke={LINE} strokeWidth="1.5" />
      {/* Door lines */}
      <line x1="82" y1="290" x2="104" y2="290" stroke={LINE} strokeWidth="1.5" />
      <line x1="216" y1="290" x2="238" y2="290" stroke={LINE} strokeWidth="1.5" />

      {/* ---- Full front PPF (solid orange) ---- */}
      {/* Hood */}
      <path d="M98 70 L222 70 L212 172 L108 172 Z" fill={ORANGE} stroke="#0A0A0A" strokeWidth="2" />
      {/* Front bumper */}
      <path d="M98 36 Q160 18 222 36 L226 66 L94 66 Z" fill={ORANGE} stroke="#0A0A0A" strokeWidth="2" />
      {/* Fenders */}
      <path d="M82 110 L94 70 L104 70 L108 172 L104 176 L82 176 Z" fill={ORANGE} stroke="#0A0A0A" strokeWidth="2" />
      <path d="M238 110 L226 70 L216 70 L212 172 L216 176 L238 176 Z" fill={ORANGE} stroke="#0A0A0A" strokeWidth="2" />
      {/* Headlights */}
      <path d="M100 44 Q118 36 136 42 L132 58 L102 58 Z" fill="#FFF3E8" stroke="#0A0A0A" strokeWidth="1.5" />
      <path d="M220 44 Q202 36 184 42 L188 58 L218 58 Z" fill="#FFF3E8" stroke="#0A0A0A" strokeWidth="1.5" />
      {/* Mirrors */}
      <rect x="58" y="184" width="26" height="14" rx="4" fill={ORANGE} stroke="#0A0A0A" strokeWidth="1.5" />
      <rect x="236" y="184" width="26" height="14" rx="4" fill={ORANGE} stroke="#0A0A0A" strokeWidth="1.5" />
      {/* Hatch overlay so the film reads as a layer, not paint */}
      <path d="M98 70 L222 70 L212 172 L108 172 Z" fill="url(#cov-hatch)" />
      <path d="M98 36 Q160 18 222 36 L226 66 L94 66 Z" fill="url(#cov-hatch)" />

      </g>

      {/* ---- Labels (in canvas coordinates; the car is offset 70px right) ---- */}
      <g fontFamily="Inter, system-ui, sans-serif" fontSize="13" fontWeight="700" fill="#FAFAFA" letterSpacing="0.08em">
        <text x="230" y="14" textAnchor="middle" fontSize="10" fill="#A1A1AA">FRONT</text>
        {/* right side */}
        <line x1="262" y1="50" x2="356" y2="70" stroke={ORANGE} strokeWidth="1" strokeDasharray="3 3" />
        <text x="362" y="74" fill={ORANGE}>BUMPER</text>
        <line x1="240" y1="120" x2="356" y2="120" stroke={ORANGE} strokeWidth="1" strokeDasharray="3 3" />
        <text x="362" y="124" fill={ORANGE}>HOOD</text>
        <line x1="330" y1="191" x2="356" y2="191" stroke={ORANGE} strokeWidth="1" strokeDasharray="3 3" />
        <text x="362" y="195" fill={ORANGE}>MIRRORS</text>
        {/* left side */}
        <line x1="188" y1="50" x2="104" y2="64" stroke={ORANGE} strokeWidth="1" strokeDasharray="3 3" />
        <text x="98" y="68" textAnchor="end" fill={ORANGE}>LIGHTS</text>
        <line x1="160" y1="140" x2="104" y2="140" stroke={ORANGE} strokeWidth="1" strokeDasharray="3 3" />
        <text x="98" y="144" textAnchor="end" fill={ORANGE}>FENDERS</text>
        {ceramic && (
          <>
            <line x1="230" y1="300" x2="356" y2="300" stroke="#A1A1AA" strokeWidth="1" strokeDasharray="3 3" />
            <text x="362" y="296" fill="#E4E4E7">CERAMIC</text>
            <text x="362" y="311" fill="#A1A1AA" fontSize="10" fontWeight="500">EVERY PANEL</text>
          </>
        )}
      </g>
    </svg>
  );
}
