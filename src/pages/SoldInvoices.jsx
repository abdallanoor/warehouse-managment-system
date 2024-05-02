import DynamicTable from "@/components/shared/DynamicTable";
import Heading from "@/components/shared/Heading";
import { soldPermissionContext } from "@/context/SoldPremissionContext";
import { useContext } from "react";

const SoldInvoices = () => {
  const { allSoldPermissions } = useContext(soldPermissionContext);

  return (
    <>
      <Heading>فواتير البيع</Heading>

      <DynamicTable />
    </>
  );
};

export default SoldInvoices;
