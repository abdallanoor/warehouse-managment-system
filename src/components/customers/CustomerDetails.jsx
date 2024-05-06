import { useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Heading from "../shared/Heading";
import DynamicTable from "../shared/DynamicTable";
import { Button } from "../ui/button";
import { Printer } from "lucide-react";
import { movementsContext } from "@/context/MovmentsContext";
import { movementsHeader } from "@/constants";

const CustomerDetails = () => {
  const { movements, isError, isLoading } = useContext(movementsContext);
  const { code } = useParams();
  const componentRef = useRef();

  const customerDetailsData = movements?.filter(
    (product) => product?.customerId == code
  );

  const customerName = customerDetailsData?.find(
    (product) => product?.customerId == code
  );

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `حركة العميل - ${customerName?.seller || "غير موجود"}`,
    onPrintError: () => alert("يوجد مشكلة في الطباعة"),
  });
  return (
    <section ref={componentRef} className="print:m-8">
      <Heading>
        {isLoading
          ? `حركه العميل - جاري التحميل`
          : `حركة العميل - ${customerName?.seller || "لا يوجد"}`}
      </Heading>

      <Button onClick={handlePrint} className="mb-4 flex mr-auto print:hidden">
        <span>طباعه</span>
        <Printer className="w-4 h-4 mr-2" />
      </Button>

      <DynamicTable
        headers={movementsHeader}
        error={isError}
        loading={isLoading}
        data={customerDetailsData || []}
      />
    </section>
  );
};

export default CustomerDetails;
