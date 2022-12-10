import React from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ErrorBoundary from "./Components/Error/Error-boundry";
import Routes from "./Routes";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

let theme = createTheme({
  typography: {},
  palette: {
    primary: {
      // main: "#43b049",#cef43f
      main: "#0e406a",
      contrastText: "#fff",
    },
    // secondary: {
    //   main: "#edf2ff",
    // },
  },
});

function App() {
  if (process.env.NODE_ENV !== "development") {
    window.console.log = () => {};
    window.console.info = () => {};
    window.console.error = () => {};
    window.console.warn = () => {};
  }
  return (
    <>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <Routes />
          </ThemeProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
