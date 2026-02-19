import { DarkModeContext } from "@/context/darkModeContext";
import { useContext } from "react";

export const useDarkMode = () => {
  const ctx = useContext(DarkModeContext);

  if (!ctx) throw new Error("useDarkMode must be used inside DarkModeProvider");

  return ctx;
};
