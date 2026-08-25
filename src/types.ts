export type Difficulty = "easy" | "medium" | "hard" | "niche";

export type CategoryId =
  | "premier-league"
  | "champions-league"
  | "world-cup"
  | "euros"
  | "international"
  | "history"
  | "transfers"
  | "managers"
  | "stadiums"
  | "records"
  | "cult-heroes"
  | "shirt-numbers"
  | "world-football"
  | "obscure"
  | "proper-niche";

export interface Category {
  id: CategoryId;
  page: string;
  label: string;
  blurb: string;
  colour: string;
}

export interface Question {
  id: string;
  question: string;
  category: CategoryId;
  difficulty: Difficulty;
  answers: string[];
  correctAnswer: string;
  explanation: string;
  funFact?: string;
}

export type GameMode = "quickfire" | "daily" | "marathon" | "category";

export type GameStatus = "idle" | "playing" | "answering" | "revealing" | "complete";

export interface QuizConfig {
  mode: GameMode;
  category?: CategoryId;
  questionCount?: number;
  timePerQuestion?: number;
}

export interface LeaderboardEntry {
  name: string;
  score: number;
  date: string;
  mode: GameMode;
}

export interface Settings {
  sound: boolean;
  crt: boolean;
  animations: boolean;
  highContrast: boolean;
  questionTime: number;
}

export interface DailyProgress {
  lastCompletedDate: string | null;
  streak: number;
  bestStreak: number;
  history: Record<string, { score: number; correct: number }>;
}

export interface RunAnswer {
  questionId: string;
  correct: boolean;
  timeLeft: number;
}

export interface RunResult {
  mode: GameMode;
  score: number;
  total: number;
  correct: number;
  accuracy: number;
  bestStreak: number;
  answers: RunAnswer[];
}
