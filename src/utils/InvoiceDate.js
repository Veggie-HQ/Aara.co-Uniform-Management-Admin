import { Text } from "@chakra-ui/react";
import React from "react";

const InvoiceDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "/" + mm + "/" + yyyy;

  return (
    <Text fontSize={"12pt"} fontWeight={800}>
      Invoice Date: {formattedToday}
    </Text>
  );
};

export default InvoiceDate;
