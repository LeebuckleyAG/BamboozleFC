# BAMBOOZLE FC

A football trivia quiz, dressed up as a UK Teletext service circa 1994.

"Football trivia. No VAR required."

## Run it

```
npm install
npm run dev
```

Then open the local URL Vite gives you (usually http://localhost:5173).

## What's in here

- **150 football questions** across 15 categories (Premier League, Champions
  League, World Cup, Euros, International, History, Transfers, Managers,
  Stadiums, Records, Cult Heroes, Shirt Numbers, World Football, Obscure,
  Proper Niche) in `src/data/questions.ts`.
- **Four game modes**: Quick Fire (10 random), Daily Bamboozle (same 10
  questions for everyone each day, seeded deterministically by date, one
  attempt), Marathon (goes until you get one wrong), and Categories.
- **Scoring**: 100 base points + time bonus (remaining seconds × 10), with
  streak multipliers at 3/5/8/10 in a row.
- **Local persistence** via `localStorage`: settings, local leaderboard,
  and daily streak — nothing leaves the browser, no backend, no account.
- **Retro CRT treatment** (scanlines, flicker, chromatic aberration) that
  can be switched off in Settings, alongside sound, animations, high
  contrast and question-timer length.
- Keyboard play: press 1–4 to answer, Enter/Space to advance.

## Structure

```
src/
  components/   presentational pieces (AnswerButton, Timer, NavBar, ...)
  pages/        Home, Categories, DailyQuiz, Quiz, Leaderboard, Rules, Settings
  data/         questions.ts, categories.ts
  hooks/        useQuiz (game engine), useTimer, useLocalStorage
  utils/        scoring.ts, random.ts, dailyQuiz.ts, sound.ts, quizBuilder.ts
  context/      SettingsContext
```

Built with React, TypeScript, Vite and Tailwind CSS v4. No backend required.
