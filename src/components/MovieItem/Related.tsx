import React from "react";
import styled from "styled-components";

import MovieCard from "@components/commons/MovieCard";
import Movie from "@core/Movie";
import { Grid } from "@mui/material";

const StyledRelated = styled.div`
  h4 {
    text-align: center;
    font-size: 1.6rem;
  }
`;

interface Props {
  movies: Movie[];
}

export default function Related({ movies }: Props) {
  return (
    <StyledRelated>
      <h4>You may also like</h4>
      <Grid container spacing={2} justifyContent="center">
        {movies.map((movie) => (
          <Grid key={movie.id} item xs={3}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </StyledRelated>
  );
}
