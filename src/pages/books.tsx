// src/pages/books.tsx
import { BookSearch } from "@/features/books/BookSearch";
import { Container, Paper, Typography, Box } from "@mui/material";

export default function BooksPage() {
  return (
    <Box className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Container maxWidth="lg" className="pt-12">
        <Paper elevation={3} className="p-8 shadow-xl">
          <Typography
            variant="h4"
            component="h1"
            className="mb-8 text-center font-bold text-blue-800"
          >
            書籍検索
          </Typography>

          <Box className="bg-white rounded-lg p-6">
            <BookSearch />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
