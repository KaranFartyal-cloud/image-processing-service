import React from "react";
import { BackendUrlContext } from "../backendUrlContext";

export const BackendUrlProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const url = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

  return (
    <BackendUrlContext.Provider value={{ url }}>
      {children}
    </BackendUrlContext.Provider>
  );
};
