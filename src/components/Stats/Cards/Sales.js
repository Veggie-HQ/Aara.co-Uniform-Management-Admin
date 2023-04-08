import { Box, Card, CardBody, Flex, Image, Text, Icon } from "@chakra-ui/react";
import { MdCurrencyRupee } from "react-icons/md";
import { firestore } from "@/firebase/clientApp";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const OrderCount = () => {
  const [totalSales, setSales] = useState(0.0);

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
    calculateTotal(orders);
  };

  const calculateTotal = (orders) => {
    let total = 0.0;
    for (let i = 0; i < orders.length; i++) {
      // console.log(orders[i]["total"] - orders[i]["balance"]);
      total += orders[i]["total"] - orders[i]["balance"];
    }
    setSales(total);
  };
  return (
    <Box maxWidth="400px" width="30%" borderRadius="7pt">
      <Card color="white" bg="rgba(255, 255, 255, 0.2)">
        <CardBody>
          <Flex width="100%" p={2}>
            <Flex width="70%" p={1} direction="column">
              <Flex fontWeight={900} align="center">
                <Icon as={MdCurrencyRupee} height="15pt" width="15pt" />
                {/* <Text fontSize="15pt">{totalSales}</Text> */}
              </Flex>
              <Text color="gray.400">Total Sales</Text>
            </Flex>
            <Flex
              width="30%"
              p={1}
              align="center"
              justify="center"
              borderRadius="7pt"
            >
              <Image src="/assets/sales.png" alt="Sales" />
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </Box>
  );
};

export default OrderCount;
