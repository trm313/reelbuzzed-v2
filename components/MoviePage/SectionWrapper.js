import { Flex, Heading, Text } from "@chakra-ui/react";

const SectionWrapper = ({ children, header }) => (
  <Flex direction='column' my={4} w='full'>
    {header && (
      <Heading
        size='sm'
        mb={2}
        color='yellow.400'
        textTransform={"uppercase"}
        // fontWeight='regular'
      >
        {header}
      </Heading>
    )}
    {children}
  </Flex>
);

export default SectionWrapper;
