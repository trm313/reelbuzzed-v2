import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import MovieListItem from "./MovieListItem";

const MovieList = ({ movies }) => {
  return (
    <Flex direction='column'>
      {movies.map((movie) => (
        <MovieListItem key={`movie-${movie.id}`} movie={movie} />
      ))}
    </Flex>
  );
};

export default MovieList;
