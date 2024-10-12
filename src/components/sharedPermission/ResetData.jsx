import { FileSymlink } from "lucide-react";
import Dialog from "../shared/Dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "../ui/use-toast";
import { useTranslation } from "react-i18next";

const ResetData = ({
  vendorData,
  setVendorData,
  additionPermissionProducts,
  setAdditionPermissionProducts,
  setAdditionIsSaved,
  setInvoiceNumber,
  customerData,
  setCustomerData,
  soldPermissionProducts,
  setSoldPermissionProducts,
  setSoldIsSaved,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const [t] = useTranslation("global");

  const renderDeleteDialogTrigger = () => (
    <Button className="max-sm:w-full" onClick={() => setDialogOpen(true)}>
      <span>{t("share.resetData.title")}</span>
      <FileSymlink className="w-4 h-4" />
    </Button>
  );
  const handleResetData = () => {
    if (customerData || soldPermissionProducts) {
      localStorage.removeItem("customer");
      setCustomerData(null);
      localStorage.removeItem("soldPermissionProducts");
      setSoldPermissionProducts([]);
      localStorage.setItem("soldIsSaved", false);
      setSoldIsSaved(false);
      localStorage.removeItem("soldInvoiceNumber");
      setInvoiceNumber(null);
    }

    if (vendorData || additionPermissionProducts) {
      localStorage.removeItem("vendor");
      setVendorData(null);
      localStorage.removeItem("additionPermissionProducts");
      setAdditionPermissionProducts([]);
      localStorage.setItem("additionIsSaved", false);
      setAdditionIsSaved(false);
      localStorage.removeItem("addInvoiceNumber");
      setInvoiceNumber(null);
    }
    toast({
      title: t("share.resetData.toastTitle"),
    });
    setDialogOpen(false);
  };
  return (
    <>
      <Dialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        dialogTrigger={renderDeleteDialogTrigger()}
        actionTitle={t("share.resetData.title")}
        dialogTitle={t("share.resetData.title")}
        dialogDescription={t("share.resetData.description")}
        destructive
        handleAction={handleResetData}
      />
    </>
  );
};

export default ResetData;
