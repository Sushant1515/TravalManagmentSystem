import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";
import { store } from "./app/store";
import "./index.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f97316", // Warm orange
      light: "#fb923c",
      dark: "#ea580c",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ec4899", // Vibrant pink
      light: "#f472b6",
      dark: "#db2777",
      contrastText: "#ffffff",
    },
    success: {
      main: "#10b981", // Fresh emerald
      light: "#34d399",
      dark: "#059669",
    },
    warning: {
      main: "#f59e0b", // Warm amber
      light: "#fbbf24",
      dark: "#d97706",
    },
    error: {
      main: "#ef4444", // Bright red
      light: "#f87171",
      dark: "#dc2626",
    },
    info: {
      main: "#8b5cf6", // Purple violet
      light: "#a78bfa",
      dark: "#7c3aed",
    },
    background: {
      default: "#fef3c7", // Warm light background
      paper: "#ffffff",
    },
    text: {
      primary: "#1e293b", // Dark slate
      secondary: "#64748b", // Muted gray
    },
    mode: 'light',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #f97316 0%, #dc2626 50%, #ec4899 100%)',
          boxShadow: '0 4px 20px rgba(249, 115, 22, 0.3)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: 'linear-gradient(180deg, #1e293b 0%, #334155 100%)',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
