import { QUESTIONS } from "../data/questions";
import type { Question } from "../types";
import { hashStringToSeed, mulberry32, shuffle } from "./random";

export function todayKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function getDailyQuestions(dateKey: string, count = 10): Question[] {
  const seed = hashStringToSeed(`bamboozle-daily-${dateKey}`);
  const rng = mulberry32(seed);
  const shuffled = shuffle(QUESTIONS, rng);
  return shuffled.slice(0, count);
}

export function formatDisplayDate(date: Date = new Date()): string {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const months = [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
  ];
  return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

export function msUntilNextDay(date: Date = new Date()): number {
  const next = new Date(date);
  next.setHours(24, 0, 0, 0);
  return next.getTime() - date.getTime();
}

export function formatCountdown(ms: number): string {
  if (ms < 0) ms = 0;
  const totalSeconds = Math.floor(ms / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
