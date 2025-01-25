import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      {" "}
      <Router>
        <App />
      </Router>
    </MantineProvider>
  </StrictMode>
);
