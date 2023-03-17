import React from "react";
import { auth } from "@/firebase/clientApp";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import InfoCard from "@/components/Stats/InfoCard";
import BarChart from "@/components/Stats/BarChart";

const Stats = () => {
  const [user] = useAuthState(auth);
  return (
    <>
      {user ? (
        <Box mt={5} p={5} border="1px solid red">
          <Text>Aara Admin Dashboard</Text>
          <Flex mt="5" align="center" justify="space-evenly">
            <InfoCard />
            <InfoCard />
            <InfoCard />
          </Flex>
          <Flex
            mt="5"
            align="center"
            justify="space-evenly"
            // border="1px solid green"
          >
            {/* <BarChart /> */}
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
