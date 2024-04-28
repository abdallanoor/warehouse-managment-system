import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "../shared/Dialog";
import { userContext } from "@/context/UserContext";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

const Logout = ({ setNavOpen }) => {
  const { setUserToken } = useContext(userContext);
  const [dialogOpen, setDialogOpen] = useState(false);

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
    if (setNavOpen) {
      setNavOpen(false);
    }
  };

  const renderDialogTrigger = () => (
    <Button
      variant="ghost"
      onClick={() => setDialogOpen(true)}
      className="justify-start"
    >
      <LogOut className="ml-2 w-5 h-5" />
      تسجيل الخروج
    </Button>
  );

  return (
    <Dialog
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
      dialogTrigger={renderDialogTrigger()}
      alert
      destructive
      dialogTitle="تسجيل الخروج"
      dialogDescription="سيتم تسجيل خروجك من البرنامج."
      actionTitle="تسجيل الخروج"
      handleAction={handleLogout}
    />
  );
};

export default Logout;
