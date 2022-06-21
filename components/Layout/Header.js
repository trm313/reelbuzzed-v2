import { Flex, Spacer, Text, Divider, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";
import HomeButton from "../HomeButton";

const Header = () => {
  const router = useRouter();

  return (
    <Flex px={[0, 8]} direction='column' mb={4}>
      <Flex
        alignItems='center'
        w='100%'
        maxW='4xl'
        mx='auto'
        p={4}
        justifyContent='space-between'
      >
        {router.asPath === "/" ? <Spacer /> : <HomeButton />}
        <Link href='/'>
          <Flex direction='column' flexGrow={1} alignItems='center'>
            <Heading>ReelBuzzed</Heading>
            <Text>No Frills Movie Drinking Games</Text>
          </Flex>
        </Link>
        <Spacer />
      </Flex>
      <Divider />
    </Flex>
  );
};

export default Header;
