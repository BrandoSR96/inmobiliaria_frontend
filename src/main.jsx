import React from "react";
// import { Provider } from "@/components/ui/provider"
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import { IdiomaProvider } from '../src/hooks/IdiomaContext'
import { IdiomaProvider } from "./components/IdiomaContext";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <IdiomaProvider>
        <App />
      </IdiomaProvider>
    </BrowserRouter>
  </React.StrictMode>
);
