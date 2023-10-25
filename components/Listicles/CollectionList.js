import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Flex, Text, Heading } from "@chakra-ui/react";
import CollectionItem from "./CollectionItem";

const CollectionList = ({ collections, onlyFeatured = false }) => {
  // console.log(collections);
  let visibleLists = collections;
  if (onlyFeatured) {
    visibleLists = collections.filter((c) => c.IsFeatured);
  }

  return (
    <Flex direction='column'>
      <Heading
        size='sm'
        textTransform={"uppercase"}
        mt={4}
        mb={2}
        textAlign={"center"}
      >
        Featured Lists
      </Heading>
      <Flex
        direction={["column", "row"]}
        flexWrap={"wrap"}
        justifyContent={"center"}
        w='full'
      >
        {visibleLists.map((collection) => (
          <CollectionItem
            key={`list-${collection.id}`}
            collection={collection}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default CollectionList;
