import { customersContext } from "@/context/CustomersContext";
import { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import Dialog from "../shared/Dialog";
import { Users } from "lucide-react";
import { Combobox } from "../shared/Combobox";
import { toast } from "../ui/use-toast";
import { useTranslation } from "react-i18next";

const SelectCustomer = ({ setCustomerData, customerData }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [customerValues, setCustomerValues] = useState(null);
  const { customers, isLoading, setFetchCustomers } =
    useContext(customersContext);

  const [t] = useTranslation("global");

  // Fetch Customers when we need them
  // useEffect(() => {
  //   setFetchCustomers(true);
  // }, []);

  const handleCustomerData = () => {
    if (customerValues) {
      localStorage.setItem("customer", JSON.stringify(customerValues));
      setCustomerData(customerValues);
      setDialogOpen(false);
      toast({
        title: `${t("descriptions.successfullyAdded")} ${
          customerValues.customerName
        }`,
      });
    } else {
      toast({
        variant: "destructive",
        title: t("saleProducts.customerNotSelected"),
      });
    }
  };

  const renderCustomerTrigger = () => (
    <>
      <Button
        disabled={customerData && customerData !== null}
        className="max-sm:w-full"
        onClick={() => {
          setDialogOpen(true);
          // Fetch Customers when we need them
          setFetchCustomers(true);
        }}
      >
        <span>{t("saleProducts.selectCustomer")}</span>
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
        actionTitle={t("share.add")}
        dialogTitle={t("saleProducts.selectCustomer")}
        dialogDescription={t("saleProducts.customerNotSelected")}
        handleAction={handleCustomerData}
      >
        <Combobox
          data={customers?.reverse()}
          setValues={setCustomerValues}
          lable="customerName"
          additionalInfo="customerAddress"
          placeholder={t("search.name")}
          buttonTitle={t("saleProducts.selectCustomer")}
          isLoading={isLoading}
        />
      </Dialog>
    </>
  );
};

export default SelectCustomer;
