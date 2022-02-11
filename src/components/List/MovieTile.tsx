import React, { useRef, useState } from "react";
import { Card } from "@mui/material";
import styled from "styled-components";
import moment from "moment";
import { Link } from "react-router-dom";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useRecoilState } from "recoil";

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
`;

interface Props {
  id: number;
  title: string;
  poster: string;
  releaseDate: moment.Moment;
}

export default function MovieTile({ id, title, poster, releaseDate }: Props) {
  const [favorites, setFavorites] = useRecoilState(favoritesAtom);
  const [isVisible, setIsVisible] = useState(false);
  const movieTileRef = useRef<HTMLDivElement>(null);
  const isReleased = Math.sign(moment().diff(releaseDate)) === 1;
  const releaseDateFromNow = releaseDate.fromNow();
  const isReleasedThisYear = moment().isSame(releaseDate, "years");

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
      <Card variant="outlined">
        {favorites.includes(id) ? (
          <Favorite
            onClick={() => setFavorites(favorites.filter((val: number) => val !== id))}
          />
        ) : (
          <FavoriteBorder onClick={() => setFavorites([...favorites, id])} />
        )}
        <img
          src={`https://image.tmdb.org/t/p/w200${poster}`}
          alt="Movie poster"
        />
        {title}
        <Link to={`/movie/${id}`}>Fiche</Link>
        <p>Release date : {releaseDate.format("MMM D YYYY")}</p>
        {isReleasedThisYear && (
          <>
            {isReleased ? "Released " : "To be released "}
            {releaseDateFromNow}
          </>
        )}
      </Card>
    </StyledMovieTile>
  );
}
