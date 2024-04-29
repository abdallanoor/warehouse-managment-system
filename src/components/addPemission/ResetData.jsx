import { FileSymlink } from "lucide-react";
import Dialog from "../shared/Dialog";
import { Button } from "../ui/button";
import { useState } from "react";

const ResetData = ({ setVendorData, setProductsData, setAddSaved }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const renderDeleteDialogTrigger = () => (
    <Button
      className="gap-1 max-sm:w-full animate-fadeIn"
      onClick={() => setDialogOpen(true)}
    >
      <span>إعادة تهيئة</span>
      <FileSymlink className="w-4 h-4" />
    </Button>
  );
  const handleResetData = () => {
    localStorage.removeItem("vendor");
    localStorage.removeItem("addPermissionProducts");
    setVendorData(null);
    setProductsData([]);
    localStorage.setItem("slodSaved", false);
    setAddSaved(false);
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
