import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { QueryObserverBaseResult } from "react-query/types/core/types";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { Container, Button } from "@mui/material";

import useWindowDimensions from "@hooks/useWindowDimensions";

const StyledHeroHeader = styled.div`
  padding-top: 120px;
  z-index: 9;
  overflow: hidden;
  max-height: 100vh;
  h2 {
    display: block;
    font-size: 3rem;
    max-width: 50%;
    line-height: 50px;
  }
  p.overview {
    max-width: 600px;
  }
  &.transition {
    h2,
    p.overview,
    button {
      opacity: 0;
      transition: 0.4s;
    }
  }
  h2,
  p.overview,
  button {
    opacity: 1;
    transition: 0.4s;
  }
  .slider-container {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  .slick-slider {
    div {
      transition: none;
    }
    .slick-list {
      overflow: visible;
      .slick-track {
        min-height: 400px;
        display: flex;
        align-items: flex-end;
      }
      .movie-item {
        width: 140px;
        text-align: center;
        cursor: pointer;

        &__poster {
          width: 90%;
          padding-bottom: 145%;
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          margin: 0 auto;
          transition: 0.4s;
        }
        p {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
      .slick-slide:not(.slick-current) {
        .movie-item {
          display: flex;
          justify-content: center;

          &__poster {
            width: 80%;
            padding-bottom: 120%;
          }
        }
      }
    }
  }
`;

const StyledHeroBackground = styled.div<{ $backdrop_path?: string }>`
  z-index: -1;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-position: center;
  overflow: hidden;
  background-image: linear-gradient(
      90deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0.3463979341736695) 100%
    ),
    ${({ $backdrop_path }) =>
      $backdrop_path
        ? `url(https://image.tmdb.org/t/p/w1280${$backdrop_path})`
        : ""};
  display: flex;
  align-items: flex-end;
  opacity: 1;
  transition: 0.4s;
  background-size: cover;
  animation: shrink 15s infinite alternate;
  transform: scale(1);
  &.transition {
    opacity: 0;
    transition: 0.4s;
  }
  @keyframes shrink {
    0% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const OVERVIEW_CHARS_LIMIT = 200;

export default function HeroHeader({
  upcomingHeroQuery,
}: {
  upcomingHeroQuery: QueryObserverBaseResult<{
    data: { results: MovieInterface[] };
  }>;
}) {
  const [selectedMovie, setSelectedMovie] = useState<MovieInterface>();
  const [transition, setTransition] = useState(false);
  const { width } = useWindowDimensions();
  const slidesToShow = Math.floor(Math.min(width || 0, 1200) / 160);

  const { data: upcomingMoviesData, status } = upcomingHeroQuery;
  const results = upcomingMoviesData?.data.results;

  const sliderSettings = {
    focusOnSelect: true,
    infinite: true,
    slidesToScroll: 1,
    speed: 500,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow,
    beforeChange: (_current: number, next: number) => {
      // Set transition state to add a smooth animation class when switching movie then update
      // current movie
      setTransition(true);
      setTimeout(() => {
        setTransition(false);
        setSelectedMovie(results?.[next]);
      }, 400);
    },
  };

  // Add movie item on load when the query is successful by checking its status
  useEffect(() => {
    if (status === "success") {
      setSelectedMovie(results?.[0]);
    }
  }, [status]);

  return (
    <>
      <StyledHeroBackground
        $backdrop_path={selectedMovie?.backdrop_path}
        className={transition ? "transition" : ""}
      />
      <StyledHeroHeader className={transition ? "transition" : ""}>
        <Container maxWidth="lg">
          <h2>{selectedMovie?.title}</h2>
          <p className="overview">
            {selectedMovie?.overview?.length || 0 > OVERVIEW_CHARS_LIMIT
              ? `${selectedMovie?.overview.substring(
                  0,
                  OVERVIEW_CHARS_LIMIT
                )}...`
              : selectedMovie?.overview}
          </p>
          <Link to={`movie/${selectedMovie?.id}`}>
            <Button>See more</Button>
          </Link>
          <div className="slider-container">
            <Slider {...sliderSettings}>
              {results?.map((movie) => (
                <div key={movie.id} className="movie-item">
                  <div
                    className="movie-item__poster"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/w200${movie.poster_path})`,
                    }}
                  />
                  <p>{movie.title}</p>
                </div>
              ))}
            </Slider>
          </div>
        </Container>
      </StyledHeroHeader>
    </>
  );
}
