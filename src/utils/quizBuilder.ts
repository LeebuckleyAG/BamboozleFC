import { QUESTIONS } from "../data/questions";
import { getDailyQuestions, todayKey } from "./dailyQuiz";
import { pickRandom, shuffle } from "./random";
import type { CategoryId, GameMode, Question } from "../types";

export function buildQuestionSet(mode: GameMode, category?: CategoryId): Question[] {
  switch (mode) {
    case "quickfire":
      return pickRandom(QUESTIONS, 10);
    case "daily":
      return getDailyQuestions(todayKey(), 10);
    case "marathon":
      return shuffle(QUESTIONS);
    case "category": {
      const pool = QUESTIONS.filter((q) => q.category === category);
      return pickRandom(pool, Math.min(10, pool.length));
    }
    default:
      return pickRandom(QUESTIONS, 10);
  }
}
