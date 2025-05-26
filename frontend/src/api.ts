import axios from "axios";

// Axios instance for OpenLibrary API
export const api = axios.create({
  baseURL: "https://openlibrary.org",
});
