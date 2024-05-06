import DynamicTable from "@/components/shared/DynamicTable";
import Heading from "@/components/shared/Heading";
import Search from "@/components/shared/Search";
import InvoicesInfoActions from "@/components/sharedInvoices/actions/InvoicesInfoActions";
import { additionInvoicesInfoHeader } from "@/constants";
import { additionPermissionContext } from "@/context/AdditionPermissionContext";
import { useContext, useState } from "react";

const AdditionInvoices = () => {
  const [searchValue, setSearchValue] = useState("");
  const { additionInvoicesInfo, additionInvoicesInfoLoading } = useContext(
    additionPermissionContext
  );

  const filteredInvoices = additionInvoicesInfo?.filter(
    (invoice) =>
      invoice?.vendorName?.toLowerCase().includes(searchValue.toLowerCase()) ||
      invoice?.invoiceNumber
        ?.toString()
        .toLowerCase()
        .includes(searchValue.toLowerCase())
  );
  return (
    <>
      <>
        <Heading>فواتير الإضافة</Heading>

        <div className="mb-5">
          <Search
            setSearchValue={setSearchValue}
            placeholder="يمكنك البحث عن المورد بالأسم ورقم الفاتوره"
          />
        </div>

        <DynamicTable
          headers={additionInvoicesInfoHeader}
          data={filteredInvoices?.reverse() || []}
          loading={additionInvoicesInfoLoading}
          ActionsComponent={InvoicesInfoActions}
        />
      </>
    </>
  );
};

export default AdditionInvoices;
