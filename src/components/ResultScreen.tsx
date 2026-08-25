import { useState } from "react";
import type { RunResult } from "../types";
import { ratingForAccuracy } from "../utils/scoring";

interface ResultScreenProps {
  result: RunResult;
  onPlayAgain: () => void;
  onHome: () => void;
  onSaveScore: (name: string) => void;
  alreadySaved: boolean;
}

export default function ResultScreen({ result, onPlayAgain, onHome, onSaveScore, alreadySaved }: ResultScreenProps) {
  const [name, setName] = useState("");
  const [copied, setCopied] = useState(false);
  const rating = ratingForAccuracy(result.accuracy);
  const bestStreakInRun = result.bestStreak;

  const shareText = `BAMBOOZLE FC\n\nI scored ${result.score.toLocaleString()}.\n\n${result.correct}/${result.total} correct\n${result.accuracy}% accuracy\n${bestStreakInRun} question streak\n\n"${rating}"\n\nCan you beat me?\n\nBAMBOOZLE FC\nPAGE 303`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ text: shareText, title: "BAMBOOZLE FC" });
        return;
      } catch {
        // user cancelled or share failed — fall through to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — nothing more we can do silently
    }
  };

  return (
    <div className="flex-1 min-h-0 overflow-y-auto px-4 py-5 sm:px-6 flex flex-col items-center text-center">
      <p className="font-mono text-xs tracking-widest text-[var(--tx-white)]/50">FINAL SCORE</p>
      <p className="font-tele text-6xl sm:text-7xl text-[var(--tx-yellow)] crt-text score-pop leading-none mt-1">
        {result.score.toLocaleString()}
      </p>

      <p className="font-mono text-sm text-[var(--tx-white)]/70 mt-3">
        {result.total} QUESTIONS · {result.correct} CORRECT · {result.accuracy}% ACCURACY
      </p>

      <div className="mt-4 border-2 border-[var(--tx-magenta)] px-5 py-2.5">
        <span className="font-tele text-2xl text-[var(--tx-magenta)] crt-text tracking-wide">"{rating}"</span>
      </div>

      {!alreadySaved && result.score > 0 && (
        <div className="mt-6 w-full max-w-xs">
          <p className="font-mono text-[11px] text-[var(--tx-white)]/50 mb-2">SAVE TO LOCAL LEADERBOARD?</p>
          <div className="flex gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 12))}
              placeholder="YOUR NAME"
              maxLength={12}
              className="flex-1 min-w-0 bg-black border-2 border-[var(--tx-border)] px-2 py-2 font-mono text-sm text-[var(--tx-white)] uppercase focus:border-[var(--tx-cyan)] outline-none"
            />
            <button
              onClick={() => name.trim() && onSaveScore(name.trim())}
              disabled={!name.trim()}
              className="border-2 border-[var(--tx-green)] text-[var(--tx-green)] px-3 py-2 font-mono text-xs font-semibold disabled:opacity-30"
            >
              SAVE
            </button>
          </div>
        </div>
      )}
      {alreadySaved && (
        <p className="mt-6 font-mono text-xs text-[var(--tx-green)]">SAVED TO LOCAL LEADERBOARD</p>
      )}

      <div className="mt-6 flex flex-col gap-2 w-full max-w-xs">
        <button
          onClick={onPlayAgain}
          className="border-2 border-[var(--tx-green)] text-[var(--tx-green)] px-4 py-2.5 font-tele text-xl tracking-wide hover:bg-[var(--tx-green)]/10"
        >
          PLAY AGAIN
        </button>
        <button
          onClick={handleShare}
          className="border-2 border-[var(--tx-cyan)] text-[var(--tx-cyan)] px-4 py-2.5 font-tele text-xl tracking-wide hover:bg-[var(--tx-cyan)]/10"
        >
          {copied ? "COPIED TO CLIPBOARD" : "SHARE SCORE"}
        </button>
        <button
          onClick={onHome}
          className="border-2 border-[var(--tx-border)] text-[var(--tx-white)]/70 px-4 py-2.5 font-tele text-xl tracking-wide hover:bg-white/5"
        >
          HOME
        </button>
      </div>
    </div>
  );
}
