// backend/src/routes/books.ts
import express from "express";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const books = await prisma.book.findMany();
  res.json(books);
});

router.post("/", async (req, res) => {
  const { title, author, first_publish_year, edition_count } = req.body;
  const book = await prisma.book.create({
    data: { title, author, first_publish_year, edition_count },
  });
  res.json(book);
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  
  try {
    // Check if the book exists first
    const book = await prisma.book.findUnique({
      where: { id }
    });
    
    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return
    }
    
    // If book exists, delete it
    await prisma.book.delete({ where: { id } });
     res.json({ message: "Book deleted" });
     return
  } catch (error) {
    console.error("Error deleting book:", error);
     res.status(500).json({ message: "Error deleting book" });
     return
  }
});

export default router;
