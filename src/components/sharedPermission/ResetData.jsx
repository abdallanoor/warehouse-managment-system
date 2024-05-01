import { FileSymlink } from "lucide-react";
import Dialog from "../shared/Dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "../ui/use-toast";

const ResetData = ({
  vendorData,
  setVendorData,
  addPermissionProducts,
  setAddPermissionProducts,
  setAddSaved,
  setInvoiceNumber,
  customerData,
  setCustomerData,
  soldPermissionProducts,
  setSoldPermissionProducts,
  setSoldSaved,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const renderDeleteDialogTrigger = () => (
    <Button className="gap-1 max-sm:w-full" onClick={() => setDialogOpen(true)}>
      <span>إعادة تهيئة</span>
      <FileSymlink className="w-4 h-4" />
    </Button>
  );
  const handleResetData = () => {
    if (customerData || soldPermissionProducts) {
      localStorage.removeItem("customer");
      setCustomerData(null);
      localStorage.removeItem("soldPermissionProducts");
      setSoldPermissionProducts([]);
      localStorage.setItem("soldSaved", false);
      setSoldSaved(false);
      localStorage.removeItem("soldInvoiceNumber");
      setInvoiceNumber(null);
    }

    if (vendorData || addPermissionProducts) {
      localStorage.removeItem("vendor");
      setVendorData(null);
      localStorage.removeItem("addPermissionProducts");
      setAddPermissionProducts([]);
      localStorage.setItem("addSaved", false);
      setAddSaved(false);
      localStorage.removeItem("addInvoiceNumber");
      setInvoiceNumber(null);
    }
    toast({
      title: "تم إعادة تهيئة البيانات",
    });
    setDialogOpen(false);
  };
  return (
    <>
      <Dialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        dialogTrigger={renderDeleteDialogTrigger()}
        actionTitle="إعادة تهيئة"
        dialogTitle="إعادة تهيئة البيانات"
        dialogDescription="هل أنت متأكد؟ سيتم إعادة تهيئة البيانات، إذا كنت ترغب في الاحتفاظ بالبيانات، يُرجى الضغط على 'حفظ' قبل إعادة التهيئة."
        destructive
        handleAction={handleResetData}
      />
    </>
  );
};

export default ResetData;
