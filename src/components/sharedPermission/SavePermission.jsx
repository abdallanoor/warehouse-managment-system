import axios from "axios";
import Dialog from "../shared/Dialog";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { Save } from "lucide-react";
import { useContext, useState } from "react";
import { movementsContext } from "@/context/MovmentsContext";
import { productsContext } from "@/context/ProductsContext";
import { soldPermissionContext } from "@/context/SoldPremissionContext";
import { additionPermissionContext } from "@/context/AdditionPermissionContext";
import { customersContext } from "@/context/CustomersContext";
import { vendorsContext } from "@/context/VendorsContext";
import { useTranslation } from "react-i18next";

const SavePermission = ({
  setAdditionIsSaved,
  additionIsSaved,
  additionPermissionProducts,
  vendorData,
  setInvoiceNumber,
  customerData,
  soldPermissionProducts,
  setSoldIsSaved,
  soldIsSaved,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { refetchMovements } = useContext(movementsContext);
  const { refetchProducts } = useContext(productsContext);
  const { refetchCustomers } = useContext(customersContext);
  const { refetchVendors } = useContext(vendorsContext);
  const { refetchSoldInvoicesProducts, refetchSoldInvoicesInfo } = useContext(
    soldPermissionContext
  );
  const { refetchAdditionInvoicesProducts, refetchAdditionInvoicesInfo } =
    useContext(additionPermissionContext);

  const [t] = useTranslation("global");

  const handleAdditionSave = async () => {
    setLoading(true);
    await axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/purchasedProducts/finalConfirm`,
        { products: additionPermissionProducts, vendorData: vendorData },
        {
          headers: {
            authorization: `Warhouse ${localStorage.getItem("userToken")}`,
          },
        }
      )
      .then(({ data }) => {
        if (data.message === "Done") {
          localStorage.setItem("additionIsSaved", true);
          setAdditionIsSaved(true);
          localStorage.setItem("addInvoiceNumber", data.currentInvoiceNumber);
          setInvoiceNumber(data.currentInvoiceNumber);
          refetchProducts();
          refetchVendors();
          refetchAdditionInvoicesInfo();
          refetchAdditionInvoicesProducts();
          setDialogOpen(false);
          toast({
            title: t("share.save.toastTitle"),
          });
          refetchMovements();
        } else {
          toast({
            variant: "destructive",
            title: t("descriptions.wrong"),
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

  const handleSoldSave = async () => {
    setLoading(true);
    await axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/externalSale/finalConfirm`,
        { products: soldPermissionProducts, customerData: customerData },
        {
          headers: {
            authorization: `Warhouse ${localStorage.getItem("userToken")}`,
          },
        }
      )
      .then(({ data }) => {
        if (data.message === "Done") {
          localStorage.setItem("soldIsSaved", true);
          setSoldIsSaved(true);
          localStorage.setItem("soldInvoiceNumber", data.currentInvoiceNumber);
          setInvoiceNumber(data.currentInvoiceNumber);
          refetchProducts();
          refetchCustomers();
          refetchSoldInvoicesProducts();
          refetchSoldInvoicesInfo();
          setDialogOpen(false);
          toast({
            title: t("share.save.toastTitle"),
          });
          refetchMovements();
        } else {
          toast({
            variant: "destructive",
            title: t("descriptions.wrong"),
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

  const addDisabledSaveTrigger =
    additionPermissionProducts?.length === 0 ||
    !vendorData ||
    additionIsSaved === true;
  const soldDisabledSaveTrigger =
    soldPermissionProducts?.length === 0 ||
    !customerData ||
    soldIsSaved === true;

  const renderSaveTrigger = () => (
    <>
      <Button
        className="gap-1 max-sm:w-full"
        onClick={() => setDialogOpen(true)}
        disabled={
          additionPermissionProducts
            ? addDisabledSaveTrigger
            : soldPermissionProducts
            ? soldDisabledSaveTrigger
            : null
        }
      >
        <span>{t("share.save.title")}</span>
        <Save className="w-4 h-4" />
      </Button>
    </>
  );

  return (
    <Dialog
      dialogTrigger={renderSaveTrigger()}
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
      dialogTitle={t("share.save.title")}
      dialogDescription={t("share.save.description")}
      actionTitle={t("share.save.title")}
      handleAction={
        soldPermissionProducts
          ? handleSoldSave
          : additionPermissionProducts
          ? handleAdditionSave
          : null
      }
      bottomDisabled={loading}
      loadingButton={loading}
    />
  );
};

export default SavePermission;
