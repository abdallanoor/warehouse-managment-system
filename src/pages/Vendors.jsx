import DynamicTable from "@/components/shared/DynamicTable";
import Heading from "@/components/shared/Heading";
import Search from "@/components/shared/Search";
import VendorsActions from "@/components/vendors/VendorsActions";
import VendorsForm from "@/components/vendors/VendorsForm";
import { getVendorsHeader } from "@/constants";
import { vendorsContext } from "@/context/VendorsContext";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Vendors = () => {
  const [searchValue, setSearchValue] = useState("");
  const { vendors, isError, isLoading, setFetchVendors } =
    useContext(vendorsContext);

  const [t] = useTranslation("global");

  const vendorsHeader = getVendorsHeader(t);

  const filteredVendors = vendors?.filter(
    (vendor) =>
      vendor.vendorName.toLowerCase().includes(searchValue.toLowerCase()) ||
      vendor.vendorCode
        .toString()
        .toLowerCase()
        .includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    setFetchVendors(true);
  }, []);

  return (
    <>
      <Heading>{t("vendors.title")}</Heading>

      <div className="flex items-center justify-between max-sm:flex-wrap gap-5 sm:gap-10 mb-5">
        <Search
          setSearchValue={setSearchValue}
          placeholder={t("search.name-code")}
        />

        <div className="max-sm:w-full">
          <VendorsForm />
        </div>
      </div>

      <DynamicTable
        headers={vendorsHeader}
        error={isError}
        loading={isLoading}
        data={filteredVendors?.reverse() || []}
        ActionsComponent={VendorsActions}
      />
    </>
  );
};

export default Vendors;
