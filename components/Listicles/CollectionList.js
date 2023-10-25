import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Flex, Text, Heading } from "@chakra-ui/react";
import CollectionItem from "./CollectionItem";

const CollectionList = ({ collections, onlyFeatured = false }) => {
  console.log(collections);
  let visibleLists = collections;
  if (onlyFeatured) {
    visibleLists = collections.filter((c) => c.IsFeatured);
  }

  return (
    <Flex direction='column'>
      <Heading
        size='sm'
        // color='yellow.600'
        textTransform={"uppercase"}
        mt={4}
        mb={2}
      >
        Featured Lists
      </Heading>
      {visibleLists.map((collection) => (
        <CollectionItem key={`list-${collection.id}`} collection={collection} />
      ))}
    </Flex>
  );
};

export default CollectionList;
