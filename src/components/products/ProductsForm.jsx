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
} from "@/constants";

const ProductsForm = ({ rowEditData, setDropdownOpen }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { refetchProducts } = useContext(productsContext);

  const onSubmit = async (values) => {
    const method = isEditing ? axios.put : axios.post;
    const messageKey = isEditing ? "Update Successfully" : "Save Successfully";

    setIsLoading(true);
    method(`${import.meta.env.VITE_API_URL}/api/storageProducts/`, values, {
      headers: {
        authorization: `Warhouse ${localStorage.getItem("userToken")}`,
      },
    })
      .then(({ data }) => {
        if (data.message === messageKey) {
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
          title: `${error.response.data.message}`,
        });
      })
      .finally(() => setIsLoading(false));
  };

  const formik = useFormik({
    initialValues: productsInitialValues,
    onSubmit,
    validationSchema: productsSchema,
  });

  const renderAddDialogTrigger = () => (
    <Button
      className="w-full active:scale-95 transition-transform"
      onClick={() => setDialogOpen(true)}
    >
      <span>إضافة صنف</span>
      <PackagePlus className="mr-1 w-4 h-4" />
    </Button>
  );

  const handleUpdate = () => {
    setIsEditing(true);
    setDialogOpen(true);
    formik.setValues(rowEditData);
  };

  const renderUpdateDialogTrigger = () => (
    <div
      onClick={() => handleUpdate()}
      className="flex items-center cursor-pointer gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent"
    >
      <SquarePen className="w-4 h-4" />
      <span>تعديل</span>
    </div>
  );

  return (
    <Dialog
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
      dialogTrigger={
        rowEditData ? renderUpdateDialogTrigger() : renderAddDialogTrigger()
      }
      dialogTitle={`${
        rowEditData ? `تعديل الصنف | ${rowEditData.productName}` : "أضافة صنف"
      }`}
      dialogDescription={`يجب عليك ملء جميع الخانات ${
        rowEditData ? "لتعديل الصنف" : "لأضافة صنف جديد"
      }`}
      actionTitle={rowEditData ? "تعديل" : "أضافة"}
      handleAction={formik.handleSubmit}
      loadingButton={isLoading}
      bottomDisabled={!(formik.isValid && formik.dirty) || isLoading}
    >
      <FormScroll>
        {productsFormField.map(({ label, id }) => (
          <FormField
            key={id}
            labelTitle={label}
            id={id}
            onChange={formik.handleChange}
            value={formik.values[id]}
            onBlur={formik.handleBlur}
          />
        ))}
      </FormScroll>
    </Dialog>
  );
};

export default ProductsForm;
