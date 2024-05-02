import { useContext } from "react";
import { soldPermissionContext } from "@/context/SoldPremissionContext";
import { soldPermissionHeader } from "@/constants";
import InvoicesProductActions from "../sharedInvoices/InvoicesProductActions";
import InvoiceDetails from "../shared/InvoicesDetails";

const SoldInvoicesDetails = () => {
  const {
    soldInvoicesInfo,
    soldInvoicesInfoLoading,
    soldInvoicesProducts,
    soldInvoicesProductsLoading,
    soldInvoicesProductsError,
  } = useContext(soldPermissionContext);

  return (
    <>
      <InvoiceDetails
        invoiceInfo={soldInvoicesInfo}
        invoiceProducts={soldInvoicesProducts}
        invoiceInfoLoading={soldInvoicesInfoLoading}
        invoiceProductsLoading={soldInvoicesProductsLoading}
        invoiceProductsError={soldInvoicesProductsError}
        ActionsComponent={InvoicesProductActions}
        header={soldPermissionHeader}
        sold
      />
    </>
  );
};

export default SoldInvoicesDetails;
