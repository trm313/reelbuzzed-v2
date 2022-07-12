import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Flex, Text, Box, Heading, Divider } from "@chakra-ui/react";
import ListNav from "./ListNav";

const ListNavs = ({ lists, onlyFeatured = false }) => {
  let visibleLists = lists;
  if (onlyFeatured) {
    visibleLists = lists.filter((list) => list.IsFeatured);
  }
  return (
    <Flex direction='column' alignSelf='center' alignItems='center'>
      <Heading
        size='sm'
        // color='yellow.600'
        textTransform={"uppercase"}
        mt={4}
        mb={2}
      >
        Featured Lists
      </Heading>
      <Flex mb={8} w='full' flexWrap='wrap'>
        {visibleLists.map((list) => (
          <ListNav key={`list-${list.id}`} list={list} />
        ))}
      </Flex>
    </Flex>
  );
};

export default ListNavs;
