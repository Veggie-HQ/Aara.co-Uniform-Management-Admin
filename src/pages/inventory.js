import React, { useState, useEffect } from "react";
import { auth } from "@/firebase/clientApp";
import {
  Input,
  Button,
  Flex,
  Text,
  useDisclosure,
  InputGroup,
  InputRightElement,
  Box,
} from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import ItemCard from "@/components/Inventory/ItemCard";
import AddItem from "@/components/Modal/AddItem";
import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "@/firebase/clientApp";
import { AiOutlineSearch } from "react-icons/ai";

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

          <form>
            <Flex>
              <InputGroup>
                <Input
                  name="title"
                  placeholder="Search for a Product"
                  type="text"
                  mb={2}
                  color="black"
                  // onChange={onChangeText}
                  fontSize="10pt"
                  _placeholder={{ color: "gray.500" }}
                  _hover={{
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500",
                  }}
                  _focus={{
                    outline: "none",
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500",
                  }}
                  bg="gray.50"
                />
                <InputRightElement>
                  <Button
                    height="100%"
                    fontSize="10pt"
                    fontWeight={700}
                    color="black"
                    bg="orange.300"
                    _hover={{
                      bg: "orange.100",
                    }}
                    // type="submit"
                    // isLoading={loading}
                    size="sm"
                  >
                    <AiOutlineSearch color="red.500" />
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Flex>
          </form>

          <Flex direction="column" align="center" mt={5}>
            <Text fontWeight={800} fontSize="20pt">
              All Items
            </Text>
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
