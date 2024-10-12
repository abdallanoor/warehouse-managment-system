import DynamicTable from "@/components/shared/DynamicTable";
import Heading from "@/components/shared/Heading";
import Search from "@/components/shared/Search";
import InvoicesInfoActions from "@/components/sharedInvoices/actions/InvoicesInfoActions";
import { getAdditionInvoicesInfoHeader } from "@/constants";
import { additionPermissionContext } from "@/context/AdditionPermissionContext";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const AdditionInvoices = () => {
  const [searchValue, setSearchValue] = useState("");
  const {
    additionInvoicesInfo,
    additionInvoicesInfoLoading,
    setFetchParchaseInvoices,
  } = useContext(additionPermissionContext);

  const [t] = useTranslation("global");

  const additionInvoicesInfoHeader = getAdditionInvoicesInfoHeader(t);

  useEffect(() => {
    setFetchParchaseInvoices(true);
  }, []);

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
        <Heading>{t("parchaseInvoices.title")}</Heading>

        <div className="mb-5">
          <Search
            setSearchValue={setSearchValue}
            placeholder={t("search.name-invoiceNum")}
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
