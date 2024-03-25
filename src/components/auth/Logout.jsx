import Dialog from "../shared/Dialog";
import { useContext } from "react";
import DialogStateContext from "@/context/DialogStateContext";
import { toast } from "../ui/use-toast";

const Logout = () => {
  const { setIsOpen, setUserToken } = useContext(DialogStateContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserToken(null);

    setIsOpen(false);
    toast({
      title: "تم تسجيل الخروج بنجاح.",
      description: "لقد تم تسجيل الخروج من حسابك.",
    });
  };

  return (
    <>
      <Dialog
        logout
        dialogTitle="تسجيل الخروج"
        dialogDescription="سيتم تسجيل خروجك من البرنامج."
        actionTitle="تسجيل الخروج"
        handleAction={handleLogout}
      />
    </>
  );
};

export default Logout;
