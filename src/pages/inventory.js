import React from "react";
import { auth } from "@/firebase/clientApp";
import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import ItemCard from "@/components/Inventory/ItemCard";
import AddItem from "@/components/Modal/AddItem";

const Inventory = () => {
  const [user] = useAuthState(auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {user ? (
        <Flex margin="20px auto" width="90%" direction="column">
          <Flex align="center" justify="space-between" mb={3} width="100%">
            <Text>Inventory</Text>
            <AddItem isOpen={isOpen} onClose={onClose} />
            <Button
              color="#D8863D"
              size="sm"
              bg="#27201A"
              _hover={{ opacity: 0.7 }}
              onClick={() => onOpen()}
            >
              Add an Item
            </Button>
          </Flex>
          <ItemCard />
        </Flex>
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
