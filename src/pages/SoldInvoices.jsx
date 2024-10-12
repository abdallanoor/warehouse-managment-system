import DynamicTable from "@/components/shared/DynamicTable";
import Heading from "@/components/shared/Heading";
import Search from "@/components/shared/Search";
import InvoicesInfoActions from "@/components/sharedInvoices/actions/InvoicesInfoActions";
import { getSoldInvoicesInfoHeader } from "@/constants";
import { soldPermissionContext } from "@/context/SoldPremissionContext";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const SoldInvoices = () => {
  const [searchValue, setSearchValue] = useState("");
  const { soldInvoicesInfo, soldInvoicesInfoLoading, setFetchSaleInvoices } =
    useContext(soldPermissionContext);

  const [t] = useTranslation("global");

  const soldInvoicesInfoHeader = getSoldInvoicesInfoHeader(t);

  useEffect(() => {
    setFetchSaleInvoices(true);
  }, []);

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
      <Heading>{t("saleInvoices.title")}</Heading>

      <div className="mb-5">
        <Search
          setSearchValue={setSearchValue}
          placeholder={t("search.name-invoiceNum")}
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
