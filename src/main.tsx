import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import "@mantine/core/styles.css";
import { Toaster } from "react-hot-toast";

import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
  components: {
    Input: {
      styles: (theme: any, { error }: { error: boolean }) => ({
        input: {
          border: "1px solid #4BB9B3E5",
          color: "grey",
          borderColor: error ? "red" : "#4BB9B3E5",
        },
      }),
    },
    Select: {
      styles: {
        root: {
          border: 0,
          width: "100%",
        },
        dropdown: {
          border: "1px solid #4BB9B3E5",
          color: "grey",
          borderColor: "#4BB9B3E5",
        },
        input: {
          border: "1px solid #4BB9B3E5",
          color: "grey",
          borderColor: "#4BB9B3E5",
        },
      },
    },
    Textarea: {
      styles: (theme: any, { error }: { error: boolean }) => ({
        input: {
          border: "1px solid #4BB9B3E5",
          color: "grey",
          borderColor: error ? "red" : "#4BB9B3E5",
        },
      }),
    },
    TextInput: {
      styles: (theme: any, { error }: { error: boolean }) => ({
        input: {
          border: "1px solid #4BB9B3E5",
          color: "grey",
          borderColor: error ? "red" : "#4BB9B3E5",
        },
      }),
    },
  },
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      {" "}
      <Toaster
        toastOptions={{
          style: {
            fontFamily: "Outfit, sans-serif",
          },
        }}
      />
      <Router>
        <App />
      </Router>
    </MantineProvider>
  </StrictMode>
);
