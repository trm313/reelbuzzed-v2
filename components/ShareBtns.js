import React, { useState, useEffect } from "react";
import { Flex, Text, Button, Icon, Box, useToast } from "@chakra-ui/react";
import {
  IoShareSocialOutline,
  IoQrCodeOutline,
  IoLinkOutline,
} from "react-icons/io5";
import QRCode from "react-qr-code";
import * as gtag from "../lib/gtag";

// Navigator.share()
// https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share

const styles = {
  btn: {
    size: "sm",
    w: 100,
    colorScheme: "purple",
  },
};

const Btn = ({ icon, text, func }) => {
  return (
    <Flex
      direction='column'
      justifyContent='center'
      alignItems='center'
      cursor='pointer'
      onClick={func}
      p={4}
      bg='dark.600'
      h={24}
      flexGrow={1}
      rounded='lg'
      _notLast={{ mr: 2 }}
    >
      <Icon as={icon} w={8} h={8} />
      <Text fontSize='xs' textTransform={"uppercase"}>
        {text}
      </Text>
    </Flex>
  );
};

const ShareBtns = ({
  shareText = "Movie Drinking Games",
  shareUrl = "https://reelbuzzed.com",
}) => {
  const toast = useToast();

  const [isCopied, setIsCopied] = useState(false);
  const [isQRShowing, setIsQRShowing] = useState(false);
  const [hasWindow, setHasWindow] = useState(typeof window === "object");

  let shareMeta = {
    title: "Reel Buzzed",
    text: shareText,
    url: shareUrl,
  };

  const share = () => {
    gtag.event({
      action: "Native Share",
      category: "Share",
    });
    navigator.share(shareMeta);
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(shareUrl);
    setIsCopied(true);
    gtag.event({
      action: "Copy Link",
      category: "Share",
    });
    toast({
      title: "URL Copied!",
      duration: 1000,
      isClosable: false,
      status: "success",
    });
  };

  const toggleQR = () => {
    if (!isQRShowing) {
      gtag.event({
        action: "Open QR",
        category: "Share",
      });
    }
    setIsQRShowing(!isQRShowing);
  };

  return (
    <Flex direction='column' w='full' maxW='xl'>
      <Flex justifyContent='space-evenly'>
        {hasWindow && navigator.canShare && (
          <Btn icon={IoShareSocialOutline} text='Share' func={share} />
        )}

        {hasWindow && <Btn icon={IoLinkOutline} text={"Copy"} func={copyUrl} />}

        <Btn
          icon={IoQrCodeOutline}
          text={isQRShowing ? "Close QR" : "QR Code"}
          func={toggleQR}
        />
      </Flex>

      {isQRShowing && (
        <Flex
          direction='column'
          alignItems='center'
          bg='white'
          p={6}
          mt={4}
          mx='auto'
        >
          <Box maxW={250}>
            <QRCode
              value={shareUrl}
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              viewBox={`0 0 256 256`}
            />
          </Box>
        </Flex>
      )}
    </Flex>
  );
};

export default ShareBtns;
