import { customersContext } from "@/context/CustomersContext";
import axios from "axios";
import { UserPlus } from "lucide-react";
import { useContext, useState } from "react";
import { Button } from "../ui/button";
import { Combobox } from "../shared/Combobox";
import Dialog from "../shared/Dialog";
import { toast } from "../ui/use-toast";
import { soldPermissionContext } from "@/context/SoldPremissionContext";

const SelectSoldCustomer = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [customerValues, setCustomerValues] = useState({});
  const [loading, setLoading] = useState(false);
  const { customers, isLoading } = useContext(customersContext);
  const { refetchsoldPermissionInfo, invoiceNumber } = useContext(
    soldPermissionContext
  );

  const handleCustomerData = async () => {
    setLoading(true);
    await axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/soldpermission/sendInfoPermission`,
        customerValues,
        {
          headers: {
            authorization: `Warhouse ${localStorage.getItem("userToken")}`,
          },
        }
      )
      .then(({ data }) => {
        if (data.message === "Done") {
          refetchsoldPermissionInfo();
          setDialogOpen(false);
          toast({
            title: `تم إضافة العميل ${customerValues.customerName} بنجاح`,
          });
        } else if (data.message === "you is already add information") {
          toast({
            variant: "destructive",
            title: "انت اخترت العميل بالفعل!",
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

  const renderCustomerTrigger = () => (
    <>
      <Button
        className="gap-1 max-sm:w-full"
        onClick={() => setDialogOpen(true)}
      >
        <span>اختر العميل</span>
        <UserPlus className="w-4 h-4" />
      </Button>
    </>
  );

  return (
    <Dialog
      dialogTrigger={renderCustomerTrigger()}
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
      actionTitle="إضافة"
      dialogTitle="اختر العميل"
      dialogDescription="يرجي اختيار العميل من فضلك"
      bottomDisabled={loading}
      loadingButton={loading}
      handleAction={handleCustomerData}
    >
      <Combobox
        data={customers?.data?.customers}
        setValues={setCustomerValues}
        bodyInfo={{
          datePermission: new Date().toLocaleDateString("en-GB"),
          invoiceNumber: invoiceNumber,
        }}
        lable="customerName"
        additionalInfo="customerAddress"
        placeholder="العميل بالاسم"
        buttonTitle="اختر العميل"
        isLoading={isLoading}
      />
    </Dialog>
  );
};

export default SelectSoldCustomer;
