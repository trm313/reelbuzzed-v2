import { Flex, Heading, Text } from "@chakra-ui/react";

const SectionWrapper = ({ children, header }) => (
  <Flex direction='column' mt={4}>
    {header && (
      <Heading
        size='sm'
        mb={2}
        color='yellow.400'
        textTransform={"uppercase"}
        fontWeight='regular'
      >
        {header}
      </Heading>
    )}
    {children}
  </Flex>
);

export default SectionWrapper;
