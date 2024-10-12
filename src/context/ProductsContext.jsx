import { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { userContext } from "./UserContext";

export const productsContext = createContext();

const ProductsContextProvider = ({ children }) => {
  const { userToken } = useContext(userContext);
  const [fetchProducts, setFetchProducts] = useState(false);

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
    enabled: !!userToken && fetchProducts === true,
  });

  return (
    <productsContext.Provider
      value={{
        products: products?.data?.products,
        isLoading,
        isError,
        refetchProducts,
        setFetchProducts,
      }}
    >
      {children}
    </productsContext.Provider>
  );
};

export default ProductsContextProvider;
