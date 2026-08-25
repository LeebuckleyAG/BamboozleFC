import Header from "../components/Header";
import NavBar from "../components/NavBar";

export default function Rules({ onHome, onPlay }: { onHome: () => void; onPlay: () => void }) {
  return (
    <>
      <Header page="400" title="HOW TO PLAY" breadcrumb="PAGE 303 > RULES" />
      <div className="flex-1 min-h-0 overflow-y-auto px-3 py-4 sm:px-5 font-mono text-sm text-[var(--tx-white)]/85 space-y-4">
        <ol className="space-y-3 list-none">
          {[
            "Pick an answer from the four on screen.",
            "You've got 15 seconds by default. Faster answers score more.",
            "Build a streak for score multipliers — the longer you go, the bigger the boost.",
            "Get ready to be BAMBOOZLED. Wrong answers reset your streak.",
          ].map((t, i) => (
            <li key={i} className="flex gap-3">
              <span className="font-tele text-2xl text-[var(--tx-cyan)] crt-text leading-none w-6 shrink-0">
                {i + 1}
              </span>
              <span className="pt-0.5">{t}</span>
            </li>
          ))}
        </ol>

        <div className="border-t border-[var(--tx-border)] pt-3">
          <p className="font-tele text-xl text-[var(--tx-yellow)] crt-text mb-2">SCORING</p>
          <ul className="space-y-1 text-xs text-[var(--tx-white)]/70">
            <li>• Base score: 100 points per correct answer</li>
            <li>• Time bonus: remaining seconds × 10</li>
            <li>• 3-streak: ×1.1 multiplier</li>
            <li>• 5-streak: ×1.25 multiplier</li>
            <li>• 8-streak: ×1.5 multiplier</li>
            <li>• 10-streak: ×2 multiplier</li>
          </ul>
        </div>

        <div className="border-t border-[var(--tx-border)] pt-3">
          <p className="font-tele text-xl text-[var(--tx-yellow)] crt-text mb-2">GAME MODES</p>
          <ul className="space-y-1.5 text-xs text-[var(--tx-white)]/70">
            <li><span className="text-[var(--tx-green)]">QUICK FIRE</span> — 10 random questions, replay any time.</li>
            <li><span className="text-[var(--tx-yellow)]">DAILY BAMBOOZLE</span> — the same 10 questions for everyone, once a day.</li>
            <li><span className="text-[var(--tx-cyan)]">CATEGORIES</span> — pick a topic and test yourself.</li>
          </ul>
        </div>
      </div>
      <NavBar green={{ label: "PLAY NOW", onClick: onPlay }} red={{ label: "HOME", onClick: onHome }} />
    </>
  );
}
