import { useContext } from "react";
import Heading from "../components/shared/Heading";
import DynamicTable from "@/components/shared/DynamicTable";
import { movementsHeader } from "@/constants";
import { movementsContext } from "@/context/MovmentsContext";

const Movements = () => {
  const { movements, isError, isLoading } = useContext(movementsContext);

  return (
    <>
      <Heading>حركة الاصناف</Heading>
      <DynamicTable
        headers={movementsHeader}
        error={isError}
        loading={isLoading}
        data={movements?.data?.products?.reverse()}
      />
    </>
  );
};

export default Movements;
