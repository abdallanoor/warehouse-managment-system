import axios from "axios";
import Dialog from "../shared/Dialog";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { Save } from "lucide-react";
import { useContext, useState } from "react";
import { movementsContext } from "@/context/MovmentsContext";

const SavePermission = ({ setAddSaved, productsData, vendorData }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { refetchMovements } = useContext(movementsContext);

  const handleSave = async () => {
    setLoading(true);
    await axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/purchasedProducts/finalConfirm`,
        { products: productsData, vendorData: vendorData },
        {
          headers: {
            authorization: `Warhouse ${localStorage.getItem("userToken")}`,
          },
        }
      )
      .then(({ data }) => {
        console.log(data);
        if (data.message === "Done") {
          localStorage.setItem("slodSaved", true);
          setAddSaved(true);
          setDialogOpen(false);
          refetchMovements();
          toast({
            title: "تم الحفظ",
          });
        } else if (
          data.message ===
          "TypeError: Cannot read properties of null (reading 'customerCode')"
        ) {
          toast({
            variant: "destructive",
            title: "هناك خطأ! يجب إدخال معلومات العميل والصنف",
          });
        } else {
          toast({
            variant: "destructive",
            title: "هناك خطأ!",
          });
        }
      })
      .catch((error) => {
        toast({
          title: `${error}`,
        });
      })
      .finally(() => setLoading(false));
  };

  const renderSaveTrigger = () => (
    <>
      <Button
        className="gap-1 max-sm:w-full animate-fadeIn"
        onClick={() => setDialogOpen(true)}
        disabled={productsData.length === 0}
      >
        <span>حفظ</span>
        <Save className="w-4 h-4" />
      </Button>
    </>
  );

  return (
    <Dialog
      dialogTrigger={renderSaveTrigger()}
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
      dialogTitle="حفظ البيانات"
      dialogDescription="يرجي تأكيد حفظ البيانات"
      actionTitle="حفظ"
      handleAction={handleSave}
      bottomDisabled={loading}
      loadingButton={loading}
    />
  );
};

export default SavePermission;
