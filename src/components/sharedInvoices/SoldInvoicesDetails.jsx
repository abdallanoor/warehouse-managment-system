import { useContext } from "react";
import { soldPermissionContext } from "@/context/SoldPremissionContext";
import { soldPermissionHeader } from "@/constants";
import InvoiceDetails from "../shared/InvoicesDetails";
import InvoicesProductActions from "./actions/InvoicesProductActions";

const SoldInvoicesDetails = () => {
  const {
    soldInvoicesInfo,
    soldInvoicesInfoLoading,
    soldInvoicesProducts,
    soldInvoicesProductsLoading,
    soldInvoicesProductsError,
  } = useContext(soldPermissionContext);

  console.log(soldInvoicesProducts);

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
