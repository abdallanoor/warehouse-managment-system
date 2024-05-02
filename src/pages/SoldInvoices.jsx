import DynamicTable from "@/components/shared/DynamicTable";
import Heading from "@/components/shared/Heading";
import InvoicesInfoActions from "@/components/sharedInvoices/InvoicesInfoActions";
import { soldInvoicesInfoHeader } from "@/constants";
import { soldPermissionContext } from "@/context/SoldPremissionContext";
import { useContext } from "react";

const SoldInvoices = () => {
  const { soldInvoicesInfo, soldInvoicesInfoLoading } = useContext(
    soldPermissionContext
  );

  return (
    <>
      <Heading>فواتير البيع</Heading>

      <DynamicTable
        headers={soldInvoicesInfoHeader}
        data={soldInvoicesInfo?.reverse() || []}
        loading={soldInvoicesInfoLoading}
        ActionsComponent={InvoicesInfoActions}
      />
    </>
  );
};

export default SoldInvoices;
