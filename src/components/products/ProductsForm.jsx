import { useContext, useState } from "react";
import { useFormik } from "formik";
import { object, string, number } from "yup";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { productsContext } from "@/context/ProductsContext";
import Dialog from "../shared/Dialog";
import FormField from "../shared/FormField";
import FormScroll from "../shared/FormScroll";
import { PackagePlus } from "lucide-react";

const ProductsForm = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { refetchProducts } = useContext(productsContext);

  const validationSchema = object({
    productName: string().required("يجب إدخال اسم الصنف"),
    productPartNumber: string().required("يجب إدخال السيريال"),
    productType: string().required("يجب إدخال الماركة"),
    productCount: number().required("يجب إدخال العدد"),
    productLocation: string().required("يجب إدخال مكان الصنف"),
    productPriceSell: number().required("يجب إدخال السعر"),
    productCountry: string().required("يجب إدخال بلد المنشـأ"),
  });

  const initialValues = {
    productName: "",
    productPartNumber: "",
    productType: "",
    productCount: "",
    productLocation: "",
    productPriceSell: "",
    productCountry: "",
    date: new Date().toLocaleDateString("en-GB"),
  };

  const onSubmit = async (values) => {
    setIsLoading(true);
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/storageProducts/`, values, {
        headers: {
          authorization: `Warhouse ${localStorage.getItem("userToken")}`,
        },
      })
      .then(({ data }) => {
        if (data.message === "Save Successfully") {
          setDialogOpen(false);
          refetchProducts();
          toast({
            title: `تم إضافة ${formik.values.productName} بنجاح`,
          });
          formik.resetForm();
        }
        if (data.message === "productName is requird") {
          toast({
            variant: "destructive",
            title: "الصنف موجود بالفعل!",
          });
        }
      })
      .catch((error) => {
        toast({
          title: `${error.response.data.message}`,
        });
      })
      .finally(() => setIsLoading(false));
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const renderDialogButton = () => {
    return (
      <>
        <span>اضافه صنف</span>
        <PackagePlus className="mr-1 w-4 h-4" />
      </>
    );
  };

  return (
    <>
      <Dialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        dialogTrigger={renderDialogButton()}
        dialogTitle="أضافة صنف"
        dialogDescription="يجب عليك ملء جميع الخانات لأضافة صنف جديد"
        actionTitle="أضافة"
        handleAction={formik.handleSubmit}
        loadingButton={isLoading}
        bottomDisabled={!(formik.isValid && formik.dirty) || isLoading}
      >
        <FormScroll>
          <FormField
            labelTitle="اسم الصنف"
            id="productName"
            onChange={formik.handleChange}
            value={formik.values.productName}
            onBlur={formik.handleBlur}
          />
          <FormField
            labelTitle="السيريال"
            id="productPartNumber"
            onChange={formik.handleChange}
            value={formik.values.productPartNumber}
            onBlur={formik.handleBlur}
          />
          <FormField
            labelTitle="الماركة"
            id="productType"
            onChange={formik.handleChange}
            value={formik.values.productType}
            onBlur={formik.handleBlur}
          />
          <FormField
            labelTitle="بلد المنشـأ"
            id="productCountry"
            onChange={formik.handleChange}
            value={formik.values.productCountry}
            onBlur={formik.handleBlur}
          />
          <FormField
            labelTitle="المكان"
            id="productLocation"
            onChange={formik.handleChange}
            value={formik.values.productLocation}
            onBlur={formik.handleBlur}
          />
          <FormField
            labelTitle="العدد"
            id="productCount"
            onChange={formik.handleChange}
            value={formik.values.productCount}
            onBlur={formik.handleBlur}
          />
          <FormField
            labelTitle="سعر الوحده"
            id="productPriceSell"
            onChange={formik.handleChange}
            value={formik.values.productPriceSell}
            onBlur={formik.handleBlur}
          />
        </FormScroll>
      </Dialog>
    </>
  );
};

export default ProductsForm;
