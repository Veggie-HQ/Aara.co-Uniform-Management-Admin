import { Button, Flex } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useStateContext } from "@/lib/context";
import { doc, runTransaction, writeBatch } from "firebase/firestore";
import { firestore } from "@/firebase/clientApp";
import Invoice from "./Invoice";
import { jsPDF } from "jspdf";

const ControlButtons = () => {
  const { balance, orderToConfirm } = useStateContext();

  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [download, allowDownload] = useState(true);
  const [INV, SetINV] = useState(0);

  let currKey = "";
  let currIndex;
  let IN;

  async function PushOrderToDB(order_details) {
    setLoading(true);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_REALTIME_7, {
        method: "POST",
        body: JSON.stringify(order_details),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      currKey = data["name"];

      const res1 = await fetch(process.env.NEXT_PUBLIC_REALTIME_7);
      const data1 = await res1.json().then((res) => {
        let x = Object.keys(res);
        for (let i = 0; i < x.length; i++) {
          if (x[i] === currKey) {
            currIndex = i;

            break;
          }
        }
      });

      // CHANGE INVOICE NUMBER HERE
      IN = 606 + currIndex;

      let modDetails = {
        ...order_details,
        invoice_number: IN,
        date: new Date(),
        balance: order_details.total - balance,
      };

      const res2 = await fetch(process.env.NEXT_PUBLIC_REALTIME_8, {
        method: "POST",
        body: JSON.stringify(modDetails),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data2 = await res2.json();
      SetINV(IN);

      const commDocRef = doc(
        firestore,
        "confirmedOrders",
        `#${IN}-${orderToConfirm.order.studentDetails.name}`
      );
      await runTransaction(firestore, async (transaction) => {
        const commDoc = await transaction.get(commDocRef);
        if (commDoc.exists()) {
          throw new Error(`This Record Exists`);
        }

        transaction.set(commDocRef, {
          ...order_details,
          invoice_number: IN,
          balance: order_details.total - balance,
        });
      });

      const batch = writeBatch(firestore);
      const itemRef = doc(firestore, "clientOrders", order_details.id);
      const newItem = {
        confirmed: true,
        invoice_number: IN,
        balance: order_details.total - balance,
      };
      batch.update(itemRef, newItem);

      await batch.commit();

      setConfirmed(true);

      setTimeout(() => {
        allowDownload(false);
      }, 750);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  const invoiceDownloader = () => {
    let element = document.getElementById("contents");

    let doc = new jsPDF();
    doc.html(element, {
      callback: function (doc) {
        doc.save(`INVOICE #${INV}.pdf`);
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
      <Flex mt={3} width="100%" p={1} align="center" justify="center">
        <Button
          size="sm"
          color="black"
          borderRadius="7pt"
          bg="orange.300"
          isLoading={loading}
          isDisabled={!download}
          onClick={() => PushOrderToDB(orderToConfirm.order)}
          _hover={{ bg: "orange.100" }}
        >
          {confirmed ? "Order Placed" : "Place Order"}
        </Button>
        <Button
          size="sm"
          color="black"
          borderRadius="7pt"
          bg="blue.300"
          _hover={{ bg: "blue.100" }}
          onClick={() => invoiceDownloader()}
          ml={2}
          isDisabled={download}
        >
          Download Invoice
        </Button>
      </Flex>

      <div className="useless">
        <div id="contents">
          <Invoice INV={INV} />
        </div>
      </div>
    </>
  );
};

export default ControlButtons;
