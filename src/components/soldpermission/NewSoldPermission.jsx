import axios from "axios";
import Dialog from "../shared/Dialog";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { FilePlus2, Save } from "lucide-react";
import { useContext, useState } from "react";
import { soldPermissionContext } from "@/context/SoldPremissionContext";

const NewSoldPermission = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { refetchSoldPermission, refetchsoldPermissionInfo } = useContext(
    soldPermissionContext
  );
  // const { refetchSoldPermission, refetchsoldPermissionInfo } = useContext(

  // );

  const handleNewPermission = async () => {
    setLoading(true);
    await axios
      .post(
        `${
          import.meta.env.VITE_API_URL
        }/api/soldpermission/makeAnotherPermission`,
        {},
        {
          headers: {
            authorization: `Warhouse ${localStorage.getItem("userToken")}`,
          },
        }
      )
      .then(({ data }) => {
        if (data.message === "Done") {
          localStorage.setItem("slodSaved", false);
          refetchSoldPermission();
          refetchsoldPermissionInfo();
          setDialogOpen(false);
          toast({
            title: "يمكنك الان إضافة إذن صرف جديد",
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

  const renderNewPermissionTrigger = () => (
    <>
      <Button
        className="gap-1 max-sm:w-full animate-fadeIn"
        onClick={() => setDialogOpen(true)}
      >
        <span>إذن صرف جديد</span>
        <FilePlus2 className="w-4 h-4" />
      </Button>
    </>
  );

  return (
    <Dialog
      alert
      dialogTrigger={renderNewPermissionTrigger()}
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
      dialogTitle="إضافه إذن صرف جديد"
      dialogDescription="يرجي التأكيد لإضافة إذن صرف جديد"
      actionTitle="تأكيد"
      handleAction={handleNewPermission}
      bottomDisabled={loading}
      loadingButton={loading}
    />
  );
};

export default NewSoldPermission;
