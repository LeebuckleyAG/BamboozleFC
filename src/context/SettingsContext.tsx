import { createContext, useContext, useEffect, type ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { Settings } from "../types";
import { setSoundEnabled } from "../utils/sound";

const DEFAULT_SETTINGS: Settings = {
  sound: true,
  crt: true,
  animations: true,
  highContrast: false,
  questionTime: 15,
};

interface SettingsContextValue {
  settings: Settings;
  update: (patch: Partial<Settings>) => void;
  resetLocalData: () => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useLocalStorage<Settings>("bamboozle:settings", DEFAULT_SETTINGS);

  useEffect(() => {
    setSoundEnabled(settings.sound);
  }, [settings.sound]);

  const update = (patch: Partial<Settings>) => setSettings((s) => ({ ...s, ...patch }));

  const resetLocalData = () => {
    try {
      Object.keys(window.localStorage)
        .filter((k) => k.startsWith("bamboozle:"))
        .forEach((k) => window.localStorage.removeItem(k));
    } catch {
      // ignore
    }
    window.location.reload();
  };

  return (
    <SettingsContext.Provider value={{ settings, update, resetLocalData }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
