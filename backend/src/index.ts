import express from "express";
import cors from "cors";
import booksRouter from "./routes/books";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use("/books", booksRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
