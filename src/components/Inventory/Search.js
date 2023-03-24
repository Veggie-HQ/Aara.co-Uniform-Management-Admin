import React, { useState } from "react";
import {
  Input,
  Button,
  Flex,
  Text,
  useDisclosure,
  InputGroup,
  Checkbox,
  InputRightElement,
  Box,
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "@/firebase/clientApp";
import ItemCard from "./ItemCard";

const grades = ["LKG", "UKG", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const genders = ["Boy", "Girl", "Other"];

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState("");
  const [items, setItems] = useState([]);

  const onSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const onSubmit = async (e) => {
    if (error) setError("");
    e.preventDefault();
    setLoading(true);
    try {
      const itemQuery = query(
        collection(firestore, "items"),
        where(searchText, "in", ["title", "slug"])
      );
      const itemDocs = await getDocs(itemQuery);
      const itemData = itemDocs.docs.flatMap((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setItems((prev) => ({
        ...prev,
        itemData,
      }));

      console.log(items);
    } catch (error) {
      setError(error.message);
      console.log("onSubmit Error");
    }
    setLoading(false);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <Flex width="100%" margin="0px auto">
          <InputGroup>
            <Input
              name="title"
              placeholder="Search for a Product by Slug"
              type="text"
              mb={2}
              color="black"
              onChange={onSearchText}
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
                type="submit"
                isLoading={loading}
                size="sm"
              >
                <AiOutlineSearch color="red.500" />
              </Button>
            </InputRightElement>
          </InputGroup>
        </Flex>
      </form>
      <Flex width="100%" justify="space-evenly">
        {/* Filters */}
        <Flex
          p={2}
          //   align="center"
          justify="flex-start"
          width="29%"
          bg="orange.200"
          color="black"
          direction="column"
        >
          <Text fontWeight={800}>Standard</Text>
          <select>
            <option value="-1">Select Standard</option>
            {grades.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>

          <Text fontWeight={800} mt={3}>
            Gender
          </Text>
          <select>
            <option value="-1">Select Gender</option>
            {genders.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
        </Flex>
        {/* Items */}
        <Flex width="69%" bg="rgba(255, 255, 255, 0.2)">
          {Object.keys(items).length > 0 && (
            <>
              {items.itemData.map((item, index) => (
                <ItemCard item={item} key={index} />
              ))}
            </>
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default Search;
