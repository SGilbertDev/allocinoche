import React, { useRef, useState } from "react";
import { Grid } from "@mui/material";
import styled from "styled-components";
import moment from "moment";
import { Link } from "react-router-dom";
import { Favorite, FavoriteBorder, Event } from "@mui/icons-material";
import { useRecoilState } from "recoil";

import Movie from "@core/Movie";
import FavoriteToast from "@components/commons/FavoriteToast";
import useIntersectionObserver from "@hooks/useIntersectionObserver";
import favoritesAtom from "@recoil/favorites/atom";

const StyledMovieTile = styled.div`
  animation-duration: 0.8s;
  visibility: hidden;
  &.animate__animated {
    visibility: visible !important;
  }
  img {
    width: 130px;
  }
  a {
    color: white;
    display: inline-block;
  }
  h3 {
    margin: 0;
    font-size: 1.3rem;
  }
  svg {
    margin-left: 10px;
    cursor: pointer;
    display: inline-block;

    &.is-fav {
      color: #e75480;
    }
  }
  p.release-date {
    display: flex;
    align-items: center;
    margin: 0;
    vertical-align: middle;

    svg {
      margin-left: 0;
      cursor: initial;
      font-size: 1.1rem;
      margin-right: 6px;
    }
  }
  p.released-this-year {
    margin-top: 20px;
  }
`;

interface Props {
  movie: Movie;
}

export default function MovieTile({ movie }: Props) {
  const [favorites, setFavorites] = useRecoilState(favoritesAtom);
  const [isVisible, setIsVisible] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const movieTileRef = useRef<HTMLDivElement>(null);
  const isReleasedThisYear = moment().isSame(movie.release_date, "years");
  const isFavorite = movie.isFavorite(favorites);

  // Observe intersection and set visible state to make a smooth appearance
  useIntersectionObserver({
    target: movieTileRef,
    onIntersect: () => setIsVisible(true),
    enabled: !isVisible,
    rootMargin: "80px",
  });

  return (
    <StyledMovieTile
      ref={movieTileRef}
      className={isVisible ? "animate__animated animate__fadeInUp" : ""}
    >
      <FavoriteToast
        isFavorite={isFavorite}
        showToast={showToast}
        setShowToast={setShowToast}
      />
      <Grid container spacing={2}>
        <Grid item xs="auto">
          <Link to={`/movie/${movie.id}`}>
            <img src={movie.getMoviePoster(200)} alt="Movie poster" />
          </Link>
        </Grid>
        <Grid item xs zeroMinWidth>
          <Link to={`/movie/${movie.id}`}>
            <h3>{movie.title}</h3>
          </Link>
          {isFavorite ? (
            <Favorite
              className="is-fav"
              onClick={() => {
                setFavorites(
                  Movie.toggleFavorite(isFavorite, favorites, movie.id)
                );
                setShowToast(true);
              }}
            />
          ) : (
            <FavoriteBorder
              onClick={() => {
                setFavorites(
                  Movie.toggleFavorite(isFavorite, favorites, movie.id)
                );
                setShowToast(true);
              }}
            />
          )}
          <p className="release-date">
            <Event /> {movie.release_date.format("MMM D YYYY")}
          </p>
          {isReleasedThisYear && (
            <p className="released-this-year">
              {movie.getReleaseDateFromNow()}
            </p>
          )}
        </Grid>
      </Grid>
    </StyledMovieTile>
  );
}
