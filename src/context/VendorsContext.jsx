import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { userContext } from "./UserContext";

export const vendorsContext = createContext();

const VendorsContextProvider = ({ children }) => {
  const { userToken } = useContext(userContext);

  // fetch Vendors
  function getVendors() {
    return axios.get(`${import.meta.env.VITE_API_URL}/api/vendors`, {
      headers: {
        authorization: `Warhouse ${userToken}`,
      },
    });
  }

  // Fetching Vendors using useQuery hook
  const {
    data: vendors,
    isLoading,
    isError,
    refetch: refetchVendors,
  } = useQuery({
    queryKey: ["vendors"],
    queryFn: getVendors,
    enabled: !!userToken,
  });

  return (
    <vendorsContext.Provider
      value={{ vendors, isLoading, isError, refetchVendors }}
    >
      {children}
    </vendorsContext.Provider>
  );
};

export default VendorsContextProvider;
