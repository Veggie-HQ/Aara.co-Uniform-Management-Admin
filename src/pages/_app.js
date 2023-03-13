import { theme } from "@/chakra/theme";
import Layout from "@/components/Layout";
import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
import { StateContext } from "@/lib/context";
import "@/styles/style.css";

export default function App({ Component, pageProps }) {
  return (
    <StateContext>
      <ChakraProvider theme={theme}>
        <Toaster />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </StateContext>
  );
}
