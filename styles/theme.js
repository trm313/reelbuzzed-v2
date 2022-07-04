import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

// https://coolors.co/292c26-f5c13d-f8f7f9-987284-422040
const theme = extendTheme({
  config,
  fonts: {
    body: "Roboto, system-ui, sans-serif",
    heading: "Helvetica, Georgia, serif",
  },
  colors: {
    dark: {
      100: "",
      200: "",
      300: "",
      400: "#41463d",
      500: "",
      600: "#292c26",
      700: "",
      800: "#141613",
      900: "",
      default: "#292c26",
    },
    yellow: {
      200: "#fae09e",
      400: "#f8d377",
      600: "#f5c13d",
      800: "#d59c0b",
    },
    light: {
      600: "#f8f7f9",
      default: "#f8f7f9",
    },
    purple: {
      400: "#c3acb7",
      600: "#987284",
      800: "#422040",
    },
  },
});

export default theme;
