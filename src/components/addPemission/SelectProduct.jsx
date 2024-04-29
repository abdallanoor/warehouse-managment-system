import { useContext, useState } from "react";
import { productsContext } from "@/context/ProductsContext";
import { Combobox } from "../shared/Combobox";
import Dialog from "../shared/Dialog";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { PackagePlus } from "lucide-react";
import FormField from "../shared/FormField";
import { useFormik } from "formik";
import { number, object } from "yup";
const SelectProduct = ({ productsData, setProductsData }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [productValues, setProductValues] = useState({});
  const { products, isLoading } = useContext(productsContext);

  const handleProductData = (values) => {
    const isDuplicate = productsData.some(
      (product) => product._id === productValues._id
    );

    if (!isDuplicate) {
      const updatedProducts = [
        ...productsData,
        { ...productValues, ...values },
      ];
      localStorage.setItem(
        "addPermissionProducts",
        JSON.stringify(updatedProducts)
      );
      setProductsData(updatedProducts);
      setProductValues({});
      formik.resetForm();
      toast({
        title: `تم إضافة الصنف '${productValues.productName}' بنجاح`,
      });
    } else {
      toast({
        variant: "destructive",
        title: `تم إضافة الصنف '${productValues.productName}' من قبل`,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      productCount: "",
      productPrice: "",
      totalPrice: "",
    },
    onSubmit: handleProductData,
    validationSchema: object({
      productCount: number().required("يجب إدخال العدد"),
      productPrice: number().required("يجب إدخال السعر"),
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
    <>
      <Dialog
        dialogTrigger={renderProductTrigger()}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        actionTitle="إضافة"
        dialogTitle="اختر الصنف"
        dialogDescription="يرجي اختيار الصنف من فضلك"
        bottomDisabled={!(formik.isValid && formik.dirty)}
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
        {productValues?.productBarCode && (
          <>
            <div className="flex gap-4 text-muted-foreground">
              {productValues && (
                <p>{`العدد بالمخزن : ${
                  productValues.productCount ? productValues.productCount : "0"
                }`}</p>
              )}
              -
              {productValues && (
                <p>{`السعر بالمخزن : ${
                  productValues.productPrice ? productValues.productPrice : "0"
                }`}</p>
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
              id="productPrice"
              value={formik.values.productPrice}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </>
        )}
      </Dialog>
    </>
  );
};

export default SelectProduct;
