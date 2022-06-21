import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import MovieListItem from "./MovieListItem";

const MovieList = ({ movies }) => {
  return (
    <Flex
      direction={["column", "row"]}
      flexWrap={["nowrap", "wrap"]}
      justifyContent={["start", "center"]}
      maxW={["100%", "8xl"]}
    >
      {movies.map((movie) => (
        <MovieListItem key={`movie-${movie.id}`} movie={movie} />
      ))}
    </Flex>
  );
};

export default MovieList;
