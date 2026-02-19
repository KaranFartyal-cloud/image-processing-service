import { useState } from "react";
import { DarkModeContext } from "../darkModeContext";


export const DarkModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isDarkEnabled, setIsDarkEnabled] = useState(false);

  return (
    <DarkModeContext.Provider value={{ isDarkEnabled, setIsDarkEnabled }}>
      {children}
    </DarkModeContext.Provider>
  );
};
