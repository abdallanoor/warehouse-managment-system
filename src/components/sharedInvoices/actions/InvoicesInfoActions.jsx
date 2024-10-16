import { Button } from "@/components/ui/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FileText } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const InvoicesInfoActions = ({ rowData }) => {
  const navigate = useNavigate();

  const [t] = useTranslation("global");

  const handleAction = () => {
    navigate(`${rowData.invoiceNumber}`);
  };
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger onClick={() => handleAction()} asChild>
            <Button variant="ghost" size="icon">
              <FileText className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t("share.viewInvoice")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default InvoicesInfoActions;
