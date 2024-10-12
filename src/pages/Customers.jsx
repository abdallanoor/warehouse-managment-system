import { useContext, useEffect, useState } from "react";
import Heading from "@/components/shared/Heading";
import DynamicTable from "@/components/shared/DynamicTable";
import { getCustomersHeader } from "@/constants";
import { customersContext } from "@/context/CustomersContext";
import Search from "@/components/shared/Search";
import CustomersForm from "@/components/customers/CustomersForm";
import CustomersActions from "@/components/customers/CustomersActions";
import { useTranslation } from "react-i18next";

const Customers = () => {
  const [searchValue, setSearchValue] = useState("");
  const { customers, isError, isLoading, setFetchCustomers } =
    useContext(customersContext);

  const [t] = useTranslation("global");

  const customersHeader = getCustomersHeader(t);

  const filteredCustomers = customers?.filter(
    (customer) =>
      customer.customerName.toLowerCase().includes(searchValue.toLowerCase()) ||
      customer.customerCode
        .toString()
        .toLowerCase()
        .includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    setFetchCustomers(true);
  }, []);

  return (
    <>
      <Heading>{t("customers.title")}</Heading>

      <div className="flex items-center justify-between max-sm:flex-wrap gap-5 sm:gap-10 mb-5">
        <Search
          setSearchValue={setSearchValue}
          placeholder={t("search.name-code")}
        />

        <div className="max-sm:w-full">
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
