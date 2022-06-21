import React from "react";
import { Flex, Text } from "@chakra-ui/react";

import Rating from "./Rating";

const Ratings = ({ ratings }) => {
  return (
    <Flex alignItems='center'>
      {ratings.map((rating) => (
        <Rating key={`rating-${rating.Source}`} rating={rating} />
      ))}
    </Flex>
  );
};

export default Ratings;
