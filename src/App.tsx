import { useCallback, useMemo, useState } from "react";
import TeletextFrame from "./components/TeletextFrame";
import Loading from "./components/Loading";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import DailyQuiz from "./pages/DailyQuiz";
import Quiz from "./pages/Quiz";
import Leaderboard from "./pages/Leaderboard";
import Rules from "./pages/Rules";
import Settings from "./pages/Settings";
import { SettingsProvider } from "./context/SettingsContext";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { buildQuestionSet } from "./utils/quizBuilder";
import { todayKey } from "./utils/dailyQuiz";
import type { CategoryId, DailyProgress, GameMode, LeaderboardEntry, Question, RunResult } from "./types";

type Page = "home" | "categories" | "daily-intro" | "quiz" | "leaderboard" | "rules" | "settings";

const SEED_LEADERBOARD: LeaderboardEntry[] = [
  { name: "BIG DUNC", score: 8420, date: "2026-01-01", mode: "quickfire" },
  { name: "GAZZA", score: 7910, date: "2026-01-01", mode: "quickfire" },
  { name: "LEE", score: 7420, date: "2026-01-01", mode: "quickfire" },
  { name: "STATTO", score: 6980, date: "2026-01-01", mode: "quickfire" },
  { name: "SUPER JOHN", score: 6210, date: "2026-01-01", mode: "quickfire" },
];

const DEFAULT_DAILY: DailyProgress = {
  lastCompletedDate: null,
  streak: 0,
  bestStreak: 0,
  history: {},
};

interface ActiveRun {
  mode: GameMode;
  category?: CategoryId;
  marathon: boolean;
  questions: Question[];
}

export default function App() {
  return (
    <SettingsProvider>
      <TeletextFrame>
        <AppBody />
      </TeletextFrame>
    </SettingsProvider>
  );
}

function AppBody() {
  const [page, setPage] = useState<Page>("home");
  const [loading, setLoading] = useState(false);
  const [pendingPage, setPendingPage] = useState<Page | null>(null);
  const [activeRun, setActiveRun] = useState<ActiveRun | null>(null);
  const [runKey, setRunKey] = useState(0);
  const [savedThisRun, setSavedThisRun] = useState(false);

  const [leaderboard, setLeaderboard] = useLocalStorage<LeaderboardEntry[]>("bamboozle:leaderboard", SEED_LEADERBOARD);
  const [dailyProgress, setDailyProgress] = useLocalStorage<DailyProgress>("bamboozle:daily", DEFAULT_DAILY);

  const navigate = useCallback((next: Page, run?: ActiveRun) => {
    if (run) setActiveRun(run);
    setPendingPage(next);
    setLoading(true);
  }, []);

  const finishLoading = useCallback(() => {
    if (pendingPage) {
      setPage(pendingPage);
      setPendingPage(null);
    }
    setLoading(false);
  }, [pendingPage]);

  const startQuickFire = () => {
    setSavedThisRun(false);
    setRunKey((k) => k + 1);
    navigate("quiz", { mode: "quickfire", marathon: false, questions: buildQuestionSet("quickfire") });
  };

  const startMarathon = () => {
    setSavedThisRun(false);
    setRunKey((k) => k + 1);
    navigate("quiz", { mode: "marathon", marathon: true, questions: buildQuestionSet("marathon") });
  };

  const startCategory = (id: CategoryId) => {
    setSavedThisRun(false);
    setRunKey((k) => k + 1);
    navigate("quiz", { mode: "category", category: id, marathon: false, questions: buildQuestionSet("category", id) });
  };

  const startDaily = () => {
    setSavedThisRun(false);
    setRunKey((k) => k + 1);
    navigate("quiz", { mode: "daily", marathon: false, questions: buildQuestionSet("daily") });
  };

  const handlePlayAgain = () => {
    if (!activeRun) return startQuickFire();
    setSavedThisRun(false);
    setRunKey((k) => k + 1);
    if (activeRun.mode === "daily") {
      // Daily is one attempt only — replaying goes to quick fire instead.
      startQuickFire();
      return;
    }
    navigate("quiz", { ...activeRun, questions: buildQuestionSet(activeRun.mode, activeRun.category) });
  };

  const handleComplete = useCallback(
    (result: RunResult) => {
      if (result.mode === "daily") {
        const key = todayKey();
        setDailyProgress((prev) => {
          if (prev.lastCompletedDate === key) return prev;
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yKey = todayKey(yesterday);
          const newStreak = prev.lastCompletedDate === yKey ? prev.streak + 1 : 1;
          return {
            lastCompletedDate: key,
            streak: newStreak,
            bestStreak: Math.max(prev.bestStreak, newStreak),
            history: { ...prev.history, [key]: { score: result.score, correct: result.correct } },
          };
        });
      }
    },
    [setDailyProgress]
  );

  const handleSaveScore = (name: string, result: RunResult) => {
    setLeaderboard((prev) => [
      ...prev,
      { name: name.toUpperCase(), score: result.score, date: new Date().toISOString(), mode: result.mode },
    ]);
    setSavedThisRun(true);
  };

  const goHome = () => navigate("home");

  const dailyCompletedToday = useMemo(() => dailyProgress.lastCompletedDate === todayKey(), [dailyProgress]);

  if (loading) {
    return <Loading onDone={finishLoading} />;
  }

  switch (page) {
    case "home":
      return (
        <Home
          goPlay={startQuickFire}
          goDaily={() => navigate("daily-intro")}
          goMarathon={startMarathon}
          goCategories={() => navigate("categories")}
          goLeaderboard={() => navigate("leaderboard")}
          goRules={() => navigate("rules")}
          goSettings={() => navigate("settings")}
        />
      );
    case "categories":
      return <Categories onSelect={startCategory} onHome={goHome} />;
    case "daily-intro":
      return (
        <DailyQuiz
          progress={dailyProgress}
          onStart={dailyCompletedToday ? () => {} : startDaily}
          onHome={goHome}
        />
      );
    case "quiz":
      if (!activeRun) {
        goHome();
        return null;
      }
      return (
        <Quiz
          key={runKey}
          questions={activeRun.questions}
          mode={activeRun.mode}
          marathon={activeRun.marathon}
          onExit={goHome}
          onPlayAgain={handlePlayAgain}
          onComplete={handleComplete}
          onSaveScore={handleSaveScore}
          alreadySaved={savedThisRun}
        />
      );
    case "leaderboard":
      return (
        <Leaderboard
          entries={leaderboard}
          onClear={() => setLeaderboard([])}
          onHome={goHome}
        />
      );
    case "rules":
      return <Rules onHome={goHome} onPlay={startQuickFire} />;
    case "settings":
      return <Settings onHome={goHome} />;
    default:
      return null;
  }
}
