import { useContext, useState } from "react";
import { useFormik } from "formik";
import { object, string, number } from "yup";
import axios from "axios";
import { toast } from "../ui/use-toast";
import Dialog from "../shared/Dialog";
import FormField from "../shared/FormField";
import FormScroll from "../shared/FormScroll";
import { SquarePen, UserPlus } from "lucide-react";
import { customersContext } from "@/context/CustomersContext";
import { Button } from "../ui/button";
import {
  customersFormField,
  customersInitialValues,
  customersSchema,
} from "@/constants";

const CustomersForm = ({ rowData, setDropdownOpen, triggerClassName }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { refetchCustomers } = useContext(customersContext);

  const onSubmit = async (values) => {
    const method = isEditing ? axios.put : axios.post;

    setIsLoading(true);
    method(`${import.meta.env.VITE_API_URL}/api/customers/`, values, {
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
          refetchCustomers();
          const actionMessage = isEditing ? "تم تعديل" : "تم إضافة";
          toast({
            title: `${actionMessage} ${formik.values.customerName} بنجاح`,
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
    initialValues: customersInitialValues,
    onSubmit,
    validationSchema: customersSchema,
  });

  //adding
  const renderAddDialogTrigger = () => (
    <Button className="w-full" onClick={() => setDialogOpen(true)}>
      <span>إضافة عميل</span>
      <UserPlus className="mr-1 w-4 h-4" />
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
    <>
      <Dialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        dialogTrigger={
          rowData ? renderUpdateDialogTrigger() : renderAddDialogTrigger()
        }
        dialogTitle={`${
          rowData ? `تعديل العميل | ${rowData.customerName}` : "إضافة عميل"
        }`}
        dialogDescription={`يجب عليك ملء ${
          rowData
            ? "الخانات المراد تعديلها"
            : "اسم العميل اولاً لإضافة عميل جديد"
        }`}
        actionTitle={rowData ? "تعديل" : "إضافة"}
        handleAction={formik.handleSubmit}
        loadingButton={isLoading}
        bottomDisabled={isLoading}
      >
        <FormScroll>
          {customersFormField.map(({ label, key }) => (
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
    </>
  );
};

export default CustomersForm;
