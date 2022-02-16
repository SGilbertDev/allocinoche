import React from "react";
import styled from "styled-components";
import { Button, Chip, Grid, Link } from "@mui/material";
import { Clear, Favorite } from "@mui/icons-material";
import moment from "moment";

import Movie from "@core/Movie";
import mediaQueries from "@styles/mediaQueries";

const StyledDetails = styled.div`
  h2 {
    font-size: 2.4rem;
    margin: 0 0 5px;
    font-weight: 800;
    line-height: 40px;

    @media ${mediaQueries.smallUp}{
      line-height: 30px;
    }
  }
  p.release-date {
    margin: 3px 0 14px;
  }
  .MuiChip-outlined {
    margin-right: 10px;
  }
  button {
    svg {
      font-size: 1.1rem;
      margin-right: 10px;
    }
  }
  .movie-tags {
    margin-top: 18px;
    
    @media ${mediaQueries.smallUp}{
      margin-top: 0;
    }
  }
  p.overview {
    margin-top: 30px;
    font-size: 1.1rem;
  }
`;

interface Props {
  movie: Movie;
  setFavorites(id: number): void;
  isFavorite: boolean;
}

export default function Details({ movie, setFavorites, isFavorite }: Props) {
  return (
    <StyledDetails>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Grid item>
          <h2>{movie?.title}</h2>
          <p className="release-date">
            Release date: {moment(movie.release_date).format("MMM D YYYY")}
          </p>
        </Grid>
        <Grid item>
          <Button
            variant={isFavorite ? "outlined" : "contained"}
            onClick={() => setFavorites(movie.id)}
          >
            {isFavorite ? (
              <>
                <Clear />
                Remove from favorite
              </>
            ) : (
              <>
                <Favorite />
                Add to favorite
              </>
            )}
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item lg={8} className="movie-tags">
          {movie.genres?.map((genre) => (
            <Chip
              key={genre.id}
              label={genre.name}
              size="small"
              color="primary"
              variant="outlined"
            />
          ))}
          <p className="overview">{movie.overview}</p>

          {movie.homepage && (
            <Link href={movie.homepage} target="_blank" underline="none">
              {movie.homepage}
            </Link>
          )}
        </Grid>
      </Grid>
    </StyledDetails>
  );
}
