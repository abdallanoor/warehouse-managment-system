import { User } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Combobox } from "../shared/Combobox";
import Dialog from "../shared/Dialog";
import { toast } from "../ui/use-toast";
import { vendorsContext } from "@/context/VendorsContext";
import { useTranslation } from "react-i18next";

const SelectVendor = ({ setVendorData, vendorData }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [vendorValues, setVendorValues] = useState(null);
  const { vendors, isLoading, setFetchVendors } = useContext(vendorsContext);

  const [t] = useTranslation("global");

  // Fetch Vendors when we need them
  // useEffect(() => {
  //   setFetchVendors(true);
  // }, []);

  const handleVendorData = () => {
    if (vendorValues) {
      localStorage.setItem("vendor", JSON.stringify(vendorValues));
      setVendorData(vendorValues);
      setDialogOpen(false);
      toast({
        title: `${t("descriptions.successfullyAdded")} ${
          vendorValues.vendorName
        }`,
      });
    } else {
      toast({
        variant: "destructive",
        title: t("purchaseProducts.vendorNotSelected"),
      });
    }
  };

  const renderVendorTrigger = () => (
    <>
      <Button
        disabled={vendorData && vendorData !== null}
        className="max-sm:w-full"
        onClick={() => {
          setDialogOpen(true);
          // Fetch Vendors when we need them
          setFetchVendors(true);
        }}
      >
        <span>{t("purchaseProducts.selectVendor")}</span>
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
        actionTitle={t("share.add")}
        dialogTitle={t("purchaseProducts.selectVendor")}
        dialogDescription={t("purchaseProducts.vendorNotSelected")}
        handleAction={handleVendorData}
      >
        <Combobox
          data={vendors}
          setValues={setVendorValues}
          lable="vendorName"
          additionalInfo="vendorAddress"
          placeholder={t("search.name")}
          buttonTitle={t("purchaseProducts.selectVendor")}
          isLoading={isLoading}
        />
      </Dialog>
    </>
  );
};

export default SelectVendor;
