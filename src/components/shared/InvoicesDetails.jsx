import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Heading from "../shared/Heading";
import { Printer } from "lucide-react";
import { Button } from "../ui/button";
import DynamicTable from "../shared/DynamicTable";

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

  const filteredInvoiceInfo = invoiceInfo?.filter(
    (invoice) => invoice.invoiceNumber == invoiceNumber
  )[0];

  const filteredInvoiceProduct = invoiceProducts?.filter(
    (invoice) => invoice.invoiceNumber == invoiceNumber
  );

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${sold ? "إذن بيع" : addition ? "إذن إضافة" : null} - ${
      filteredInvoiceInfo ? filteredInvoiceInfo?.invoiceNumber : "غير موجود"
    }`,
    onPrintError: () => alert("يوجد مشكلة في الطباعة"),
  });

  return (
    <section ref={componentRef} className="print:m-8">
      <Heading>{sold ? "إذن بيع" : addition ? "إذن إضافة" : null}</Heading>
      <div className="flex flex-col gap-4 print:gap-2">
        <div className="flex justify-between items-center flex-col sm:flex-row gap-4">
          <div className="flex justify-between items-center flex-col sm:flex-row w-full sm:w-4/5 print:w-full">
            {invoiceInfoLoading ? (
              <p className="font-semibold">جاري التحميل...</p>
            ) : (
              <>
                {filteredInvoiceInfo ? (
                  <>
                    <p className="font-semibold">
                      {sold
                        ? `اسم العميل : ${filteredInvoiceInfo?.customerName}`
                        : addition
                        ? `اسم المورد : ${filteredInvoiceInfo?.vendorName}`
                        : null}
                    </p>
                    <p className="font-semibold">{`تحرير في : ${filteredInvoiceInfo?.date}`}</p>
                    <p className="font-semibold">{`رقم الإذن : ${filteredInvoiceInfo?.invoiceNumber}`}</p>
                  </>
                ) : (
                  <p className="font-semibold">المعلومات غير متوفرة</p>
                )}
              </>
            )}
          </div>
          <div className="flex items-center justify-center md:justify-end max-sm:w-full w-fit md:mr-auto max-sm:justify-between flex-wrap gap-4 print:hidden">
            <Button onClick={handlePrint} className="flex max-sm:w-full">
              <span>طباعه</span>
              <Printer className="w-4 h-4 mr-1" />
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
          <p className="hidden font-semibold print:block">{`التوقيع : `}</p>
        </>
      </div>
    </section>
  );
};

export default InvoiceDetails;
