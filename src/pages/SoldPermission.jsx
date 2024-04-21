import DynamicTable from "@/components/shared/DynamicTable";
import Heading from "@/components/shared/Heading";
import NewSoldPermission from "@/components/soldpermission/NewSoldPermission";
import SaveSoldPermission from "@/components/soldpermission/SaveSoldPermission";
import SelectSoldCustomer from "@/components/soldpermission/SelectSoldCustomer";
import { SelectSoldProduct } from "@/components/soldpermission/SelectSoldProduct";
import { Button } from "@/components/ui/button";
import { soldPermissionHeader } from "@/constants";
import { soldPermissionContext } from "@/context/SoldPremissionContext";
import { Printer } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

const SoldPermission = () => {
  const {
    soldPermissions,
    isLoading,
    isError,
    allSoldPermissions,
    soldPermissionInfo,
  } = useContext(soldPermissionContext);
  const [slodSaved, setSlodSaved] = useState(null);

  const componentRef = useRef();

  const [permissionInfo, setPermissionInfo] = useState([]);

  const invoiceNumber =
    (allSoldPermissions?.data?.allSoldPermissionInfo?.length || 0) + 1;

  useEffect(() => {
    if (soldPermissionInfo?.data?.Info?.length > 0) {
      setPermissionInfo(soldPermissionInfo.data.Info[0]);
    } else {
      setPermissionInfo("");
    }
  }, [soldPermissionInfo]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `إذن استلام - ${
      permissionInfo?.invoiceNumber || "غير موجود"
    }`,
    onPrintError: () => alert("there is an error when printing"),
  });

  useEffect(() => {
    if (localStorage.getItem("slodSaved")) {
      setSlodSaved(localStorage.getItem("slodSaved"));
    }
  }, [localStorage.getItem("slodSaved")]);

  return (
    <>
      <section ref={componentRef} className="print:m-8">
        <Heading className="print:hidden">إذن صرف</Heading>
        <Heading className="hidden print:block">إذن إستلام</Heading>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-4 items-center max-md:flex-col max-sm:items-center print:items-start">
            {permissionInfo ? (
              <p className="animate-fadeIn font-semibold ">{`اسم العميل : ${permissionInfo?.customerName}`}</p>
            ) : (
              <p className="animate-fadeIn">الرجاء اختيار العميل</p>
            )}

            <div className="flex items-center max-sm:w-full w-fit md:mr-auto max-sm:justify-between flex-wrap gap-4 print:hidden">
              {!permissionInfo ? (
                <>
                  <SelectSoldCustomer invoiceNumber={invoiceNumber} />
                </>
              ) : slodSaved === "true" ? (
                <>
                  <Button onClick={handlePrint} className="flex max-sm:w-full">
                    <span>طباعه</span>
                    <Printer className="w-4 h-4 mr-2" />
                  </Button>
                  <NewSoldPermission />
                </>
              ) : soldPermissions?.data?.products?.length > 0 ? (
                <>
                  <SelectSoldProduct invoiceNumber={invoiceNumber} />
                  <SaveSoldPermission setSlodSaved={setSlodSaved} />
                  <NewSoldPermission />
                </>
              ) : (
                <>
                  <SelectSoldProduct invoiceNumber={invoiceNumber} />
                  <NewSoldPermission />
                </>
              )}
            </div>
          </div>

          {permissionInfo && (
            <p className="hidden print:block font-semibold">{`تحرير في : ${permissionInfo?.datePermission}`}</p>
          )}

          <DynamicTable
            headers={soldPermissionHeader}
            data={soldPermissions?.data?.products || []}
            error={isError}
            loading={isLoading}
            tableAction
          />

          {permissionInfo && (
            <p className="hidden print:block font-semibold">{`رقم الاذن : ${permissionInfo?.invoiceNumber}`}</p>
          )}

          {permissionInfo && (
            <p className="hidden print:block font-semibold">{`التوقيع : `}</p>
          )}

          {permissionInfo && (
            <p className="text-sm text-muted-foreground animate-fadeIn max-w-screen-md print:hidden">
              يرجى ملاحظة أنه يمكن حذف البيانات الحالية والعميل، وإضافة بيانات
              جديدة لعميل جديد عبر النقر على زر إذن صرف جديد. لحفظ التغييرات بعد
              إضافة الأصناف، يُرجى الضغط على زر الحفظ.
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default SoldPermission;
