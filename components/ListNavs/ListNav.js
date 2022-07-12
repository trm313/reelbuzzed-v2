import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Flex, Text, Box, Icon } from "@chakra-ui/react";

import { BsCameraReels, BsTree, BsTreeFill } from "react-icons/bs";
import {
  IoPeopleCircle,
  IoPeopleCircleOutline,
  IoTrophyOutline,
} from "react-icons/io5";
import { GiDrinking, GiDiamondRing } from "react-icons/gi";

const iconMapping = {
  "christmas": BsTree,
  "dynamic-duos": IoPeopleCircleOutline,
  "boozy": GiDrinking,
  "featured": IoTrophyOutline,
  "wedding-season": GiDiamondRing,
  "default": BsCameraReels,
};

const ListNav = ({ list }) => {
  let icon = iconMapping["default"];
  if (iconMapping.hasOwnProperty(list.Slug)) {
    icon = iconMapping[list.Slug];
  }

  let iconSizes = [6, 8];

  return (
    <Link href={`/lists/${list.Slug}`}>
      <Flex
        bg='dark.600'
        flexGrow={1}
        alignItems='center'
        justifyContent={["flex-start", "center"]}
        py={6}
        px={6}
        m={1}
        rounded='lg'
        w={[200, 300]}
        cursor='pointer'
        _hover={{ bg: "dark.400" }}
      >
        <Icon as={icon} h={iconSizes} w={iconSizes} mr={4} color='yellow.400' />
        <Text fontSize={["md", "xl"]}>{list.Name} Games</Text>
      </Flex>
    </Link>
  );
};

export default ListNav;
