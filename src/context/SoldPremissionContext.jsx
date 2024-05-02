import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { userContext } from "./UserContext";

export const soldPermissionContext = createContext();

const SoldPermissionContextProvider = ({ children }) => {
  const { userToken } = useContext(userContext);

  function getSoldInvoicesProducts() {
    return axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/api/externalSale/allExternalSaleProducts`,
      {
        headers: {
          authorization: `Warhouse ${userToken}`,
        },
      }
    );
  }

  function getSoldInvoicesInfo() {
    return axios.get(
      `${import.meta.env.VITE_API_URL}/api/externalSale/allExternalSaleInfo`,
      {
        headers: {
          authorization: `Warhouse ${userToken}`,
        },
      }
    );
  }

  // Fetching getSoldPermission using useQuery hook
  const {
    data: soldInvoicesProducts,
    isLoading: soldInvoicesProductsLoading,
    isError: soldInvoicesProductsError,
    refetch: refetchSoldInvoicesProducts,
  } = useQuery({
    queryKey: ["soldInvoicesProducts"],
    queryFn: getSoldInvoicesProducts,
    enabled: !!userToken,
  });

  const {
    data: soldInvoicesInfo,
    isLoading: soldInvoicesInfoLoading,
    refetch: refetchSoldInvoicesInfo,
  } = useQuery({
    queryKey: ["soldInvoicesInfo"],
    queryFn: getSoldInvoicesInfo,
    enabled: !!userToken,
  });

  return (
    <soldPermissionContext.Provider
      value={{
        soldInvoicesProducts:
          soldInvoicesProducts?.data?.allExternalSaleProducts,
        soldInvoicesInfoLoading,
        refetchSoldInvoicesProducts,
        soldInvoicesProductsLoading,
        soldInvoicesProductsError,
        soldInvoicesInfo: soldInvoicesInfo?.data?.allExternalSaleInfo,
        refetchSoldInvoicesInfo,
      }}
    >
      {children}
    </soldPermissionContext.Provider>
  );
};

export default SoldPermissionContextProvider;
