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
        <Icon as={IoSearchOutline} />
      </InputLeftElement>
      <Input
        value={value}
        onChange={(e) => change(e.target.value)}
        placeholder='Search movie titles'
        rounded='2xl'
        border='2px'
        borderColor={"gray.100"}
      />
      {value !== "" && (
        <InputRightElement>
          <IconButton
            icon={<Icon as={IoClose} color='gray.200' />}
            size='xs'
            onClick={() => clear()}
          />
        </InputRightElement>
      )}
    </InputGroup>
  );
};

export default SearchBar;
