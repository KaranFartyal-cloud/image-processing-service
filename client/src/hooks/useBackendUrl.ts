import { BackendUrlContext } from "@/context/backendUrlContext";
import { useContext } from "react";

export const useBackendUrl = () => {
  const ctx = useContext(BackendUrlContext);
  if (!ctx) {
    throw new Error("useBackendUrl must be used inside BackendUrlProvider");
  }
  return ctx;
};
