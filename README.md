A clean, elegant book management system with a dark academia aesthetic, inspired by Harry Potter. This application allows users to search for books via the OpenLibrary API, add them to their personal collection, and manage their literary archives.

Features
Book Search: Search OpenLibrary's extensive collection with real-time autocomplete suggestions
Book Management: Add, view, and remove books from your personal collection
Rich Metadata: Automatically capture book details including publication year and edition count
Dark Academia Theme: Elegant styling with an aesthetic inspired by classic literature and academia
Responsive Design: Works beautifully on devices of all sizes
Light/Dark Mode: Toggle between dark and light academia themes

Technology Stack
Frontend
React: UI library for building component-based interfaces
TypeScript: Type-safe JavaScript for improved developer experience
TanStack Query (React Query): Data fetching, caching, and state management
Tailwind CSS: Utility-first CSS framework for styling
React Icons: Icon components for enhanced UI
Axios: Promise-based HTTP client
Backend
Express.js: Web application framework for Node.js
Prisma: Next-generation ORM for type-safe database access
PostgreSQL: Relational database for data persistence
CORS: Cross-Origin Resource Sharing middleware

APIs
OpenLibrary API: External book data source with comprehensive literary information
Project Structure
bookManager/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # UI components
│   │   │   ├── BookForm.tsx  # Book addition form with search
│   │   │   ├── BookList.tsx  # Display of saved books
│   │   │   └── ...
│   │   ├── types/            # TypeScript type definitions
│   │   ├── App.tsx           # Main application component
│   │   └── ...
│   └── ...
├── backend/                  # Express server
│   ├── src/
│   │   ├── routes/           # API endpoints
│   │   │   └── books.ts      # Book-related routes
│   │   ├── index.ts          # Server entry point
│   │   └── ...
│   ├── prisma/
│   │   ├── schema.prisma     # Database schema
│   │   └── ...
│   └── ...
└── README.md                 # Project documentation

Installation
Prerequisites
Node.js (v14+)
PostgreSQL (or other database supported by Prisma)
npm or yarn
Setting up the Backend
1. Clone the repository
git clone https://github.com/your-username/bookManager.git
cd bookManager/backend
2. Install dependencies
npm install
3. Set up environment variables
# Create a .env file in the backend directory
DATABASE_URL="postgresql://username:password@localhost:5432/bookmanager"
PORT=3001
4. Initialize the database
npx prisma migrate dev --name init
npx prisma generate
5. Start the server
npm run dev

Setting up the Frontend
1. Navigate to the frontend directory
cd ../frontend
2. Install dependencies
npm install
3. Start the development server
npm run dev
4. Open your browser and go to 
http://localhost:3000


Using the App
Adding Books:

Type a book title in the search field
Select from the autocomplete suggestions
Review and edit information if needed
Click "Add to the Archives" to save
Viewing Your Collection:

Scroll through your book collection
See details like publication year and edition count
Removing Books:

Click the trash icon next to any book to remove it


API Endpoints
Endpoint	Method	Description
/books	GET	Retrieve all books in collection
/books	POST	Add a new book
/books/:id	DELETE	Remove a book by ID

Database Schema
model Book {
  id               Int      @id @default(autoincrement())
  title            String
  author           String
  first_publish_year Int?
  edition_count    Int?
  createdAt        DateTime @default(now())
}


Development 
Useful Prisma commands
# Open Prisma Studio to view/edit data
npx prisma studio

# Update client after schema changes
npx prisma generate

# Create new migration
npx prisma migrate dev --name description

Running Tests
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
npm test


Styling
The project uses a dark academia theme inspired by classic literature and Harry Potter. Key styling elements include:

Color Palette: Rich ambers, deep browns, and parchment tones
Typography: Serif fonts reminiscent of old books
Shadows: Subtle glows to create a magical atmosphere
Borders: Ornate borders for a classic, scholarly feel
Contributing
Fork the repository
Create your feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add some amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
OpenLibrary API for providing book data
The Harry Potter series for design inspiration
All contributors who have helped shape this project
Happy reading and organizing your literary collection!