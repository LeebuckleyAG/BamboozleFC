import { useMemo } from "react";
import type { Question } from "../types";
import { CORRECT_PHRASES, WRONG_PHRASES, randomPhrase, randomQuip } from "../utils/scoring";
import Mascot from "./Mascot";

interface BamboozleMomentProps {
  correct: boolean;
  question: Question;
  pointsGained: number;
}

export default function BamboozleMoment({ correct, question, pointsGained }: BamboozleMomentProps) {
  const headline = useMemo(() => randomPhrase(correct ? CORRECT_PHRASES : WRONG_PHRASES), [correct]);
  const quip = useMemo(() => randomQuip(correct), [correct]);

  return (
    <div
      className={`border-2 px-3.5 py-3 ${
        correct
          ? "border-[var(--tx-green)] bg-[var(--tx-green)]/10 flash-green"
          : "border-[var(--tx-red)] bg-[var(--tx-red)]/10 flash-red"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Mascot size={32} mood={correct ? "happy" : "confused"} className="shrink-0" />
          <span
            className={`font-tele text-3xl leading-none crt-text tracking-wide truncate ${
              correct ? "text-[var(--tx-green)]" : "text-[var(--tx-red)]"
            }`}
          >
            {headline}
          </span>
        </div>
        {correct && pointsGained > 0 && (
          <span className="font-tele text-2xl text-[var(--tx-yellow)] crt-text shrink-0">
            +{pointsGained}
          </span>
        )}
      </div>
      <p className="font-mono text-xs text-[var(--tx-white)]/70 mt-1.5">{quip}</p>

      {!correct && (
        <p className="font-mono text-xs text-[var(--tx-white)]/70 mt-2">
          Correct answer:{" "}
          <span className="text-[var(--tx-green)] font-semibold">{question.correctAnswer}</span>
        </p>
      )}

      <p className="font-mono text-[11px] text-[var(--tx-white)]/50 mt-2 leading-relaxed">
        {question.explanation}
      </p>
      {question.funFact && (
        <p className="font-mono text-[11px] text-[var(--tx-cyan)]/70 mt-1.5 leading-relaxed">
          ⚽ {question.funFact}
        </p>
      )}
    </div>
  );
}
