import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DialogStateContext from "./DialogStateContext";

export const soldPermissionContext = createContext();

const SoldPermissionContextProvider = ({ children }) => {
  const { userToken } = useContext(DialogStateContext);

  // fetch getSoldPermission
  function getSoldPermission() {
    return axios.get(
      `${import.meta.env.VITE_API_URL}/api/soldpermission/getPreViewProducts`,
      {
        headers: {
          authorization: `Warhouse ${userToken}`,
        },
      }
    );
  }
  function getAllSoldPermission() {
    return axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/api/soldpermission/allSoldPermissionInfo`,
      {
        headers: {
          authorization: `Warhouse ${userToken}`,
        },
      }
    );
  }

  function getSoldPermissionInfo() {
    return axios.get(
      `${import.meta.env.VITE_API_URL}/api/soldpermission/getInfoPermission`,
      {
        headers: {
          authorization: `Warhouse ${userToken}`,
        },
      }
    );
  }

  // Fetching getSoldPermission using useQuery hook
  const {
    data: soldPermissions,
    isLoading,
    isError,
    refetch: refetchSoldPermission,
  } = useQuery({
    queryKey: ["soldPermissions"],
    queryFn: getSoldPermission,
    enabled: !!userToken,
  });

  const {
    data: allSoldPermissions,
    isLoading: allSoldPermissionsLoading,
    isError: allSoldPermissionsError,
    refetch: refetchAllSoldPermissions,
  } = useQuery({
    queryKey: ["allSoldPermissions"],
    queryFn: getAllSoldPermission,
    enabled: !!userToken,
  });

  const {
    data: soldPermissionInfo,
    isLoading: soldPermissionInfoLoading,
    isError: soldPermissionInfoError,
    refetch: refetchsoldPermissionInfo,
  } = useQuery({
    queryKey: ["soldPermissionInfo"],
    queryFn: getSoldPermissionInfo,
    enabled: !!userToken,
  });

  return (
    <soldPermissionContext.Provider
      value={{
        soldPermissions,
        isLoading,
        isError,
        refetchSoldPermission,
        allSoldPermissions,
        refetchAllSoldPermissions,
        allSoldPermissionsLoading,
        allSoldPermissionsError,
        soldPermissionInfo,
        refetchsoldPermissionInfo,
      }}
    >
      {children}
    </soldPermissionContext.Provider>
  );
};

export default SoldPermissionContextProvider;
