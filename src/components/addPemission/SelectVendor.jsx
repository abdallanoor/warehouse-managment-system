import { User } from "lucide-react";
import { useContext, useState } from "react";
import { Button } from "../ui/button";
import { Combobox } from "../shared/Combobox";
import Dialog from "../shared/Dialog";
import { toast } from "../ui/use-toast";
import { vendorsContext } from "@/context/VendorsContext";

const SelectVendor = ({ setVendorData, vendorData }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [vendorValues, setVendorValues] = useState(null);
  const { vendors, isLoading } = useContext(vendorsContext);

  const handleVendorData = () => {
    if (vendorValues) {
      localStorage.setItem("vendor", JSON.stringify(vendorValues));
      setVendorData(vendorValues);
      setDialogOpen(false);
      toast({
        title: `تم اختيار المورد ${vendorValues.vendorName} بنجاح`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "يرجي اختيار المورد من فضلك",
      });
    }
  };

  const renderVendorTrigger = () => (
    <>
      <Button
        disabled={vendorData && vendorData !== null}
        className="gap-1 max-sm:w-full"
        onClick={() => setDialogOpen(true)}
      >
        <span>اختر المورد</span>
        <User className="w-4 h-4" />
      </Button>
    </>
  );

  return (
    <>
      <Dialog
        dialogTrigger={renderVendorTrigger()}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        actionTitle="إضافة"
        dialogTitle="اختر المورد"
        dialogDescription="يرجي اختيار المورد من فضلك"
        handleAction={handleVendorData}
      >
        <Combobox
          data={vendors?.data?.vendors}
          setValues={setVendorValues}
          lable="vendorName"
          additionalInfo="vendorAddress"
          placeholder="المورد بالاسم"
          buttonTitle="اختر المورد"
          isLoading={isLoading}
        />
      </Dialog>
    </>
  );
};

export default SelectVendor;
