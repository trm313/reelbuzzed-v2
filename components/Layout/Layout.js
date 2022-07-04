import { Flex, Text } from "@chakra-ui/react";

import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => (
  <Flex
    direction='column'
    p={4}
    h={"full"}
    minH={"100vh"}
    bg='dark.800'
    color='light.600'
  >
    <Header />
    <Flex direction='column' flexGrow={1}>
      {children}
    </Flex>

    <Footer />
  </Flex>
);

export default Layout;
