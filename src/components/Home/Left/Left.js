import { firestore } from "@/firebase/clientApp";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  StackDivider,
  Text,
  Divider,
} from "@chakra-ui/react";
import { query, collection, where, getDocs } from "firebase/firestore";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import CardComponent from "./CardComponent";

const Left = () => {
  const [number, setNumber] = useState("+91");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [ORDERS, setOrders] = useState([]);

  const onChange = (event) => {
    setNumber(event.target.value);
    if (event.target.value.length <= 13) {
      setError("");
    }
    if (event.target.value.length > 13)
      setError("Phone # is longer than 10 digits");
  };

  const orderFetcher = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (error) setError("");
    try {
      const orderQuery = query(
        collection(firestore, "clientOrders"),
        where("parentInfo", "==", number)
      );
      const orderDocs = await getDocs(orderQuery);
      const orderData = orderDocs.docs.flatMap((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders((prev) => ({
        ...prev,
        orderData,
      }));
    } catch (error) {
      setError(error.message);
      console.log("orderFetcher Error");
    }
    setLoading(false);
  };

  console.log("ORDERS: ", ORDERS);

  return (
    <>
      <Flex borderRadius="7pt" width="100%" p={1} direction="column">
        <Flex
          width="100%"
          direction="column"
          align="center"
          justify="center"
          mb={3}
          p={1}
        >
          <form onSubmit={orderFetcher}>
            <Text align="center" mb={3} fontWeight={800}>
              Search for an Order
            </Text>

            <InputGroup>
              <Input
                onChange={onChange}
                value={number}
                placeholder="Enter Parent's Mobile #"
                _placeholder={{ fontSize: "10pt" }}
              />
              <InputRightElement>
                <Button
                  borderRadius="7pt"
                  fontSize="10pt"
                  fontWeight={700}
                  color="black"
                  bg="orange.300"
                  _hover={{
                    bg: "orange.100",
                  }}
                  type="submit"
                  isLoading={loading}
                  size="sm"
                >
                  <AiOutlineSearch color="red.500" />
                </Button>
              </InputRightElement>
            </InputGroup>

            <Text mt={1} fontWeight={800} fontSize="10pt" color="red.500">
              {error}
            </Text>
          </form>
        </Flex>
        <Divider />
        <Flex
          mt={3}
          direction="column"
          p={1}
          width="100%"
          align="center"
          justify="center"
        >
          {Object.keys(ORDERS).length > 0 ? (
            <>
              {ORDERS.orderData.length > 0 ? (
                <>
                  {ORDERS.orderData.map((item, index) => (
                    <CardComponent key={index} data={item} />
                  ))}
                </>
              ) : (
                <>
                  <Text
                    align="center"
                    mt={1}
                    fontWeight={800}
                    fontSize="10pt"
                    color="red.500"
                  >
                    No orders exist for this mobile number
                  </Text>
                </>
              )}
            </>
          ) : (
            <Text
              align="center"
              mt={1}
              fontWeight={800}
              fontSize="10pt"
              color="red.500"
            >
              Enter a valid number
            </Text>
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default Left;
