import { useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Heading from "../shared/Heading";
import DynamicTable from "../shared/DynamicTable";
import { Button } from "../ui/button";
import { Printer } from "lucide-react";
import { movementsContext } from "@/context/MovmentsContext";
import { getMovementsHeader } from "@/constants";
import { useTranslation } from "react-i18next";

const VendorDetails = () => {
  const { movements, isError, isLoading, setFetchMovements } =
    useContext(movementsContext);
  const { code } = useParams();
  const componentRef = useRef();

  const [t] = useTranslation("global");

  const movementsHeader = getMovementsHeader(t);

  const customerDetailsData = movements?.filter(
    (product) => product?.vendorId?.vendorCode == code
  );

  const vendorName = customerDetailsData?.find(
    (product) => product?.vendorId?.vendorCode == code
  );

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${t("vendors.movement")} - ${
      vendorName?.seller || t("notFound")
    }`,
    onPrintError: () => alert(t("descriptions.wrong")),
  });

  useEffect(() => {
    setFetchMovements(true);
  }, []);

  return (
    <section ref={componentRef} className="print:m-8">
      <Heading>
        {isLoading
          ? t("loading")
          : `${t("vendors.movement")} - ${vendorName?.seller || t("notFound")}`}
      </Heading>

      <Button
        onClick={handlePrint}
        className="mb-4 flex ltr:ml-auto rtl:mr-auto print:hidden"
      >
        <span>{t("print.title")}</span>
        <Printer className="w-4 h-4" />
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

export default VendorDetails;
