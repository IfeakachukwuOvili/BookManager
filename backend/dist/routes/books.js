"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/routes/books.ts
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
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
            return;
        }
        // If book exists, delete it
        await prisma.book.delete({ where: { id } });
        res.json({ message: "Book deleted" });
        return;
    }
    catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({ message: "Error deleting book" });
        return;
    }
});
exports.default = router;
//# sourceMappingURL=books.js.map