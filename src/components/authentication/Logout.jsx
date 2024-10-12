import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "../shared/Dialog";
import { userContext } from "@/context/UserContext";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";

const Logout = ({ setNavOpen }) => {
  const { setUserToken } = useContext(userContext);
  const [dialogOpen, setDialogOpen] = useState(false);

  const navigate = useNavigate();

  const [t] = useTranslation("global");

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setUserToken(null);
    setDialogOpen(false);
    navigate("/");
    toast({
      title: t("logOut.toastTitle"),
    });
    if (setNavOpen) {
      setNavOpen(false);
    }
  };

  const renderDialogTrigger = () => (
    <Button
      variant="ghost"
      onClick={() => setDialogOpen(true)}
      className="justify-start gap-1 px-2 py-1.5 h-auto w-full"
    >
      <LogOut className="w-4 h-4 ltr:rotate-180" />
      {t("logOut.title")}
    </Button>
  );

  return (
    <Dialog
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
      dialogTrigger={renderDialogTrigger()}
      destructive
      dialogTitle={t("logOut.title")}
      dialogDescription={t("logOut.dialogDescription")}
      actionTitle={t("logOut.title")}
      handleAction={handleLogout}
    />
  );
};

export default Logout;
