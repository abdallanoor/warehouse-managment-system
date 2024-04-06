import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { MoreHorizontal, SquarePen, Trash2 } from "lucide-react";

const Dropdown = ({ children }) => {
  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger asChild>
        <Button aria-haspopup="true" size="icon" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>إجراءات</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SquarePen className="ml-2 w-4 h-4" />
          <span>تعديل</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Trash2 className="ml-2 w-4 h-4" />
          <span>حذف</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
