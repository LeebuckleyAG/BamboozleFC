interface MascotProps {
  size?: number;
  className?: string;
  mood?: "happy" | "confused";
}

export default function Mascot({ size = 64, className = "", mood = "happy" }: MascotProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      {/* ear blocks */}
      <rect x="2" y="8" width="5" height="6" fill="var(--tx-blue)" />
      <rect x="33" y="8" width="5" height="6" fill="var(--tx-blue)" />
      {/* head */}
      <rect x="7" y="4" width="26" height="24" fill="var(--tx-yellow)" />
      <rect x="5" y="8" width="2" height="16" fill="var(--tx-yellow)" />
      <rect x="33" y="8" width="2" height="16" fill="var(--tx-yellow)" />
      {/* goggle band */}
      <rect x="5" y="12" width="30" height="7" fill="var(--tx-white)" />
      <rect x="10" y="14" width="6" height="4" fill="#000" />
      <rect x="24" y="14" width="6" height="4" fill="#000" />
      {/* mouth */}
      {mood === "happy" ? (
        <>
          <rect x="13" y="24" width="14" height="3" fill="#000" />
          <rect x="11" y="22" width="2" height="2" fill="#000" />
          <rect x="27" y="22" width="2" height="2" fill="#000" />
        </>
      ) : (
        <rect x="13" y="23" width="14" height="3" fill="#000" />
      )}
      {/* cheek accent */}
      <rect x="9" y="19" width="3" height="2" fill="var(--tx-magenta)" opacity="0.6" />
      <rect x="28" y="19" width="3" height="2" fill="var(--tx-magenta)" opacity="0.6" />
    </svg>
  );
}
