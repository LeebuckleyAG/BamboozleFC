import { useEffect, useState } from "react";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import { formatCountdown, formatDisplayDate, msUntilNextDay, todayKey } from "../utils/dailyQuiz";
import type { DailyProgress } from "../types";

interface DailyQuizProps {
  progress: DailyProgress;
  onStart: () => void;
  onHome: () => void;
}

export default function DailyQuiz({ progress, onStart, onHome }: DailyQuizProps) {
  const key = todayKey();
  const completedToday = progress.lastCompletedDate === key;
  const [countdown, setCountdown] = useState(formatCountdown(msUntilNextDay()));

  useEffect(() => {
    if (!completedToday) return;
    const id = window.setInterval(() => setCountdown(formatCountdown(msUntilNextDay())), 1000);
    return () => window.clearInterval(id);
  }, [completedToday]);

  const todayResult = progress.history[key];

  return (
    <>
      <Header page="350" title="DAILY BAMBOOZLE" breadcrumb="PAGE 303 > DAILY QUIZ" />
      <div className="flex-1 min-h-0 overflow-y-auto px-3 py-4 sm:px-5 flex flex-col items-center text-center">
        <p className="font-mono text-xs text-[var(--tx-white)]/50 tracking-widest">TODAY'S BAMBOOZLE</p>
        <p className="font-tele text-2xl text-[var(--tx-yellow)] crt-text mt-1">{formatDisplayDate()}</p>

        <div className="mt-5 grid grid-cols-2 gap-2 w-full max-w-xs">
          <div className="border border-[var(--tx-border)] px-2 py-2">
            <div className="text-[9px] tracking-widest text-[var(--tx-white)]/50">DAILY STREAK</div>
            <div className="font-tele text-3xl text-[var(--tx-magenta)] crt-text">{progress.streak}</div>
            <div className="text-[9px] text-[var(--tx-white)]/40">DAYS</div>
          </div>
          <div className="border border-[var(--tx-border)] px-2 py-2">
            <div className="text-[9px] tracking-widest text-[var(--tx-white)]/50">BEST</div>
            <div className="font-tele text-3xl text-[var(--tx-cyan)] crt-text">{progress.bestStreak}</div>
            <div className="text-[9px] text-[var(--tx-white)]/40">DAYS</div>
          </div>
        </div>

        {completedToday ? (
          <div className="mt-8 flex flex-col items-center gap-3">
            <p className="font-tele text-3xl text-[var(--tx-green)] crt-text">DAILY QUIZ COMPLETE</p>
            {todayResult && (
              <p className="font-mono text-sm text-[var(--tx-white)]/70">
                You scored {todayResult.score.toLocaleString()} — {todayResult.correct}/10 correct.
              </p>
            )}
            <p className="font-mono text-xs text-[var(--tx-white)]/50 mt-2">Come back tomorrow.</p>
            <div className="mt-2 font-mono text-[11px] text-[var(--tx-white)]/50">NEXT BAMBOOZLE IN</div>
            <div className="font-tele text-4xl text-[var(--tx-yellow)] crt-text">{countdown}</div>
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-center gap-4">
            <p className="font-mono text-sm text-[var(--tx-white)]/70 max-w-xs">
              10 QUESTIONS · ONE ATTEMPT · SAME QUIZ FOR EVERYONE TODAY
            </p>
            <button
              onClick={onStart}
              className="border-2 border-[var(--tx-green)] text-[var(--tx-green)] px-8 py-3 font-tele text-2xl tracking-wide hover:bg-[var(--tx-green)]/10 active:bg-[var(--tx-green)]/20 transition-colors"
            >
              START DAILY QUIZ
            </button>
          </div>
        )}
      </div>
      <NavBar red={{ label: "HOME", onClick: onHome }} />
    </>
  );
}
