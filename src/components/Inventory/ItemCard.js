import {
  Badge,
  Button,
  Flex,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { MdCurrencyRupee } from "react-icons/md";
import EditItem from "@/components/Modal/EditItem";

const ItemCard = ({ item }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex color="black" bg="orange.300" width="100%" borderRadius="7pt" mt={2}>
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
      <Flex p={2} width="80%" direction="row">
        <Flex direction="column" width="90%">
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
                bg="#913175"
                // colorScheme="green"
                color="white"
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
                bg="#4E31AA"
                color="white"
                // colorScheme="purple"
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
            <Text>Standards: </Text>
            {item.grades.map((item, index) => (
              <Badge
                variant="subtle"
                bg="#FE6244"
                color="white"
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
        <Flex align="center" justify="center" width="10%">
          <EditItem isOpen={isOpen} onClose={onClose} item={item} />
          <Button
            size="sm"
            onClick={() => {
              onOpen();
            }}
          >
            Edit Item
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ItemCard;
