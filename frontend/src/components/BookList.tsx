// src/components/BookList.tsx
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa"; // Import trash icon from Font Awesome icons

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3001",
});

type Book = {
  id: number;
  title: string;
  author: string;
  first_publish_year?: number;
  edition_count?: number;
};

export default function BookList() {
  const queryClient = useQueryClient();

  // Fetch all books
  const { data, status } = useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await api.get("/books");
      return res.data;
    },
  });

  // Delete book mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/books/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] }); 
    },
  });

  if (status === "pending") return <p className="text-amber-600 text-center font-serif text-xl my-8">Loading the archives...</p>;
  if (status === "error") return <p className="text-red-700 text-center font-serif text-xl my-8">The forbidden texts cannot be accessed.</p>;

  return (
    <div className="my-12">
      <div className="
        max-w-2xl mx-auto p-8 rounded-lg border-4
        border-amber-900 bg-stone-900 text-amber-100
        shadow-[0_0_15px_rgba(193,154,107,0.4)] font-serif space-y-6
      ">
        <h2 className="text-3xl font-bold text-center mb-8 text-amber-500 border-b-2 border-amber-700 pb-3">
          The Archives of Literary Wisdom
        </h2>
        
        {data?.length === 0 ? (
          <p className="text-amber-500 text-center italic my-8">The shelves await their first treasures...</p>
        ) : (
          <ul className="space-y-6">
            {data?.map((book) => (
              <li
                key={book.id}
                className="
                  flex justify-between items-center border-2 border-amber-800 rounded-lg
                  bg-stone-800 text-amber-100 p-5 shadow-md
                  transition hover:shadow-[0_0_8px_rgba(193,154,107,0.3)]
                "
              >
                <div>
                  <p className="font-semibold text-xl text-amber-400">{book.title}</p>
                  <p className="text-sm text-amber-300 mt-1">
                    {book.author}
                    {book.first_publish_year ? ` • First published: ${book.first_publish_year}` : ""}
                    {book.edition_count ? ` • Editions: ${book.edition_count}` : ""}
                  </p>
                </div>
                <button
                  onClick={() => deleteMutation.mutate(book.id)}
                  disabled={deleteMutation.status === "pending"}
                  className="
                    bg-amber-900 text-amber-100 px-4 py-2 rounded-lg font-bold
                    hover:bg-amber-800 transition-colors
                    disabled:opacity-60 disabled:cursor-not-allowed shadow-md
                    border border-amber-700
                  "
                >
                  {deleteMutation.status === "pending" ? "Vanishing..." : <FaTrash/>}
                </button>
              </li>
            ))}
          </ul>
        )}
        {deleteMutation.status === "error" && (
          <p className="text-red-600 mt-4 font-semibold text-center">The magic failed! Book remains in the archives.</p>
        )}
      </div>
    </div>
  );
}