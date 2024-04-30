import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Printer } from "lucide-react";
import DeleteProduct from "@/components/addPemission/DeleteProduct";
import ResetData from "@/components/addPemission/ResetData";
import SavePermission from "@/components/addPemission/SavePermission";
import SelectProduct from "@/components/addPemission/SelectProduct";
import SelectVendor from "@/components/addPemission/SelectVendor";
import DynamicTable from "@/components/shared/DynamicTable";
import Heading from "@/components/shared/Heading";
import { Button } from "@/components/ui/button";
import VendorsForm from "@/components/vendors/VendorsForm";
import { addPermissionHeader } from "@/constants";

const AddPermission = () => {
  const [vendorData, setVendorData] = useState(null);
  const [productsData, setProductsData] = useState([]);
  const [addSaved, setAddSaved] = useState(false);
  const componentRef = useRef();

  const localStorageData = {
    vendorInfo: localStorage.getItem("vendor"),
    productInfo: localStorage.getItem("addPermissionProducts"),
    savedValue: localStorage.getItem("addSaved"),
    // savedValue: localStorage.getItem("addSaved"),
  };

  useEffect(() => {
    const { vendorInfo, productInfo, savedValue } = localStorageData;
    if (vendorInfo && !vendorData) setVendorData(JSON.parse(vendorInfo));
    if (productInfo && productsData) setProductsData(JSON.parse(productInfo));
    if (savedValue) setAddSaved(JSON.parse(savedValue));
  }, [localStorageData]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `إذن استلام - ${"" || "غير موجود"}`,
    onPrintError: () => alert("there is an error when printing"),
  });

  // console.log(productsData.length);

  const renderActions = () => {
    if (!vendorData) {
      return (
        <>
          <SelectVendor setVendorData={setVendorData} vendorData={vendorData} />
          <VendorsForm setVendorData={setVendorData} vendorData={vendorData} />
        </>
      );
    } else if (addSaved) {
      return (
        <>
          <Button onClick={handlePrint} className="flex max-sm:w-full">
            <span>طباعه</span>
            <Printer className="w-4 h-4 mr-2" />
          </Button>
          <ResetData
            setVendorData={setVendorData}
            setProductsData={setProductsData}
            setAddSaved={setAddSaved}
          />
        </>
      );
    } else {
      return (
        <>
          <SelectProduct
            setProductsData={setProductsData}
            productsData={productsData}
          />

          <ResetData
            setVendorData={setVendorData}
            setProductsData={setProductsData}
            setAddSaved={setAddSaved}
          />
          <SavePermission
            setAddSaved={setAddSaved}
            vendorData={vendorData}
            productsData={productsData}
          />
        </>
      );
    }
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
            <div className="flex items-center max-sm:w-full w-fit md:mr-auto max-sm:justify-between flex-wrap gap-4 print:hidden">
              {renderActions()}
            </div>
          </div>
          <DynamicTable
            headers={addPermissionHeader}
            data={productsData || []}
            ActionsComponent={DeleteProduct}
            ActionsComponentProps={{
              setProductsData: setProductsData,
              productsData: productsData,
            }}
          />
        </div>
      </section>
    </>
  );
};

export default AddPermission;
