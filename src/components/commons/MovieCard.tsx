import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Movie from "@core/Movie";

const StyledMovieCard = styled.div`
  img {
    display: block;
    max-width: 100%;
    width: 100%;
  }
  a {
    color: white;
  }
`;

interface Props {
  movie: Movie;
}

export default function MovieCard({ movie }: Props) {
  return (
    <StyledMovieCard>
      <Link to={`/movie/${movie.id}`}>
        <img src={movie.getMoviePoster(200)} alt="Movie poster" />
        {movie.title}
      </Link>
    </StyledMovieCard>
  );
}
