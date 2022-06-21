import { Flex, Button, Icon } from "@chakra-ui/react";
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";

const HomeButton = () => (
  <Link href='/'>
    <Button leftIcon={<Icon as={IoArrowBack} />}>Home</Button>
  </Link>
);

export default HomeButton;
