import { productsContext } from "@/context/ProductsContext";
import { useContext, useState } from "react";
import ActionsDropdown from "../shared/ActionsDropdown";
import ProductsForm from "./ProductsForm";
import { SquareArrowOutUpRight, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Dialog from "../shared/Dialog";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { useTranslation } from "react-i18next";

const ProductsActions = ({ rowData }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { refetchProducts } = useContext(productsContext);

  const [t] = useTranslation("global");

  const triggerClassName =
    "flex gap-1 cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent";

  const renderDeleteDialogTrigger = () => {
    return (
      <div onClick={() => setDialogOpen(true)} className={triggerClassName}>
        <Trash2 className="w-4 h-4" />
        <span>{t("share.delete")}</span>
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
            title: `${t("descriptions.successfullyDeleted")} ${
              data.product.productName
            }`,
          });
        } else {
          toast({
            variant: "destructive",
            title: t("descriptions.wrong"),
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
    <Link to={`/products/${rowData._id}`} className={triggerClassName}>
      <SquareArrowOutUpRight className="w-4 h-4" />
      <span>{t("share.movement")}</span>
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
        dialogTitle={t("products.deleteProduct")}
        dialogDescription={t("descriptions.delete")}
        actionTitle={t("products.deleteProduct")}
        handleAction={renderDeleteProductAction}
        loadingButton={isLoading}
        bottomDisabled={isLoading}
      />
      {renderProductDetails()}
    </ActionsDropdown>
  );
};

export default ProductsActions;
