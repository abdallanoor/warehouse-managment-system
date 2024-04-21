import axios from "axios";
import Dialog from "../shared/Dialog";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { Save } from "lucide-react";
import { useContext, useState } from "react";
import { movementsContext } from "@/context/MovmentsContext";

const SaveSoldPermission = ({ setSlodSaved }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { refetchMovements } = useContext(movementsContext);

  const handleSave = async () => {
    setLoading(true);
    await axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/soldpermission/finalAddPermission`,
        {},
        {
          headers: {
            authorization: `Warhouse ${localStorage.getItem("userToken")}`,
          },
        }
      )
      .then(({ data }) => {
        if (data.message === "Done") {
          localStorage.setItem("slodSaved", true);
          setSlodSaved(true);
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
          title: `${error.response.data.message}`,
        });
      })
      .finally(() => setLoading(false));
  };

  const renderSaveTrigger = () => (
    <>
      <Button
        className="gap-1 max-sm:w-full animate-fadeIn"
        onClick={() => setDialogOpen(true)}
      >
        <span>حفظ</span>
        <Save className="w-4 h-4" />
      </Button>
    </>
  );

  return (
    <Dialog
      alert
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

export default SaveSoldPermission;
