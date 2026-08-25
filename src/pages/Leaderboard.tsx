import Header from "../components/Header";
import NavBar from "../components/NavBar";
import type { LeaderboardEntry } from "../types";

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  onClear: () => void;
  onHome: () => void;
}

export default function Leaderboard({ entries, onClear, onHome }: LeaderboardProps) {
  const sorted = [...entries].sort((a, b) => b.score - a.score).slice(0, 20);

  return (
    <>
      <Header page="300" title="LEADERBOARD" breadcrumb="PAGE 303 > LEADERBOARD" statusText="LOCAL LEADERBOARD · SCORES STORED ON THIS DEVICE ONLY" />
      <div className="flex-1 min-h-0 overflow-y-auto px-3 py-3 sm:px-5">
        <div className="font-mono text-[11px] text-[var(--tx-white)]/50 grid grid-cols-[2.5rem_1fr_5rem] gap-2 pb-1.5 border-b border-[var(--tx-border)] tracking-widest">
          <span>POS</span>
          <span>PLAYER</span>
          <span className="text-right">SCORE</span>
        </div>
        <ul>
          {sorted.map((e, i) => (
            <li
              key={`${e.name}-${e.date}-${i}`}
              className="font-mono grid grid-cols-[2.5rem_1fr_5rem] gap-2 py-2 border-b border-[var(--tx-border)]/50 items-center"
            >
              <span className={`font-tele text-xl leading-none ${i === 0 ? "text-[var(--tx-yellow)]" : "text-[var(--tx-white)]/60"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm uppercase text-[var(--tx-white)] truncate">{e.name}</span>
              <span className="text-right font-tele text-xl text-[var(--tx-green)] crt-text">
                {e.score.toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
        {sorted.length === 0 && (
          <p className="font-mono text-xs text-[var(--tx-white)]/50 mt-4 text-center">
            NO SCORES YET. GO PLAY A GAME.
          </p>
        )}
        <button
          onClick={() => {
            if (window.confirm("Clear your local leaderboard? This can't be undone.")) onClear();
          }}
          className="mt-5 font-mono text-[11px] text-[var(--tx-red)] border border-[var(--tx-red)] px-3 py-1.5 hover:bg-[var(--tx-red)]/10"
        >
          CLEAR LOCAL LEADERBOARD
        </button>
      </div>
      <NavBar red={{ label: "HOME", onClick: onHome }} />
    </>
  );
}
