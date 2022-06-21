import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Flex, Text, Box } from "@chakra-ui/react";

import Ratings from "../Ratings/Ratings";

const MovieListItem = ({ movie }) => {
  let poster = movie.Images[0].thumbnails.large;
  return (
    <Link href={`/movies/${movie.Slug}`}>
      <Flex w={["100%", "450px"]} border='1px' borderColor='gray.100' m={1}>
        <Box flexShrink={0}>
          <Image
            src={poster.url}
            alt={`Movie Poster: ${movie.Movie}`}
            // layout='fill'
            width={300 / 3}
            height={444 / 3}
          />
        </Box>
        <Flex direction='column' p={3}>
          <Text fontSize='lg' fontWeight='semibold' mb={2}>
            {movie.Movie} ({movie.Year})
          </Text>
          <Text fontSize='sm' mb={2}>
            {movie.Details.Genre}
          </Text>
          <Ratings ratings={movie.Details.Ratings} />
        </Flex>
      </Flex>
    </Link>
  );
};

export default MovieListItem;
