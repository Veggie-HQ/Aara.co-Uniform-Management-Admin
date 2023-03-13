import { Flex } from "@chakra-ui/react";
import React from "react";

const PageLayout = ({ children }) => {
  return (
    <Flex mt={3} position="relative">
      <Flex width="98%" justify="space-evenly" margin="0px auto">
        <Flex
          borderRadius="7pt"
          bg="rgb(228 228 228 / 15%)"
          boxShadow="0px 10px 15px 10px rgb(0 0 0 / 15%)"
          backdropFilter="blur(8px)"
          direction="column"
          width="25%"
          p={1}
        >
          {children && children[0]}
        </Flex>

        <Flex
          ml={2}
          mr={2}
          borderRadius="7pt"
          bg="rgb(242 121 53 / 15%)"
          boxShadow="0px 10px 15px 10px rgb(0 0 0 / 15%)"
          backdropFilter="blur(8px)"
          direction="column"
          width="55%"
          p={1}
        >
          {children && children[1]}
        </Flex>

        <Flex
          borderRadius="7pt"
          bg="rgb(228 228 228 / 15%)"
          boxShadow="0px 10px 15px 10px rgb(0 0 0 / 15%)"
          backdropFilter="blur(8px)"
          direction="column"
          width="25%"
          p={1}
        >
          {children && children[2]}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PageLayout;
