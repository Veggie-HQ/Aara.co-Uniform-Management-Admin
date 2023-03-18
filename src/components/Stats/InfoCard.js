import { Box, Card, CardBody, Flex, Icon, Text } from "@chakra-ui/react";
import { FcSalesPerformance } from "react-icons/fc";
import { MdCurrencyRupee } from "react-icons/md";

const InfoCard = () => {
  return (
    <Box width="31%" borderRadius="7pt">
      <Card color="white" bg="rgba(255, 255, 255, 0.2)">
        <CardBody>
          <Flex width="100%" p={2}>
            <Flex width="70%" p={1} direction="column">
              <Flex fontWeight={900} align="center">
                <Icon as={MdCurrencyRupee} height="15pt" width="15pt" />
                <Text fontSize="15pt">300.30</Text>
              </Flex>
              <Text color="gray.400">Total Sales</Text>
            </Flex>
            <Flex
              width="30%"
              p={1}
              align="center"
              justify="center"
              borderRadius="7pt"
              bg="blue.800"
            >
              <Icon as={FcSalesPerformance} width="80%" height="80%" />
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </Box>
  );
};

export default InfoCard;