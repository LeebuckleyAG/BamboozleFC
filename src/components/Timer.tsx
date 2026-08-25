export default function Timer({ timeLeft, total }: { timeLeft: number; total: number }) {
  const urgent = timeLeft <= 5 && timeLeft > 0;
  const pct = Math.max(0, Math.min(100, (timeLeft / total) * 100));

  return (
    <div className="flex items-center gap-2" role="timer" aria-live="polite">
      <span className="font-mono text-[10px] tracking-widest text-[var(--tx-white)]/60">TIME</span>
      <div className="relative h-2 flex-1 max-w-[110px] bg-[var(--tx-border)] overflow-hidden">
        <div
          className={`h-full transition-[width] duration-150 ${urgent ? "bg-[var(--tx-red)]" : "bg-[var(--tx-green)]"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span
        className={`font-tele text-2xl leading-none w-7 text-right crt-text ${
          urgent ? "text-[var(--tx-red)] pulse-urgent" : "text-[var(--tx-yellow)]"
        }`}
      >
        {timeLeft}
      </span>
    </div>
  );
}
