import { useContext, useState } from "react";
import Dialog from "../shared/Dialog";
import { vendorsContext } from "@/context/VendorsContext";
import { SquareArrowOutUpRight, Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "../ui/use-toast";
import ActionsDropdown from "../shared/ActionsDropdown";
import { Link } from "react-router-dom";
import VendorsForm from "./VendorsForm";

const VendorsActions = ({ rowData }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { refetchVendors } = useContext(vendorsContext);

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

  const renderDeleteVendorAction = async () => {
    setIsLoading(true);
    await axios
      .delete(`${import.meta.env.VITE_API_URL}/api/vendors/${rowData._id}`, {
        headers: {
          authorization: `Warhouse ${localStorage.getItem("userToken")}`,
        },
      })
      .then(({ data }) => {
        console.log(data);
        if (data?.message === "Done") {
          setIsLoading(false);
          refetchVendors();
          setDialogOpen(false);
          setDropdownOpen(false);
          toast({
            title: `تم حذف المورد بنجاح`,
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

  const renderVendorDetails = () => (
    <Link to={rowData._id} className={triggerClassName}>
      <SquareArrowOutUpRight className="w-4 h-4" />
      <span>حركة المورد</span>
    </Link>
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
        dialogTitle="حذف المورد"
        dialogDescription="هل انت متاكد؟ سيتم حذف المورد نهائياً"
        actionTitle="حذف المورد"
        handleAction={renderDeleteVendorAction}
        loadingButton={isLoading}
        bottomDisabled={isLoading}
      />
      {renderVendorDetails()}
    </ActionsDropdown>
  );
};

export default VendorsActions;
