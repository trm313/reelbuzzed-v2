import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Flex,
  Text,
  Box,
  Icon,
  Avatar,
  AvatarGroup,
  AvatarBadge,
  Heading,
} from "@chakra-ui/react";

const MoviePostersStack = ({ movies }) => {
  const renderAvatars = () => {
    return movies.map((m) => {
      let poster = m.Images[0].thumbnails.large;
      return (
        <Avatar
          key={`moviePoster_${m.Movie}`}
          name={m.Movie}
          src={poster.url}
        />
      );
    });
  };

  return (
    <AvatarGroup
      size='lg'
      max={2}
      spacing='-1.5rem'
      borderColor={"dark.600"}
      // bg='dark.600' // How to change background color
    >
      {renderAvatars()}
    </AvatarGroup>
  );
};

export default MoviePostersStack;
