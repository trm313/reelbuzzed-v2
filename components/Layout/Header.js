import { Flex, Spacer, Text, Divider, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import HomeButton from "../HomeButton";

const Header = () => {
  const router = useRouter();

  console.log("Header", router);
  return (
    <Flex px={8} direction='column'>
      <Flex w='100%' maxW='4xl' mx='auto' p={4} justifyContent='space-between'>
        {router.asPath === "/" ? <Spacer /> : <HomeButton />}
        <Flex direction='column' flexGrow={1} alignItems='center'>
          <Heading>ReelBuzzed</Heading>
          <Text>No Frills Movie Drinking Games</Text>
        </Flex>

        <Spacer />
      </Flex>
      <Divider />
    </Flex>
  );
};

export default Header;
