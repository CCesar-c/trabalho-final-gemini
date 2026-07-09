import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import EstudanteProvider from "./contexts/EstudanteContext.jsx";
import "./style/global.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <EstudanteProvider>
        <App />
      </EstudanteProvider>
    </BrowserRouter>
  </StrictMode>
);
