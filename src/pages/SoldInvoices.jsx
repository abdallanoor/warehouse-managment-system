import DynamicTable from "@/components/shared/DynamicTable";
import Heading from "@/components/shared/Heading";
import Search from "@/components/shared/Search";
import InvoicesInfoActions from "@/components/sharedInvoices/actions/InvoicesInfoActions";
import { soldInvoicesInfoHeader } from "@/constants";
import { soldPermissionContext } from "@/context/SoldPremissionContext";
import { useContext, useState } from "react";

const SoldInvoices = () => {
  const [searchValue, setSearchValue] = useState("");
  const { soldInvoicesInfo, soldInvoicesInfoLoading } = useContext(
    soldPermissionContext
  );

  const filteredInvoices = soldInvoicesInfo?.filter(
    (invoice) =>
      invoice?.customerName
        ?.toLowerCase()
        .includes(searchValue.toLowerCase()) ||
      invoice?.invoiceNumber
        ?.toString()
        .toLowerCase()
        .includes(searchValue.toLowerCase())
  );

  return (
    <>
      <Heading>فواتير البيع</Heading>

      <div className="mb-5">
        <Search
          setSearchValue={setSearchValue}
          placeholder="يمكنك البحث عن العميل بالأسم ورقم الفاتوره"
        />
      </div>

      <DynamicTable
        headers={soldInvoicesInfoHeader}
        data={filteredInvoices?.reverse() || []}
        loading={soldInvoicesInfoLoading}
        ActionsComponent={InvoicesInfoActions}
      />
    </>
  );
};

export default SoldInvoices;
