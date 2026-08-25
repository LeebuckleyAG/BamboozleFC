import { useEffect, useRef, useState } from "react";

interface UseTimerOptions {
  duration: number;
  running: boolean;
  onExpire?: () => void;
  resetKey?: string | number;
}

export function useTimer({ duration, running, onExpire, resetKey }: UseTimerOptions) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  useEffect(() => {
    setTimeLeft(duration);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey, duration]);

  useEffect(() => {
    if (!running) return;
    if (timeLeft <= 0) {
      onExpireRef.current?.();
      return;
    }
    const id = window.setTimeout(() => {
      setTimeLeft((t) => Math.max(0, +(t - 0.1).toFixed(1)));
    }, 100);
    return () => window.clearTimeout(id);
  }, [running, timeLeft]);

  return { timeLeft: Math.ceil(timeLeft), rawTimeLeft: timeLeft };
}
