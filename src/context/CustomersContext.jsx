import { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { userContext } from "./UserContext";

export const customersContext = createContext();

const CustomersContextProvider = ({ children }) => {
  const { userToken } = useContext(userContext);
  const [fetchCustomers, setFetchCustomers] = useState(false);

  // fetch Customers
  function getCustomers() {
    return axios.get(`${import.meta.env.VITE_API_URL}/api/customers`, {
      headers: {
        authorization: `Warhouse ${userToken}`,
      },
    });
  }

  // Fetching Customers using useQuery hook
  const {
    data: customers,
    isLoading,
    isError,
    refetch: refetchCustomers,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
    enabled: !!userToken && fetchCustomers,
  });

  return (
    <customersContext.Provider
      value={{
        customers: customers?.data?.customers,
        isLoading,
        isError,
        refetchCustomers,
        setFetchCustomers,
      }}
    >
      {children}
    </customersContext.Provider>
  );
};

export default CustomersContextProvider;
