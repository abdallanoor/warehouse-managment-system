import { useContext, useState } from "react";
import { productsContext } from "@/context/ProductsContext";
import { Combobox } from "../shared/Combobox";
import Dialog from "../shared/Dialog";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { PackagePlus } from "lucide-react";
import { soldPermissionContext } from "@/context/SoldPremissionContext";
import FormField from "../shared/FormField";
import { useFormik } from "formik";
import { number, object } from "yup";

export function SelectSoldProduct() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productValues, setProductValues] = useState({});
  const { products, refetchProducts, isLoading } = useContext(productsContext);
  const { refetchSoldPermission, invoiceNumber } = useContext(
    soldPermissionContext
  );

  const handleProductData = async (values) => {
    setLoading(true);
    await axios
      .post(
        `${
          import.meta.env.VITE_API_URL
        }/api/soldpermission/sendPrereviewProduct`,
        { ...productValues, ...values },
        {
          headers: {
            authorization: `Warhouse ${localStorage.getItem("userToken")}`,
          },
        }
      )
      .then(({ data }) => {
        console.log(data);

        if (data.message === "Done") {
          refetchSoldPermission();
          refetchProducts();
          // setDialogOpen(false);
          formik.resetForm();
          setProductValues({});
          toast({
            title: `تم إضافة ${productValues.productName} بنجاح`,
          });
        } else if (data.message === "you is already add information") {
          toast({
            variant: "destructive",
            title: "انت اخترت الصنف بالفعل!",
          });
        } else if (data.message === "you cant sell greater than you have") {
          toast({
            variant: "destructive",
            title: `${productValues.productName} غير متوفر بالمخزن`,
          });
        } else if (data.message === "this code is already add") {
          toast({
            variant: "destructive",
            title: "انت اخترت الصنف بالفعل!",
          });
        } else {
          toast({
            variant: "destructive",
            title: "هناك خطأ!",
          });
        }
      })
      .catch((error) => {
        toast({
          title: `${error.response.data.message}`,
        });
      })
      .finally(() => setLoading(false));
  };

  const formik = useFormik({
    initialValues: {
      productCount: "",
      productPriceSell: "",
      invoiceNumber: invoiceNumber,
    },
    onSubmit: handleProductData,
    validationSchema: object({
      productCount: number().required("يجب إدخال العدد"),
      productPriceSell: number().required("يجب إدخال السعر"),
    }),
  });

  const renderProductTrigger = () => (
    <>
      <Button
        className="gap-1 max-sm:w-full animate-fadeIn"
        onClick={() => setDialogOpen(true)}
      >
        <span>اختر الصنف</span>
        <PackagePlus className="w-4 h-4" />
      </Button>
    </>
  );

  return (
    <Dialog
      dialogTrigger={renderProductTrigger()}
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
      actionTitle="إضافة"
      dialogTitle="اختر الصنف"
      dialogDescription="يرجي اختيار الصنف من فضلك"
      bottomDisabled={!(formik.isValid && formik.dirty) || loading}
      loadingButton={loading}
      handleAction={formik.handleSubmit}
    >
      <Combobox
        data={products?.data?.products}
        setValues={setProductValues}
        lable="productName"
        placeholder="الصنف بالاسم"
        buttonTitle="اختر الصنف"
        isLoading={isLoading}
      />
      {productValues?.productCode && (
        <>
          <div className="flex gap-4 text-muted-foreground">
            {productValues && (
              <p>{`العدد بالمخزن : ${productValues?.productCount}`}</p>
            )}
            -
            {productValues && (
              <p>{`السعر بالمخزن : ${productValues?.productPriceSell}`}</p>
            )}
          </div>
          <FormField
            labelTitle="العدد"
            id="productCount"
            value={formik.values.productCount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <FormField
            labelTitle="سعر الوحدة"
            id="productPriceSell"
            value={formik.values.productPriceSell}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </>
      )}
    </Dialog>
  );
}
