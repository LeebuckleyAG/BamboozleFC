import { useEffect } from "react";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Timer from "../components/Timer";
import ScoreDisplay from "../components/ScoreDisplay";
import QuestionCard from "../components/QuestionCard";
import AnswerButton from "../components/AnswerButton";
import BamboozleMoment from "../components/BamboozleMoment";
import ResultScreen from "../components/ResultScreen";
import { useQuiz } from "../hooks/useQuiz";
import { useTimer } from "../hooks/useTimer";
import { useSettings } from "../context/SettingsContext";
import { sfx } from "../utils/sound";
import type { GameMode, Question, RunResult } from "../types";

interface QuizProps {
  questions: Question[];
  mode: GameMode;
  marathon?: boolean;
  onExit: () => void;
  onPlayAgain: () => void;
  onComplete: (result: RunResult) => void;
  onSaveScore: (name: string, result: RunResult) => void;
  alreadySaved: boolean;
}

const LETTERS = ["A", "B", "C", "D"];

export default function Quiz({ questions, mode, marathon, onExit, onPlayAgain, onComplete, onSaveScore, alreadySaved }: QuizProps) {
  const { settings } = useSettings();
  const quiz = useQuiz({ questions, mode, timePerQuestion: settings.questionTime, marathon });

  const { timeLeft, rawTimeLeft } = useTimer({
    duration: quiz.timePerQuestion,
    running: quiz.status === "playing",
    onExpire: quiz.timeExpired,
    resetKey: quiz.index,
  });

  useEffect(() => {
    if (quiz.status === "complete") {
      onComplete(quiz.result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quiz.status]);

  useEffect(() => {
    if (quiz.status === "revealing") {
      if (quiz.lastCorrect) sfx.correct();
      else sfx.wrong();
    }
  }, [quiz.status, quiz.lastCorrect]);

  // Keyboard support: 1-4 to answer, Enter/Space to advance
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (quiz.status === "playing") {
        const idx = ["1", "2", "3", "4"].indexOf(e.key);
        if (idx !== -1 && quiz.shuffledAnswers[idx]) {
          quiz.answer(quiz.shuffledAnswers[idx], rawTimeLeft);
        }
      } else if (quiz.status === "revealing" && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        sfx.navigate();
        quiz.next();
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quiz.status, quiz.shuffledAnswers, rawTimeLeft]);

  const handleExit = () => {
    if (quiz.status !== "complete") {
      const ok = window.confirm("Leave now and this game will be lost. Are you sure?");
      if (!ok) return;
    }
    onExit();
  };

  if (quiz.status === "complete") {
    return (
      <>
        <Header page="303" title="FULL TIME" breadcrumb={`PAGE 303 > ${mode.toUpperCase()} > RESULT`} />
        <ResultScreen
          result={quiz.result}
          onPlayAgain={onPlayAgain}
          onHome={onExit}
          onSaveScore={(name) => onSaveScore(name, quiz.result)}
          alreadySaved={alreadySaved}
        />
        <NavBar green={{ label: "PLAY AGAIN", onClick: onPlayAgain }} red={{ label: "HOME", onClick: onExit }} />
      </>
    );
  }

  const { current } = quiz;
  if (!current) return null;

  return (
    <>
      <Header
        page="303"
        title={`QUESTION ${String(quiz.index + 1).padStart(2, "0")} / ${marathon ? "∞" : quiz.total}`}
        breadcrumb={`PAGE 303 > ${mode.toUpperCase()} > Q${String(quiz.index + 1).padStart(2, "0")}${marathon ? "" : `/${quiz.total}`}`}
      />
      <div className="flex-1 min-h-0 overflow-y-auto px-3 py-3 sm:px-5 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <ScoreDisplay score={quiz.score} streak={quiz.streak} accuracy={quiz.correctCount + quiz.incorrectCount > 0 ? Math.round((quiz.correctCount / (quiz.correctCount + quiz.incorrectCount)) * 100) : 0} />
        </div>
        <div className="flex items-center justify-end">
          <Timer timeLeft={timeLeft} total={quiz.timePerQuestion} />
        </div>

        <QuestionCard question={current} />

        <div className="flex flex-col gap-2 mt-1">
          {quiz.shuffledAnswers.map((ans, i) => {
            let state: "idle" | "selected" | "correct" | "incorrect" | "reveal-correct" | "dimmed" = "idle";
            if (quiz.status === "revealing") {
              if (ans === current.correctAnswer) state = "reveal-correct";
              else if (ans === quiz.selected) state = "incorrect";
              else state = "dimmed";
            } else if (ans === quiz.selected) {
              state = "selected";
            }
            return (
              <AnswerButton
                key={ans}
                letter={LETTERS[i]}
                text={ans}
                state={state}
                disabled={quiz.status !== "playing"}
                onClick={() => {
                  sfx.select();
                  quiz.answer(ans, rawTimeLeft);
                }}
              />
            );
          })}
        </div>

        {quiz.status === "revealing" && quiz.lastCorrect !== null && (
          <BamboozleMoment correct={quiz.lastCorrect} question={current} pointsGained={quiz.lastPoints} />
        )}
      </div>
      <NavBar
        red={{ label: "QUIT", onClick: handleExit }}
        green={
          quiz.status === "revealing"
            ? { label: marathon && quiz.lastCorrect === false ? "SEE RESULT" : "NEXT QUESTION", onClick: () => { sfx.navigate(); quiz.next(); } }
            : undefined
        }
      />
    </>
  );
}
