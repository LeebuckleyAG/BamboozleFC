export const BASE_SCORE = 100;

export function streakMultiplier(streak: number): number {
  if (streak >= 10) return 2;
  if (streak >= 8) return 1.5;
  if (streak >= 5) return 1.25;
  if (streak >= 3) return 1.1;
  return 1;
}

export function calculateScore(timeLeft: number, streak: number): { score: number; timeBonus: number; multiplier: number } {
  const timeBonus = Math.max(0, Math.round(timeLeft * 10));
  const multiplier = streakMultiplier(streak);
  const score = Math.round((BASE_SCORE + timeBonus) * multiplier);
  return { score, timeBonus, multiplier };
}

export const WRONG_PHRASES = [
  "BAMBOOZLED!",
  "OH NO.",
  "ABSOLUTE HOWLER.",
  "THAT'S A SHOCKER.",
  "VAR CHECK...",
  "YOU'VE BEEN DONE.",
  "CLOSE. VERY CLOSE.",
  "FOOTBALL IS A FUNNY OLD GAME.",
  "HAVE A WORD WITH YOURSELF.",
  "NOT YOUR FINEST HOUR.",
];

export const CORRECT_PHRASES = [
  "TOO EASY.",
  "CORRECT.",
  "YOU KNOW BALL.",
  "TEXTBOOK.",
  "HAVE SOME OF THAT.",
  "BEAUTIFUL.",
  "RIGHT ANSWER.",
  "TOP BIN.",
];

const WRONG_QUIPS = [
  "You knew it. You just froze under the lights.",
  "That one'll sting on the way home.",
  "Textbook case of overthinking it.",
  "The archives disagree with you there.",
  "Statto's shaking his head at that one.",
  "You'll get the next one. Probably.",
  "That's a classic pub quiz fumble.",
  "Even the ref felt bad about that.",
];

const CORRECT_QUIPS = [
  "Programme notes memorised, clearly.",
  "Someone's been paying attention.",
  "That's proper football knowledge, that.",
  "Statto's taking notes off you now.",
  "No hesitation. Textbook.",
  "You'd win the pub quiz on that alone.",
];

export function randomPhrase(list: string[]): string {
  return list[Math.floor(Math.random() * list.length)];
}

export function randomQuip(correct: boolean): string {
  return correct ? randomPhrase(CORRECT_QUIPS) : randomPhrase(WRONG_QUIPS);
}

export function ratingForAccuracy(accuracy: number): string {
  if (accuracy >= 100) return "ABSOLUTE FOOTBALL WEAPON";
  if (accuracy >= 90) return "STATTO";
  if (accuracy >= 76) return "FOOTBALL NERD";
  if (accuracy >= 61) return "DECENT BALL KNOWLEDGE";
  if (accuracy >= 41) return "KNOWS A BIT";
  if (accuracy >= 21) return "CASUAL";
  return "YOU'VE BEEN BAMBOOZLED";
}
