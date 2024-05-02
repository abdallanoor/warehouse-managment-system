import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FileSymlink, SquareArrowOutUpRight } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const SoldInvoicesInfoActions = ({ rowData }) => {
  // console.log(rowData);

  const navigate = useNavigate();

  const handleAction = () => {
    navigate(`${rowData.invoiceNumber}`);
  };
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger onClick={() => handleAction()} asChild>
            <Button variant="ghost" size="icon" to="">
              <FileSymlink className="w-4 h-4" />
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

export default SoldInvoicesInfoActions;
