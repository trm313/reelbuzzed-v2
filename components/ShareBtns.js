import React, { useState, useEffect } from "react";
import { Flex, Text, Button, Icon, Box } from "@chakra-ui/react";
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

const ShareBtns = ({
  shareText = "Movie Drinking Games",
  shareUrl = "https://reelbuzzed.com",
}) => {
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
    <Flex direction='column'>
      <Flex>
        {hasWindow && navigator.canShare && (
          <Button
            leftIcon={<Icon as={IoShareSocialOutline} />}
            onClick={() => share()}
            mr={2}
            w={styles.btn.w}
            size={styles.btn.size}
            colorScheme={styles.btn.colorScheme}
          >
            Share
          </Button>
        )}

        {hasWindow && (
          <Button
            leftIcon={<Icon as={IoLinkOutline} />}
            onClick={() => copyUrl()}
            onBlur={() => setIsCopied(false)}
            w={styles.btn.w}
            size={styles.btn.size}
            mr={2}
            colorScheme={styles.btn.colorScheme}
          >
            {isCopied ? "Copied!" : "Copy"}
          </Button>
        )}

        <Button
          leftIcon={<Icon as={IoQrCodeOutline} />}
          w={styles.btn.w}
          size={styles.btn.size}
          onClick={() => toggleQR()}
          colorScheme={styles.btn.colorScheme}
        >
          {isQRShowing ? "Hide QR" : "QR Code"}
        </Button>
      </Flex>
      {isQRShowing && (
        <Flex direction='column' alignItems='center' bg='white' p={6}>
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
