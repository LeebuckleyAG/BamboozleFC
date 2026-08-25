interface ScoreDisplayProps {
  score: number;
  streak: number;
  accuracy: number;
  pop?: boolean;
}

export default function ScoreDisplay({ score, streak, accuracy, pop }: ScoreDisplayProps) {
  return (
    <div className="grid grid-cols-3 gap-2 font-mono">
      <div className="border border-[var(--tx-border)] px-2 py-1.5 text-center">
        <div className="text-[9px] tracking-widest text-[var(--tx-white)]/50">SCORE</div>
        <div className={`font-tele text-2xl leading-none text-[var(--tx-yellow)] crt-text ${pop ? "score-pop" : ""}`}>
          {score.toLocaleString()}
        </div>
      </div>
      <div className="border border-[var(--tx-border)] px-2 py-1.5 text-center">
        <div className="text-[9px] tracking-widest text-[var(--tx-white)]/50">STREAK</div>
        <div className="font-tele text-2xl leading-none text-[var(--tx-magenta)] crt-text">{streak}</div>
      </div>
      <div className="border border-[var(--tx-border)] px-2 py-1.5 text-center">
        <div className="text-[9px] tracking-widest text-[var(--tx-white)]/50">ACCURACY</div>
        <div className="font-tele text-2xl leading-none text-[var(--tx-cyan)] crt-text">{accuracy}%</div>
      </div>
    </div>
  );
}
