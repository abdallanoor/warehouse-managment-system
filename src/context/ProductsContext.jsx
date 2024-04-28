import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { userContext } from "./UserContext";

export const productsContext = createContext();

const ProductsContextProvider = ({ children }) => {
  const { userToken } = useContext(userContext);

  // fetch all products
  function getProducts() {
    return axios.get(`${import.meta.env.VITE_API_URL}/api/storageProducts`, {
      headers: {
        authorization: `Warhouse ${userToken}`,
      },
    });
  }

  // Fetching products using useQuery hook
  const {
    data: products,
    isLoading,
    isError,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    enabled: !!userToken,
  });

  return (
    <productsContext.Provider
      value={{ products, isLoading, isError, refetchProducts }}
    >
      {children}
    </productsContext.Provider>
  );
};

export default ProductsContextProvider;
