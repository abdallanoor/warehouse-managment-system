import { createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const movementsContext = createContext();

const MovementsContextProvider = ({ children }) => {
  // fetch Movements
  function getMovements() {
    return axios.get(`${import.meta.env.VITE_API_URL}/api/movementProduct`, {
      headers: {
        authorization: `Warhouse ${localStorage.getItem("userToken")}`,
      },
    });
  }

  // Fetching Movements using useQuery hook
  const {
    data: movements,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movements"],
    queryFn: getMovements,
  });

  return (
    <movementsContext.Provider value={{ movements, isLoading, isError }}>
      {children}
    </movementsContext.Provider>
  );
};

export default MovementsContextProvider;
