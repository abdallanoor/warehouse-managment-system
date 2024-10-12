import { useContext, useEffect } from "react";
import { soldPermissionContext } from "@/context/SoldPremissionContext";
import { getSoldPermissionHeader } from "@/constants";
import InvoiceDetails from "../shared/InvoicesDetails";
import InvoicesProductActions from "./actions/InvoicesProductActions";
import { useTranslation } from "react-i18next";

const SoldInvoicesDetails = () => {
  const {
    soldInvoicesInfo,
    soldInvoicesInfoLoading,
    soldInvoicesProducts,
    soldInvoicesProductsLoading,
    soldInvoicesProductsError,
    setFetchSaleInvoices,
  } = useContext(soldPermissionContext);

  const [t] = useTranslation("global");

  const soldPermissionHeader = getSoldPermissionHeader(t);

  useEffect(() => {
    setFetchSaleInvoices(true);
  }, []);

  return (
    <>
      <InvoiceDetails
        invoiceInfo={soldInvoicesInfo}
        invoiceProducts={soldInvoicesProducts}
        invoiceInfoLoading={soldInvoicesInfoLoading}
        invoiceProductsLoading={soldInvoicesProductsLoading}
        invoiceProductsError={soldInvoicesProductsError}
        // ActionsComponent={InvoicesProductActions}
        header={soldPermissionHeader}
        sold
      />
    </>
  );
};

export default SoldInvoicesDetails;
