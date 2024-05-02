import DynamicTable from "@/components/shared/DynamicTable";
import Heading from "@/components/shared/Heading";
import InvoicesInfoActions from "@/components/sharedInvoices/InvoicesInfoActions";
import { additionInvoicesInfoHeader } from "@/constants";
import { additionPermissionContext } from "@/context/AdditionPermissionContext";
import { useContext } from "react";

const AdditionInvoices = () => {
  const { additionInvoicesInfo, additionInvoicesInfoLoading } = useContext(
    additionPermissionContext
  );
  return (
    <>
      <>
        <Heading>فواتير الإضافة</Heading>

        <DynamicTable
          headers={additionInvoicesInfoHeader}
          data={additionInvoicesInfo?.reverse() || []}
          loading={additionInvoicesInfoLoading}
          ActionsComponent={InvoicesInfoActions}
        />
      </>
    </>
  );
};

export default AdditionInvoices;
