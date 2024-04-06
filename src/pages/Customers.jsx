import { useContext } from "react";
import Heading from "@/components/shared/Heading";
import DynamicTable from "@/components/shared/DynamicTable";
import { customersHeader } from "@/constants";
import { customersContext } from "@/context/CustomersContext";

const Customers = () => {
  const { customers, isError, isLoading } = useContext(customersContext);

  return (
    <>
      <Heading>العملاء</Heading>
      <DynamicTable
        headers={customersHeader}
        error={isError}
        loading={isLoading}
        data={customers?.data?.customers.reverse()}
      />
    </>
  );
};

export default Customers;
