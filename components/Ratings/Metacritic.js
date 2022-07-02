import Image from "next/image";
import { Text, Badge } from "@chakra-ui/react";

import { styles } from "./Rating";

const Metacritic = ({ rating }) => {
  let value = parseInt(rating.Value.split("/")[0]);

  let color = "yellow";
  if (value < 40) {
    color = "red";
  } else if (value > 70) {
    color = "green";
  }

  return (
    <>
      <Badge colorScheme={color} height='20px'>
        Meta
      </Badge>
      <Text ml={1} fontSize={styles.value.fontSize} color={styles.value.color}>
        {value}
      </Text>
    </>
  );
};

export default Metacritic;
