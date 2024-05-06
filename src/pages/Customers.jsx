import { useContext, useState } from "react";
import Heading from "@/components/shared/Heading";
import DynamicTable from "@/components/shared/DynamicTable";
import { customersHeader } from "@/constants";
import { customersContext } from "@/context/CustomersContext";
import Search from "@/components/shared/Search";
import CustomersForm from "@/components/customers/CustomersForm";
import CustomersActions from "@/components/customers/CustomersActions";

const Customers = () => {
  const [searchValue, setSearchValue] = useState("");
  const { customers, isError, isLoading } = useContext(customersContext);

  const filteredCustomers = customers?.filter(
    (customer) =>
      customer.customerName.toLowerCase().includes(searchValue.toLowerCase()) ||
      customer.customerCode
        .toString()
        .toLowerCase()
        .includes(searchValue.toLowerCase())
  );

  return (
    <>
      <Heading>العملاء</Heading>

      <div className="flex items-center justify-between max-sm:flex-wrap gap-5 sm:gap-10 mb-5">
        <Search
          setSearchValue={setSearchValue}
          placeholder="يمكنك البحث عن العميل بالأسم والكود"
        />

        <div className="mr-auto max-sm:w-full">
          <CustomersForm />
        </div>
      </div>

      <DynamicTable
        headers={customersHeader}
        error={isError}
        loading={isLoading}
        data={filteredCustomers?.reverse() || []}
        ActionsComponent={CustomersActions}
      />
    </>
  );
};

export default Customers;
