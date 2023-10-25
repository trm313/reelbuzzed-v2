import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Flex,
  Text,
  Box,
  Icon,
  Avatar,
  AvatarGroup,
  Heading,
} from "@chakra-ui/react";

import MoviePostersStack from "./MoviePostersStack";

const CollectionItem = ({ collection }) => {
  return (
    <Link href={`/lists/${collection.Slug}`}>
      <Flex
        w={["full", "full", "sm"]}
        alignItems='center'
        justifyContent='space-between'
        p={4}
        bg='dark.600'
        color='light.600'
        rounded='xl'
        mx={[0, 1]}
        mb={2}

        // _notLast={{ mb: 2 }}
      >
        <Flex direction='column' p={1}>
          <Heading size={"md"}>{collection.Name}</Heading>
          <Text fontSize='xs' color='gray.400' noOfLines={2}>
            {collection.RichText}
          </Text>
        </Flex>

        <MoviePostersStack movies={collection.Movies} />
      </Flex>
    </Link>
  );
};

export default CollectionItem;
