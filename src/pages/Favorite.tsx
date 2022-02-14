import React, { useContext } from "react";
import { useQueries } from "react-query";
import { useRecoilState } from "recoil";
import { Grid, Container } from "@mui/material";

import Movie from "@core/Movie";
import Layout from "@components/Layout";
import MovieCard from "@components/commons/MovieCard";
import favoritesAtom from "@recoil/favorites/atom";
import MovieApiContext from "@context/MovieApiContext";

export default function Favorite() {
  const movieApiInstance = useContext(MovieApiContext);
  const [favorites, setFavorites] = useRecoilState(favoritesAtom);
  const favoritesQuery = useQueries(
    favorites.map((favoriteId: number) => {
      return {
        queryKey: ["favorite", favoriteId],
        queryFn: () => movieApiInstance.fetchMovieById(favoriteId),
      };
    })
  );

  console.log("favoritesQuery", favoritesQuery);

  return (
    <Layout isLoading={false}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          {favoritesQuery?.map(({ data }: any) => (
            <Grid item xs={3}>
              <MovieCard movie={new Movie(data?.data)} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
}
