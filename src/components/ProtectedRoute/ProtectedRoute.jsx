import { Navigate } from "react-router-dom";
import { toast } from "../ui/use-toast";

const ProtectedRoute = ({ children }) => {
  if (localStorage.getItem("userToken") !== null) {
    //as component
    return children;
  } else {
    //as component
    toast({
      variant: "destructive",
      title: "يجب تسجيل الدخول اولاً.",
    });
    return <Navigate to={"/login"} />;
  }
};

export default ProtectedRoute;
