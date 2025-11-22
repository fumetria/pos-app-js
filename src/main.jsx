import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { PosProvider } from "./components/context/PosProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PosProvider>
      <App />
    </PosProvider>
  </StrictMode>
);
