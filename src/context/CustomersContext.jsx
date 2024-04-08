import { createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const customersContext = createContext();

const CustomersContextProvider = ({ children }) => {
  // fetch Customers
  function getCustomers() {
    return axios.get(`${import.meta.env.VITE_API_URL}/api/customers`, {
      headers: {
        authorization: `Warhouse ${localStorage.getItem("userToken")}`,
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
  });

  return (
    <customersContext.Provider
      value={{ customers, isLoading, isError, refetchCustomers }}
    >
      {children}
    </customersContext.Provider>
  );
};

export default CustomersContextProvider;
