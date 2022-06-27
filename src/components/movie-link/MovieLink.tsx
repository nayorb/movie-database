import React from "react";
import MovieLinkComponents from "./MovieLink.styles";
import { ButtonBase, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useMovieSnapshot from "../../hooks/movie-snapshot/useMovieSnapshot";
import StarIcon from "@mui/icons-material/Star";

export interface MovieLinkProps {
  id: string;
}

const MovieLink = ({ id }: MovieLinkProps) => {
  const navigate = useNavigate();
  const { movieSnapshot, toggle, isInFavourites } = useMovieSnapshot(id);

  if (!movieSnapshot) return null;

  return (
    <MovieLinkComponents.MovieLinkWrapper onClick={() => navigate(`/detail/${id}`)}>
      <Typography>{movieSnapshot.title}</Typography>
      <ButtonBase
        onClick={(e) => {
          e.stopPropagation();
          toggle();
        }}
      >
        <StarIcon color={isInFavourites ? "secondary" : "action"} />
      </ButtonBase>
    </MovieLinkComponents.MovieLinkWrapper>
  );
};

export default MovieLink;
