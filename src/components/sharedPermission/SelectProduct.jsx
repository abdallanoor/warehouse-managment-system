import { useContext, useState } from "react";
import { productsContext } from "@/context/ProductsContext";
import { Combobox } from "../shared/Combobox";
import Dialog from "../shared/Dialog";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { Package } from "lucide-react";
import FormField from "../shared/FormField";
import { useFormik } from "formik";
import { number, object } from "yup";
const SelectProduct = ({
  additionPermissionProducts,
  setAdditionPermissionProducts,
  soldPermissionProducts,
  setSoldPermissionProducts,
  soldSaved,
  additionIsSaved,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [productValues, setProductValues] = useState(null);
  const { products, isLoading } = useContext(productsContext);

  if (additionPermissionProducts) {
    var filteredadditionPermissionProducts = products?.data?.products.filter(
      (product) => {
        return !additionPermissionProducts.some(
          (productInStorage) =>
            product.productBarCode === productInStorage.productBarCode
        );
      }
    );
  }

  if (soldPermissionProducts) {
    var filteredSoldPermissionProducts = products?.data?.products.filter(
      (product) => {
        return !soldPermissionProducts.some(
          (productInStorage) =>
            product.productBarCode === productInStorage.productBarCode
        );
      }
    );
  }

  const handleProductData = (values) => {
    if (additionPermissionProducts) {
      const isDuplicate = additionPermissionProducts.some(
        (product) => product.productBarCode === productValues.productBarCode
      );

      if (!isDuplicate) {
        const updatedProducts = [
          ...additionPermissionProducts,
          {
            ...productValues,
            ...values,
            totalPrice: values.productPrice * values.productCount,
          },
        ];

        localStorage.setItem(
          "additionPermissionProducts",
          JSON.stringify(updatedProducts)
        );
        setAdditionPermissionProducts(updatedProducts);
        setProductValues({});
        setDialogOpen(false);
        formik.resetForm();
        toast({
          title: `تم إضافة الصنف '${productValues.productName}' بنجاح`,
        });
      } else {
        toast({
          variant: "destructive",
          title: `تم إضافة الصنف بالكود ${productValues.productBarCode} من قبل`,
        });
      }
    }

    if (soldPermissionProducts) {
      const isDuplicate = soldPermissionProducts.some(
        (product) => product.productBarCode === productValues.productBarCode
      );
      if (values.productCount > productValues.productCount) {
        return (formik.errors.productCount = `لا يمكن أن يكون العدد أكبر من ${productValues.productCount}`);
      }

      if (!isDuplicate) {
        const updatedProducts = [
          ...soldPermissionProducts,
          {
            ...productValues,
            ...values,
            totalPrice: values.productPrice * values.productCount,
          },
        ];

        localStorage.setItem(
          "soldPermissionProducts",
          JSON.stringify(updatedProducts)
        );
        setSoldPermissionProducts(updatedProducts);
        setProductValues({});
        setDialogOpen(false);
        formik.resetForm();
        toast({
          title: `تم إضافة الصنف '${productValues.productName}' بنجاح`,
        });
      } else {
        toast({
          variant: "destructive",
          title: `تم إضافة الصنف بالكود ${productValues.productBarCode} من قبل`,
        });
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      productCount: "",
      productPrice: "",
    },
    onSubmit: handleProductData,
    validationSchema: object({
      productCount: number()
        .typeError("يجب إدخال ارقام فقط")
        .required("يجب إدخال العدد"),
      productPrice: number()
        .typeError("يجب إدخال ارقام فقط")
        .required("يجب إدخال السعر"),
    }),
  });

  const renderProductTrigger = () => (
    <>
      <Button
        className="gap-1 max-sm:w-full"
        onClick={() => setDialogOpen(true)}
        disabled={soldSaved || additionIsSaved}
      >
        <span>اختر الصنف</span>
        <Package className="w-4 h-4" />
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
        handleAction={formik.handleSubmit}
        bottomDisabled={
          productValues === null ||
          (soldPermissionProducts && !productValues.productCount)
        }
      >
        <Combobox
          data={
            soldPermissionProducts
              ? filteredSoldPermissionProducts
              : additionPermissionProducts
              ? filteredadditionPermissionProducts
              : []
          }
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
                <>
                  <p>{`العدد بالمخزن : ${
                    productValues.productCount || "0"
                  }`}</p>
                  <p>{`السعر بالمخزن : ${
                    productValues.productPrice || "0"
                  }`}</p>
                </>
              )}
            </div>
            {soldPermissionProducts && !productValues.productCount ? (
              <p className="text-sm text-red-600">{`الصنف ${productValues.productName} لا يوجد منه في المخزن لذالك لا يمكنك بيعه`}</p>
            ) : (
              <>
                {["productCount", "productPrice"].map((field) => (
                  <FormField
                    key={field}
                    labelTitle={
                      field === "productCount" ? "العدد" : "سعر الوحدة"
                    }
                    id={field}
                    value={formik.values[field]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    messageErrorCondition={
                      formik.errors[field] && formik.touched[field]
                    }
                    messageError={formik.errors[field]}
                  />
                ))}
              </>
            )}
          </>
        )}
      </Dialog>
    </>
  );
};

export default SelectProduct;
