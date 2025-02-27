/* eslint @typescript-eslint/no-explicit-any: 0 */
import React, { useState } from "react";
import { SearchBar } from "./SearchBar";
import {
  Alert,
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Stack,
} from "@mui/material";
// import BookIcon from "@mui/icons-material/Book";

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
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "予期せぬエラーが発生しました"
      );
    }
  };

  return (
    <Stack spacing={4}>
      <Box className="w-full max-w-xl mx-auto">
        <SearchBar onSearch={handleSearch} />
      </Box>

      {error && (
        <Alert severity="error" className="w-full max-w-2xl mx-auto">
          {error}
        </Alert>
      )}

      <Box display="flex" flexWrap="wrap" gap={3}>
        {books.map((book) => (
          <Box key={book.id} width={{ xs: "100%", sm: "45%", md: "30%" }}>
            <Card
              className="h-full transition-transform hover:scale-105 hover:shadow-lg"
              sx={{
                bgcolor: "background.paper",
                "&:hover": {
                  borderColor: "primary.main",
                },
              }}
            >
              <CardContent>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  className="mb-3"
                >
                  {/* <BookIcon className="text-blue-600" /> */}
                  <Typography
                    variant="h6"
                    component="h3"
                    className="text-blue-800 font-medium"
                  >
                    {book.title}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {books.length === 0 && (
        <Typography className="text-center text-gray-500 mt-8" variant="body1">
          検索結果はありません
        </Typography>
      )}
    </Stack>
  );
};
