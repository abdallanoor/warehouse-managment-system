import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DialogStateContext from "./DialogStateContext";

export const movementsContext = createContext();

const MovementsContextProvider = ({ children }) => {
  const { userToken } = useContext(DialogStateContext);

  // fetch Movements
  function getMovements() {
    return axios.get(`${import.meta.env.VITE_API_URL}/api/movementProduct`, {
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
  } = useQuery({
    queryKey: ["movements"],
    queryFn: getMovements,
    enabled: !!userToken,
  });

  return (
    <movementsContext.Provider value={{ movements, isLoading, isError }}>
      {children}
    </movementsContext.Provider>
  );
};

export default MovementsContextProvider;
