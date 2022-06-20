import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Flex, Text } from "@chakra-ui/react";

const MovieListItem = ({ movie }) => {
  let poster = movie.Images[0].thumbnails.large;
  return (
    <Flex p={1}>
      <Link href={`/movies/${movie.Slug}`}>Link</Link>
      <Image
        src={poster.url}
        alt={`Movie Poster: ${movie.Movie}`}
        // layout='fill'
        width={poster.width / 4}
        height={poster.height / 4}
      />
      <Flex direction='column' ml={2}>
        <Text fontSize='lg'>
          {movie.Movie} ({movie.Year})
        </Text>
      </Flex>
    </Flex>
  );
};

export default MovieListItem;
