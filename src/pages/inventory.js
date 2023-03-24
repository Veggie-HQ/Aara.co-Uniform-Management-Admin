import React from "react";
import { auth } from "@/firebase/clientApp";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";

const Inventory = () => {
  const [user] = useAuthState(auth);
  return (
    <>
      {user ? (
        <Box mt={5} p={5} border="1px solid red">
          <Text>Aara Admin Dashboard</Text>
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

export default Inventory;
