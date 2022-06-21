import { Flex, Heading, Text } from "@chakra-ui/react";

const SectionWrapper = ({ children, header }) => (
  <Flex direction='column' mt={4}>
    {header && (
      <Heading size='lg' mb={2}>
        {header}
      </Heading>
    )}
    {children}
  </Flex>
);

export default SectionWrapper;
