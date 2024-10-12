import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Dialog from "../shared/Dialog";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const DeleteProduct = ({ ActionsComponentProps, rowData }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const [t] = useTranslation("global");

  const {
    soldPermissionProducts,
    setSoldPermissionProducts,
    additionPermissionProducts,
    setAdditionPermissionProducts,
  } = ActionsComponentProps;

  const renderDeleteDialogTrigger = () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger onClick={() => setDialogOpen(true)} asChild>
          <Button variant="ghost" size="icon">
            <Trash2 className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t("share.delete")}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  const handleDeleteProduct = () => {
    if (soldPermissionProducts) {
      const filteredProducts = soldPermissionProducts?.filter(
        (product) => product.productBarCode !== rowData.productBarCode
      );

      localStorage.setItem(
        "soldPermissionProducts",
        JSON.stringify(filteredProducts)
      );
      setSoldPermissionProducts(filteredProducts);
    }

    if (additionPermissionProducts) {
      const filteredProducts = additionPermissionProducts?.filter(
        (product) => product.productBarCode !== rowData.productBarCode
      );
      localStorage.setItem(
        "additionPermissionProducts",
        JSON.stringify(filteredProducts)
      );
      setAdditionPermissionProducts(filteredProducts);
    }

    setDialogOpen(false);
  };
  return (
    <>
      <Dialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        dialogTrigger={renderDeleteDialogTrigger()}
        actionTitle={t("share.delete")}
        dialogTitle={t("products.deleteProduct")}
        dialogDescription={t("descriptions.delete")}
        destructive
        handleAction={handleDeleteProduct}
      />
    </>
  );
};

export default DeleteProduct;
