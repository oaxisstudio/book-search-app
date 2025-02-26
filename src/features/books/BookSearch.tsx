/* eslint @typescript-eslint/no-explicit-any: 0 */
import React, { useState } from "react";
import { SearchBar } from "./SearchBar";

type Book = {
  id: number;
  title: string;
};

export const BookSearch: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setError(null);
      const response = await fetch(`/api/books?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error("検索に失敗しました");
      const data = await response.json();
      setBooks(data.books);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {error && <div style={{ color: "red" }}>{error}</div>}
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
};
