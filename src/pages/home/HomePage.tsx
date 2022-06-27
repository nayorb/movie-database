import React from "react";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchInput from "../../components/search-input/SearchInput";
import useSearch from "../../hooks/search/useSearch";

const HomePage = () => {
  const { isLoading, search, query, setQuery } = useSearch();
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Grid container pt={12}>
      <Grid item xs={8} pl={4}>
        <Typography variant="h1" fontWeight={500} color={theme.palette.primary.main}>
          Search for movies:
        </Typography>
        <Box mt={4}>
          <SearchInput
            value={query}
            searchButtonDisabled={isLoading}
            onInputChange={setQuery}
            onSearchClick={() => {
              search();
              navigate("/search");
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default HomePage;
