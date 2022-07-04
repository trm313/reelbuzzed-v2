import React from "react";
import { Flex, Text, Box, Badge, Divider } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import Ratings from "../Ratings/Ratings";
import SectionWrapper from "./SectionWrapper";
import Disclaimer from "../Disclaimer";
import ShareBtns from "./ShareBtns";

const MoviePage = ({ movie }) => {
  let poster = movie.Images[0].thumbnails.large;

  return (
    <Flex
      direction='column'
      alignItems='center'
      w='full'
      p={4}
      mb={8}
      mx='auto'
    >
      <Flex label='Row Header' w='100%'>
        <Box flexShrink={0} mr={3} maxW={[100, 100]}>
          <Image
            src={poster.url}
            alt={`Movie Poster: ${movie.Movie}`}
            // layout='fill'
            width={poster.width}
            height={poster.height}
          />
        </Box>

        <Flex direction='column' flexGrow={1}>
          <Text fontSize='3xl'>{movie.Movie}</Text>
          <Text fontSize='sm'>{movie.Details.Genre}</Text>
          <Text fontSize='sm'>{movie.Details.Actors}</Text>
          <Ratings ratings={movie.Details.Ratings} />
        </Flex>
      </Flex>
      <Divider mt={2} bg='yellow.400' />
      <Flex label='Content Body' direction='column'>
        <SectionWrapper header='Summary'>
          <Text>{movie.Details.Plot}</Text>
          <Flex my={2}>
            <Badge
              py={1}
              px={3}
              colorScheme='purple'
              rounded='md'
              fontSize='sm'
            >
              {movie.Details.Rated}
            </Badge>
            <Badge
              py={1}
              px={2}
              colorScheme='purple'
              ml={2}
              rounded='md'
              fontSize='sm'
            >
              {movie.Details.Runtime}
            </Badge>
          </Flex>
          <Text>Starring {movie.Details.Actors}</Text>
          <Text>{movie.Details.Awards}</Text>
        </SectionWrapper>
        {/* <Disclaimer /> */}
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
      <Flex mt={16} justifySelf='flex-end'>
        <ShareBtns
          shareText={`${movie.Movie} Drinking Game`}
          shareUrl={`https://reelbuzzed.com/movies/${movie.Slug}`}
        />
      </Flex>
    </Flex>
  );
};

export default MoviePage;
