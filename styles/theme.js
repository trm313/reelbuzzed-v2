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
      600: "#26282C",
      700: "",
      800: "#122022",
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
    // bee: {
    //   50: "#ffebee", // very light bee color
    //   100: "#ffd7b3", // lighter bee color
    //   200: "#ffb97a", // light bee color
    //   300: "#ff9b40", // bee color
    //   400: "#ff7d06", // dark bee color
    //   500: "#e46800", // darker bee color
    //   600: "#b25000", // very dark bee color
    //   700: "#7f3800", // darkest bee color
    // },
    // background: {
    //   900: "#26282C", // primary dark background
    //   800: "#1C1E21", // secondary dark shade
    // },
    // white: {
    //   50: "#f7f7f7", // off white (for text)
    // },
  },
});

export default theme;
