import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  MoreHorizontal,
  SquareArrowOutUpRight,
  SquarePen,
  Trash2,
} from "lucide-react";
import Dialog from "./Dialog";
import { useContext, useState } from "react";
import ProductsForm from "../products/ProductsForm";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { productsContext } from "@/context/ProductsContext";
import { Link, useLocation } from "react-router-dom";
import { soldPermissionContext } from "@/context/SoldPremissionContext";

const ShareDropdown = ({ rowEditData }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { refetchProducts } = useContext(productsContext);
  const { refetchSoldPermission } = useContext(soldPermissionContext);

  const { pathname } = useLocation();

  const renderDeleteDialogTrigger = () => {
    return (
      <div
        onClick={() => setDialogOpen(true)}
        className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent focus:text-accent-foreground"
      >
        <Trash2 className="ml-2 w-4 h-4" />
        <span>حذف</span>
      </div>
    );
  };

  const renderDeleteAction = async () => {
    setIsLoading(true);
    const productId = rowEditData._id;
    const { data } = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/storageProducts/${productId}`
    );
    if (data?.message === "Delete Successfully") {
      setIsLoading(false);
      setDialogOpen(false);
      setDropdownOpen(false);
      refetchProducts();
      toast({
        title: `تم حذف ${data.product.productName} بنجاح`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "هناك خطأ!",
      });
    }
  };

  const renderDeleteSoldPermissionAction = async () => {
    setIsLoading(true);
    const productId = rowEditData._id;
    const { data } = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/soldpermission/${productId}`
    );
    if (data?.message === "Done") {
      refetchSoldPermission();
      setIsLoading(false);
      setDialogOpen(false);
      setDropdownOpen(false);
      toast({
        title: `تم حذف الصنف بنجاح`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "هناك خطأ!",
      });
    }
  };

  const renderProductDetails = () => {
    return (
      <Link
        to={rowEditData._id}
        className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent focus:text-accent-foreground"
      >
        <SquareArrowOutUpRight className="ml-2 w-4 h-4" />
        <span>حركة الصنف</span>
      </Link>
    );
  };

  return (
    <DropdownMenu modal={false} open={dropdownOpen} dir="rtl">
      <DropdownMenuTrigger onClick={() => setDropdownOpen(true)} asChild>
        <Button
          aria-haspopup="true"
          disabled={dropdownOpen}
          size="icon"
          variant="ghost"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent onInteractOutside={() => setDropdownOpen(false)}>
        <DropdownMenuLabel>إجراءات</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {pathname === "/products" ? (
          <>
            <Dialog
              dialogOpen={dialogOpen}
              setDialogOpen={setDialogOpen}
              dialogTrigger={renderDeleteDialogTrigger()}
              alert
              dialogTitle="حذف الصنف"
              dialogDescription="هل انت متاكد؟ سيتم حذف الصنف نهائياً"
              actionTitle="حذف الصنف"
              handleAction={renderDeleteAction}
              loadingButton={isLoading}
              bottomDisabled={isLoading}
            />

            <ProductsForm
              rowEditData={rowEditData}
              setDropdownOpen={setDropdownOpen}
            />
            {renderProductDetails()}
          </>
        ) : pathname === "/sold-permission" ? (
          <Dialog
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            dialogTrigger={renderDeleteDialogTrigger()}
            alert
            dialogTitle="حذف الصنف"
            dialogDescription="هل انت متاكد؟ سيتم حذف الصنف من إذن الصرف"
            actionTitle="حذف الصنف"
            handleAction={renderDeleteSoldPermissionAction}
            loadingButton={isLoading}
            bottomDisabled={isLoading}
          />
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShareDropdown;
