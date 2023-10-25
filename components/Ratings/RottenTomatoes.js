import { Flex, Text } from "@chakra-ui/react";
import Image from "next/image";

import imgRtFresh from "../../public/img/icons/RottenTomatoes_Fresh.png";
import imgRtSplat from "../../public/img/icons/RottenTomatoes_Splat.png";

import { styles } from "./Rating";

/**
 * Rules:
 * - Image displayed left of value
 * - Scores must link back to the corresponding movie page on RT site
 * - Fresh + Popcorn = 60% or better
 * - Rotten = 59% or less
 * - Certified Fresh: 75% or higher with other conditions
 * - Cannot alter images
 *
 */

const parseValue = (str) => {
  let num = str.split("%")[0];
  return num;
};

const RottenTomatoes = ({ rating }) => {
  let value = parseValue(rating.Value);

  let image = imgRtFresh;
  let alt = "Rotten Tomato: Fresh";
  if (value < 60) {
    image = imgRtSplat;
    alt = "Rotten Tomatoe: Splat";
  }

  return (
    <>
      <Image src={image} alt={alt} height={20} width={20} />
      <Text ml={1} fontSize={styles.value.fontSize} color={styles.value.color}>
        {value}%
      </Text>
    </>
  );
};

export default RottenTomatoes;
