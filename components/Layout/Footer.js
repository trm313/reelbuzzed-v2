import React from "react";
import Link from "next/link";
import { Flex, Text, Divider, Icon } from "@chakra-ui/react";
import { IoBeer } from "react-icons/io5";

const Footer = () => {
  return (
    <Flex direction='column' mt={8}>
      <Divider />
      <Flex direction='column' alignItems='center' mt={4}>
        <Text fontSize='sm' mt={2}>
          Brought to you with <Icon as={IoBeer} /> by Hubbub Studios
        </Text>
        <Text fontSize='sm' mt={2}>
          Drink Responsibly!
        </Text>
        <Link href='/user-agreements'>
          <Text fontSize='sm' mt={2} color={"yellow.600"} cursor='pointer'>
            Terms of Service & Privacy Policy
          </Text>
        </Link>
        <Text fontSize='sm' mt={2}>
          Reel Buzzed © {new Date().getFullYear()}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Footer;
