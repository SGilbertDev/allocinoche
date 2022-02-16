import React from "react";
import styled from "styled-components";
import { Grid, Box } from "@mui/material";

import MovieCard from "@components/commons/MovieCard";
import Movie from "@core/Movie";

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
        {movies.map((movie, index) => (
          <Grid item xs={5} md={2}>
            <Box
              key={movie.id}
              display={{ xs: index === 2 ? "none" : "block", md: "block" }}
            >
              <MovieCard movie={movie} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </StyledRelated>
  );
}
