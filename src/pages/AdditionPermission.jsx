import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Printer } from "lucide-react";
import DeleteProduct from "@/components/sharedPermission/DeleteProduct";
import ResetData from "@/components/sharedPermission/ResetData";
import SavePermission from "@/components/sharedPermission/SavePermission";
import SelectProduct from "@/components/sharedPermission/SelectProduct";
import SelectVendor from "@/components/sharedPermission/SelectVendor";
import DynamicTable from "@/components/shared/DynamicTable";
import Heading from "@/components/shared/Heading";
import { Button } from "@/components/ui/button";
import VendorsForm from "@/components/vendors/VendorsForm";
import { getAdditionPermissionHeader } from "@/constants";
import useLocalStorageEffect from "@/hooks/useLocalStorageEffect";
import ProductsForm from "@/components/products/ProductsForm";
import { useTranslation } from "react-i18next";

const AdditionPermission = () => {
  const [vendorData, setVendorData] = useState(null);
  const [additionPermissionProducts, setAdditionPermissionProducts] = useState(
    []
  );
  const [invoiceNumber, setInvoiceNumber] = useState(null);
  const [additionIsSaved, setAdditionIsSaved] = useState(false);

  const [t] = useTranslation("global");

  const additionPermissionHeader = getAdditionPermissionHeader(t);

  const componentRef = useRef();

  useLocalStorageEffect("vendor", setVendorData);
  useLocalStorageEffect(
    "additionPermissionProducts",
    setAdditionPermissionProducts
  );
  useLocalStorageEffect("additionIsSaved", setAdditionIsSaved);
  useLocalStorageEffect("addInvoiceNumber", setInvoiceNumber);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${t("purchaseProducts.title")} - ${
      invoiceNumber || t("notFound")
    }`,
    onPrintError: () => alert(t("descriptions.wrong")),
  });

  const renderActions = () => {
    const renderResetData = () => (
      <ResetData
        setVendorData={setVendorData}
        vendorData={vendorData}
        additionPermissionProducts={additionPermissionProducts}
        setAdditionPermissionProducts={setAdditionPermissionProducts}
        setAdditionIsSaved={setAdditionIsSaved}
        setInvoiceNumber={setInvoiceNumber}
      />
    );

    return (
      <>
        {!vendorData && (
          <>
            <SelectVendor
              setVendorData={setVendorData}
              vendorData={vendorData}
            />
            <VendorsForm
              setVendorData={setVendorData}
              vendorData={vendorData}
            />
          </>
        )}

        {vendorData && !additionIsSaved && (
          <>
            <SelectProduct
              setAdditionPermissionProducts={setAdditionPermissionProducts}
              additionPermissionProducts={additionPermissionProducts}
              additionIsSaved={additionIsSaved}
            />
            <ProductsForm
              setAdditionPermissionProducts={setAdditionPermissionProducts}
              additionPermissionProducts={additionPermissionProducts}
              additionIsSaved={additionIsSaved}
            />
            {renderResetData()}

            {additionPermissionProducts.length > 0 && (
              <>
                <SavePermission
                  additionIsSaved={additionIsSaved}
                  setAdditionIsSaved={setAdditionIsSaved}
                  vendorData={vendorData}
                  additionPermissionProducts={additionPermissionProducts}
                  setInvoiceNumber={setInvoiceNumber}
                />
              </>
            )}
          </>
        )}

        {additionIsSaved && (
          <>
            {renderResetData()}

            <Button
              disabled={!additionIsSaved}
              onClick={handlePrint}
              className="max-sm:w-full"
            >
              <span>{t("print.title")}</span>
              <Printer className="w-4 h-4" />
            </Button>
          </>
        )}
      </>
    );
  };

  return (
    <>
      <section ref={componentRef} className="print:m-8">
        <Heading>{t("purchaseProducts.title")}</Heading>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-4 items-center max-md:flex-col max-sm:items-center print:items-start">
            <p className="font-semibold">
              {vendorData
                ? `${t("purchaseProducts.vendorName")} : ${
                    vendorData.vendorName
                  }`
                : t("purchaseProducts.vendorNotSelected")}
            </p>
            <div className="flex items-center justify-center md:justify-end max-sm:w-full w-fit max-sm:justify-between flex-wrap gap-4 print:hidden">
              {renderActions()}
            </div>
          </div>

          {additionIsSaved && (
            <p className="hidden print:block font-semibold">{`${t(
              "print.created"
            )} : ${new Date().toLocaleDateString("en-GB")}`}</p>
          )}
          <DynamicTable
            headers={additionPermissionHeader}
            data={additionPermissionProducts?.reverse() || []}
            ActionsComponent={!additionIsSaved && DeleteProduct}
            ActionsComponentProps={{
              additionPermissionProducts: additionPermissionProducts,
              setAdditionPermissionProducts: setAdditionPermissionProducts,
            }}
          />

          {additionIsSaved && (
            <>
              <p className="hidden print:block font-semibold">{`${t(
                "print.invoiceNumber"
              )} : ${invoiceNumber}`}</p>
              <p className="hidden print:block font-semibold">{`${t(
                "print.signature"
              )} : `}</p>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default AdditionPermission;
