import { useCallback, useMemo, useRef, useState } from "react";
import type { GameStatus, Question, RunAnswer, RunResult, GameMode } from "../types";
import { shuffle } from "../utils/random";
import { calculateScore } from "../utils/scoring";

interface UseQuizArgs {
  questions: Question[];
  mode: GameMode;
  timePerQuestion: number;
  marathon?: boolean;
}

export function useQuiz({ questions, mode, timePerQuestion, marathon = false }: UseQuizArgs) {
  const [status, setStatus] = useState<GameStatus>("playing");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);
  const [lastPoints, setLastPoints] = useState(0);
  const answersRef = useRef<RunAnswer[]>([]);

  const current = questions[index];

  const shuffledAnswers = useMemo(() => {
    if (!current) return [];
    return shuffle(current.answers);
  }, [current]);

  const answer = useCallback(
    (choice: string, timeLeft: number) => {
      if (!current || status !== "playing") return;
      setSelected(choice);
      setStatus("answering");
      const isCorrect = choice === current.correctAnswer;

      answersRef.current.push({ questionId: current.id, correct: isCorrect, timeLeft });

      if (isCorrect) {
        const newStreak = streak + 1;
        const { score: gained } = calculateScore(timeLeft, newStreak);
        setScore((s) => s + gained);
        setLastPoints(gained);
        setStreak(newStreak);
        setBestStreak((b) => Math.max(b, newStreak));
        setCorrectCount((c) => c + 1);
      } else {
        setLastPoints(0);
        setStreak(0);
        setIncorrectCount((c) => c + 1);
      }
      setLastCorrect(isCorrect);
      setStatus("revealing");
    },
    [current, status, streak]
  );

  const timeExpired = useCallback(() => {
    if (!current || status !== "playing") return;
    answersRef.current.push({ questionId: current.id, correct: false, timeLeft: 0 });
    setSelected(null);
    setLastCorrect(false);
    setLastPoints(0);
    setStreak(0);
    setIncorrectCount((c) => c + 1);
    setStatus("revealing");
  }, [current, status]);

  const next = useCallback(() => {
    // Marathon mode ends immediately on a wrong answer
    if (marathon && lastCorrect === false) {
      setStatus("complete");
      return;
    }
    if (index + 1 >= questions.length) {
      setStatus("complete");
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setLastCorrect(null);
    setStatus("playing");
  }, [index, questions.length, marathon, lastCorrect]);

  const result: RunResult = useMemo(() => {
    const total = answersRef.current.length;
    const accuracy = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    return {
      mode,
      score,
      total,
      correct: correctCount,
      accuracy,
      bestStreak,
      answers: answersRef.current,
    };
  }, [mode, score, correctCount, bestStreak]);

  return {
    status,
    current,
    index,
    total: questions.length,
    shuffledAnswers,
    selected,
    score,
    streak,
    bestStreak,
    correctCount,
    incorrectCount,
    lastCorrect,
    lastPoints,
    timePerQuestion,
    answer,
    timeExpired,
    next,
    result,
  };
}
