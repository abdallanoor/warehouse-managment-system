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
  productsFormField,
  productsSchema,
  productsInitialValues,
  permissionProductsSchema,
} from "@/constants";

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
        title: `تم إضافة الصنف ${values.productName} بنجاح`,
      });
      return;
    } else {
      toast({
        variant: "destructive",
        title: `تم إضافة الصنف بالكود ${values.productBarCode} من قبل`,
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
          const actionMessage = isEditing ? "تم تعديل" : "تم إضافة";
          toast({
            title: `${actionMessage} ${formik.values.productName} بنجاح`,
          });
          formik.resetForm();
        } else {
          toast({
            variant: "destructive",
            title: "هناك خطأ!",
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
      <span>إضافة صنف</span>
      <PackagePlus className="mr-1 w-4 h-4" />
    </Button>
  );

  //adding permission
  const renderPermissionDialogTrigger = () => (
    <Button
      disabled={additionIsSaved}
      className="max-sm:w-full"
      onClick={() => setDialogOpen(true)}
    >
      <span>إضافة صنف جديد</span>
      <PackagePlus className="mr-1 w-4 h-4" />
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
      <span>تعديل</span>
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
        rowData ? `تعديل الصنف | ${rowData.productName}` : "إضافة صنف"
      }`}
      dialogDescription={`يجب عليك ملء ${
        rowData
          ? "الخانات المراد تعديلها"
          : additionPermissionProducts
          ? "اسم الصنف و الكود والعدد والسعر اولاً لأضافة صنف جديد"
          : "اسم الصنف و الكود اولاً لأضافة صنف جديد"
      }`}
      actionTitle={rowData ? "تعديل" : "إضافة"}
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
          />
        ))}
      </FormScroll>
    </Dialog>
  );
};

export default ProductsForm;
