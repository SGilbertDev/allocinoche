import React, { useContext } from "react";
import { useQuery } from "react-query";

import HeroHeader from "@components/HeroHeader";
import Layout from "../Layout";
import MoviesContext from "@context/MoviesContext";

export default function Home() {
  const moviesInstance = useContext(MoviesContext);

  const upcomingHeroQuery = useQuery("upcoming-hero", () =>
    moviesInstance.fetchUpcomingMovies()
  );

  return (
    <Layout isFullscreen>
      <HeroHeader upcomingHeroQuery={upcomingHeroQuery} />
    </Layout>
  );
}
