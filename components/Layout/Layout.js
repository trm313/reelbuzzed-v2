import { Flex, Text } from "@chakra-ui/react";

import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => (
  <Flex direction='column'>
    <Header />
    {children}
    <Footer />
  </Flex>
);

export default Layout;
