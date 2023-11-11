import { Flex, Text, Container } from "@chakra-ui/react";

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
    <Container maxW='100em'>{children}</Container>
    <Footer />
  </Flex>
);

export default Layout;
