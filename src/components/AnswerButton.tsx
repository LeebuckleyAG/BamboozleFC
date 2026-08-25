interface AnswerButtonProps {
  letter: string;
  text: string;
  state: "idle" | "selected" | "correct" | "incorrect" | "reveal-correct" | "dimmed";
  onClick: () => void;
  disabled?: boolean;
}

const SWATCH_COLOURS = ["var(--tx-red)", "var(--tx-green)", "var(--tx-yellow)", "var(--tx-cyan)"];
const SWATCH_TEXT = ["#fff", "#000", "#000", "#000"];

const TEXT_WRAP_CLASSES: Record<AnswerButtonProps["state"], string> = {
  idle: "border-transparent text-[var(--tx-white)]",
  selected: "border-[var(--tx-white)] text-[var(--tx-white)]",
  correct: "border-[var(--tx-green)] text-[var(--tx-green)]",
  incorrect: "border-[var(--tx-red)] text-[var(--tx-red)]",
  "reveal-correct": "border-[var(--tx-green)] text-[var(--tx-green)]",
  dimmed: "border-transparent text-[var(--tx-white)]/30",
};

const ICON: Record<AnswerButtonProps["state"], string> = {
  idle: "",
  selected: "",
  correct: "\u2713",
  incorrect: "\u2715",
  "reveal-correct": "\u2713",
  dimmed: "",
};

export default function AnswerButton({ letter, text, state, onClick, disabled }: AnswerButtonProps) {
  const idx = ["A", "B", "C", "D"].indexOf(letter);
  const swatch = SWATCH_COLOURS[idx] ?? "var(--tx-white)";
  const swatchText = SWATCH_TEXT[idx] ?? "#000";
  const dimmed = state === "dimmed";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-pressed={state === "selected" || state === "correct" || state === "incorrect"}
      className={`group w-full flex items-stretch font-mono transition-opacity duration-150 disabled:cursor-default border-2 ${TEXT_WRAP_CLASSES[state]} ${dimmed ? "opacity-30" : ""}`}
    >
      <span
        className="font-tele text-2xl sm:text-3xl leading-none w-12 sm:w-14 shrink-0 flex items-center justify-center"
        style={{ backgroundColor: swatch, color: swatchText }}
      >
        {letter}
      </span>
      <span className="flex-1 bg-black flex items-center justify-between gap-2 px-3 py-3.5 sm:px-4 sm:py-4">
        <span className="text-sm sm:text-base font-semibold uppercase leading-snug tracking-wide text-left">
          {text}
        </span>
        {ICON[state] && (
          <span className="font-display text-sm shrink-0" aria-hidden="true">
            {ICON[state]}
          </span>
        )}
      </span>
    </button>
  );
}
