import React from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import Ratings from "../Ratings/Ratings";
import SectionWrapper from "./SectionWrapper";

const MoviePage = ({ movie }) => {
  let poster = movie.Images[0].thumbnails.large;

  return (
    <Flex
      direction='column'
      alignItems='center'
      p={4}
      mb={8}
      maxW='4xl'
      mx='auto'
    >
      <Flex label='Row Header' w='100%'>
        <Box flexShrink={0} mr={3}>
          <Image
            src={poster.url}
            alt={`Movie Poster: ${movie.Movie}`}
            // layout='fill'
            width={poster.width / 4}
            height={poster.height / 4}
          />
        </Box>

        <Flex direction='column' flexGrow={1}>
          <Text fontSize='3xl'>{movie.Movie}</Text>
          <Text fontSize='sm'>{movie.Details.Genre}</Text>
          <Ratings ratings={movie.Details.Ratings} />
        </Flex>
      </Flex>

      <Flex label='Content Body' direction='column'>
        <SectionWrapper header='Summary'>
          <Text>{movie.Details.Plot}</Text>
          <Flex my={2}>
            <Text py={1} px={3} bg='gray.100' rounded='md'>
              {movie.Details.Rated}
            </Text>
            <Text py={1} px={2} bg='gray.100' ml={2} rounded='md'>
              {movie.Details.Runtime}
            </Text>
          </Flex>
          <Text>Starring {movie.Details.Actors}</Text>
          <Text>{movie.Details.Awards}</Text>
        </SectionWrapper>

        <SectionWrapper header='Rules'>
          <Text fontSize='lg'>Drink whenever...</Text>
          <ReactMarkdown className='markdown'>{movie.Rules}</ReactMarkdown>
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
        </SectionWrapper>
      </Flex>
    </Flex>
  );
};

export default MoviePage;
