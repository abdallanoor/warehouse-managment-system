import { useContext } from "react";
import Login from "./Login";
import Logout from "./Logout";
import DialogStateContext from "@/context/DialogStateContext";

const Auth = () => {
  const { userToken } = useContext(DialogStateContext);

  return <>{userToken ? <Logout /> : <Login />}</>;
};

export default Auth;
