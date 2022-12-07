import React from "react";
import "./App.css";
import Login from "./Components/Authentication/Login";
import { QueryClient, QueryClientProvider } from "react-query";
import ErrorBoundary from "./Components/Error/Error-boundry";
const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

function App() {
  return (
    <div className="app">
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <Login />
        </QueryClientProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
