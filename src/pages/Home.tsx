import React, { useContext } from "react";
import { useQuery } from "react-query";
import { createGlobalStyle } from "styled-components";

import HeroHeader from "@components/Home/HeroHeader";
import MovieApiContext from "@context/MovieApiContext";
import Movie from "@core/Movie";
import Layout from "@components/Layout";

// Force overflow hidden on parent element
const AppGlobalStyle = createGlobalStyle`
  .App {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
  }
`;

export default function Home() {
  const movieApiInstance = useContext(MovieApiContext);

  const {
    data: upcomingMoviesData,
    status,
    isLoading,
  } = useQuery("upcoming-hero", () => movieApiInstance.fetchUpcomingMovies());

  return (
    <Layout isFullscreen isLoading={isLoading}>
      <AppGlobalStyle />
      <HeroHeader
        movies={upcomingMoviesData?.data.results.map(
          (movie: MovieInterface) => new Movie(movie)
        )}
        queryStatus={status}
      />
    </Layout>
  );
}
