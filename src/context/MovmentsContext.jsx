import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { userContext } from "./UserContext";

export const movementsContext = createContext();

const MovementsContextProvider = ({ children }) => {
  const { userToken } = useContext(userContext);

  // fetch Movements
  function getMovements() {
    return axios.get(`${import.meta.env.VITE_API_URL}/api/productsmovement`, {
      headers: {
        authorization: `Warhouse ${userToken}`,
      },
    });
  }

  // Fetching Movements using useQuery hook
  const {
    data: movements,
    isLoading,
    isError,
    refetch: refetchMovements,
  } = useQuery({
    queryKey: ["movements"],
    queryFn: getMovements,
    enabled: !!userToken,
  });

  return (
    <movementsContext.Provider
      value={{ movements, isLoading, isError, refetchMovements }}
    >
      {children}
    </movementsContext.Provider>
  );
};

export default MovementsContextProvider;
