import { useQuery } from "@tanstack/react-query"; // Import for data fetching/caching
import { useState, useEffect } from "react"; // React hooks for state management
import { api } from "../api"; // Custom API wrapper (likely using axios)

/**
 * Function that fetches book suggestions from the OpenLibrary API
 * @param query - The search term entered by the user
 * @returns - Array of book objects from the API response
 */
const fetchBooks = async (query: string) => {
  // Make a GET request to the OpenLibrary search endpoint with the query as a parameter
  const res = await api.get("/search.json", { params: { title: query } });
  // Return only the first 5 results to keep the dropdown manageable
  return res.data.docs.slice(0, 5); // top 5 suggestions
};

/**
 * AutocompleteSearch component that provides search-as-you-type book suggestions
 * @param onSelect - Callback function that receives selected book data
 */
export const AutocompleteSearch = ({ onSelect }: { onSelect: (title: string, author: string) => void }) => {
  // State to store what the user is currently typing
  const [query, setQuery] = useState("");
  
  // State for the debounced query - this is what actually triggers API calls
  // Debouncing prevents API calls on every keystroke
  const [debounced, setDebounced] = useState(query);

  /**
   * Effect hook that handles debouncing
   * Waits 500ms after user stops typing before updating the debounced value
   */
  useEffect(() => {
    // Set a timer to update the debounced query after 500ms
    const timer = setTimeout(() => setDebounced(query), 500);
    // Clean up by clearing the timer if user types again within 500ms
    return () => clearTimeout(timer);
  }, [query]); // Re-run effect whenever query changes

  /**
   * React Query hook to fetch and cache search results
   * - queryKey: Unique identifier for this query (includes the search term)
   * - queryFn: Function that fetches the data
   * - enabled: Only run the query if there's actually something to search for
   */
  const { data } = useQuery({
    queryKey: ["search", debounced],
    queryFn: () => fetchBooks(debounced),
    enabled: !!debounced, // Only run the query if debounced has a value
  });

  return (
    <div>
      {/* Input field for user to type search query */}
      <input
        className="border p-2 w-full"
        placeholder="Search Title"
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Update query state as user types
      />
      
      {/* Dropdown menu showing search results (only shown when there's data) */}
      {data && (
        <ul className="border mt-1 bg-white dark:bg-gray-800">
          {/* Map through each book result and display as a list item */}
          {data.map((book: any, idx: number) => (
            <li
              key={idx} // React needs a unique key for list items
              className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => onSelect(book.title, book.author_name?.[0] || "")} // Call parent component's callback when clicked
            >
              {/* Display book title and first author if available */}
              {book.title} — {book.author_name?.[0]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};