import { createContext } from "react";

interface DarkModeContextType {
  isDarkEnabled: boolean;
  setIsDarkEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DarkModeContext = createContext<DarkModeContextType | null>(null);
