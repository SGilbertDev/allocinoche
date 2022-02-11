import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import MoviesContext from "@context/MoviesContext";
import Layout from "../Layout";

export default function Movie() {
  const moviesInstance = useContext(MoviesContext);
  const { id } = useParams();

  const { data: movieDetailsData, status } = useQuery("movie-details", () =>
    moviesInstance.fetchMovieById(+id!)
  );

  const {
    data: movie,
  } = { ...movieDetailsData };

  console.log("data", movieDetailsData?.data);
  console.log("status", status);
  return (
    <Layout>
      <img
        src={`https://image.tmdb.org/t/p/w200${movie?.poster_path}`}
        alt="Movie poster"
      />
    </Layout>
  );
}
