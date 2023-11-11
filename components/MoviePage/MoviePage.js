import React from "react";
import { Flex, Text, Box, Badge, Divider, Spacer } from "@chakra-ui/react";
import Image from "next/image";

import Ratings from "../Ratings/Ratings";
import SectionWrapper from "./SectionWrapper";
import Rules from "./Rules";

const MoviePage = ({ movie, lists }) => {
  let poster = movie.Images[0].thumbnails.large;

  console.log(movie);
  let genres = movie.Details.Genre.split(", ");

  return (
    <>
      <Flex direction='column' alignItems='center' w='full' maxW='xl' mx='auto'>
        <Flex label='Row Header' bg='dark.600' p={4} rounded='xl' w='full'>
          <Box flexShrink={0} mr={3} maxW={[100, 100]}>
            <Image
              src={`/posters/${movie.id}.png`}
              alt={`Movie Poster: ${movie.Movie}`}
              width={poster.width}
              height={poster.height}
            />
          </Box>
          <Flex direction='column'>
            <Text fontSize='3xl'>{movie.Movie}</Text>
            <Text fontSize='sm' color='gray.400'>
              {movie.Details.Genre}
            </Text>
            <Text fontSize='sm' mb={2} color='gray.400'>
              {movie.Details.Actors}
            </Text>
            <Ratings ratings={movie.Details.Ratings} />
          </Flex>
        </Flex>
        <SectionWrapper header='Summary'>
          <Flex>
            <Text>Rated: {movie.Details.Rated}</Text>
            <Spacer w={4} />
            <Text>Duration: {movie.Details.Runtime}</Text>
          </Flex>

          <Text fontSize='lg' my={4}>
            {movie.Details.Plot}
          </Text>
          <Flex mb={2}>
            {genres.map((genre) => (
              <Box
                bg='dark.600'
                key={`genre-${genre}`}
                px={4}
                py={1}
                rounded='md'
                _notLast={{ mr: 2 }}
              >
                <Text fontSize='sm'>{genre}</Text>
              </Box>
            ))}
          </Flex>
          <Text>Starring {movie.Details.Actors}</Text>
          <Text>{movie.Details.Awards}</Text>
        </SectionWrapper>
        <Divider />
        <SectionWrapper header='Rules'>
          <Rules movie={movie} />
        </SectionWrapper>

        {movie.ContentImages &&
          movie.ContentImages.map((img) => (
            <Box key={`image-${img.id}`}>
              <Image
                src={img.url}
                alt='Movie image'
                width={img.width}
                height={img.height}
              />
            </Box>
          ))}
      </Flex>
    </>
  );
};

export default MoviePage;
