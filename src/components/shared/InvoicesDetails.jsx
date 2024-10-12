import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Heading from "../shared/Heading";
import { Printer } from "lucide-react";
import { Button } from "../ui/button";
import DynamicTable from "../shared/DynamicTable";
import { useTranslation } from "react-i18next";

const InvoiceDetails = ({
  invoiceInfo,
  invoiceProducts,
  invoiceInfoLoading,
  invoiceProductsLoading,
  invoiceProductsError,
  ActionsComponent,
  header,
  sold,
  addition,
}) => {
  const { invoiceNumber } = useParams();
  const componentRef = useRef();

  const [t] = useTranslation("global");

  const filteredInvoiceInfo = invoiceInfo?.filter(
    (invoice) => invoice.invoiceNumber == invoiceNumber
  )[0];

  const filteredInvoiceProduct = invoiceProducts?.filter(
    (invoice) => invoice.invoiceNumber == invoiceNumber
  );

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${
      sold
        ? t("saleInvoices.single")
        : addition
        ? t("parchaseInvoices.single")
        : null
    } - ${
      filteredInvoiceInfo ? filteredInvoiceInfo?.invoiceNumber : t("notFound")
    }`,
    onPrintError: () => alert(t("descriptions.wrong")),
  });

  return (
    <section ref={componentRef} className="print:m-8">
      <Heading>
        {sold
          ? t("saleInvoices.single")
          : addition
          ? t("parchaseInvoices.single")
          : null}
      </Heading>
      <div className="flex flex-col gap-4 print:gap-2">
        <div className="flex justify-between items-center flex-col sm:flex-row gap-4">
          <div className="flex justify-between items-center gap-2 flex-col sm:flex-row w-full sm:w-4/5 print:w-full print:items-start print:flex-col">
            {invoiceInfoLoading ? (
              <p className="font-semibold">{t("loading")}</p>
            ) : (
              <>
                {filteredInvoiceInfo ? (
                  <>
                    <p className="font-semibold">
                      {sold
                        ? `${t("saleProducts.customerName")} : ${
                            filteredInvoiceInfo?.customerName
                          }`
                        : addition
                        ? `${t("purchaseProducts.vendorName")} : ${
                            filteredInvoiceInfo?.vendorName
                          }`
                        : null}
                    </p>
                    <p className="font-semibold">{`${t("print.created")}  : ${
                      filteredInvoiceInfo?.date
                    }`}</p>
                    <p className="font-semibold">{`${t(
                      "print.invoiceNumber"
                    )}  : ${filteredInvoiceInfo?.invoiceNumber}`}</p>
                  </>
                ) : (
                  <p className="font-semibold">{t("noData")}</p>
                )}
              </>
            )}
          </div>
          <div className="flex items-center justify-center md:justify-end max-sm:w-full max-sm:justify-between flex-wrap gap-4 print:hidden">
            <Button onClick={handlePrint} className="flex max-sm:w-full">
              <span>{t("print.title")}</span>
              <Printer className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <DynamicTable
          headers={header}
          data={filteredInvoiceProduct || []}
          loading={invoiceProductsLoading}
          error={invoiceProductsError}
          ActionsComponent={ActionsComponent}
        />
        <>
          <p className="hidden font-semibold print:block">{`${t(
            "print.signature"
          )} : `}</p>
        </>
      </div>
    </section>
  );
};

export default InvoiceDetails;
