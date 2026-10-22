/* Pip: a small copper teakettle with a moss cap, leaf ears and stubby legs.
   Pip is the site's mascot and, later, the face of the chat bot.

   Moods (all pure SVG + CSS, so it costs nothing to load):
     idle       gentle bob, occasional blink
     listening  ears perk up
     thinking   steam rises from the spout
     talking    lid hops, mouth moves
     happy      eyes squint into smiles, cheeks glow

   Colors are fixed (not theme tokens) so Pip looks the same in light and dark. */
const C = {
  edge: "#3a3f3b", copper: "#d4875a", copperDark: "#b06a41", lid: "#c07a4e",
  moss: "#86a35a", mossDark: "#6d8a45", leaf: "#a3bf6e", cheek: "#ee9a8f", steam: "#ffffff",
};

export default function Pip({ mood = "idle", size = 64, className = "", title }) {
  const happy = mood === "happy";
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={`pip pip--${mood} ${className}`}
      role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      <g className="pip-body">
        {/* steam */}
        <g className="pip-steam" fill={C.steam} stroke={C.edge} strokeWidth="1.5">
          <circle cx="92" cy="36" r="4" />
          <circle cx="96" cy="26" r="3" />
          <circle cx="91" cy="18" r="2.2" />
        </g>
        {/* legs */}
        <ellipse cx="40" cy="88" rx="6" ry="4" fill={C.copperDark} stroke={C.edge} strokeWidth="2.5" />
        <ellipse cx="60" cy="88" rx="6" ry="4" fill={C.copperDark} stroke={C.edge} strokeWidth="2.5" />
        {/* handle */}
        <path d="M24 50 Q6 58 21 76" fill="none" stroke={C.edge} strokeWidth="5" strokeLinecap="round" />
        <path d="M24 50 Q6 58 21 76" fill="none" stroke={C.copperDark} strokeWidth="2" strokeLinecap="round" />
        {/* spout */}
        <path d="M74 56 Q87 54 89 41 L95 43 Q93 62 77 68 Z" fill={C.copper} stroke={C.edge} strokeWidth="2.5" strokeLinejoin="round" />
        {/* ears */}
        <g className="pip-ear pip-ear--l">
          <path d="M33 44 Q18 36 20 22 Q32 26 38 40 Z" fill={C.leaf} stroke={C.edge} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M34 41 Q26 33 23 26" fill="none" stroke={C.mossDark} strokeWidth="1.5" strokeLinecap="round" />
        </g>
        <g className="pip-ear pip-ear--r">
          <path d="M67 44 Q82 36 80 22 Q68 26 62 40 Z" fill={C.leaf} stroke={C.edge} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M66 41 Q74 33 77 26" fill="none" stroke={C.mossDark} strokeWidth="1.5" strokeLinecap="round" />
        </g>
        {/* body */}
        <ellipse cx="50" cy="63" rx="30" ry="24" fill={C.copper} stroke={C.edge} strokeWidth="2.5" />
        <path d="M30 70 Q50 84 70 70" fill="none" stroke={C.copperDark} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        {/* lid + moss cap + sprout (hops when talking) */}
        <g className="pip-lid">
          <ellipse cx="50" cy="41" rx="19" ry="6" fill={C.lid} stroke={C.edge} strokeWidth="2.5" />
          <path d="M33 41 Q35 31 45 33 Q50 26 56 32 Q66 30 67 41 Q50 45 33 41 Z" fill={C.moss} stroke={C.edge} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M51 30 Q51 24 54 20" fill="none" stroke={C.edge} strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="57" cy="19" rx="4.5" ry="2.6" transform="rotate(-25 57 19)" fill={C.leaf} stroke={C.edge} strokeWidth="1.8" />
        </g>
        {/* face */}
        <ellipse cx="35" cy="67" rx="5" ry="3" fill={C.cheek} className="pip-cheek" />
        <ellipse cx="65" cy="67" rx="5" ry="3" fill={C.cheek} className="pip-cheek" />
        {happy ? (
          <g fill="none" stroke={C.edge} strokeWidth="2.6" strokeLinecap="round">
            <path d="M37 61 Q41 56 45 61" />
            <path d="M55 61 Q59 56 63 61" />
          </g>
        ) : (
          <g className="pip-eyes" fill={C.edge}>
            <ellipse cx="41" cy="60" rx="3.2" ry="3.8" />
            <ellipse cx="59" cy="60" rx="3.2" ry="3.8" />
            <circle cx="42.2" cy="58.6" r="1" fill="#fff" />
            <circle cx="60.2" cy="58.6" r="1" fill="#fff" />
          </g>
        )}
        <path className="pip-mouth" d={happy ? "M45 67 Q50 73 55 67" : "M47 68 Q50 70.5 53 68"}
          fill="none" stroke={C.edge} strokeWidth="2.2" strokeLinecap="round" />
      </g>
    </svg>
  );
}
