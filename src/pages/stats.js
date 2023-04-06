import React from "react";
import { auth } from "@/firebase/clientApp";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import OrderCount from "@/components/Stats/Cards/OrderCount";
import ItemCount from "@/components/Stats/Cards/ItemCount";
import Sales from "@/components/Stats/Cards/Sales";
import SalesChart from "@/components/Stats/Charts/SalesChart";
import ItemPieChart from "@/components/Stats/Charts/ItemPieChart";

const Stats = () => {
  const [user] = useAuthState(auth);
  return (
    <>
      {user ? (
        <Box mt={5} p={5} border="1px solid red">
          <Text>Aara Admin Dashboard</Text>
          <Flex mt="5" align="center" justify="space-evenly">
            <OrderCount />
            <ItemCount />
            <Sales />
          </Flex>
          <Flex mt="5" width="100%" align="center" justify="space-evenly">
            <SalesChart />
            <ItemPieChart />
          </Flex>
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
