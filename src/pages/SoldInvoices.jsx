import DynamicTable from "@/components/shared/DynamicTable";
import Heading from "@/components/shared/Heading";
import SoldInvoicesInfoActions from "@/components/soldInvoices/SoldInvoicesInfoActions";
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
        data={soldInvoicesInfo?.reverse()}
        loading={soldInvoicesInfoLoading}
        ActionsComponent={SoldInvoicesInfoActions}
      />
    </>
  );
};

export default SoldInvoices;
