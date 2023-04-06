import { Box, Card, CardBody, Flex, Image, Text } from "@chakra-ui/react";

const ItemCount = () => {
  return (
    <Box width="31%" borderRadius="7pt">
      <Card color="white" bg="rgba(255, 255, 255, 0.2)">
        <CardBody>
          <Flex width="100%" p={2}>
            <Flex width="70%" p={1} direction="column">
              <Flex fontWeight={900} align="center">
                <Text fontSize="15pt">300.30</Text>
              </Flex>
              <Text color="gray.400">Total Items Ordered</Text>
            </Flex>
            <Flex
              width="30%"
              p={1}
              align="center"
              justify="center"
              borderRadius="7pt"
            >
              <Image src="/assets/count.png" alt="Items" />
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </Box>
  );
};

export default ItemCount;
