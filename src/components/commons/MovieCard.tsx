import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { RemoveCircle } from "@mui/icons-material";

import Movie from "@core/Movie";
import mediaQueries from "@styles/mediaQueries";
import routes from "@routes";

const StyledMovieCard = styled.div<{ $moviePoster: string }>`
  position: relative;
  &:hover {
    .movie-poster {
      opacity: 0.6;
      transition: 0.4s;
    }
    .delete-button {
      opacity: 0.6;
      transition: 0.4s;
    }
  }
  .movie-poster {
    background-image: url(${({ $moviePoster }) => $moviePoster});
    background-size: cover;
    background-position: center;
    width: 100%;
    padding-bottom: 140%;
    opacity: 1;
  }
  .delete-button {
    position: absolute;
    right: -10px;
    top: -10px;
    cursor: pointer;
    z-index: 2;
    opacity: 1;
    @media ${mediaQueries.mediumUp} {
      opacity: 0;
      &:hover {
        opacity: 1;
      }
    }
  }
  a {
    color: white;
  }
`;

interface Props {
  movie: Movie;
  showFavorite?: boolean;
  removeFavorite?(id: number): void;
}

export default function MovieCard({
  movie,
  showFavorite,
  removeFavorite,
}: Props) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isVisible) {
      setTimeout(() => {
        removeFavorite?.(movie.id);
      }, 400);
    }
  }, [isVisible, movie.id, removeFavorite]);

  return (
    <StyledMovieCard
      $moviePoster={movie.getMoviePoster(300)}
      className={isVisible ? "" : "animate__animated animate__zoomOut"}
    >
      {showFavorite && (
        <RemoveCircle
          className="delete-button"
          onClick={() => setIsVisible(false)}
        />
      )}
      <Link to={routes.MOVIE + movie.id}>
        <div className="movie-poster" />
        {movie.title}
      </Link>
    </StyledMovieCard>
  );
}
