import { createContext, useContext, useState } from "react";
import { userContext } from "./UserContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const additionPermissionContext = createContext();

const AdditionPermissionContextProvider = ({ children }) => {
  const { userToken } = useContext(userContext);
  const [fetchParchaseInvoices, setFetchParchaseInvoices] = useState(false);

  function getAdditionInvoicesProducts() {
    return axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/api/purchasedProducts/allPurchasedProducts`,
      {
        headers: {
          authorization: `Warhouse ${userToken}`,
        },
      }
    );
  }

  function getAdditionInvoicesInfo() {
    return axios.get(
      `${import.meta.env.VITE_API_URL}/api/purchasedProducts/allPurchasedInfo`,
      {
        headers: {
          authorization: `Warhouse ${userToken}`,
        },
      }
    );
  }

  const {
    data: additionInvoicesProducts,
    isLoading: additionInvoicesProductsLoading,
    isError: additionInvoicesProductsError,
    refetch: refetchAdditionInvoicesProducts,
  } = useQuery({
    queryKey: ["additionInvoicesProducts"],
    queryFn: getAdditionInvoicesProducts,
    enabled: !!userToken && fetchParchaseInvoices,
  });

  const {
    data: additionInvoicesInfo,
    isLoading: additionInvoicesInfoLoading,
    refetch: refetchAdditionInvoicesInfo,
  } = useQuery({
    queryKey: ["additionInvoicesInfo"],
    queryFn: getAdditionInvoicesInfo,
    enabled: !!userToken && fetchParchaseInvoices,
  });

  return (
    <additionPermissionContext.Provider
      value={{
        additionInvoicesProducts:
          additionInvoicesProducts?.data?.allPurchasedProducts,
        additionInvoicesProductsLoading,
        additionInvoicesProductsError,
        refetchAdditionInvoicesProducts,
        additionInvoicesInfo: additionInvoicesInfo?.data?.allPurchasedInfo,
        additionInvoicesInfoLoading,
        refetchAdditionInvoicesInfo,
        setFetchParchaseInvoices,
      }}
    >
      {children}
    </additionPermissionContext.Provider>
  );
};

export default AdditionPermissionContextProvider;
