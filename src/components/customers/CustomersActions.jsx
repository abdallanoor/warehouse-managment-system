import { useContext, useState } from "react";
import Dialog from "../shared/Dialog";
import { customersContext } from "@/context/CustomersContext";
import { SquareArrowOutUpRight, Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "../ui/use-toast";
import ActionsDropdown from "../shared/ActionsDropdown";
import { useNavigate } from "react-router-dom";
import CustomersForm from "./CustomersForm";
import { useTranslation } from "react-i18next";

const CustomersActions = ({ rowData }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { refetchCustomers } = useContext(customersContext);
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

  const renderDeleteCustomerAction = async () => {
    setIsLoading(true);
    await axios
      .delete(`${import.meta.env.VITE_API_URL}/api/customers/${rowData._id}`, {
        headers: {
          authorization: `Warhouse ${localStorage.getItem("userToken")}`,
        },
      })
      .then(({ data }) => {
        if (data?.message === "Done") {
          setIsLoading(false);
          refetchCustomers();
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
  const renderCustomerDetails = () => (
    <div
      onClick={() => {
        navigate(`${rowData._id}`);
      }}
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
      <CustomersForm
        rowData={rowData}
        setDropdownOpen={setDropdownOpen}
        triggerClassName={triggerClassName}
      />
      <Dialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        dialogTrigger={renderDeleteDialogTrigger()}
        destructive
        dialogTitle={t("customers.deleteCustomer")}
        dialogDescription={t("descriptions.delete")}
        actionTitle={t("customers.deleteCustomer")}
        handleAction={renderDeleteCustomerAction}
        loadingButton={isLoading}
        bottomDisabled={isLoading}
      />
      {renderCustomerDetails()}
    </ActionsDropdown>
  );
};

export default CustomersActions;
