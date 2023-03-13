import React, { useState } from "react";
import { Flex, Input, Text } from "@chakra-ui/react";
import { useStateContext } from "@/lib/context";
import { MdCurrencyRupee } from "react-icons/md";

const Financials = () => {
  const { orderToConfirm, handleBalance } = useStateContext();
  const [balance, setBalance] = useState(0);
  const onChange = (e) => {
    setBalance(e.target.value);
    handleBalance(e.target.value);
  };

  return (
    <Flex width="100%" mt={2}>
      <Flex width="80%"></Flex>
      <Flex width="20%" p={1} direction="column">
        <Flex justify="space-between">
          <Text fontSize="10pt">Taxable Amount:</Text>
          <Flex align="center">
            <MdCurrencyRupee width="10pt" />
            <Text color="orange.500">{orderToConfirm.order.subtotal}</Text>
          </Flex>
        </Flex>

        <Flex justify="space-between">
          <Text fontSize="10pt">CGST @2.5%:</Text>
          <Flex align="center">
            <MdCurrencyRupee width="10pt" />
            <Text color="orange.500">{orderToConfirm.order.gst5Total / 2}</Text>
          </Flex>
        </Flex>

        <Flex justify="space-between">
          <Text fontSize="10pt">SGST @2.5%:</Text>
          <Flex align="center">
            <MdCurrencyRupee width="10pt" />
            <Text color="orange.500">{orderToConfirm.order.gst5Total / 2}</Text>
          </Flex>
        </Flex>

        <Flex justify="space-between">
          <Text fontSize="10pt">CGST @6%:</Text>
          <Flex align="center">
            <MdCurrencyRupee width="10pt" />
            <Text color="orange.500">
              {orderToConfirm.order.gst12Total / 2}
            </Text>
          </Flex>
        </Flex>

        <Flex justify="space-between">
          <Text fontSize="10pt">SGST @6%:</Text>
          <Flex align="center">
            <MdCurrencyRupee width="10pt" />
            <Text color="orange.500">
              {orderToConfirm.order.gst12Total / 2}
            </Text>
          </Flex>
        </Flex>

        <Flex justify="space-between">
          <Text fontSize="10pt">Round Off:</Text>
          <Flex align="center">
            <MdCurrencyRupee width="10pt" />
            <Text color="orange.500">{orderToConfirm.order.roundOff}</Text>
          </Flex>
        </Flex>

        <Flex
          justify="space-between"
          borderTop="1px solid white"
          borderBottom="1px solid white"
          mt={1}
        >
          <Text fontSize="10pt" fontWeight={900}>
            TOTAL AMOUNT
          </Text>
          <Flex align="center">
            <MdCurrencyRupee width="10pt" />
            <Text color="orange.500" fontWeight={900}>
              {orderToConfirm.order.total}
            </Text>
          </Flex>
        </Flex>

        <Flex mt={5}>
          <Flex align="center">
            <Text fontSize="10pt">Received Amount:</Text>
            <Input width="70%" onChange={onChange} value={balance} />
          </Flex>
        </Flex>

        <Flex justify="space-between" mt={3}>
          <Text fontSize="10pt" fontWeight={900}>
            Balance
          </Text>
          <Flex align="center">
            <MdCurrencyRupee width="10pt" />
            <Text color="orange.500" fontWeight={900}>
              {orderToConfirm.order.total - balance}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Financials;
