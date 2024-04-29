import DynamicTable from "@/components/shared/DynamicTable";
import Heading from "@/components/shared/Heading";
import { soldPermissionContext } from "@/context/SoldPremissionContext";
import { useContext } from "react";

const Bills = () => {
  const { allSoldPermissions } = useContext(soldPermissionContext);
  // console.log(allSoldPermissions?.data?.allSoldPermissionInfo);
  return (
    <>
      <Heading>فواتير البيع</Heading>

      <DynamicTable />
    </>
  );
};

export default Bills;
