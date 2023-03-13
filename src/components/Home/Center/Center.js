import React from "react";
import { useStateContext } from "@/lib/context";
import {
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

const Center = () => {
  const { orderToConfirm } = useStateContext();
  console.log("IN CENTER", orderToConfirm);

  return (
    <Flex
      width="100%"
      border="1px solid blue"
      p={1}
      justify="center"
      align="center"
    >
      {Object.keys(orderToConfirm).length > 0 ? (
        <>
          <TableContainer width="100%">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Item</Th>
                  <Th>Size</Th>
                  <Th isNumeric>Quantity</Th>
                  <Th isNumeric>Rate</Th>
                  <Th isNumeric>Amount</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                  <Td isNumeric>25.4</Td>
                </Tr>
                <Tr>
                  <Td>feet</Td>
                  <Td>centimetres (cm)</Td>
                  <Td isNumeric>30.48</Td>
                </Tr>
                <Tr>
                  <Td>yards</Td>
                  <Td>metres (m)</Td>
                  <Td isNumeric>0.91444</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
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
