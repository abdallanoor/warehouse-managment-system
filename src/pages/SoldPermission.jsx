import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import DynamicTable from "@/components/shared/DynamicTable";
import Heading from "@/components/shared/Heading";
import { Button } from "@/components/ui/button";
import { getSoldPermissionHeader } from "@/constants";
import { Printer } from "lucide-react";
import useLocalStorageEffect from "@/hooks/useLocalStorageEffect";
import ResetData from "@/components/sharedPermission/ResetData";
import CustomersForm from "@/components/customers/CustomersForm";
import SelectProduct from "@/components/sharedPermission/SelectProduct";
import DeleteProduct from "@/components/sharedPermission/DeleteProduct";
import SavePermission from "@/components/sharedPermission/SavePermission";
import SelectCustomer from "@/components/sharedPermission/SelectCustomer";
import { useTranslation } from "react-i18next";

const SoldPermission = () => {
  const [customerData, setCustomerData] = useState(null);
  const [soldPermissionProducts, setSoldPermissionProducts] = useState([]);
  const [invoiceNumber, setInvoiceNumber] = useState(null);
  const [soldIsSaved, setSoldIsSaved] = useState(false);
  const componentRef = useRef();

  const [t] = useTranslation("global");

  const soldPermissionHeader = getSoldPermissionHeader(t);

  useLocalStorageEffect("customer", setCustomerData);
  useLocalStorageEffect("soldPermissionProducts", setSoldPermissionProducts);
  useLocalStorageEffect("soldIsSaved", setSoldIsSaved);
  useLocalStorageEffect("soldInvoiceNumber", setInvoiceNumber);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${t("saleProducts.title")} - ${
      invoiceNumber || t("notFound")
    }`,
    onPrintError: () => alert(t("descriptions.wrong")),
  });

  const renderActions = () => {
    const renderResetData = () => (
      <ResetData
        setCustomerData={setCustomerData}
        customerData={customerData}
        soldPermissionProducts={soldPermissionProducts}
        setSoldPermissionProducts={setSoldPermissionProducts}
        setSoldIsSaved={setSoldIsSaved}
        setInvoiceNumber={setInvoiceNumber}
      />
    );

    return (
      <>
        {!customerData && (
          <>
            <SelectCustomer
              setCustomerData={setCustomerData}
              customerData={customerData}
            />
            <CustomersForm
              setCustomerData={setCustomerData}
              customerData={customerData}
            />
          </>
        )}

        {customerData && !soldIsSaved && (
          <>
            <SelectProduct
              setSoldPermissionProducts={setSoldPermissionProducts}
              soldPermissionProducts={soldPermissionProducts}
              soldIsSaved={soldIsSaved}
            />

            {renderResetData()}

            {soldPermissionProducts.length > 0 && (
              <SavePermission
                customerData={customerData}
                soldPermissionProducts={soldPermissionProducts}
                soldIsSaved={soldIsSaved}
                setSoldIsSaved={setSoldIsSaved}
                setInvoiceNumber={setInvoiceNumber}
              />
            )}
          </>
        )}

        {soldIsSaved && (
          <>
            {renderResetData()}

            <Button
              onClick={handlePrint}
              disabled={!soldIsSaved}
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
        <Heading>{t("saleProducts.title")}</Heading>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-4 items-center max-md:flex-col max-sm:items-center print:items-start">
            <p className="font-semibold">
              {customerData
                ? `${t("saleProducts.customerName")} : ${
                    customerData.customerName
                  }`
                : t("saleProducts.customerNotSelected")}
            </p>
            <div className="flex items-center justify-center md:justify-end max-sm:w-full w-fit max-sm:justify-between flex-wrap gap-4 print:hidden">
              {renderActions()}
            </div>
          </div>
          {soldIsSaved && (
            <p className="hidden print:block font-semibold">{`${t(
              "print.created"
            )} : ${new Date().toLocaleDateString("en-GB")}`}</p>
          )}
          <DynamicTable
            headers={soldPermissionHeader}
            data={soldPermissionProducts?.reverse() || []}
            ActionsComponent={!soldIsSaved && DeleteProduct}
            ActionsComponentProps={{
              soldPermissionProducts: soldPermissionProducts,
              setSoldPermissionProducts: setSoldPermissionProducts,
            }}
          />
          {soldIsSaved && (
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

export default SoldPermission;
