import { createContext, useEffect, useState } from "react";

export const userContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token !== null) {
      setUserToken(token);
    }
  }, []);

  return (
    <userContext.Provider
      value={{
        userToken,
        setUserToken,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
