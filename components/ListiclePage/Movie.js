import React from "react";
import {
  Flex,
  Text,
  Box,
  Badge,
  Divider,
  Icon,
  Button,
} from "@chakra-ui/react";
import { IoTrophyOutline, IoArrowForward, IoPlay } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import Ratings from "../Ratings/Ratings";
import SectionWrapper from "../MoviePage/SectionWrapper";

const Movie = ({ movie }) => {
  return (
    <Flex
      direction='column'
      alignItems='center'
      w='full'
      maxW='lg'
      p={4}
      mb={8}
      mx='auto'
      bg='dark.600'
      rounded='xl'
    >
      <Flex label='Row Header' w='100%'>
        <Box
          flexShrink={0}
          mr={3}
          maxW={[100, 100]}
          rounded='lg'
          overflow='hidden'
          h={148}
        >
          <Image
            // src={poster.url}
            src={`/posters/${movie.id}.png`}
            alt={`Movie Poster: ${movie.Movie}`}
            width={"100px"}
            height={"150px"}
          />
        </Box>

        <Flex direction='column' flexGrow={1}>
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
      <Divider mt={4} bg='yellow.400' />
      <Flex label='Content Body' direction='column'>
        <Flex direction='column' mt={4}>
          <Text>{movie.Details.Plot}</Text>

          <Flex alignItems='center' mt={2}>
            <Icon as={IoTrophyOutline} color='yellow.400' mr={2} />
            <Text>{movie.Details.Awards}</Text>
          </Flex>
        </Flex>

        <SectionWrapper header='Rules'>
          <Text fontSize='lg'>Drink whenever...</Text>
          <ReactMarkdown className='markdown'>{movie.Rules}</ReactMarkdown>
        </SectionWrapper>

        <Link href={`/movies/${movie.Slug}`}>
          <Button
            rightIcon={<Icon as={IoPlay} />}
            colorScheme='yellow'
            alignSelf='flex-end'
          >
            Play
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Movie;
