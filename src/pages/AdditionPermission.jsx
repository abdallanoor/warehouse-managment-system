import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Printer } from "lucide-react";
import DeleteProduct from "@/components/sharedPermission/DeleteProduct";
import ResetData from "@/components/sharedPermission/ResetData";
import SavePermission from "@/components/sharedPermission/SavePermission";
import SelectProduct from "@/components/sharedPermission/SelectProduct";
import SelectVendor from "@/components/additionPemission/SelectVendor";
import DynamicTable from "@/components/shared/DynamicTable";
import Heading from "@/components/shared/Heading";
import { Button } from "@/components/ui/button";
import VendorsForm from "@/components/vendors/VendorsForm";
import { additionPermissionHeader } from "@/constants";
import useLocalStorageEffect from "@/hooks/useLocalStorageEffect";
import ProductsForm from "@/components/products/ProductsForm";

const AdditionPermission = () => {
  const [vendorData, setVendorData] = useState(null);
  const [additionPermissionProducts, setAdditionPermissionProducts] = useState(
    []
  );
  const [invoiceNumber, setInvoiceNumber] = useState(null);
  const [additionIsSaved, setAdditionIsSaved] = useState(false);

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
    documentTitle: `إذن إضافة - ${invoiceNumber || "غير موجود"}`,
    onPrintError: () => alert("يوجد مشكلة في الطباعة"),
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
        <Heading>إذن إضافة</Heading>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-4 items-center max-md:flex-col max-sm:items-center print:items-start">
            <p className="font-semibold">
              {vendorData
                ? `اسم المورد : ${vendorData.vendorName}`
                : "الرجاء اختيار المورد"}
            </p>
            <div className="flex items-center justify-center md:justify-end max-sm:w-full w-fit md:mr-auto max-sm:justify-between flex-wrap gap-4 print:hidden">
              {renderActions()}
            </div>
          </div>

          {additionIsSaved && (
            <p className="hidden print:block font-semibold">{`تحرير في : ${new Date().toLocaleDateString(
              "en-GB"
            )}`}</p>
          )}
          <DynamicTable
            headers={additionPermissionHeader}
            data={additionPermissionProducts.reverse() || []}
            ActionsComponent={!additionIsSaved && DeleteProduct}
            ActionsComponentProps={{
              additionPermissionProducts: additionPermissionProducts,
              setAdditionPermissionProducts: setAdditionPermissionProducts,
            }}
          />

          {additionIsSaved && (
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

export default AdditionPermission;
