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
        <Icon as={IoSearchOutline} color='dark.800' />
      </InputLeftElement>
      <Input
        value={value}
        onChange={(e) => change(e.target.value)}
        placeholder='Search movie titles'
        rounded='xl'
        border='1px'
        borderColor={"yellow.200"}
        bg='yellow.400'
        color='dark.800'
        _placeholder={{ opacity: 0.6, color: "dark.800" }}
      />
      {value !== "" && (
        <InputRightElement>
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
