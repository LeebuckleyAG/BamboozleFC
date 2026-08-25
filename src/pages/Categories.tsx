import Header from "../components/Header";
import NavBar from "../components/NavBar";
import { CATEGORIES } from "../data/categories";
import type { CategoryId } from "../types";

interface CategoriesProps {
  onSelect: (id: CategoryId) => void;
  onHome: () => void;
}

export default function Categories({ onSelect, onHome }: CategoriesProps) {
  return (
    <>
      <Header page="250" title="CATEGORIES" breadcrumb="PAGE 303 > CATEGORIES" />
      <div className="flex-1 min-h-0 overflow-y-auto px-3 py-3 sm:px-5">
        <p className="font-mono text-[11px] text-[var(--tx-white)]/50 mb-3">
          PICK A CATEGORY. 10 QUESTIONS. NO MERCY.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              className="text-left border-2 px-3 py-2.5 font-mono bg-black hover:bg-white/5 active:bg-white/10 transition-colors"
              style={{ borderColor: c.colour, color: c.colour }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-tele text-lg leading-none tracking-wide">{c.label}</span>
                <span className="text-[9px] opacity-60 font-mono shrink-0">P{c.page}</span>
              </div>
              <div className="text-[10px] mt-1 text-[var(--tx-white)]/50 normal-case">{c.blurb}</div>
            </button>
          ))}
        </div>
      </div>
      <NavBar red={{ label: "HOME", onClick: onHome }} />
    </>
  );
}
