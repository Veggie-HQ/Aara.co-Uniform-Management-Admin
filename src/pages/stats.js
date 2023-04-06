import React, { useState } from "react";
import { auth } from "@/firebase/clientApp";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import OrderCount from "@/components/Stats/Cards/OrderCount";
import ItemCount from "@/components/Stats/Cards/ItemCount";
import Sales from "@/components/Stats/Cards/Sales";
import SalesChart from "@/components/Stats/Charts/SalesChart";
import ItemPieChart from "@/components/Stats/Charts/ItemPieChart";
import ItemBar from "@/components/Stats/Charts/ItemCharts/ItemBar";

const Stats = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      {user ? (
        <Box mt={5} p={5}>
          <Text>Aara Statistics</Text>
          <Flex mt="5" align="center" justify="space-evenly">
            <OrderCount />
            <ItemCount />
            <Sales />
          </Flex>
          <Flex mt="5" width="100%" align="center" justify="space-evenly" p={5}>
            <SalesChart />
            <ItemPieChart />
          </Flex>

          <Flex
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

                  {/* {students.map((item, index) => (
                      <>
                        <option key={index} value={index}>
                          {item.name}
                        </option>
                      </>
                    ))} */}
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
