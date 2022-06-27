import React from "react";
import { Box } from "@mui/material";
import useFavouriteMovies from "../../hooks/favourite-movies/useFavouriteMovies";
import MovieLink from "../../components/movie-link/MovieLink";

const FavouriteMoviesPage = () => {
  const { favouriteMovies } = useFavouriteMovies();

  return (
    <Box p={2} pt={12}>
      {favouriteMovies.map((movie) => (
        <Box mt={1} key={movie.id}>
          <MovieLink id={movie.id} />
        </Box>
      ))}
    </Box>
  );
};

export default FavouriteMoviesPage;
