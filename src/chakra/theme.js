import { extendTheme } from "@chakra-ui/react";
import "@fontsource/inter";
import { Button } from "./Button";

export const theme = extendTheme({
  colors: {
    brand: {
      100: "#FF3c00",
    },
  },
  fonts: {
    body: "Inter, sans serif",
  },
  styles: {
    global: () => ({
      body: {
        color: "white",
        bg: "#121212",
      },
    }),
  },
  components: {
    Button,
  },
});
