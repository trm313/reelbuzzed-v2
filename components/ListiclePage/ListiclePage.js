import React from "react";
import { Flex, Text, Box, Badge, Divider, Heading } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import Movie from "./Movie";

const ListiclePage = ({ list }) => {
  console.log(list);
  return (
    <Flex
      direction='column'
      alignItems='center'
      w='full'
      p={4}
      mb={8}
      mx='auto'
    >
      <Heading>{list.Name} Drinking Games</Heading>
      <ReactMarkdown className='markdown'>{list.RichText}</ReactMarkdown>

      <Flex direction='column'>
        {list.PopulatedMovies.map((m) => (
          <Movie key={`listicle-movie_${m.id}`} movie={m} />
        ))}
      </Flex>
    </Flex>
  );
};

export default ListiclePage;
