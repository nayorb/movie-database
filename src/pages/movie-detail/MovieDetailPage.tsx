import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import useMovieDetail from "../../hooks/movie-detail/useMovieDetail";
import { moviesSliceActions } from "../../redux-store/store-modules/movies/movies-slice";
import MovieDetailPageComponents from "./MovieDetailPage.styles";

export interface MovieDetailPageProps {}

const MovieDetailPage = ({}: MovieDetailPageProps) => {
  const { id } = useParams();
  const { movieDetail } = useMovieDetail();

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(moviesSliceActions.removeMovieDetail());
      dispatch(moviesSliceActions.setSelectedMovieId(undefined));
    };
  }, []);

  useEffect(() => {
    dispatch(moviesSliceActions.setSelectedMovieId(id));
  }, [id]);

  if (!movieDetail) return null;
  console.log("movieDetail", movieDetail);

  return (
    <MovieDetailPageComponents.PageWrapper backgroundUrl={movieDetail.posterUrl} pt={12}>
      <Grid container pl={4} pt={8}>
        <Grid item md={12}>
          <Typography variant="h2" fontWeight="bold">
            {movieDetail.title}
          </Typography>
          <Box maxWidth="70%">
            <Typography variant="subtitle2">{movieDetail.plot}</Typography>
          </Box>
        </Grid>
        <Grid item md={12} mt={4}>
          <Grid container md={12}>
            <Grid item md={4}>
              <Typography variant="h4" fontWeight="bold">
                {movieDetail.year}
              </Typography>
            </Grid>
            <Grid item md={4}>
              {movieDetail.boxOffice !== "N/A" && (
                <Typography variant="h4" fontWeight="bold">
                  {movieDetail.boxOffice}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid container md={12}>
            <Grid item md={4}>
              <Typography variant="subtitle1" fontWeight="bold" mt={1}>
                Genre:{" "}
                {movieDetail.genre.map((g) => (
                  <Typography variant="subtitle2">{g}</Typography>
                ))}
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold" mt={1}>
                Runtime: <Typography variant="subtitle2">{movieDetail.runtime}</Typography>
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold" mt={1}>
                Director: <Typography variant="subtitle2">{movieDetail.director}</Typography>
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold" mt={1}>
                Starring:{" "}
                {movieDetail.actors.map((a) => (
                  <Typography variant="subtitle2">{a}</Typography>
                ))}
              </Typography>
            </Grid>
            <Grid item md={4}>
              <Typography variant="subtitle1" fontWeight="bold" mt={1}>
                IMDB rating: <Typography variant="subtitle2">{movieDetail.imdbRating}</Typography>
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold" mt={1}>
                Metascore: <Typography variant="subtitle2">{movieDetail.metascore}%</Typography>
              </Typography>
            </Grid>
            <Grid item md={4}>
              <Typography variant="subtitle1" fontWeight="bold" mt={1}>
                Languages:{" "}
                {movieDetail.languages.map((l) => (
                  <Typography variant="subtitle2">{l}</Typography>
                ))}
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold" mt={1}>
                Countries:{" "}
                {movieDetail.countries.map((c) => (
                  <Typography variant="subtitle2">{c}</Typography>
                ))}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MovieDetailPageComponents.PageWrapper>
  );
};

export default MovieDetailPage;
