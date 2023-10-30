import React from "react";
import { Avatar, AvatarGroup, AvatarBadge } from "@chakra-ui/react";

const MoviePostersStack = ({ movies }) => {
  const renderAvatars = () => {
    return movies.map((m) => {
      return (
        <Avatar
          key={`moviePoster_${m.Movie}`}
          name={m.Movie}
          src={`/posters/${m.id}.png`}
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
      // bg='dark.600' // How to change background color?
      color='dark.600'
    >
      {renderAvatars()}
    </AvatarGroup>
  );
};

export default MoviePostersStack;
