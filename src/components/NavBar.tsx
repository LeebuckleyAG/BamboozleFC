interface NavAction {
  label: string;
  onClick: () => void;
}

interface NavBarProps {
  red?: NavAction;
  green?: NavAction;
  yellow?: NavAction;
  blue?: NavAction;
}

const STYLE: Record<string, string> = {
  red: "text-[var(--tx-red)] border-[var(--tx-red)]",
  green: "text-[var(--tx-green)] border-[var(--tx-green)]",
  yellow: "text-[var(--tx-yellow)] border-[var(--tx-yellow)]",
  blue: "text-[var(--tx-cyan)] border-[var(--tx-cyan)]",
};

function Key({ colourKey, action }: { colourKey: keyof typeof STYLE; action?: NavAction }) {
  if (!action) return <div className="flex-1" />;
  return (
    <button
      onClick={action.onClick}
      className={`flex-1 min-w-0 border-t-2 px-1 py-2.5 font-mono text-[11px] sm:text-xs font-semibold tracking-wide uppercase ${STYLE[colourKey]} bg-black hover:bg-white/5 active:bg-white/10 transition-colors truncate`}
    >
      <span className="hidden sm:inline">{colourKey.toUpperCase()}: </span>
      {action.label}
    </button>
  );
}

export default function NavBar({ red, green, yellow, blue }: NavBarProps) {
  return (
    <div className="shrink-0 flex w-full border-t-2 border-[var(--tx-border)]">
      <Key colourKey="red" action={red} />
      <Key colourKey="green" action={green} />
      <Key colourKey="yellow" action={yellow} />
      <Key colourKey="blue" action={blue} />
    </div>
  );
}
