import React, { createContext, useEffect, useState } from "react";

const DialogStateContext = createContext();

export const DialogStateProvider = ({ children }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  // const [headers, setHeader] = useState("");

  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token !== null) {
      setUserToken(token);
    }
  }, []);

  // const assignHeader = () => {
  //   setHeader({
  //     authorization: `Warhouse ${localStorage.getItem("userToken")}`,
  //   });
  // };

  // useEffect(() => {
  //   if (localStorage.getItem("userToken") !== null) {
  //     assignHeader();
  //     console.log(headers);
  //   }
  // }, []);

  return (
    <DialogStateContext.Provider
      value={{
        dialogOpen,
        setDialogOpen,
        userToken,
        setUserToken,
        // headers,
        // assignHeader,
      }}
    >
      {children}
    </DialogStateContext.Provider>
  );
};

export default DialogStateContext;
