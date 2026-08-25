interface AnswerButtonProps {
  letter: string;
  text: string;
  state: "idle" | "selected" | "correct" | "incorrect" | "reveal-correct" | "dimmed";
  onClick: () => void;
  disabled?: boolean;
}

const STATE_CLASSES: Record<AnswerButtonProps["state"], string> = {
  idle: "border-[var(--tx-border)] text-[var(--tx-white)] hover:border-[var(--tx-cyan)] hover:bg-white/5",
  selected: "border-[var(--tx-cyan)] bg-[var(--tx-cyan)]/10 text-[var(--tx-white)]",
  correct: "border-[var(--tx-green)] bg-[var(--tx-green)]/15 text-[var(--tx-green)]",
  incorrect: "border-[var(--tx-red)] bg-[var(--tx-red)]/15 text-[var(--tx-red)]",
  "reveal-correct": "border-[var(--tx-green)] bg-[var(--tx-green)]/10 text-[var(--tx-green)]",
  dimmed: "border-[var(--tx-border)] text-[var(--tx-white)]/30",
};

const ICON: Record<AnswerButtonProps["state"], string> = {
  idle: "",
  selected: "",
  correct: "✓",
  incorrect: "✕",
  "reveal-correct": "✓",
  dimmed: "",
};

export default function AnswerButton({ letter, text, state, onClick, disabled }: AnswerButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-pressed={state === "selected" || state === "correct" || state === "incorrect"}
      className={`group w-full flex items-center gap-3 rounded-none border-2 px-3 py-3.5 sm:px-4 sm:py-4 text-left font-mono transition-colors duration-150 disabled:cursor-default ${STATE_CLASSES[state]}`}
    >
      <span className="font-tele text-2xl sm:text-3xl leading-none w-7 shrink-0 text-center">
        {letter}
      </span>
      <span className="flex-1 text-sm sm:text-base font-semibold uppercase leading-snug tracking-wide">
        {text}
      </span>
      {ICON[state] && (
        <span className="font-display text-sm shrink-0" aria-hidden="true">
          {ICON[state]}
        </span>
      )}
    </button>
  );
}
