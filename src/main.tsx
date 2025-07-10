import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ReactFlowProvider } from "@xyflow/react";
import { DnDProvider } from "./DnDContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactFlowProvider>
      <DnDProvider>
        <App />
      </DnDProvider>
    </ReactFlowProvider>
  </StrictMode>
);
