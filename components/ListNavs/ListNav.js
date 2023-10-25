import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Flex, Text, Box, Icon, Avatar, AvatarGroup } from "@chakra-ui/react";

import { BsCameraReels, BsTree, BsTreeFill } from "react-icons/bs";
import {
  IoPeopleCircle,
  IoPeopleCircleOutline,
  IoTrophyOutline,
} from "react-icons/io5";
import { GiDrinking, GiDiamondRing } from "react-icons/gi";

// import exampleMoviePoster from "../../public/img/example-movie-poster.jpg";

const iconMapping = {
  "christmas": BsTree,
  "dynamic-duos": IoPeopleCircleOutline,
  "boozy": GiDrinking,
  "featured": IoTrophyOutline,
  "wedding-season": GiDiamondRing,
  "default": BsCameraReels,
};

const exampleMoviePoster = "/img/example-movie-poster.jpg";

const ListNav = ({ list }) => {
  // let poster = movie.Images[0].thumbnails.large;

  const maxThumbnails = 3;
  const displayedImages = list.Movies.slice(0, maxThumbnails);
  const extraCount =
    list.Movies.length > maxThumbnails
      ? list.Movies.length - maxThumbnails
      : null;

  let icon = iconMapping["default"];
  if (iconMapping.hasOwnProperty(list.Slug)) {
    icon = iconMapping[list.Slug];
  }

  let iconSizes = [6, 8];

  // console.log("list", list);

  const renderMoviePosterThumbnails = () => {
    let max = 3;
    let movieCount = list.Movies.length;
    let showMore = false;
    if (movieCount <= max) showMore = true;

    let thumbNails = list.Movies.slice(0, max).map((m, i) => (
      <Box
        key={`thumbnail-${i}`}
        h={50}
        w={50}
        border='2px solid'
        borderColor={"white"}
        // overflow='hidden'
        position={"relative"}
      >
        <Image
          src={exampleMoviePoster}
          alt='Movie poster'
          height={148}
          width={100}
        />
      </Box>
    ));

    if (movieCount > max)
      thumbNails.push(
        <Box
          h={50}
          w={50}
          border='2px solid'
          borderColor={"white"}
          bg='dark.800'
        ></Box>
      );

    return thumbNails.map((t) => t);
  };

  return (
    <Link href={`/lists/${list.Slug}`}>
      <Box
        display='flex'
        alignItems='center'
        position='relative'
        width='250px'
        height='50px'
        bg='dark.600'
        py={6}
        px={6}
        rounded='lg'
        cursor='pointer'
        _hover={{ bg: "dark.400" }}
      >
        <Text fontSize={["md"]}>{list.Name} Games</Text>

        {/* {displayedImages.map((src, index) => (
          <CircleThumbnail
            key={index}
            src={"/img/example-movie-poster.jpg"}
            offset={index * 10 + "px"}
          />
        ))}

        {extraCount && (
          <CircleThumbnail
            offset={
              displayedImages.length * 10 + 10 * displayedImages.length + "px"
            }
            extraCount={extraCount}
          />
        )} */}
      </Box>
    </Link>
  );

  // return (
  //   <Link href={`/lists/${list.Slug}`}>
  //     <Flex
  //       bg='dark.600'
  //       flexGrow={1}
  //       alignItems='center'
  //       // justifyContent={"center"}
  //       justifyContent={"space-between"}
  //       py={6}
  //       px={6}
  //       m={1}
  //       rounded='lg'
  //       // w={[200, 300]}
  //       cursor='pointer'
  //       _hover={{ bg: "dark.400" }}
  //     >
  //       {/* <Icon as={icon} h={iconSizes} w={iconSizes} mr={4} color='yellow.400' /> */}
  //       <Text fontSize={["md", "xl"]}>{list.Name} Games</Text>
  //       <Flex>
  //         {/* {renderMoviePosterThumbnails()} */}
  //         <ThumbnailComponent images={images} />
  //         {/* {list.Movies.map((m, index) => {
  //           let max = 3;
  //           if (index < max) {
  //             // let translateDistance_px = -1 * index * 15;
  //             let translateDistance_px = (max - 1 - index) * 15;
  //             return (
  //               <Box
  //                 h={50}
  //                 w={50}
  //                 border='2px solid'
  //                 borderColor={"white"}
  //                 overflow='hidden'
  //                 objectFit={"cover"}
  //                 position='relative'
  //                 rounded='full'
  //                 // transform={`translateX(${translateDistance_px}px)`}
  //               >
  //                 <Image
  //                   key={`list-${index}`}
  //                   src={exampleMoviePoster}
  //                   alt='Movie poster'
  //                   // width={200} // img dimension: 300px width, 444px height
  //                   // height={296}
  //                   fill={true}
  //                 />
  //               </Box>
  //             );
  //           } else if (index === max) {
  //             return (
  //               <Flex
  //                 h={50}
  //                 w={50}
  //                 bg='dark.800'
  //                 border='2px solid'
  //                 borderColor={"white"}
  //                 overflow='hidden'
  //                 objectFit={"cover"}
  //                 position='relative'
  //                 rounded='full'
  //                 // transform={`translateX(-${max * 15}px)`}
  //                 justifyContent='center'
  //                 alignItems='center'
  //               >
  //                 {`+${list.Movies.length - max - 1}`}
  //               </Flex>
  //             );
  //           }
  //         })} */}
  //       </Flex>
  //     </Flex>
  //   </Link>
  // );
};

export default ListNav;
