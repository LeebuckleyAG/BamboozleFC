import type { ReactNode } from "react";
import { useSettings } from "../context/SettingsContext";

export default function TeletextFrame({ children }: { children: ReactNode }) {
  const { settings } = useSettings();

  const rootClasses = [
    settings.crt ? "crt-on" : "",
    settings.animations ? "" : "reduce-motion",
    settings.highContrast ? "high-contrast" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`min-h-dvh w-full bg-black flex items-center justify-center md:p-6 ${rootClasses}`}>
      <div className="w-full h-dvh md:h-[min(88vh,900px)] md:max-w-[820px] md:rounded-[22px] crt-bezel bg-black flex flex-col overflow-hidden">
        <div className="crt-screen crt-flicker flex-1 min-h-0 flex flex-col bg-black">
          {children}
        </div>
      </div>
    </div>
  );
}
