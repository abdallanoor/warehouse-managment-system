import React, { createContext, useEffect, useState } from "react";

const DialogStateContext = createContext();

export const DialogStateProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [userToken, setUserToken] = useState(null);

  return (
    <DialogStateContext.Provider
      value={{
        isOpen,
        setIsOpen,
        userToken,
        setUserToken,
      }}
    >
      {children}
    </DialogStateContext.Provider>
  );
};

export default DialogStateContext;
