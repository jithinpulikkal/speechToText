import React, { createContext, useContext, useMemo, useState } from "react";

const ThemeContext = createContext(null);

const light = {
  bg: "bg-slate-50",
  card: "bg-white",
  text: "text-slate-950",
  muted: "text-slate-500",
  border: "border-slate-200",
  input: "bg-white border-slate-300",
  tabBg: "#ffffff",
  tabBorder: "#e2e8f0",
  tabInactive: "#64748b"
};

const dark = {
  bg: "bg-black",
  card: "bg-neutral-950",
  text: "text-white",
  muted: "text-slate-300",
  border: "border-neutral-800",
  input: "bg-black border-neutral-700",
  tabBg: "#000000",
  tabBorder: "#262626",
  tabInactive: "#94a3b8"
};

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const value = useMemo(() => ({ isDark, theme: isDark ? dark : light, toggleTheme: () => setIsDark(v => !v) }), [isDark]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
