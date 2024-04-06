import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "../shared/Dialog";
import DialogStateContext from "@/context/DialogStateContext";
import { toast } from "../ui/use-toast";

const Logout = () => {
  const { setDialogOpen, dialogOpen, setUserToken } =
    useContext(DialogStateContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setUserToken(null);
    setDialogOpen(false);
    navigate("/");
    toast({
      title: "تم تسجيل الخروج بنجاح.",
      description: "لقد تم تسجيل الخروج من حسابك.",
    });
  };

  return (
    <Dialog
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
      logout
      alert
      dialogTitle="تسجيل الخروج"
      dialogDescription="سيتم تسجيل خروجك من البرنامج."
      actionTitle="تسجيل الخروج"
      handleAction={handleLogout}
    />
  );
};

export default Logout;
