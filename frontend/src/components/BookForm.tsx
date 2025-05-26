import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const backendApi = axios.create({
  baseURL: "http://localhost:3001", // Your backend URL
});

const openLibraryApi = axios.create({
  baseURL: "https://openlibrary.org",
});


export default function BookForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [firstPublishYear, setFirstPublishYear] = useState<number | undefined>(undefined);
  const [editionCount, setEditionCount] = useState<number | undefined>(undefined);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [suggestions, setSuggestions] = useState<
    {
      title: string;
      author_name?: string[];
      first_publish_year?: number;
      edition_count?: number;
    }[]
  >([]);

  const queryClient = useQueryClient();

  // Debounce the search input to limit API calls
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch suggestions when debouncedQuery changes
  useEffect(() => {
    if (!debouncedQuery) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await openLibraryApi.get("/search.json", {
          params: { title: debouncedQuery, limit: 5 },
        });
        setSuggestions(res.data.docs.slice(0, 5));
      } catch (error) {
        console.error("Error fetching OpenLibrary data:", error);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  // Mutation to add book to backend
  const addBookMutation = useMutation({
    mutationFn: (newBook: {
      title: string;
      author: string;
      first_publish_year?: number;
      edition_count?: number;
    }) => backendApi.post("/books", newBook),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      setTitle("");
      setAuthor("");
      setFirstPublishYear(undefined);
      setEditionCount(undefined);
      setSearchQuery("");
      setSuggestions([]);
    },
  });

  // When user clicks suggestion, autofill form fields
  const handleSelectSuggestion = (book: typeof suggestions[0]) => {
    setTitle(book.title);
    setAuthor(book.author_name?.[0] || "");
    setFirstPublishYear(book.first_publish_year);
    setEditionCount(book.edition_count);
    setSuggestions([]);
    setSearchQuery(""); // This clears the search box
    
    // Add a title input or update the search box with the title
    document.getElementById("search-title")!.setAttribute("placeholder", book.title);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) {
      alert("Please enter both title and author.");
      return;
    }

    addBookMutation.mutate({
      title: title.trim(),
      author: author.trim(),
      first_publish_year: firstPublishYear,
      edition_count: editionCount,
    });
  };

  return (
    <div className="my-12">
      <div className="
        max-w-2xl mx-auto p-8 rounded-lg border-4
        border-amber-900 bg-stone-900 text-amber-100
        shadow-[0_0_15px_rgba(193,154,107,0.4)] font-serif
      ">
        <h2 className="text-3xl font-bold text-center mb-8 text-amber-500 border-b-2 border-amber-700 pb-3">
          Add to the Collection
        </h2>
        
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="relative">
            <label htmlFor="search-title" className="block text-amber-400 mb-2 text-lg">
              Search for Literary Works
            </label>
            <input
              id="search-title"
              type="text"
              placeholder="Enter a book title to search..."
              className="
                w-full p-3 rounded-lg border-2 border-amber-700 
                bg-stone-800 text-amber-100
                focus:outline-none focus:border-amber-500 focus:shadow-[0_0_8px_rgba(193,154,107,0.4)]
                transition placeholder-amber-700/60
              "
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoComplete="off"
            />
            {suggestions.length > 0 && (
              <ul className="
                absolute z-30 left-0 right-0 
                bg-stone-800 border-2 border-amber-700 
                rounded-lg mt-1 shadow-lg max-h-56 overflow-auto
              ">
                {suggestions.map((book, idx) => (
                  <li
                    key={idx}
                    className="p-3 cursor-pointer hover:bg-amber-800 transition border-b border-amber-900 last:border-b-0"
                    onClick={() => handleSelectSuggestion(book)}
                  >
                    <span className="font-semibold text-amber-400">{book.title}</span>
                    {book.author_name?.[0] && <span className="text-amber-300"> — {book.author_name[0]}</span>}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <label htmlFor="author" className="block text-amber-400 mb-2 text-lg">
              Author
            </label>
            <input
              id="author"
              type="text"
              placeholder="The brilliant mind behind this work..."
              className="
                w-full p-3 rounded-lg border-2 border-amber-700 
                bg-stone-800 text-amber-100
                focus:outline-none focus:border-amber-500 focus:shadow-[0_0_8px_rgba(193,154,107,0.4)]
                transition placeholder-amber-700/60
              "
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>

          {(firstPublishYear || editionCount) && (
            <div className="p-4 border border-amber-800 rounded-lg bg-stone-800/50 space-y-1 text-amber-300">
              <h3 className="text-amber-400 font-semibold mb-2">Book Details:</h3>
              {firstPublishYear && <p>First Publication: {firstPublishYear}</p>}
              {editionCount && <p>Known Editions: {editionCount}</p>}
            </div>
          )}

          <button
            type="submit"
            disabled={addBookMutation.status === "pending"}
            className="
              w-full py-3 rounded-lg bg-amber-800 text-amber-100 font-bold text-lg
              hover:bg-amber-700 transition
              disabled:opacity-60 disabled:cursor-not-allowed
              shadow-md border-2 border-amber-700 mt-6
            "
          >
            {addBookMutation.status === "pending" ? "Inscribing..." : "Add to the Archives"}
          </button>

          {addBookMutation.status === "error" && (
            <p className="text-red-500 mt-2 font-semibold text-center">The quill has failed us. Please try again.</p>
          )}
        </form>
      </div>
    </div>
  );
}