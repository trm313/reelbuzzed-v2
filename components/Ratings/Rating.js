import { Flex, Text } from "@chakra-ui/react";
import Image from "next/image";

import RottenTomatoes from "./RottenTomatoes";
import IMDB from "./IMDB";
import Metacritic from "./Metacritic";

export const styles = {
  value: {
    color: "light.600",
    fontSize: "sm",
  },
};

const Rating = ({ rating }) => {
  let child;
  if (rating.Source === "Rotten Tomatoes") {
    child = <RottenTomatoes rating={rating} />;
  } else if (rating.Source === "Internet Movie Database") {
    child = <IMDB rating={rating} />;
  } else if (rating.Source === "Metacritic") {
    child = <Metacritic rating={rating} />;
  }

  return (
    <Flex mr={2} p={1} alignItems='center'>
      {child}
    </Flex>
  );
};

export default Rating;
