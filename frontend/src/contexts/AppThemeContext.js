"use client";

import * as React from "react";
import { ThemeProvider, extendTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// ✅ Define your full theme with color schemes
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: { main: "#15b650ff" },
        secondary: { main: "#001d21", light: "#01333a" },
        background: { default: "#ffffff", paper: "#f6f9f9" },
        text: {
          primary: "#001d21",
          secondary: "#68757c",
        },
      },
    },
    dark: {
      palette: {
        primary: { main: "#15b650ff" },
        secondary: { main: "#01333a" },
        background: { default: "#001d21", paper: "#012a2f" },
        text: {
          primary: "#ffffff",
          secondary: "#b0b8b9",
        },
      },
    },
  },
  typography: {
    fontFamily: "var(--font-outfit), sans-serif",
  },
});

export default function AppThemeProvider({ children }) {
  return (
    <ThemeProvider theme={theme} defaultMode="system">
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
