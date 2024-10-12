import { useContext, useEffect } from "react";
import { getAdditionPermissionHeader } from "@/constants";
import { additionPermissionContext } from "@/context/AdditionPermissionContext";
import InvoiceDetails from "../shared/InvoicesDetails";
import InvoicesProductActions from "./actions/InvoicesProductActions";
import { useTranslation } from "react-i18next";

const AdditionInvoicesDetails = () => {
  const {
    additionInvoicesInfo,
    additionInvoicesInfoLoading,
    additionInvoicesProducts,
    additionInvoicesProductsLoading,
    additionInvoicesProductsError,
    setFetchParchaseInvoices,
  } = useContext(additionPermissionContext);

  const [t] = useTranslation("global");

  const additionPermissionHeader = getAdditionPermissionHeader(t);

  useEffect(() => {
    setFetchParchaseInvoices(true);
  }, []);

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
