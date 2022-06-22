import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import * as gtag from "../../lib/gtag";
import { IoClose, IoSearchOutline } from "react-icons/io5";

import MovieListItem from "./MovieListItem";

const MovieList = ({ movies }) => {
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
    <Flex direction={"column"} justifyContent='start'>
      <InputGroup w={["100%", "md", "xl"]} mx='auto' mb={4}>
        <InputLeftElement>
          <Icon as={IoSearchOutline} />
        </InputLeftElement>
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search movie titles'
        />
        {searchTerm !== "" && (
          <InputRightElement>
            <IconButton
              icon={<Icon as={IoClose} />}
              size='xs'
              onClick={() => setSearchTerm("")}
            />
          </InputRightElement>
        )}
      </InputGroup>
      <Flex
        direction={["column", "row"]}
        flexWrap={["nowrap", "wrap"]}
        justifyContent={["start", "center"]}
      >
        {visibleMovies.map((movie) => (
          <MovieListItem key={`movie-${movie.id}`} movie={movie} />
        ))}
      </Flex>
    </Flex>
  );
};

export default MovieList;
