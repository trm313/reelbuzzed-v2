import Image from "next/image";
import { Text } from "@chakra-ui/react";
import imgIMDBLogo from "../../public/logos/imdb_square.png";
import { styles } from "./Rating";

const IMDB = ({ rating }) => {
  const parseVal = (str) => {
    return str.split("/")[0];
  };
  return (
    <>
      <Image src={imgIMDBLogo} alt={"IMDB Rating"} height={20} width={20} />
      <Text ml={1} fontSize={styles.value.fontSize} color={styles.value.color}>
        {parseVal(rating.Value)}
      </Text>
    </>
  );
};

export default IMDB;
