import Image from "next/image";
import { Text, Badge } from "@chakra-ui/react";

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
      <Text ml={1}>{value}</Text>
    </>
  );
};

export default Metacritic;
