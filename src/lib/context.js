import React, { createContext, useContext, useState } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [orderToConfirm, setOrderToConfirm] = useState({});

  const confirmationHandler = (order) => {
    setOrderToConfirm((prev) => ({
      ...prev,
      order,
    }));
  };

  return (
    <Context.Provider
      value={{
        orderToConfirm,
        confirmationHandler,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
