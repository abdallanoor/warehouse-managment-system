import { Navigate } from "react-router-dom";
import { toast } from "../ui/use-toast";

const ProtectedRoute = ({ children }) => {
  if (localStorage.getItem("userToken") !== null) {
    //as component
    return children;
  } else {
    //as component
    toast({
      title: "يجب تسجيل الدخول اولاً.",
    });
    return <Navigate to={"/"} />;
  }
};

export default ProtectedRoute;
