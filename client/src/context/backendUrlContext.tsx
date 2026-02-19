import { createContext } from "react";

interface BackendUrlcontextType {
  url: string;
}

export const BackendUrlContext = createContext<BackendUrlcontextType | null>(
  null,
);
