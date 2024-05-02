import { useReactToPrint } from "react-to-print";
import Heading from "../shared/Heading";
import { Printer } from "lucide-react";
import { Button } from "../ui/button";
import { useContext, useRef } from "react";
import { soldPermissionContext } from "@/context/SoldPremissionContext";
import { useParams } from "react-router-dom";
import DynamicTable from "../shared/DynamicTable";
import { soldPermissionHeader } from "@/constants";
import SoldInvoicesProductActions from "./SoldInvoicesProductActions";

const SoldInvoicesDetails = () => {
  const {
    soldInvoicesInfo,
    soldInvoicesInfoLoading,
    soldInvoicesProducts,
    soldInvoicesProductsLoading,
    soldInvoicesProductsError,
  } = useContext(soldPermissionContext);

  const { invoiceNumber } = useParams();

  const filteredInvoiceInfo = soldInvoicesInfo?.filter(
    (invoice) => invoice.invoiceNumber == invoiceNumber
  )[0];

  const filteredInvoiceProduct = soldInvoicesProducts?.filter(
    (invoice) => invoice.invoiceNumber == invoiceNumber
  );

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `إذن بيع - ${
      filteredInvoiceInfo ? filteredInvoiceInfo?.invoiceNumber : "غير موجود"
    }`,
    onPrintError: () => alert("يوجد مشكلة في الطباعة"),
  });
  return (
    <>
      <section ref={componentRef} className="print:m-8">
        <Heading>إذن بيع</Heading>
        <div className="flex flex-col gap-4 print:gap-2">
          <div className="flex justify-between items-center flex-col sm:flex-row gap-4">
            <div
              className="flex justify-between items-center
             flex-col sm:flex-row w-full sm:w-4/5 print:w-full"
            >
              {soldInvoicesInfoLoading ? (
                <p className="font-semibold">جاري التحميل...</p>
              ) : (
                <>
                  {filteredInvoiceInfo ? (
                    <>
                      <p className="font-semibold">
                        {`اسم العميل : ${filteredInvoiceInfo?.customerName}`}
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
            headers={soldPermissionHeader}
            data={filteredInvoiceProduct || []}
            loading={soldInvoicesProductsLoading}
            error={soldInvoicesProductsError}
            ActionsComponent={SoldInvoicesProductActions}
          />
          <>
            <p className="hidden font-semibold print:block">{`التوقيع : `}</p>
          </>
        </div>
      </section>
    </>
  );
};

export default SoldInvoicesDetails;
