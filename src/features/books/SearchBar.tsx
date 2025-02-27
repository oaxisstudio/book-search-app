import React, { useState } from "react";
import { TextField, Button, Box, InputAdornment } from "@mui/material";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          width: "100%",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="書籍を検索..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          size="medium"
          className="bg-white rounded-lg"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  {/* <SearchIcon className="text-blue-400" /> */}
                </InputAdornment>
              ),
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "primary.main",
              },
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          className="px-8 bg-blue-600 hover:bg-blue-700 transition-colors"
          disableElevation
        >
          検索
        </Button>
      </Box>
    </form>
  );
};
