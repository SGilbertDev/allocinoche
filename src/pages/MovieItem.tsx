import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import styled from "styled-components";
import { Container, Grid } from "@mui/material";
import { Event } from "@mui/icons-material";
import { useRecoilState } from "recoil";

import MovieApiContext from "@context/MovieApiContext";
import Details from "@components/MovieItem/Details";
import FavoriteToast from "@components/commons/FavoriteToast";
import Related from "@components/MovieItem/Related";
import favoritesAtom from "@recoil/favorites/atom";
import Movie from "@core/Movie";
import Layout from "@components/Layout";

const StyledMovieItem = styled.div<{ $movieBackdrop: string }>`
  .backdrop-poster {
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 60vh;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: linear-gradient(
        0deg,
        #121212 0%,
        rgba(0, 0, 0, 0.3463979341736695) 100%
      ),
      url(${({ $movieBackdrop }) => $movieBackdrop});
  }
  .top-movie-container {
    padding-top: 15vh;

    &__information {
      max-width: 250px;
      img {
        display: block;
        max-width: 250px;
        margin-bottom: 20px;
      }
      ul {
        padding: 0;
        margin: 8px 0 0;
        li {
          list-style: none;
          display: flex;
          align-items: center;
          font-size: 0.9rem;
          margin-bottom: 14px;

          svg {
            font-size: 1.1rem;
            margin-right: 6px;
          }
        }
      }
    }
  }
`;

export default function MovieItem() {
  const movieApiInstance = useContext(MovieApiContext);
  const [favorites, setFavorites] = useRecoilState(favoritesAtom);
  const [showToast, setShowToast] = useState(false);
  const { id } = useParams();

  const { data: movieDetailsData, isLoading } = useQuery(
    ["movie-details", id],
    () => movieApiInstance.fetchMovieById(+id!)
  );

  const {
    data: movieRecommendationsData,
    isLoading: isLoadingMovieRecommendations,
  } = useQuery(["movie-recommendations", id], () =>
    movieApiInstance.fetchRecommendations(+id!)
  );

  const { data: movieData } = { ...movieDetailsData };
  const movie = new Movie(movieData);
  const isFavorite = movie.isFavorite(favorites);

  return (
    <Layout isFullscreen isLoading={isLoading || isLoadingMovieRecommendations}>
      <FavoriteToast
        isFavorite={isFavorite}
        setShowToast={setShowToast}
        showToast={showToast}
      />
      <StyledMovieItem $movieBackdrop={movie.getMovieBackdrop()}>
        <div className="backdrop-poster" />
        <Container maxWidth="lg">
          <Grid
            container
            direction="row"
            className="top-movie-container"
            spacing={3}
          >
            <Grid item xs="auto">
              <div className="top-movie-container__information">
                <img src={movie.getMoviePoster(300)} alt="Movie poster" />
                <ul>
                  <li>
                    <Event /> {movie.getReleaseDateFromNow()}
                  </li>
                </ul>
              </div>
            </Grid>
            <Grid item md>
              <Details
                movie={movie}
                setFavorites={(movieId) => {
                  setFavorites(
                    Movie.toggleFavorite(isFavorite, favorites, movieId)
                  );
                  setShowToast(true);
                }}
                isFavorite={isFavorite}
              />
            </Grid>
          </Grid>
          {!!movieRecommendationsData?.data.results.length && (
            <Related
              movies={movieRecommendationsData?.data.results
                .slice(0, 3)
                .map(
                  (recommendation: MovieInterface) => new Movie(recommendation)
                )}
            />
          )}
        </Container>
      </StyledMovieItem>
    </Layout>
  );
}
