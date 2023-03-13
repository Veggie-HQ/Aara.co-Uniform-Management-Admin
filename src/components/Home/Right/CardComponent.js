import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  Box,
  StackDivider,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";
import Invoice from "./Invoice";
import { jsPDF } from "jspdf";

const CardComponent = ({ data }) => {
  const invoiceDownloader = () => {
    let element = document.getElementById("contents");

    let doc = new jsPDF();
    doc.html(element, {
      callback: function (doc) {
        doc.save(`INVOICE #${data.invoice_number}.pdf`);
      },
      margin: [2.5, 0, 0, 10],
      autoPaging: "text",
      x: 0,
      y: 0,
      width: 175,
      windowWidth: 1000,
    });
  };

  return (
    <>
      <Card mb={2} width="100%" overflowY="scroll">
        <CardHeader>
          <Flex align="center">
            <Heading size="lg" fontSize="10pt">
              Invoice Number:
            </Heading>
            <Heading size="sm" color="orange.500" ml={1}>
              {data.invoice_number}
            </Heading>
          </Flex>
          <Flex align="center">
            <Heading size="sm" fontSize="10pt">
              Student Name:
            </Heading>
            <Heading size="sm" color="orange.500" ml={1}>
              {data.studentDetails.name}
            </Heading>
          </Flex>
          <Flex align="center">
            <Heading size="sm" fontSize="10pt">
              Going to Class:
            </Heading>
            <Heading size="sm" color="orange.500" ml={1}>
              {data.studentDetails.goingToClass}
            </Heading>
          </Flex>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="2">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Order Summary
              </Heading>
              {data.cartItems.map((item, index) => (
                <Flex key={index} direction="column">
                  <Flex align="center" justify="space-between">
                    <Text>{item.title}</Text>
                    <Text>{item.quantity}</Text>
                  </Flex>
                </Flex>
              ))}
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Bill Overview
              </Heading>

              <Flex direction="column">
                <Flex align="center" mt={0.5}>
                  <Text fontWeight={800} fontSize="10pt">
                    Total:{" "}
                  </Text>
                  <Text
                    fontWeight={800}
                    fontSize="10pt"
                    color="orange.500"
                    ml={1}
                  >
                    {data.total}
                  </Text>
                </Flex>
              </Flex>
            </Box>

            <Button
              onClick={() => {
                invoiceDownloader();
              }}
            >
              Download Invoice
            </Button>
          </Stack>
        </CardBody>
      </Card>

      <div className="useless">
        <div id="contents">
          <Invoice data={data} />
        </div>
      </div>
    </>
  );
};

export default CardComponent;
