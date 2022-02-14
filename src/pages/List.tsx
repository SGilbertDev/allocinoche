import React, { useContext, useRef, Fragment } from "react";
import { useInfiniteQuery } from "react-query";
import { LinearProgress, Container, Grid } from "@mui/material";
import styled from "styled-components";

import MovieApiContext from "@context/MovieApiContext";
import MovieTile from "@components/List/MovieTile";
import useIntersectionObserver from "@hooks/useIntersectionObserver";
import Movie from "@core/Movie";
import Layout from "@components/Layout";
import { LocalMovies } from "@mui/icons-material";

const StyledList = styled.div<{ $topBackground: string }>`
  .title-container {
    background-size: cover;
    background-repeat: no-repeat;
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)),
      url(${({ $topBackground }) => $topBackground});
    background-position: center;
    height: 200px;
    margin-bottom: 60px;

    h2 {
      margin: 0;
      text-align: center;
      font-size: 2rem;
      padding-top: 80px;
    }
  }
  .MuiLinearProgress-root {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
  }
  .bottom-indicator {
    padding: 30px 0 10px;
    text-align: center;
    &.hide {
      opacity: 0;
    }
    svg {
      color: var(--primary-color);
      font-size: 2rem;
    }
    p {
      margin: 0;
    }
  }
`;

export default function List() {
  const movieApiInstance = useContext(MovieApiContext);
  const {
    data: movieDetailsData,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery(
    "upcoming-movies",
    ({ pageParam = 1 }) => movieApiInstance.fetchUpcomingMovies(pageParam),
    {
      getNextPageParam: (lastPage) => {
        const { page, total_pages: totalPages } = lastPage?.data;
        return page < totalPages ? page + 1 : undefined;
      },
    }
  );
  const { pages: moviePageData } = { ...movieDetailsData };
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Check if the user is at the bottom of the document and use fetchNextPage callback
  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: !!hasNextPage,
  });

  const firstMovie = new Movie(moviePageData?.[0].data.results[0]);

  return (
    <Layout isLoading={isLoading}>
      <StyledList $topBackground={firstMovie.getMovieBackdrop()}>
        <div className="title-container">
          <h2 className="title">Upcoming movies</h2>
        </div>
        <Container maxWidth="lg">
          <Grid container direction="row" spacing={2}>
            {moviePageData?.map((page) => (
              <Fragment key={page.data.page}>
                {page.data.results.map((movie: MovieInterface) => (
                  <Grid key={movie.id} item xs={12} md={6}>
                    <MovieTile key={movie.id} movie={new Movie(movie)} />
                  </Grid>
                ))}
              </Fragment>
            ))}
          </Grid>
          <Grid container justifyContent="center">
            <Grid item>
              <div ref={loadMoreRef} className={`bottom-indicator ${hasNextPage ? 'hide' : ''}`}>
                <LocalMovies />
                {!hasNextPage && <p>No movies left 😩</p>}
              </div>
            </Grid>
          </Grid>
          {isFetchingNextPage && <LinearProgress />}
        </Container>
      </StyledList>
    </Layout>
  );
}
