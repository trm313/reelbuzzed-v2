import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Flex, Text, Box } from "@chakra-ui/react";

import Ratings from "../Ratings/Ratings";

const MovieListItem = ({ movie }) => {
  if (!movie || !movie.Details) {
    console.log("Bad movie data", movie.Movie, movie);
  }
  return (
    <Link href={`/movies/${movie.Slug}`}>
      <Flex
        w={["100%", "450px"]}
        m={1}
        p={2}
        cursor='pointer'
        rounded='xl'
        bg='dark.600'
      >
        <Box flexShrink={0} rounded='lg' overflow='hidden' h={148}>
          <Image
            src={`/posters/${movie.id}.png`}
            alt={`Movie Poster: ${movie.Movie}`}
            width={100} // img dimension: 300px width, 444px height
            height={148}
          />
        </Box>
        <Flex direction='column' p={3}>
          <Text fontSize='lg' fontWeight='semibold' mb={2}>
            {movie.Movie} ({movie.Year})
          </Text>
          <Text fontSize='xs' color='gray.400'>
            {movie.Details?.Genre}
          </Text>
          <Text fontSize='xs' mb={2} color='gray.400'>
            {movie.Details?.Actors}
          </Text>
          <Ratings ratings={movie.Details?.Ratings} />
        </Flex>
      </Flex>
    </Link>
  );
};

export default MovieListItem;
