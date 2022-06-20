import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import Ratings from "../Ratings/Ratings";

const MoviePage = ({ movie }) => {
  console.log(movie);
  let poster = movie.Images[0].thumbnails.large;

  return (
    <Flex direction='column' alignItems='center'>
      <Link href='/'>Home</Link>
      <Flex>
        <Image
          src={poster.url}
          alt={`Movie Poster: ${movie.Movie}`}
          // layout='fill'
          width={poster.width / 4}
          height={poster.height / 4}
        />
        <Flex direction='column'>
          <Text fontSize='3xl'>{movie.Movie}</Text>
          <Flex>
            <Text>{movie.Details.Genre}</Text>
            <Text>{movie.Details.Rated}</Text>
            <Text>{movie.Details.Runtime}</Text>
          </Flex>

          <Ratings ratings={movie.Details.Ratings} />
        </Flex>
      </Flex>

      <Flex direction='column'>
        <Text>{movie.Details.Plot}</Text>
        <Text>{movie.Details.Actors}</Text>
        <Text>{movie.Details.Awards}</Text>
      </Flex>
      <Flex direction='column'>
        <Text fontSize='lg'>Drink whenever...</Text>
        <ReactMarkdown className='markdown'>{movie.Rules}</ReactMarkdown>
        {/* <div
          dangerouslySetInnerHTML={{ __html: movie.RulesHtml }}
          className='markdown'
        /> */}
        {movie.ContentImages &&
          movie.ContentImages.map((img) => (
            <Image
              key={`image-${img.id}`}
              src={img.url}
              alt='Movie image'
              width={img.width}
              height={img.height}
            />
          ))}
      </Flex>
      {/* <div className="">
          <h3 className="text-2xl my-3">Drink when...</h3>
          <div
            dangerouslySetInnerHTML={{ __html: RulesHtml }}
            className="markdown"
          />
        </div> */}
    </Flex>
  );
};

export default MoviePage;
