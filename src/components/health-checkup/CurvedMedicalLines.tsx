/**
 * Decorative medical wave / ECG lines rendered inside each package card's
 * pastel arch. Purely presentational (aria-hidden), no client JS required.
 */
export default function CurvedMedicalLines({ strokeColor = 'rgba(147, 51, 234, 0.22)' }: { strokeColor?: string }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-visible"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 260"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* Biological curved flow waves */}
      <path d="M-20,190 C60,130 110,230 190,165 C250,115 280,185 340,140" fill="none" stroke={strokeColor} strokeWidth="1.75" strokeDasharray="4 3" className="opacity-70" />
      <path d="M-10,130 C70,70 130,195 210,110 C270,45 295,140 335,90" fill="none" stroke={strokeColor} strokeWidth="2.2" className="opacity-80" />
      {/* Medical heartbeat (ECG rhythm) pulse path */}
      <path
        d="M20,215 L90,215 L102,190 L112,238 L124,170 L136,225 L144,215 L220,215 L230,198 L238,228 L246,215 L300,215"
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-60"
      />
      {/* Micro bio-cellular rings */}
      <circle cx="210" cy="110" r="3.5" fill={strokeColor} className="opacity-75" />
      <circle cx="102" cy="190" r="2.5" fill={strokeColor} className="opacity-60" />
      <circle cx="124" cy="170" r="3" fill={strokeColor} className="opacity-80" />
      <circle cx="190" cy="165" r="2.5" fill={strokeColor} className="opacity-70" />
    </svg>
  );
}
