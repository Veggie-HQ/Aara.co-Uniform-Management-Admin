import { useStateContext } from "@/lib/context";
import {
  Divider,
  Flex,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Financials from "./Financials";
import ControlButtons from "./ControlButtons";

const Center = () => {
  const { orderToConfirm } = useStateContext();

  return (
    <Flex width="100%" p={1} justify="center" align="center" direction="column">
      {Object.keys(orderToConfirm).length > 0 ? (
        <>
          <Text fontSize="15pt" fontWeight={800} mb={2}>
            Order Details
          </Text>
          <Divider />
          <TableContainer width="100%" mt={2}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th color="white">Image</Th>
                  <Th color="white">Item</Th>
                  <Th color="white">Size</Th>
                  <Th color="white" isNumeric>
                    Quantity
                  </Th>
                  <Th color="white" isNumeric>
                    Rate
                  </Th>
                  <Th color="white" isNumeric>
                    Amount
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {orderToConfirm.order.cartItems.map((item, index) => (
                  <Tr key={index}>
                    <Td>
                      <Image
                        src={item.imageURL}
                        width="30px"
                        alt={item.title}
                      />
                    </Td>
                    <Td>{item.title}</Td>
                    <Td>{item.size}</Td>
                    <Td isNumeric>{item.quantity}</Td>
                    <Td isNumeric>{item.price}</Td>
                    <Td isNumeric>{item.price * item.quantity}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>

          <Financials />

          <ControlButtons />
        </>
      ) : (
        <>
          <Text align="center" fontWeight={800}>
            No order has been selected
          </Text>
        </>
      )}
    </Flex>
  );
};

export default Center;
