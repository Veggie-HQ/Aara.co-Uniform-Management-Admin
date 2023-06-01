import useNextInvoiceNumber from "@/hooks/nextInvoiceNumber";
import { useStateContext } from "@/lib/context";
import {
  Button,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiTwotoneSetting } from "react-icons/ai";

const Info = () => {
  const [customInv, setCustomInv] = useState("En");
  const { INV, INVHandler } = useStateContext();
  const { nextInv, invoiceFetcher } = useNextInvoiceNumber();

  const onChangeINV = (e) => {
    setCustomInv(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    INVHandler(Number(customInv));
    setCustomInv("");
  };

  useEffect(() => {
    invoiceFetcher();
  }, []);

  console.log("INVOICE NUMBER", INV);

  return (
    <Flex
      width="100%"
      p={2}
      pb={5}
      borderBottom="1px solid"
      justify="space-between"
    >
      <Flex width="49%" direction="column">
        <Heading as="h3" size="lg">
          Next Invoice #
        </Heading>
        {nextInv && (
          <Heading as="h3" size="lg" color="orange.300">
            {INV}
          </Heading>
        )}
      </Flex>
      <Flex width="49%" direction="column">
        <Heading as="h3" size="lg">
          Set New Starting Invoice Number
        </Heading>
        <form onSubmit={onSubmit}>
          <InputGroup mt={2}>
            <Input
              placeholder="Enter new Invoice #"
              value={customInv}
              bg="white"
              color="black"
              type="number"
              onChange={onChangeINV}
            />
            <InputRightElement>
              <Button
                height="100%"
                fontSize="10pt"
                fontWeight={700}
                color="black"
                bg="orange.300"
                _hover={{
                  bg: "orange.600",
                }}
                type="submit"
              >
                <Icon as={AiTwotoneSetting} height="20pt" />
              </Button>
            </InputRightElement>
          </InputGroup>
        </form>
      </Flex>
    </Flex>
  );
};

export default Info;
