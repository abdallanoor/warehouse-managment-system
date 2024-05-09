import { productsContext } from "@/context/ProductsContext";
import { useContext, useState } from "react";
import ActionsDropdown from "../shared/ActionsDropdown";
import ProductsForm from "./ProductsForm";
import { SquareArrowOutUpRight, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Dialog from "../shared/Dialog";
import axios from "axios";
import { toast } from "../ui/use-toast";

const ProductsActions = ({ rowData }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { refetchProducts } = useContext(productsContext);

  const triggerClassName =
    "flex gap-1 cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent";

  const renderDeleteDialogTrigger = () => {
    return (
      <div onClick={() => setDialogOpen(true)} className={triggerClassName}>
        <Trash2 className="w-4 h-4" />
        <span>حذف</span>
      </div>
    );
  };

  const renderDeleteProductAction = async () => {
    setIsLoading(true);
    await axios
      .delete(
        `${import.meta.env.VITE_API_URL}/api/storageProducts/${rowData._id}`,
        {
          headers: {
            authorization: `Warhouse ${localStorage.getItem("userToken")}`,
          },
        }
      )
      .then(({ data }) => {
        if (data?.message === "Delete Successfully") {
          setIsLoading(false);
          refetchProducts();
          setDialogOpen(false);
          setDropdownOpen(false);
          toast({
            title: `تم حذف ${data.product.productName} بنجاح`,
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
          variant: "destructive",
          title: `${error}`,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const renderProductDetails = () => (
    <Link to={`products/${rowData._id}`} className={triggerClassName}>
      <SquareArrowOutUpRight className="w-4 h-4" />
      <span>حركة الصنف</span>
    </Link>
  );

  return (
    <ActionsDropdown
      setDropdownOpen={setDropdownOpen}
      dropdownOpen={dropdownOpen}
    >
      <ProductsForm
        rowData={rowData}
        setDropdownOpen={setDropdownOpen}
        triggerClassName={triggerClassName}
      />

      <Dialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        dialogTrigger={renderDeleteDialogTrigger()}
        alert
        destructive
        dialogTitle="حذف الصنف"
        dialogDescription="هل انت متاكد؟ سيتم حذف الصنف نهائياً"
        actionTitle="حذف الصنف"
        handleAction={renderDeleteProductAction}
        loadingButton={isLoading}
        bottomDisabled={isLoading}
      />
      {renderProductDetails()}
    </ActionsDropdown>
  );
};

export default ProductsActions;
