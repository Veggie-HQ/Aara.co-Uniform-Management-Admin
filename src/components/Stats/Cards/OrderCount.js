import { firestore } from "@/firebase/clientApp";
import { Box, Card, CardBody, Flex, Image, Text } from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
const OrderCount = () => {
  const [totalOrderCount, setOrderCount] = useState(0);

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
    setOrderCount(orders.length);
  };

  return (
    <Box width="31%" maxWidth="400px" borderRadius="7pt">
      <Card color="white" bg="rgba(255, 255, 255, 0.2)">
        <CardBody>
          <Flex width="100%" p={2}>
            <Flex width="70%" p={1} direction="column">
              <Flex fontWeight={900} align="center">
                {/* <Icon as={MdCurrencyRupee} height="15pt" width="15pt" /> */}
                <Text fontSize="15pt">{totalOrderCount}</Text>
              </Flex>
              <Text color="gray.400">Total Orders</Text>
            </Flex>
            <Flex
              width="30%"
              p={1}
              align="center"
              justify="center"
              borderRadius="7pt"
            >
              <Image src="/assets/orders.png" alt="Orders" />
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </Box>
  );
};

export default OrderCount;
