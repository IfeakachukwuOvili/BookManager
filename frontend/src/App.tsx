import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    // Check if user prefers dark mode
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-stone-900">
        <div className="max-w-xl mx-auto p-4">
          <BookForm />
          <BookList />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
