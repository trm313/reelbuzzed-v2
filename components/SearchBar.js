import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { IoClose, IoSearchOutline } from "react-icons/io5";

const SearchBar = ({ value, onChangeValue }) => {
  const clear = () => {
    onChangeValue("");
  };

  const change = (v) => {
    onChangeValue(v);
  };

  // Sizing is buggy on input, using `py` to get a bigger size, but have to apply individually on input elements, doesn't work right when just on InputGroup
  const py = 8;

  return (
    <InputGroup
      w='full'
      maxW='xl'
      mx='auto'
      mb={4}
      display='flex'
      alignItems='center'
      size='lg'
    >
      <InputLeftElement fontSize='1.4em' py={py}>
        <Icon as={IoSearchOutline} color='yellow.200' />
      </InputLeftElement>
      <Input
        value={value}
        onChange={(e) => change(e.target.value)}
        placeholder='Search movie titles'
        variant='filled'
        py={py}
        rounded='xl'
        // border='1px'
        borderColor={"yellow.200"}
        bg='dark.600'
        color='light.600'
        _placeholder={{ opacity: 0.6, color: "light.600" }}
        _hover={{ bg: "dark.600" }}
        _focus={{ borderColor: "yellow.600" }}
      />
      {value !== "" && (
        <InputRightElement py={py}>
          <IconButton
            icon={<Icon as={IoClose} />}
            size='xs'
            onClick={() => clear()}
            bg='dark.400'
          />
        </InputRightElement>
      )}
    </InputGroup>
  );
};

export default SearchBar;
