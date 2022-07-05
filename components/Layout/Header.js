import { Flex, Spacer, Text, Divider, Heading, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import HomeButton from "../HomeButton";

import beeLogo from "../../public/bee_logo_whiteOutline.png";
import textLogo from "../../public/text_logo_stacked.png";

const Header = () => {
  const router = useRouter();

  return (
    <Flex px={[0, 8]} direction='column' mb={4} bg='dark.800'>
      <Flex
        alignItems='center'
        w='100%'
        maxW='lg'
        mx='auto'
        p={4}
        justifyContent='space-between'
      >
        {router.asPath === "/" ? <Spacer /> : <HomeButton />}

        <Link href='/'>
          <Flex
            direction='column'
            flexGrow={1}
            alignItems='center'
            cursor='pointer'
          >
            <Flex alignItems='center'>
              <Box flexShrink={0} mr={4}>
                <Image
                  src={beeLogo}
                  height={"40px"}
                  width={"40px"}
                  alt='Reel Buzzed Logo'
                />
              </Box>
              <Box flexShrink={0}>
                <Image
                  src={textLogo}
                  height='50px'
                  width='100px'
                  alt='Reel Buzzed'
                />
              </Box>
            </Flex>
            <Heading
              size='sm'
              color='yellow.600'
              fontWeight='regular'
              fontFamily='body'
              textTransform={"uppercase"}
            >
              Movie Drinking Games
            </Heading>
          </Flex>
        </Link>
        <Spacer />
      </Flex>
      <Divider />
    </Flex>
  );
};

export default Header;
