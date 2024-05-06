import { customersContext } from "@/context/CustomersContext";
import { useContext, useState } from "react";
import { Button } from "../ui/button";
import Dialog from "../shared/Dialog";
import { Users } from "lucide-react";
import { Combobox } from "../shared/Combobox";
import { toast } from "../ui/use-toast";

const SelectCustomer = ({ setCustomerData, customerData }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [customerValues, setCustomerValues] = useState(null);
  const { customers, isLoading } = useContext(customersContext);

  const handleCustomerData = () => {
    if (customerValues) {
      localStorage.setItem("customer", JSON.stringify(customerValues));
      setCustomerData(customerValues);
      setDialogOpen(false);
      toast({
        title: `تم اختيار العميل ${customerValues.customerName} بنجاح`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "يرجي اختيار العميل من فضلك",
      });
    }
  };

  const renderCustomerTrigger = () => (
    <>
      <Button
        disabled={customerData && customerData !== null}
        className="gap-1 max-sm:w-full"
        onClick={() => setDialogOpen(true)}
      >
        <span>اختر العميل</span>
        <Users className="w-4 h-4" />
      </Button>
    </>
  );
  return (
    <>
      <Dialog
        dialogTrigger={renderCustomerTrigger()}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        actionTitle="إضافة"
        dialogTitle="اختر العميل"
        dialogDescription="يرجي اختيار العميل من فضلك"
        handleAction={handleCustomerData}
      >
        <Combobox
          data={customers?.reverse()}
          setValues={setCustomerValues}
          lable="customerName"
          additionalInfo="customerAddress"
          placeholder="العميل بالاسم"
          buttonTitle="اختر العميل"
          isLoading={isLoading}
        />
      </Dialog>
    </>
  );
};

export default SelectCustomer;
