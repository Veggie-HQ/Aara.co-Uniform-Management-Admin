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

const CardComponent = ({ data }) => {
  return (
    <Card mb={2} width="100%">
      <CardHeader>
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
              console.log(data);
            }}
          >
            Select Order
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default CardComponent;
