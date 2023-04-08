import { firestore } from "@/firebase/clientApp";
import {
  Button,
  Divider,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  InputLeftAddon,
} from "@chakra-ui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import CardComponent from "./CardComponent";

const Right = () => {
  const [number, setNumber] = useState("");
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
      const parentNumber = "+91" + number;
      const orderQuery = query(
        collection(firestore, "confirmedOrders"),
        where("parentInfo", "==", parentNumber)
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

  return (
    <>
      <Flex
        borderRadius="7pt"
        width="100%"
        p={1}
        direction="column"
        // overflow="hidden"
      >
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
              Search for a Confirmed Order
            </Text>
            <Flex align="center">
              <InputGroup>
                <InputLeftAddon bg="orange.300" color="black">
                  +91
                </InputLeftAddon>
                <Input
                  onChange={onChange}
                  value={number}
                  placeholder="Enter Parent's Mobile #"
                  _placeholder={{ fontSize: "10pt" }}
                  borderRadius="7pt"
                />
                <InputRightElement>
                  <Button
                    height="100%"
                    borderRadius="0 7pt 7pt 0"
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
              <Text
                cursor="pointer"
                ml={3}
                color="blue.500"
                onClick={() => {
                  setNumber("");
                  setOrders([]);
                }}
              >
                clear
              </Text>
            </Flex>

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
          overflow="hidden"
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
            <Text align="center" mt={1} fontWeight={800} fontSize="10pt">
              Enter a number to start searching
            </Text>
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default Right;
