import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Flex, Text, Box } from "@chakra-ui/react";

import Ratings from "../Ratings/Ratings";

const MovieListItem = ({ movie }) => {
  let poster = movie.Images[0].thumbnails.large;
  return (
    <Link href={`/movies/${movie.Slug}`}>
      <Flex
        w={["100%", "450px"]}
        border='2px'
        borderColor='gray.100'
        m={1}
        p={2}
        cursor='pointer'
        rounded='3xl'
      >
        <Box flexShrink={0} rounded='2xl' overflow='hidden' h={148}>
          <Image
            src={poster.url}
            alt={`Movie Poster: ${movie.Movie}`}
            width={100} // img dimension: 300px width, 444px height
            height={148}
          />
        </Box>
        <Flex direction='column' p={3}>
          <Text fontSize='lg' fontWeight='semibold' mb={2}>
            {movie.Movie} ({movie.Year})
          </Text>
          <Text fontSize='xs' color='gray.500'>
            {movie.Details.Genre}
          </Text>
          <Text fontSize='xs' mb={2} color='gray.500'>
            {movie.Details.Actors}
          </Text>
          <Ratings ratings={movie.Details.Ratings} />
        </Flex>
      </Flex>
    </Link>
  );
};

export default MovieListItem;
