import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { HighlightOff } from "@mui/icons-material";

import Movie from "@core/Movie";

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
    cursor: pointer;
    z-index: 2;
    opacity: 0;
    position: absolute;
    right: 15px;
    top: 15px;

    &:hover {
      opacity: 1;
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
        <HighlightOff
          className="delete-button"
          onClick={() => setIsVisible(false)}
        />
      )}
      <Link to={`/movie/${movie.id}`}>
        <div className="movie-poster" />
        {movie.title}
      </Link>
    </StyledMovieCard>
  );
}
