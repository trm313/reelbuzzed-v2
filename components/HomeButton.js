import { Flex, Button, Icon, IconButton } from "@chakra-ui/react";
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";

const HomeButton = () => (
  <Link href='/'>
    <IconButton
      icon={<Icon as={IoArrowBack} />}
      size={"md"}
      aria-label='Return to Home'
      colorScheme='gray'
    />
  </Link>
);

export default HomeButton;
