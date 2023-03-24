import React from "react";
import { Flex, Icon, Text } from "@chakra-ui/react";

// size="sm"
// bg="#27201A"

const TabItem = ({ item, selected, setSelectedTab }) => {
  return (
    <Flex
      justify="center"
      align="center"
      flexGrow={1}
      p="14px 0px"
      cursor="pointer"
      transition="0.3s"
      fontWeight={700}
      bg={selected ? "#27201A" : ""}
      color={selected ? "#D8863D" : "gray.500"}
      _hover={{ bg: "#524C47" }}
      onClick={() => setSelectedTab(item.title)}
    >
      <Text fontSize="10pt">{item.title}</Text>
    </Flex>
  );
};

export default TabItem;
