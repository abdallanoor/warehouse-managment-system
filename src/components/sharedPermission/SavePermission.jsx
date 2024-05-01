import axios from "axios";
import Dialog from "../shared/Dialog";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { Save } from "lucide-react";
import { useContext, useState } from "react";
import { movementsContext } from "@/context/MovmentsContext";
import { productsContext } from "@/context/ProductsContext";

const SavePermission = ({
  setAddSaved,
  addSaved,
  addPermissionProducts,
  vendorData,
  setInvoiceNumber,
  customerData,
  soldPermissionProducts,
  setSoldSaved,
  soldSaved,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { refetchMovements } = useContext(movementsContext);
  const { refetchProducts } = useContext(productsContext);

  const handleAddSave = async () => {
    setLoading(true);
    await axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/purchasedProducts/finalConfirm`,
        { products: addPermissionProducts, vendorData: vendorData },
        {
          headers: {
            authorization: `Warhouse ${localStorage.getItem("userToken")}`,
          },
        }
      )
      .then(({ data }) => {
        if (data.message === "Done") {
          localStorage.setItem("addSaved", true);
          setAddSaved(true);
          localStorage.setItem("addInvoiceNumber", data.currentInvoiceNumber);
          setInvoiceNumber(data.currentInvoiceNumber);
          refetchProducts();
          refetchMovements();
          setDialogOpen(false);
          toast({
            title: "تم الحفظ",
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
          localStorage.setItem("soldSaved", true);
          setSoldSaved(true);
          localStorage.setItem("soldInvoiceNumber", data.currentInvoiceNumber);
          setInvoiceNumber(data.currentInvoiceNumber);
          refetchProducts();
          refetchMovements();
          setDialogOpen(false);
          toast({
            title: "تم الحفظ",
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
  const addDisabledSaveTrigger =
    addPermissionProducts?.length === 0 || !vendorData || addSaved === true;
  const soldDisabledSaveTrigger =
    soldPermissionProducts?.length === 0 || !customerData || soldSaved === true;

  const renderSaveTrigger = () => (
    <>
      <Button
        className="gap-1 max-sm:w-full"
        onClick={() => setDialogOpen(true)}
        disabled={
          addPermissionProducts
            ? addDisabledSaveTrigger
            : soldPermissionProducts
            ? soldDisabledSaveTrigger
            : null
        }
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
      handleAction={
        soldPermissionProducts
          ? handleSoldSave
          : addPermissionProducts
          ? handleAddSave
          : null
      }
      bottomDisabled={loading}
      loadingButton={loading}
    />
  );
};

export default SavePermission;
