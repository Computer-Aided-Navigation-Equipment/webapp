// Importing React's StrictMode to help identify potential problems in the app during development
import { StrictMode } from "react";

// Importing createRoot from React DOM to initialize the React app with the new root API
import { createRoot } from "react-dom/client";

// Importing global CSS styles for the application
import "./index.css";

// Importing the main App component of the application
import App from "./App.tsx";

// Importing BrowserRouter and renaming it to Router for client-side routing
import { BrowserRouter as Router } from "react-router-dom";

// Importing Mantine's core stylesheet for base styling of Mantine components
import "@mantine/core/styles.css";

// Importing Toaster from react-hot-toast to enable toast notifications across the app
import { Toaster } from "react-hot-toast";

// Importing functions from Mantine for theme customization and wrapping components in the theme
import { createTheme, MantineProvider } from "@mantine/core";

// Creating a custom theme using Mantine's createTheme function
const theme = createTheme({
  // Overriding default styles for specific Mantine components
  components: {
    // Custom styles for Input components
    Input: {
      styles: (theme: any, { error }: { error: boolean }) => ({
        input: {
          // Set a custom border and color for the input
          border: "1px solid #4BB9B3E5",
          color: "grey",
          // If there's an error, use red border; otherwise, use teal color
          borderColor: error ? "red" : "#4BB9B3E5",
        },
      }),
    },
    // Custom styles for Select components
    Select: {
      styles: {
        // Styling the root element of the Select
        root: {
          border: 0, // Removing border from root
          width: "100%", // Full width by default
        },
        // Styling the dropdown panel
        dropdown: {
          border: "1px solid #4BB9B3E5",
          color: "grey",
          borderColor: "#4BB9B3E5",
        },
        // Styling the input field for the Select
        input: {
          border: "1px solid #4BB9B3E5",
          color: "grey",
          borderColor: "#4BB9B3E5",
        },
      },
    },
    // Custom styles for Textarea components
    Textarea: {
      styles: (theme: any, { error }: { error: boolean }) => ({
        input: {
          // Styling similar to Input: grey text, teal border unless error
          border: "1px solid #4BB9B3E5",
          color: "grey",
          borderColor: error ? "red" : "#4BB9B3E5",
        },
      }),
    },
    // Custom styles for TextInput components
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

// Rendering the React app inside the root DOM node
createRoot(document.getElementById("root")!).render(
  // Using StrictMode to help detect issues during development
  <StrictMode>
    {/* Providing the custom theme to all Mantine components */}
    <MantineProvider theme={theme}>
      {/* Toaster component to globally handle toast notifications */}
      <Toaster
        toastOptions={{
          style: {
            // Setting a consistent font for toasts
            fontFamily: "Outfit, sans-serif",
          },
        }}
      />
      {/* Setting up the Router to enable navigation in the app */}
      <Router>
        {/* Main App component that contains all routes and UI */}
        <App />
      </Router>
    </MantineProvider>
  </StrictMode>
);
