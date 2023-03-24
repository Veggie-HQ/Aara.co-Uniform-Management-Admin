import ItemCard from "@/components/Inventory/ItemCard";
import Search from "@/components/Inventory/Search";
import AddItem from "@/components/Modal/AddItem";
import { auth, firestore } from "@/firebase/clientApp";
import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

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

          <Search />

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
