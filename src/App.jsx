import React from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import ErrorBoundary from "./Components/Error/Error-boundry";
import Routes from "./Routes";
const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

function App() {
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
