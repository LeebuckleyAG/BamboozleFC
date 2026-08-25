import Header from "../components/Header";
import NavBar from "../components/NavBar";
import { useSettings } from "../context/SettingsContext";

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--tx-border)] py-3">
      <span className="font-mono text-sm text-[var(--tx-white)]">{label}</span>
      <button
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className={`font-tele text-lg px-4 py-1 border-2 tracking-wide ${
          value
            ? "border-[var(--tx-green)] text-[var(--tx-green)]"
            : "border-[var(--tx-red)] text-[var(--tx-red)]"
        }`}
      >
        {value ? "ON" : "OFF"}
      </button>
    </div>
  );
}

export default function Settings({ onHome }: { onHome: () => void }) {
  const { settings, update, resetLocalData } = useSettings();

  return (
    <>
      <Header page="500" title="SETTINGS" breadcrumb="PAGE 303 > SETTINGS" />
      <div className="flex-1 min-h-0 overflow-y-auto px-3 py-3 sm:px-5">
        <Toggle label="SOUND" value={settings.sound} onChange={(v) => update({ sound: v })} />
        <Toggle label="CRT EFFECT" value={settings.crt} onChange={(v) => update({ crt: v })} />
        <Toggle label="ANIMATIONS" value={settings.animations} onChange={(v) => update({ animations: v })} />
        <Toggle label="HIGH CONTRAST" value={settings.highContrast} onChange={(v) => update({ highContrast: v })} />

        <div className="flex items-center justify-between border-b border-[var(--tx-border)] py-3">
          <span className="font-mono text-sm text-[var(--tx-white)]">QUESTION TIME</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => update({ questionTime: Math.max(5, settings.questionTime - 5) })}
              className="font-tele text-xl border-2 border-[var(--tx-border)] w-8 h-8 flex items-center justify-center text-[var(--tx-white)] hover:border-[var(--tx-cyan)]"
              aria-label="Decrease question time"
            >
              −
            </button>
            <span className="font-tele text-2xl w-20 text-center text-[var(--tx-yellow)] crt-text">
              {settings.questionTime}S
            </span>
            <button
              onClick={() => update({ questionTime: Math.min(30, settings.questionTime + 5) })}
              className="font-tele text-xl border-2 border-[var(--tx-border)] w-8 h-8 flex items-center justify-center text-[var(--tx-white)] hover:border-[var(--tx-cyan)]"
              aria-label="Increase question time"
            >
              +
            </button>
          </div>
        </div>

        <button
          onClick={() => {
            if (window.confirm("Reset all local data? This clears settings, leaderboard and daily streaks. Can't be undone.")) {
              resetLocalData();
            }
          }}
          className="mt-6 w-full font-mono text-xs text-[var(--tx-red)] border-2 border-[var(--tx-red)] px-3 py-2.5 hover:bg-[var(--tx-red)]/10 tracking-wide"
        >
          RESET LOCAL DATA
        </button>
      </div>
      <NavBar red={{ label: "HOME", onClick: onHome }} />
    </>
  );
}
