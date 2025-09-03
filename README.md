#  BookManager

A clean, elegant book management system with a dark academia aesthetic, inspired by *Harry Potter*. This application allows users to search for books via the OpenLibrary API, add them to their personal collection, and manage their literary archives.

---

## Features

- **🔎 Book Search** – Search OpenLibrary's extensive collection with real-time autocomplete suggestions  
- **📖 Book Management** – Add, view, and remove books from your personal collection  
- **📚 Rich Metadata** – Automatically capture book details including publication year and edition count  
- **🎓 Dark Academia Theme** – Elegant styling with an aesthetic inspired by classic literature and academia  
- **📱 Responsive Design** – Works beautifully on devices of all sizes  
- **🌓 Light/Dark Mode** – Toggle between dark and light academia themes  

---

## Technology Stack

### Frontend
- **React** – UI library for building component-based interfaces  
- **TypeScript** – Type-safe JavaScript for improved developer experience  
- **TanStack Query (React Query)** – Data fetching, caching, and state management  
- **Tailwind CSS** – Utility-first CSS framework for styling  
- **React Icons** – Icon components for enhanced UI  
- **Axios** – Promise-based HTTP client  

### Backend
- **Express.js** – Web application framework for Node.js  
- **Prisma** – Next-generation ORM for type-safe database access  
- **PostgreSQL** – Relational database for data persistence  
- **CORS** – Cross-Origin Resource Sharing middleware  

### APIs
- **OpenLibrary API** – External book data source with comprehensive literary information  

---

##  Installation

### Prerequisites

- Node.js (v14+)
- PostgreSQL
- npm or yarn

---

### Backend Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-username/bookManager.git
cd bookManager/backend

# 2. Install dependencies
npm install

# 3. Set up environment variables
# Create a .env file
DATABASE_URL="postgresql://username:password@localhost:5432/bookmanager"
PORT=3001

# 4. Initialize the database
npx prisma migrate dev --name init
npx prisma generate

# 5. Start the server
npm run dev
```

### Frontend Setup
```bash
# 1. Navigate to the frontend
cd ../frontend

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```
---

### Using the App

# Adding Books
- Type a book title in the search field
- Select from the autocomplete suggestions
- Review/edit the information if needed
- Click "Add to the Archives" to save

# Viewing Your Collection
- Scroll through your saved books
- View details like publication year and edition count

# Removing Books
Click the trash icon next to any book to remove it
---

### API endpoints
| Endpoint     | Method | Description         |
| ------------ | ------ | ------------------- |
| `/books`     | GET    | Retrieve all books  |
| `/books`     | POST   | Add a new book      |
| `/books/:id` | DELETE | Remove a book by ID |
---

### Database Schema
```bash
model Book {
  id                 Int      @id @default(autoincrement())
  title              String
  author             String
  first_publish_year Int?
  edition_count      Int?
  createdAt          DateTime @default(now())
}

```
---

### Development
```bash
# Open Prisma Studio
npx prisma studio

# Update Prisma client
npx prisma generate

# Create a new migration
npx prisma migrate dev --name your-migration-name
```
---


### Running Tests
```bash
# Frontend
cd frontend
npm test

# Backend
cd backend
npm test

```
---

### Styling
This project uses a dark academia theme inspired by Harry Potter and classic literature. Key style elements:

- Color Palette – Rich ambers, deep browns, parchment tones
- Typography – Serif fonts reminiscent of old books
- Shadows – Subtle glows to create a magical atmosphere
- Borders – Ornate, scholarly embellishments
---

### Contributing
1. Fork the repository
2. Create your feature branch:
```bash
git checkout -b feature/amazing-feature
```
3. Commit the changes
```bash
git commit -m "Add some amazing feature"
```
4. Push the branch
```bash
git push origin feature/amazing-feature
```
5. Open a pull request
---

### License
This project is licensed under the MIT License – see the LICENSE file for details.

### Acknowledgments
1. OpenLibrary API for book data
2. Harry Potter series for design inspiration
3. All contributors who helped shape this project

---
### Sneak Peek
![image](https://github.com/user-attachments/assets/f1a3dc1f-a0a3-4324-b163-3ecc682f0ab8)

![image](https://github.com/user-attachments/assets/c18a299b-ee17-4ce1-bb86-2c2723941cbe)

![image](https://github.com/user-attachments/assets/86ca131e-600c-4896-8eed-cb3da0300dbc)

![image](https://github.com/user-attachments/assets/9364967a-9cef-4df6-86e5-bb4ab143e3f3)

![image](https://github.com/user-attachments/assets/5ee47ed3-2d85-4d7d-b4e0-8620f2d2ebe3)
