import Dialog from "../shared/Dialog";
import { useContext } from "react";
import DialogStateContext from "@/context/DialogStateContext";
import { toast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { setIsOpen, setUserToken } = useContext(DialogStateContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setUserToken(null);
    setIsOpen(false);
    navigate("/");
    toast({
      title: "تم تسجيل الخروج بنجاح.",
      description: "لقد تم تسجيل الخروج من حسابك.",
    });
  };

  return (
    <>
      <Dialog
        logout
        alert
        dialogTitle="تسجيل الخروج"
        dialogDescription="سيتم تسجيل خروجك من البرنامج."
        actionTitle="تسجيل الخروج"
        handleAction={handleLogout}
      />
    </>
  );
};

export default Logout;
