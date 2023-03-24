import React, { useState, useEffect } from "react";
import { auth } from "@/firebase/clientApp";
import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import ItemCard from "@/components/Inventory/ItemCard";
import AddItem from "@/components/Modal/AddItem";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "@/firebase/clientApp";

const Inventory = () => {
  const [user] = useAuthState(auth);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  const itemFetcher = async () => {
    // e.preventDefault();
    setLoading(true);
    if (error) setError("");
    try {
      const itemQuery = query(collection(firestore, "items"));
      const itemDocs = await getDocs(itemQuery);
      const itemData = itemDocs.docs.flatMap((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setItems((prev) => ({
        ...prev,
        itemData,
      }));
    } catch (error) {
      setError(error.message);
      console.log("itemFetcher Error");
    }
    setLoading(false);
  };

  useEffect(() => {
    itemFetcher();
  }, []);
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
          <Button
            color="#D8863D"
            size="sm"
            bg="#27201A"
            _hover={{ opacity: 0.7 }}
            isLoading={loading}
            onClick={itemFetcher}
            margin="10px auto"
          >
            Fetch Items
          </Button>
          {Object.keys(items).length > 0 && (
            <>
              {items.itemData.map((item, index) => (
                <ItemCard item={item} key={index} />
              ))}
            </>
          )}
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
