import { useEffect, useState } from "react";

const MESSAGES = [
  "LOADING FOOTBALL...",
  "CHECKING THE ARCHIVES...",
  "SEARCHING THE FOOTBALL MEMORY BANK...",
  "CONTACTING THE STATTO...",
  "NO, NOT THAT ONE...",
  "FOUND IT.",
];

export default function Loading({ onDone, duration = 600 }: { onDone: () => void; duration?: number }) {
  const [msg] = useState(() => MESSAGES[Math.floor(Math.random() * (MESSAGES.length - 1))]);

  useEffect(() => {
    const id = window.setTimeout(onDone, duration);
    return () => window.clearTimeout(id);
  }, [onDone, duration]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6">
      <span className="font-tele text-3xl text-[var(--tx-cyan)] crt-text blink">● REC</span>
      <p className="font-mono text-sm tracking-wide text-[var(--tx-white)]/80 text-center">{msg}</p>
    </div>
  );
}
