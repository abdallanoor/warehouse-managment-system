import React, { createContext, useEffect, useState } from "react";

const DialogStateContext = createContext();

export const DialogStateProvider = ({ children }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const [userToken, setUserToken] = useState(null);

  return (
    <DialogStateContext.Provider
      value={{
        dialogOpen,
        setDialogOpen,
        userToken,
        setUserToken,
      }}
    >
      {children}
    </DialogStateContext.Provider>
  );
};

export default DialogStateContext;
