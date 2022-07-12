import React, { useState, useEffect } from "react";
import { Flex, Heading, Text, Icon } from "@chakra-ui/react";
import { FaTired } from "react-icons/fa";
import * as gtag from "../../lib/gtag";

import SearchBar from "../SearchBar";
import MovieListItem from "./MovieListItem";
import ListNavs from "../ListNavs/ListNavs";

const MovieList = ({ movies, lists }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleMovies, setVisibleMovies] = useState(movies);

  const logFailedSearch = (term) => {
    gtag.event({
      action: "search",
      category: "No Search Results",
      label: term,
    });
  };

  useEffect(() => {
    let filteredMovies = movies.filter((m) => {
      return m.Movie.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
    });

    if (filteredMovies.length == 0) {
      logFailedSearch(searchTerm);
    }

    setVisibleMovies(filteredMovies);
  }, [searchTerm, movies]);

  return (
    <Flex direction={"column"}>
      <ListNavs lists={lists} onlyFeatured={true} />

      <Heading
        size='sm'
        // color='yellow.600'
        textTransform={"uppercase"}
        mt={4}
        mb={2}
        alignSelf='center'
      >
        All Movies
      </Heading>
      <SearchBar value={searchTerm} onChangeValue={setSearchTerm} />

      <Flex
        direction={["column", "row"]}
        flexWrap={["nowrap", "wrap"]}
        justifyContent={["start", "center"]}
      >
        {visibleMovies.map((movie) => (
          <MovieListItem key={`movie-${movie.id}`} movie={movie} />
        ))}

        {visibleMovies.length === 0 && (
          <Flex direction='column' alignItems='center'>
            <Icon as={FaTired} h={12} w={12} color='dark.400' my={6} />
            <Heading
              size='sm'
              mb={2}
              color='yellow.600'
            >{`Sorry, we don't have that one yet!`}</Heading>
            <Text>{`We log failed searches so we'll try to add it soon`}</Text>
          </Flex>
        )}
      </Flex>
      <Flex direction='column' mt={8}>
        <ListNavs lists={lists} />
      </Flex>
    </Flex>
  );
};

export default MovieList;
