import React, { useContext } from "react";
import { useQueries } from "react-query";
import { useRecoilState } from "recoil";
import { Grid, Container, Button } from "@mui/material";
import { Link } from "react-router-dom";

import Movie from "@core/Movie";
import Layout from "@components/Layout";
import MovieCard from "@components/commons/MovieCard";
import favoritesAtom from "@recoil/favorites/atom";
import MovieApiContext from "@context/MovieApiContext";
import routes from "@routes";

export default function Favorite() {
  const movieApiInstance = useContext(MovieApiContext);
  const [favorites, setFavorites] = useRecoilState(favoritesAtom);

  // Map over multiple queries as TMDB has no endpoint for multiple id query
  const favoritesQuery = useQueries(
    favorites.map((favoriteId: number) => {
      return {
        queryKey: ["favorite", favoriteId],
        queryFn: () => movieApiInstance.fetchMovieById(favoriteId),
      };
    })
  );

  return (
    <Layout>
      <Container maxWidth="lg">
        <h2>My favorites 💛</h2>
        {!!favoritesQuery.length && (
          <Grid key={favorites.length} container spacing={5}>
            {favoritesQuery?.map((queryResults: any, index: any) => (
              <Grid key={queryResults?.data?.data.id || index} item xs={6} md={3}>
                <MovieCard
                  movie={new Movie(queryResults?.data?.data)}
                  showFavorite
                  removeFavorite={(id) =>
                    setFavorites(Movie.toggleFavorite(true, favorites, id))
                  }
                />
              </Grid>
            ))}
          </Grid>
        )}
        {!favoritesQuery.length && (
          <Grid container justifyContent="center">
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <p style={{ marginTop: 150 }}>Looks like your list is empty 😩</p>
              <Link to={routes.LIST}>
                <Button variant="contained">Add movies</Button>
              </Link>
            </Grid>
          </Grid>
        )}
      </Container>
    </Layout>
  );
}
