import { useContext, useState } from "react";
import Dialog from "../shared/Dialog";
import { vendorsContext } from "@/context/VendorsContext";
import { SquareArrowOutUpRight, Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "../ui/use-toast";
import ActionsDropdown from "../shared/ActionsDropdown";
import { useNavigate } from "react-router-dom";
import VendorsForm from "./VendorsForm";
import { useTranslation } from "react-i18next";

const VendorsActions = ({ rowData }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { refetchVendors } = useContext(vendorsContext);
  const navigate = useNavigate();

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

  const renderDeleteVendorAction = async () => {
    setIsLoading(true);
    await axios
      .delete(`${import.meta.env.VITE_API_URL}/api/vendors/${rowData._id}`, {
        headers: {
          authorization: `Warhouse ${localStorage.getItem("userToken")}`,
        },
      })
      .then(({ data }) => {
        if (data?.message === "Done") {
          setIsLoading(false);
          refetchVendors();
          setDialogOpen(false);
          setDropdownOpen(false);
          toast({
            title: t("descriptions.successfullyDeleted"),
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
  const renderVendorDetails = () => (
    <div
      onClick={() => navigate(`${rowData.vendorCode}`)}
      className={triggerClassName}
    >
      <SquareArrowOutUpRight className="w-4 h-4" />
      <span>{t("share.movement")}</span>
    </div>
  );

  return (
    <ActionsDropdown
      setDropdownOpen={setDropdownOpen}
      dropdownOpen={dropdownOpen}
    >
      <VendorsForm
        rowData={rowData}
        setDropdownOpen={setDropdownOpen}
        triggerClassName={triggerClassName}
      />
      <Dialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        dialogTrigger={renderDeleteDialogTrigger()}
        destructive
        dialogTitle={t("vendors.deleteVendor")}
        dialogDescription={t("descriptions.delete")}
        actionTitle={t("vendors.deleteVendor")}
        handleAction={renderDeleteVendorAction}
        loadingButton={isLoading}
        bottomDisabled={isLoading}
      />
      {renderVendorDetails()}
    </ActionsDropdown>
  );
};

export default VendorsActions;
