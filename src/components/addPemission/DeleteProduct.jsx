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

  <Button
    className="gap-1 max-sm:w-full animate-fadeIn"
    onClick={() => setDialogOpen(true)}
  >
    <span>إعادة تهيئة</span>
  </Button>;
  const handleDeleteProduct = () => {
    const filteredProducts = ActionsComponentProps.productsData.filter(
      (product) => product._id !== rowData._id
    );
    localStorage.setItem(
      "addPermissionProducts",
      JSON.stringify(filteredProducts)
    );
    ActionsComponentProps.setProductsData(filteredProducts);
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
        dialogDescription="هل انت متاكد؟ سيتم حذف الصنف نهائياً"
        destructive
        handleAction={handleDeleteProduct}
      />
    </>
  );
};

export default DeleteProduct;
