import React from "react";
import { Box, Pagination, Typography } from "@mui/material";
import useSearchResults from "../../hooks/search-results/useSearchResults";
import MovieLink from "../../components/movie-link/MovieLink";
import SearchInput from "../../components/search-input/SearchInput";
import useSearch from "../../hooks/search/useSearch";

export interface MoviesPageProps {}

const SearchPage = ({}: MoviesPageProps) => {
  const { currentPage, searchMovies, totalResults, pageCount, setPage, isLoading, error } = useSearchResults();
  const { search, query, setQuery } = useSearch();
  return (
    <Box p={2} pt={12}>
      {totalResults === 0 ? (
        <>
          {error ? (
            <Typography color="error">{error?.sourceError.message || ""}, please try different search:</Typography>
          ) : null}
          <Box mt={2}>
            <SearchInput
              onInputChange={setQuery}
              value={query}
              onSearchClick={search}
              searchButtonDisabled={isLoading}
            />
          </Box>
        </>
      ) : (
        <>
          {searchMovies.map((movie) => (
            <Box mt={1} key={movie.id}>
              <MovieLink id={movie.id} />
            </Box>
          ))}
          <Box mt={1}>
            <Pagination
              count={pageCount}
              page={currentPage}
              variant="outlined"
              shape="rounded"
              onChange={(_, page) => setPage(page)}
              disabled={isLoading}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default SearchPage;
