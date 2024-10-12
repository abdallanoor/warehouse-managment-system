import { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { userContext } from "./UserContext";

export const vendorsContext = createContext();

const VendorsContextProvider = ({ children }) => {
  const { userToken } = useContext(userContext);
  const [fetchVendors, setFetchVendors] = useState(false);

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
    enabled: !!userToken && fetchVendors,
  });

  return (
    <vendorsContext.Provider
      value={{
        vendors: vendors?.data?.vendors,
        isLoading,
        isError,
        refetchVendors,
        setFetchVendors,
      }}
    >
      {children}
    </vendorsContext.Provider>
  );
};

export default VendorsContextProvider;
