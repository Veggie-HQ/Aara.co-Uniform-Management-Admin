import { firestore } from "@/firebase/clientApp";
import { Box, Card, CardBody, Flex, Image, Text } from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const ItemCount = () => {
  const [totalItemsCount, setItemCount] = useState(0);

  useEffect(() => {
    orderFetcher();
  }, []);

  const orderFetcher = async () => {
    const orders = [];
    try {
      const querySnapshot = await getDocs(
        collection(firestore, "confirmedOrders")
      );
      querySnapshot.forEach((doc) => {
        orders.push(doc.data());
      });
    } catch (error) {
      console.log(error);
    }
    calculateItems(orders);
  };

  const calculateItems = (orders) => {
    let total = 0;
    for (let i = 0; i < orders.length; i++) {
      total += orders[i]["cartItems"].length;
    }
    setItemCount(total);
  };

  return (
    <Box maxWidth="400px" width="31%" borderRadius="7pt">
      <Card color="white" bg="rgba(255, 255, 255, 0.2)">
        <CardBody>
          <Flex width="100%" p={2}>
            <Flex width="70%" p={1} direction="column">
              <Flex fontWeight={900} align="center">
                <Text fontSize="15pt">{totalItemsCount}</Text>
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
