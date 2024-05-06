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

const DeleteProduct = ({ ActionsComponentProps, rowData }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

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
          <p>حذف</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  <Button className="gap-1 max-sm:w-full" onClick={() => setDialogOpen(true)}>
    <span>إعادة تهيئة</span>
  </Button>;

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
        actionTitle="حذف"
        dialogTitle="حذف الصنف"
        dialogDescription="هل انت متاكد؟ سيتم حذف الصنف"
        destructive
        handleAction={handleDeleteProduct}
      />
    </>
  );
};

export default DeleteProduct;
