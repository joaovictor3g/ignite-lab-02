import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { colors } from "./colors";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  colors,
  styles: {
    global: {
      body: {
        bg: "gray.900",
        color: "gray.100",
      },

      fonts: {
        heading: `'Roboto', sans-serif`,
        body: `Roboto, sans-serif`,
      },
    },
  },
});
