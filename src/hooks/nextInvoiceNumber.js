import { firestore } from "@/firebase/clientApp";
import { useStateContext } from "@/lib/context";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

const useNextInvoiceNumber = () => {
  const [nextInv, setNextInv] = useState(null);
  const { INVHandler } = useStateContext();

  useEffect(() => {
    invoiceFetcher();
  }, []);

  const invoiceFetcher = async () => {
    try {
      const invQuery = query(
        collection(firestore, "confirmedOrders"),
        orderBy("date", "desc"),
        limit(1)
      );
      const invDocs = await getDocs(invQuery);
      const invData = invDocs.docs.flatMap((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setNextInv(invData);
      INVHandler(invData[0].invoice_number + 1);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    nextInv,
    invoiceFetcher,
  };
};

export default useNextInvoiceNumber;
