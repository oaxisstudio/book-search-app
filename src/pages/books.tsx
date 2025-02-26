// src/pages/books.tsx
import { BookSearch } from "@/features/books/BookSearch";

export default function BooksPage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>書籍検索</h1>
      <BookSearch />
    </div>
  );
}
