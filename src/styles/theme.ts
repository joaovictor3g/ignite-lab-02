import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,

  colors: {
    "green.dark": "#015f43",
    green: "#00874f",
    "green.light": "#00B37e",

    blue: "#81D8F7",

    "orange.warning": "#FBA94C",
    "red.error": "#f75A68",

    "gray.900": "#09090A",
    "gray.800": "#121214",
    "gray.700": "#323238",
    "gray.600": "#e1e1e6",
    "gray.500": "#c4c4cc",
    "gray.400": "#8d8d99",

    white: "#ffffff",
  },

  styles: {
    global: {
      body: {
        bg: "gray.900",
        color: "gray.100",
      },
    },
  },
});
