import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DialogStateContext from "./DialogStateContext";

export const productsContext = createContext();

const ProductsContextProvider = ({ children }) => {
  const { userToken } = useContext(DialogStateContext);

  // fetch all products
  function getAllProducts() {
    return axios.get(`${import.meta.env.VITE_API_URL}/api/storageProducts`, {
      headers: {
        authorization: `Warhouse ${userToken}`,
      },
    });
  }

  // Fetching products using useQuery hook
  const {
    data: allproducts,
    isLoading,
    isError,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
    enabled: !!userToken,
  });

  return (
    <productsContext.Provider
      value={{ allproducts, isLoading, isError, refetchProducts }}
    >
      {children}
    </productsContext.Provider>
  );
};

export default ProductsContextProvider;
