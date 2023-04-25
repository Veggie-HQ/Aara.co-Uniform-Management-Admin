import React, { useState, useEffect } from "react";
import { auth } from "@/firebase/clientApp";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import OrderCount from "@/components/Stats/Cards/OrderCount";
import ItemCount from "@/components/Stats/Cards/ItemCount";
import Sales from "@/components/Stats/Cards/Sales";
import SalesChart from "@/components/Stats/Charts/SalesChart";
import ItemPieChart from "@/components/Stats/Charts/ItemPieChart";
import ItemBar from "@/components/Stats/Charts/ItemCharts/ItemBar";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "@/firebase/clientApp";

const Stats = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [allOrders, setAllOrders] = useState([]);
  const [orderCount, setTotalOrderCount] = useState(0);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  // useEffect(() => {
  //   orderFetcher();
  // }, []);

  // const orderFetcher = async () => {
  //   setLoading(true);
  //   const orders = [];
  //   try {
  //     const querySnapshot = await getDocs(
  //       collection(firestore, "confirmedOrders")
  //     );
  //     querySnapshot.forEach((doc) => {
  //       orders.push(doc.data());
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setAllOrders(orders);
  //   totalOrders(orders);

  //   setLoading(false);
  // };

  // const totalOrders = (data) => {
  //   for (let i = 0; i < data.length; i++) {
  //     console.log(data[i]);
  //   }
  // };

  return (
    <>
      {user ? (
        <Box mt={5} p={5}>
          <Text>Aara Statistics</Text>
          <Flex mt="5" align="center" justify="space-evenly">
            <OrderCount />
            <ItemCount />
            {/* <Sales /> */}
          </Flex>
          {/* <Flex mt="5" width="100%" align="center" justify="space-evenly" p={5}>
            <SalesChart />
            <ItemPieChart />
          </Flex> */}

          {/* <Flex
            mt="5"
            width="100%"
            align="center"
            justify="space-evenly"
            borderTop="2px solid"
            borderColor="orange.300"
            direction="column"
            p={5}
          >
            <Text fontWeight={700} mb={3}>
              Item-Specific Graph for Quantity per Size
            </Text>

            <form onSubmit={onSubmit}>
              <Flex direction="column">
                <select
                  className="selectTab"
                  placeholder="Select Student"
                  // onChange={onChange}
                >
                  <option value="-1">Select Item to Display Count</option>

                  {students.map((item, index) => (
                      <>
                        <option key={index} value={index}>
                          {item.name}
                        </option>
                      </>
                    ))} 
                </select>
                <Button
                  isLoading={loading}
                  type="submit"
                  bg="white"
                  color="black"
                  mt={2}
                >
                  Generate Graph
                </Button>
              </Flex>
            </form>

            <ItemBar />
          </Flex> */}
        </Box>
      ) : (
        <Flex mt={10} width="100%" align="center" justify="center">
          <Text fontWeight={900} fontSize="15pt">
            Sign in to Access Admin
          </Text>
        </Flex>
      )}
    </>
  );
};

export default Stats;
