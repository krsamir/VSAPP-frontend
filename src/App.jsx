import React from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import ErrorBoundary from "./Components/Error/Error-boundry";
import Routes from "./Routes";
const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
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
          <Routes />
        </QueryClientProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
