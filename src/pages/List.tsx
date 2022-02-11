import React, { useContext, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import moment from "moment";
import { LinearProgress, Container } from "@mui/material";
import styled from "styled-components";

import MoviesContext from "@context/MoviesContext";
import MovieTile from "@components/List/MovieTile";
import useIntersectionObserver from "@hooks/useIntersectionObserver";
import Layout from "../Layout";

const StyledList = styled.div`
  .MuiLinearProgress-root {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
  }
`;

export default function List() {
  const moviesInstance = useContext(MoviesContext);
  const {
    status,
    data: movieData,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    "upcoming-movies",
    ({ pageParam = 1 }) => moviesInstance.fetchUpcomingMovies(pageParam),
    {
      getNextPageParam: (lastPage) => {
        const { page, total_pages: totalPages } = lastPage?.data;
        return page < totalPages ? page + 1 : undefined;
      },
    }
  );

  const loadMoreRef = useRef<HTMLButtonElement>(null);

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: !!hasNextPage,
  });

  return (
    <Layout>
      <Container maxWidth="lg">
        <StyledList>
          {status === "loading" ? (
            <LinearProgress />
          ) : status === "error" ? (
            <span>Something's wrong</span>
          ) : (
            <>
              {movieData?.pages.map((page) => (
                <React.Fragment key={page.data.page}>
                  {page.data.results.map((movie: MovieInterface) => (
                    <MovieTile
                      key={movie.id}
                      id={movie.id}
                      title={movie.title}
                      poster={movie.poster_path}
                      releaseDate={moment(movie.release_date)}
                    />
                  ))}
                </React.Fragment>
              ))}
              <div>
                <button
                  ref={loadMoreRef}
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                >
                  {isFetchingNextPage ? (
                    <LinearProgress />
                  ) : hasNextPage ? (
                    ""
                  ) : (
                    "Nothing more to load"
                  )}
                </button>
              </div>
            </>
          )}
        </StyledList>
      </Container>
    </Layout>
  );
}
