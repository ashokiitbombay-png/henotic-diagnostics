interface CurvedMedicalLinesProps {
  strokeColor?: string;
}

/** Curved medical wave & ECG lines rendered inside 3D NIPT panel arches. */
export default function CurvedMedicalLines({ strokeColor = '#8b5cf6' }: CurvedMedicalLinesProps) {
  return (
    <svg
      viewBox="0 0 320 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="absolute inset-0 w-full h-full opacity-35 pointer-events-none"
    >
      <path
        d="M-20 155 C 50 105, 120 195, 190 135 C 245 90, 290 150, 340 115"
        stroke={strokeColor}
        strokeWidth="2"
        strokeDasharray="6 5"
      />
      <path
        d="M-20 180 C 60 135, 130 210, 210 155 C 265 115, 300 165, 340 140"
        stroke={strokeColor}
        strokeWidth="1.5"
        opacity="0.75"
      />
      <path
        d="M10 95 L75 95 L92 68 L110 122 L126 82 L140 95 L310 95"
        stroke={strokeColor}
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.6"
      />
      <path
        d="M-10 42 C 65 82, 145 14, 225 56 C 275 82, 310 44, 340 58"
        stroke="rgba(255,255,255,0.65)"
        strokeWidth="1.5"
      />
    </svg>
  );
}
