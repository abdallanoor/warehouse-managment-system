import { createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const productsContext = createContext();

const ProductsContextProvider = ({ children }) => {
  // fetch all products
  function getAllProducts() {
    return axios.get(`${import.meta.env.VITE_API_URL}/api/storageProducts`, {
      headers: {
        authorization: `Warhouse ${localStorage.getItem("userToken")}`,
      },
    });
  }

  // Fetching products using useQuery hook
  const {
    data: allproducts,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
  });

  return (
    <productsContext.Provider
      value={{ allproducts, isLoading, isError, refetch }}
    >
      {children}
    </productsContext.Provider>
  );
};

export default ProductsContextProvider;
