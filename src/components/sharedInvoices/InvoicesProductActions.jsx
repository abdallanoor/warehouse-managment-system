import Dialog from "../shared/Dialog";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Repeat2 } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

const InvoicesProductActions = ({ rowData }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReturnProduct = () => {
    return console.log(rowData.invoiceNumber);
  };

  const renderDialogTrigger = () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger onClick={() => setDialogOpen(true)} asChild>
          <Button variant="ghost" size="icon" to="">
            <Repeat2 className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>استرجاع</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <>
      <Dialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        dialogTrigger={renderDialogTrigger()}
        destructive
        actionTitle="استرجاع"
        dialogTitle="استرجاع الصنف"
        dialogDescription="هل انت متأكد؟ سيتم حذف الصنف من الفاتورة "
        handleAction={handleReturnProduct}
      />
    </>
  );
};

export default InvoicesProductActions;
