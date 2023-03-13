import React, { createContext, useContext, useState } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [orderToConfirm, setOrderToConfirm] = useState({});
  const [balance, setBalance] = useState(0);

  const confirmationHandler = (order) => {
    setOrderToConfirm((prev) => ({
      ...prev,
      order,
    }));
  };

  const handleBalance = (bal) => {
    setBalance(bal);
  };

  return (
    <Context.Provider
      value={{
        orderToConfirm,
        confirmationHandler,
        handleBalance,
        balance,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
