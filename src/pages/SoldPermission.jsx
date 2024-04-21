import { useContext, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
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
    setPermissionInfo(soldPermissionInfo?.data?.Info?.[0] || "");
  }, [soldPermissionInfo]);

  useEffect(() => {
    if (localStorage.getItem("slodSaved")) {
      setSlodSaved(localStorage.getItem("slodSaved"));
    }
  }, [localStorage.getItem("slodSaved")]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `إذن استلام - ${
      permissionInfo?.invoiceNumber || "غير موجود"
    }`,
    onPrintError: () => alert("there is an error when printing"),
  });

  const renderSoldPermissionActions = () => {
    if (!permissionInfo) {
      return <SelectSoldCustomer invoiceNumber={invoiceNumber} />;
    } else if (slodSaved === "true") {
      return (
        <>
          <Button onClick={handlePrint} className="flex max-sm:w-full">
            <span>طباعه</span>
            <Printer className="w-4 h-4 mr-2" />
          </Button>
          <NewSoldPermission />
        </>
      );
    } else {
      const productsExist = soldPermissions?.data?.products?.length > 0;
      return (
        <>
          <SelectSoldProduct invoiceNumber={invoiceNumber} />
          {productsExist && <SaveSoldPermission setSlodSaved={setSlodSaved} />}
          <NewSoldPermission />
        </>
      );
    }
  };

  return (
    <>
      <section ref={componentRef} className="print:m-8">
        <Heading className="print:hidden">إذن صرف</Heading>
        <Heading className="hidden print:block">إذن إستلام</Heading>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-4 items-center max-md:flex-col max-sm:items-center print:items-start">
            <p className="animate-fadeIn font-semibold">
              {permissionInfo
                ? `اسم العميل : ${permissionInfo?.customerName}`
                : "الرجاء اختيار العميل"}
            </p>
            <div className="flex items-center max-sm:w-full w-fit md:mr-auto max-sm:justify-between flex-wrap gap-4 print:hidden">
              {renderSoldPermissionActions()}
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
            <>
              <p className="hidden print:block font-semibold">{`رقم الاذن : ${permissionInfo?.invoiceNumber}`}</p>
              <p className="hidden print:block font-semibold">{`التوقيع : `}</p>
              <p className="text-sm text-muted-foreground animate-fadeIn max-w-screen-md print:hidden">
                يرجى ملاحظة أنه يمكن حذف البيانات الحالية والعميل، وإضافة بيانات
                جديدة لعميل جديد عبر النقر على زر إذن صرف جديد. لحفظ التغييرات
                بعد إضافة الأصناف، يُرجى الضغط على زر الحفظ.
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default SoldPermission;
