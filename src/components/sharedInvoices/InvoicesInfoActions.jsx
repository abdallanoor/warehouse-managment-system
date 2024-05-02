import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FileSymlink, FileText, SquareArrowOutUpRight } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const InvoicesInfoActions = ({ rowData }) => {
  const navigate = useNavigate();

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
            <p>عرض الفاتورة</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default InvoicesInfoActions;
