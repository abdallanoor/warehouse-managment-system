import { useContext, useEffect, useState } from "react";
import { productsContext } from "@/context/ProductsContext";
import { Combobox } from "../shared/Combobox";
import Dialog from "../shared/Dialog";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { Package } from "lucide-react";
import FormField from "../shared/FormField";
import { useFormik } from "formik";
import { number, object } from "yup";
import { useTranslation } from "react-i18next";
const SelectProduct = ({
  additionPermissionProducts,
  setAdditionPermissionProducts,
  soldPermissionProducts,
  setSoldPermissionProducts,
  soldIsSaved,
  additionIsSaved,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [productValues, setProductValues] = useState(null);
  const { products, isLoading, setFetchProducts } = useContext(productsContext);

  const [t] = useTranslation("global");

  // Fetch products when we need them
  // useEffect(() => {
  //   setFetchProducts(true);
  // }, []);

  if (additionPermissionProducts) {
    var filteredadditionPermissionProducts = products?.filter((product) => {
      return !additionPermissionProducts.some(
        (productInStorage) =>
          product.productBarCode === productInStorage.productBarCode
      );
    });
  }

  if (soldPermissionProducts) {
    var filteredSoldPermissionProducts = products?.filter((product) => {
      return !soldPermissionProducts.some(
        (productInStorage) =>
          product.productBarCode === productInStorage.productBarCode
      );
    });
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
          title: `${t("descriptions.successfullyAdded")} ${
            productValues.productName
          }`,
        });
      } else {
        toast({
          variant: "destructive",
          title: `${t("descriptions.wrongAdded")} ${
            productValues.productBarCode
          }`,
        });
      }
    }

    if (soldPermissionProducts) {
      const isDuplicate = soldPermissionProducts.some(
        (product) => product.productBarCode === productValues.productBarCode
      );
      if (values.productCount > productValues.productCount) {
        return (formik.errors.productCount = `${t(
          "saleProducts.quantityLimit"
        )} ${productValues.productCount}`);
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
          title: `${t("descriptions.successfullyAdded")} ${
            productValues.productName
          }`,
        });
      } else {
        toast({
          variant: "destructive",
          title: `${t("descriptions.wrongAdded")} ${
            productValues.productBarCode
          }`,
        });
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      productCount: "",
      productPrice: productValues ? productValues.productPrice : "",
    },
    onSubmit: handleProductData,
    validationSchema: object({
      productCount: number()
        .typeError(t("messageError.onlyNumber"))
        .required(t("messageError.quantityEntered")),
      productPrice: number()
        .typeError(t("messageError.onlyNumber"))
        .required(t("messageError.priceEntered")),
    }),
  });

  useEffect(() => {
    if (productValues) {
      formik.setFieldValue("productPrice", productValues.productPrice || "");
    }
  }, [productValues]);

  const renderProductTrigger = () => (
    <>
      <Button
        className="max-sm:w-full"
        onClick={() => {
          setDialogOpen(true);
          // Fetch products when we need them
          setFetchProducts(true);
        }}
        disabled={soldIsSaved || additionIsSaved}
      >
        <span>{t("saleProducts.selectProduct")}</span>
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
        actionTitle={t("share.add")}
        dialogTitle={t("saleProducts.selectProduct")}
        dialogDescription={t("saleProducts.productNotSelected")}
        handleForm={formik.handleSubmit}
        bottomDisabled={
          productValues === null ||
          (soldPermissionProducts && !productValues.productCount)
        }
      >
        <Combobox
          data={
            soldPermissionProducts
              ? filteredSoldPermissionProducts?.reverse()
              : additionPermissionProducts
              ? filteredadditionPermissionProducts?.reverse()
              : []
          }
          setValues={setProductValues}
          lable="productName"
          placeholder={t("search.name")}
          buttonTitle={t("saleProducts.selectProduct")}
          isLoading={isLoading}
        />
        {productValues?.productBarCode && (
          <>
            <div className="flex gap-4 text-muted-foreground">
              {productValues && (
                <>
                  <p>{`${t("saleProducts.stockQuantity")} : ${
                    productValues.productCount || "0"
                  }`}</p>
                  <p>{`${t("saleProducts.stockPrice")} : ${
                    productValues.productPrice || "0"
                  }`}</p>
                </>
              )}
            </div>
            {soldPermissionProducts && !productValues.productCount ? (
              <p className="text-sm text-destructive">{`${
                productValues.productName
              } ${t("saleProducts.noneInStock")}`}</p>
            ) : (
              <>
                {["productCount", "productPrice"].map((field) => (
                  <FormField
                    key={field}
                    labelTitle={
                      field === "productCount"
                        ? t("share.quantity")
                        : t("share.unitPrice")
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
