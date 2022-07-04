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

  return (
    <InputGroup w={["100%", "md", "xl"]} mx='auto' mb={4}>
      <InputLeftElement>
        <Icon as={IoSearchOutline} color='yellow.200' />
      </InputLeftElement>
      <Input
        value={value}
        onChange={(e) => change(e.target.value)}
        placeholder='Search movie titles'
        rounded='2xl'
        border='1px'
        borderColor={"yellow.200"}
      />
      {value !== "" && (
        <InputRightElement>
          <IconButton
            icon={<Icon as={IoClose} />}
            size='xs'
            onClick={() => clear()}
            colorScheme='yellow'
          />
        </InputRightElement>
      )}
    </InputGroup>
  );
};

export default SearchBar;
