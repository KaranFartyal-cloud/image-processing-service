import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { DarkModeProvider } from "./context/Providers/themeProvider.tsx";
import { BackendUrlProvider } from "./context/Providers/backendUrlProvider.tsx";
import { Toaster } from "@/components/ui/sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <BackendUrlProvider>
        <DarkModeProvider>
          <App />
          <Toaster />
        </DarkModeProvider>
      </BackendUrlProvider>
    </BrowserRouter>
  </StrictMode>,
);
