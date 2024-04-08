import { useContext } from "react";
import Heading from "@/components/shared/Heading";
import DynamicTable from "@/components/shared/DynamicTable";
import { customersHeader } from "@/constants";
import { customersContext } from "@/context/CustomersContext";
import Search from "@/components/shared/Search";
import CustomersForm from "@/components/customers/CustomersForm";

const Customers = () => {
  const { customers, isError, isLoading } = useContext(customersContext);

  return (
    <>
      <Heading>العملاء</Heading>

      <div className="flex items-center max-sm:flex-wrap gap-5 sm:gap-10 mb-5">
        <Search placeholder="يمكنك البحث عن العميل بالأسم" />

        <div className="mr-auto max-sm:w-full">
          <CustomersForm />
        </div>
      </div>

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
