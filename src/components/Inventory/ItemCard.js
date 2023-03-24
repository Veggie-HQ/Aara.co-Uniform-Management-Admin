import { Badge, Flex, Image, Text } from "@chakra-ui/react";
import { MdCurrencyRupee } from "react-icons/md";

const ItemCard = ({ item }) => {
  return (
    <Flex
      color="black"
      bg="orange.300"
      width="100%"
      height="110px"
      borderRadius="7pt"
      mt={2}
    >
      <Flex
        justify="space-evenly"
        align="center"
        width="20%"
        p={2}
        direction="column"
      >
        <Image src={item.imageURL} width="75px" alt={item.slug} />
        <Text fontSize="8pt">ID: #{item.slug}</Text>
      </Flex>
      <Flex p={2} width="80%" direction="column">
        <Flex align="center">
          <Text>Item Name: </Text>
          <Text ml={1} fontWeight={600}>
            {item.title}
          </Text>
        </Flex>
        <Flex align="center">
          <Text>Item Price: </Text>
          <MdCurrencyRupee width="10pt" ml={1} />
          <Text fontWeight={600}>{item.price}</Text>
        </Flex>
        <Flex align="center">
          <Text>Gender: </Text>
          {item.gender.map((item, index) => (
            <Badge
              colorScheme="green"
              ml={1}
              textTransform="uppercase"
              fontWeight={600}
              key={index}
            >
              {item}
            </Badge>
          ))}
        </Flex>
        <Flex align="center">
          <Text>Sizes: </Text>
          {item.size.map((item, index) => (
            <Badge
              colorScheme="purple"
              ml={1}
              textTransform="uppercase"
              fontWeight={600}
              key={index}
            >
              {item}
            </Badge>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ItemCard;
