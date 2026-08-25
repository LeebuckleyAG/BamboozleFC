import { getCategory } from "../data/categories";
import type { Question } from "../types";

export default function QuestionCard({ question }: { question: Question }) {
  const cat = getCategory(question.category);
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        {cat && (
          <span
            className="font-mono text-[9px] tracking-widest border px-1.5 py-0.5 uppercase"
            style={{ borderColor: cat.colour, color: cat.colour }}
          >
            {cat.label}
          </span>
        )}
        <span className="font-mono text-[9px] tracking-widest text-[var(--tx-white)]/40 uppercase">
          {question.difficulty}
        </span>
      </div>
      <p className="font-tele text-2xl sm:text-[28px] leading-snug text-[var(--tx-white)] crt-text uppercase">
        {question.question}
      </p>
    </div>
  );
}
