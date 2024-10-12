import { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { productsContext } from "@/context/ProductsContext";
import Dialog from "../shared/Dialog";
import FormField from "../shared/FormField";
import FormScroll from "../shared/FormScroll";
import { PackagePlus, SquarePen } from "lucide-react";
import { Button } from "../ui/button";
import {
  getProductsFormField,
  getProductsSchema,
  productsInitialValues,
  getPermissionProductsSchema,
} from "@/constants";
import { useTranslation } from "react-i18next";

const ProductsForm = ({
  rowData,
  setDropdownOpen,
  triggerClassName,
  additionPermissionProducts,
  setAdditionPermissionProducts,
  additionIsSaved,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { refetchProducts } = useContext(productsContext);

  const [t] = useTranslation("global");

  const productsSchema = getProductsSchema(t);

  const permissionProductsSchema = getPermissionProductsSchema(t);

  const productsFormField = getProductsFormField(t);

  const permissionSubmit = (values) => {
    const isDuplicate = additionPermissionProducts.some(
      (product) => product.productBarCode === values.productBarCode
    );

    if (!isDuplicate) {
      const totalPrice = values.productPrice * values.productCount;
      const newProduct = { ...values, totalPrice };
      const updatedProducts = [...additionPermissionProducts, newProduct];

      localStorage.setItem(
        "additionPermissionProducts",
        JSON.stringify(updatedProducts)
      );
      setAdditionPermissionProducts(updatedProducts);
      formik.resetForm();
      toast({
        title: `${t("descriptions.successfullyAdded")} ${values.productName}`,
      });
      return;
    } else {
      toast({
        variant: "destructive",
        title: `${t("descriptions.wrongAdded")} ${values.productBarCode}`,
      });
      return;
    }
  };

  //Add and Edit Products with feching
  const addAndEditSubmit = async (values) => {
    const method = isEditing ? axios.put : axios.post;

    setIsLoading(true);
    method(`${import.meta.env.VITE_API_URL}/api/storageProducts/`, values, {
      headers: {
        authorization: `Warhouse ${localStorage.getItem("userToken")}`,
      },
    })
      .then(({ data }) => {
        if (data.message === "Done") {
          setDialogOpen(false);
          if (isEditing) {
            setDropdownOpen(false);
          }
          refetchProducts();
          const actionMessage = isEditing
            ? t("descriptions.successfullyEdited")
            : t("descriptions.successfullyAdded");
          toast({
            title: `${actionMessage} ${formik.values.productName}`,
          });
          formik.resetForm();
        } else {
          toast({
            variant: "destructive",
            title: t("descriptions.wrong"),
          });
        }
      })
      .catch((error) => {
        toast({
          title: `${error}`,
        });
      })
      .finally(() => setIsLoading(false));
  };

  const formik = useFormik({
    initialValues: productsInitialValues,
    onSubmit: additionPermissionProducts ? permissionSubmit : addAndEditSubmit,
    validationSchema: additionPermissionProducts
      ? permissionProductsSchema
      : productsSchema,
  });

  //adding
  const renderAddDialogTrigger = () => (
    <Button className="max-sm:w-full" onClick={() => setDialogOpen(true)}>
      <span>{t("products.addProduct")}</span>
      <PackagePlus className="w-4 h-4" />
    </Button>
  );

  //adding permission
  const renderPermissionDialogTrigger = () => (
    <Button
      disabled={additionIsSaved}
      className="max-sm:w-full"
      onClick={() => setDialogOpen(true)}
    >
      <span>{t("products.addProduct")}</span>
      <PackagePlus className="w-4 h-4" />
    </Button>
  );

  //editing
  const handleUpdate = () => {
    setIsEditing(true);
    setDialogOpen(true);
    formik.setValues(rowData);
  };

  const renderUpdateDialogTrigger = () => (
    <div onClick={() => handleUpdate()} className={triggerClassName}>
      <SquarePen className="w-4 h-4" />
      <span>{t("share.edit")}</span>
    </div>
  );

  return (
    <Dialog
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
      dialogTrigger={
        rowData
          ? renderUpdateDialogTrigger()
          : additionPermissionProducts
          ? renderPermissionDialogTrigger()
          : renderAddDialogTrigger()
      }
      dialogTitle={`${
        rowData
          ? `${t("share.edit")} | ${rowData.productName}`
          : t("products.addProduct")
      }`}
      dialogDescription={`${
        rowData
          ? t("descriptions.edit")
          : additionPermissionProducts
          ? t("products.description-n-c-c-p")
          : t("products.description-n-c")
      }`}
      actionTitle={rowData ? t("share.edit") : t("share.add")}
      handleForm={formik.handleSubmit}
      loadingButton={isLoading}
      bottomDisabled={isLoading}
    >
      <FormScroll>
        {productsFormField.map(({ label, key }) => (
          <FormField
            key={key}
            labelTitle={label}
            messageErrorCondition={formik.errors[key] && formik.touched[key]}
            messageError={formik.errors[key]}
            id={key}
            onChange={formik.handleChange}
            value={formik.values[key]}
            onBlur={formik.handleBlur}
            disabled={
              isEditing
                ? key === "productBarCode" || key === "productCount"
                : null
            }
          />
        ))}
      </FormScroll>
    </Dialog>
  );
};

export default ProductsForm;
