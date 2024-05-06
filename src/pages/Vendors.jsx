import DynamicTable from "@/components/shared/DynamicTable";
import Heading from "@/components/shared/Heading";
import Search from "@/components/shared/Search";
import VendorsActions from "@/components/vendors/VendorsActions";
import VendorsForm from "@/components/vendors/VendorsForm";
import { vendorsHeader } from "@/constants";
import { vendorsContext } from "@/context/VendorsContext";
import { useContext, useState } from "react";

const Vendors = () => {
  const [searchValue, setSearchValue] = useState("");
  const { vendors, isError, isLoading } = useContext(vendorsContext);

  const filteredVendors = vendors?.filter(
    (vendor) =>
      vendor.vendorName.toLowerCase().includes(searchValue.toLowerCase()) ||
      vendor.vendorCode
        .toString()
        .toLowerCase()
        .includes(searchValue.toLowerCase())
  );

  return (
    <>
      <Heading>الموردين</Heading>

      <div className="flex items-center justify-between max-sm:flex-wrap gap-5 sm:gap-10 mb-5">
        <Search
          setSearchValue={setSearchValue}
          placeholder="يمكنك البحث عن المورد بالأسم والكود"
        />

        <div className="mr-auto max-sm:w-full">
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
