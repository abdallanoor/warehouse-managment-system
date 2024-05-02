import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import DynamicTable from "@/components/shared/DynamicTable";
import Heading from "@/components/shared/Heading";
import { Button } from "@/components/ui/button";
import { soldPermissionHeader } from "@/constants";
import { Printer } from "lucide-react";
import SelectCustomer from "@/components/soldPermission/SelectCustomer";
import useLocalStorageEffect from "@/hooks/useLocalStorageEffect";
import ResetData from "@/components/sharedPermission/ResetData";
import CustomersForm from "@/components/customers/CustomersForm";
import SelectProduct from "@/components/sharedPermission/SelectProduct";
import ProductsForm from "@/components/products/ProductsForm";
import DeleteProduct from "@/components/sharedPermission/DeleteProduct";
import SavePermission from "@/components/sharedPermission/SavePermission";

const SoldPermission = () => {
  const [customerData, setCustomerData] = useState(null);
  const [soldPermissionProducts, setSoldPermissionProducts] = useState([]);
  const [invoiceNumber, setInvoiceNumber] = useState(null);
  const [soldIsSaved, setSoldIsSaved] = useState(false);
  const componentRef = useRef();

  useLocalStorageEffect("customer", setCustomerData);
  useLocalStorageEffect("soldPermissionProducts", setSoldPermissionProducts);
  useLocalStorageEffect("soldIsSaved", setSoldIsSaved);
  useLocalStorageEffect("soldInvoiceNumber", setInvoiceNumber);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `إذن بيع - ${invoiceNumber || "غير موجود"}`,
    onPrintError: () => alert("يوجد مشكلة في الطباعة"),
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
              className="flex max-sm:w-full"
            >
              <span>طباعه</span>
              <Printer className="w-4 h-4 mr-1" />
            </Button>
          </>
        )}
      </>
    );
  };

  return (
    <>
      <section ref={componentRef} className="print:m-8">
        <Heading>إذن بيع</Heading>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-4 items-center max-md:flex-col max-sm:items-center print:items-start">
            <p className="font-semibold">
              {customerData
                ? `اسم العميل : ${customerData.customerName}`
                : "الرجاء اختيار العميل"}
            </p>
            <div className="flex items-center justify-center md:justify-end max-sm:w-full w-fit md:mr-auto max-sm:justify-between flex-wrap gap-4 print:hidden">
              {renderActions()}
            </div>
          </div>
          {soldIsSaved && (
            <p className="hidden print:block font-semibold">{`تحرير في : ${new Date().toLocaleDateString(
              "en-GB"
            )}`}</p>
          )}
          <DynamicTable
            headers={soldPermissionHeader}
            data={soldPermissionProducts.reverse() || []}
            ActionsComponent={!soldIsSaved && DeleteProduct}
            ActionsComponentProps={{
              soldPermissionProducts: soldPermissionProducts,
              setSoldPermissionProducts: setSoldPermissionProducts,
            }}
          />
          {soldIsSaved && (
            <>
              <p className="hidden print:block font-semibold">{`رقم الاذن : ${invoiceNumber}`}</p>
              <p className="hidden print:block font-semibold">{`التوقيع : `}</p>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default SoldPermission;
