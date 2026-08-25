import { useEffect, useState } from "react";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import { formatDisplayDate } from "../utils/dailyQuiz";
import { QUESTION_COUNT } from "../data/questions";

interface HomeProps {
  goPlay: () => void;
  goDaily: () => void;
  goMarathon: () => void;
  goCategories: () => void;
  goLeaderboard: () => void;
  goRules: () => void;
  goSettings: () => void;
}

const OPTIONS = (p: HomeProps) => [
  { label: "PLAY NOW", sub: "10 quick-fire questions", action: p.goPlay, colour: "text-[var(--tx-green)] border-[var(--tx-green)]" },
  { label: "DAILY BAMBOOZLE", sub: "One shot. Today only.", action: p.goDaily, colour: "text-[var(--tx-yellow)] border-[var(--tx-yellow)]" },
  { label: "MARATHON", sub: "Keep going until you slip up", action: p.goMarathon, colour: "text-[var(--tx-magenta)] border-[var(--tx-magenta)]" },
  { label: "CATEGORIES", sub: "Pick your battleground", action: p.goCategories, colour: "text-[var(--tx-cyan)] border-[var(--tx-cyan)]" },
  { label: "LEADERBOARD", sub: "Local bragging rights", action: p.goLeaderboard, colour: "text-[var(--tx-white)] border-[var(--tx-white)]" },
  { label: "HOW TO PLAY", sub: "Rules of the game", action: p.goRules, colour: "text-[var(--tx-blue)] border-[var(--tx-blue)]" },
];

export default function Home(props: HomeProps) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <>
      <Header page="101" title="BAMBOOZLE FC" statusText="BBC-TEXT STYLE FOOTBALL SERVICE · NO INTERNET REQUIRED" />
      <div className="flex-1 min-h-0 overflow-y-auto px-3 py-4 sm:px-5">
        <p className="font-mono text-xs tracking-widest text-[var(--tx-magenta)]">FOOTBALL QUIZ</p>
        <h2 className="font-tele text-2xl sm:text-3xl text-[var(--tx-white)] mt-1 leading-tight crt-text">
          "HOW MUCH DO YOU ACTUALLY KNOW?"
        </h2>
        <p className="font-mono text-[11px] text-[var(--tx-white)]/50 mt-1">
          {formatDisplayDate(now)} · {QUESTION_COUNT} QUESTIONS LOADED
        </p>

        <div className="mt-4 flex flex-col gap-2.5">
          {OPTIONS(props).map((opt) => (
            <button
              key={opt.label}
              onClick={opt.action}
              className={`text-left border-2 px-3.5 py-3 font-mono bg-black hover:bg-white/5 active:bg-white/10 transition-colors ${opt.colour}`}
            >
              <div className="font-tele text-xl leading-none tracking-wide">{opt.label}</div>
              <div className="text-[10px] mt-1 text-[var(--tx-white)]/50 uppercase tracking-wide">{opt.sub}</div>
            </button>
          ))}
        </div>

        <p className="font-mono text-[10px] text-center text-[var(--tx-white)]/40 mt-6 tracking-widest">
          ALL THE FOOTBALL. NONE OF THE VAR.
        </p>
      </div>
      <NavBar
        yellow={{ label: "RULES", onClick: props.goRules }}
        blue={{ label: "SETTINGS", onClick: props.goSettings }}
      />
    </>
  );
}
