import { useContext } from "react";
import { additionPermissionHeader } from "@/constants";
import { additionPermissionContext } from "@/context/AdditionPermissionContext";
import InvoiceDetails from "../shared/InvoicesDetails";
import InvoicesProductActions from "./actions/InvoicesProductActions";

const AdditionInvoicesDetails = () => {
  const {
    additionInvoicesInfo,
    additionInvoicesInfoLoading,
    additionInvoicesProducts,
    additionInvoicesProductsLoading,
    additionInvoicesProductsError,
  } = useContext(additionPermissionContext);

  return (
    <>
      <InvoiceDetails
        invoiceInfo={additionInvoicesInfo}
        invoiceProducts={additionInvoicesProducts}
        invoiceInfoLoading={additionInvoicesInfoLoading}
        invoiceProductsLoading={additionInvoicesProductsLoading}
        invoiceProductsError={additionInvoicesProductsError}
        // ActionsComponent={InvoicesProductActions}
        header={additionPermissionHeader}
        addition
      />
    </>
  );
};

export default AdditionInvoicesDetails;
