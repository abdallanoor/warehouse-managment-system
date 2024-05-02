import { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "../ui/use-toast";
import Dialog from "../shared/Dialog";
import FormField from "../shared/FormField";
import { SquarePen, UserPlus } from "lucide-react";
import { vendorsContext } from "@/context/VendorsContext";
import { Button } from "../ui/button";
import {
  vendorsFormField,
  vendorsInitialValues,
  vendorsSchema,
} from "@/constants";

const VendorsForm = ({
  rowData,
  setDropdownOpen,
  triggerClassName,
  vendorData,
  setVendorData,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingPermission, setIsAddingPermission] = useState(false);
  const { refetchVendors } = useContext(vendorsContext);

  const onSubmit = async (values) => {
    if (isAddingPermission) {
      localStorage.setItem("vendor", JSON.stringify(values));
      setVendorData(values);
      toast({
        title: `تم اختيار المورد ${values.vendorName} بنجاح`,
      });
      setDialogOpen(false);
      return;
    }
    const method = isEditing ? axios.put : axios.post;

    setIsLoading(true);
    method(`${import.meta.env.VITE_API_URL}/api/vendors/`, values, {
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

          refetchVendors();
          const actionMessage = isEditing ? "تم تعديل" : "تم إضافة";
          toast({
            title: `${actionMessage} ${formik.values.vendorName} بنجاح`,
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
    initialValues: vendorsInitialValues,
    onSubmit,
    validationSchema: vendorsSchema,
  });

  //adding
  const renderAddDialogTrigger = () => (
    <Button
      disabled={vendorData && vendorData !== null}
      onClick={() => setDialogOpen(true)}
      className="max-sm:w-full"
    >
      <span>إضافة مورد</span>
      <UserPlus className="mr-1 w-4 h-4" />
    </Button>
  );

  //adding permission

  const renderAddPermissionDialogTrigger = () => (
    <Button onClick={() => handleAddPermission()} className="max-sm:w-full">
      <span>إضافة مورد جديد</span>
      <UserPlus className="mr-1 w-4 h-4" />
    </Button>
  );

  const handleAddPermission = () => {
    setIsAddingPermission(true);
    setDialogOpen(true);
  };

  //editing

  const renderUpdateDialogTrigger = () => (
    <div onClick={() => handleUpdate()} className={triggerClassName}>
      <SquarePen className="w-4 h-4" />
      <span>تعديل</span>
    </div>
  );

  const handleUpdate = () => {
    setIsEditing(true);
    setDialogOpen(true);
    formik.setValues(rowData);
  };

  return (
    <>
      <Dialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        dialogTrigger={
          rowData
            ? renderUpdateDialogTrigger()
            : vendorData === null
            ? renderAddPermissionDialogTrigger()
            : renderAddDialogTrigger()
        }
        dialogTitle={`${
          rowData ? `تعديل المورد | ${rowData.vendorName}` : "إضافة مورد"
        }`}
        dialogDescription={`يجب عليك ملء ${
          rowData
            ? "الخانات المراد تعديلها"
            : "اسم المورد اولاً لإضافة مورد جديد"
        }`}
        actionTitle={rowData ? "تعديل" : "إضافة"}
        handleForm={formik.handleSubmit}
        loadingButton={isLoading}
        bottomDisabled={isLoading}
      >
        {vendorsFormField.map(({ label, key }) => (
          <FormField
            key={key}
            labelTitle={label}
            messageErrorCondition={formik.errors[key] && formik.touched[key]}
            messageError={formik.errors[key]}
            id={key}
            onChange={formik.handleChange}
            value={formik.values[key]}
            onBlur={formik.handleBlur}
            disabled={isEditing ? key === "vendorName" : null}
          />
        ))}
      </Dialog>
    </>
  );
};

export default VendorsForm;
