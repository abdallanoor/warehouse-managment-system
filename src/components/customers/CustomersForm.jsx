import { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "../ui/use-toast";
import Dialog from "../shared/Dialog";
import FormField from "../shared/FormField";
import { SquarePen, UserPlus } from "lucide-react";
import { customersContext } from "@/context/CustomersContext";
import { Button } from "../ui/button";
import {
  customersFormField,
  customersInitialValues,
  customersSchema,
} from "@/constants";

const CustomersForm = ({
  rowData,
  setDropdownOpen,
  triggerClassName,
  customerData,
  setCustomerData,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSoldingPermission, setIsSoldingPermission] = useState(false);
  const { refetchCustomers } = useContext(customersContext);

  const onSubmit = async (values) => {
    if (isSoldingPermission) {
      localStorage.setItem("customer", JSON.stringify(values));
      setCustomerData(values);
      toast({
        title: `تم اختيار العميل ${values.customerName} بنجاح`,
      });
      setDialogOpen(false);
      return;
    }
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
    <Button
      disabled={customerData && customerData !== null}
      onClick={() => setDialogOpen(true)}
      className="max-sm:w-full"
    >
      <span>إضافة عميل</span>
      <UserPlus className="mr-1 w-4 h-4" />
    </Button>
  );

  //adding permission

  const renderSoldPemmissionDialogTrigger = () => (
    <Button onClick={() => handleSoldPermission()} className="max-sm:w-full">
      <span>إضافة عميل جديد</span>
      <UserPlus className="mr-1 w-4 h-4" />
    </Button>
  );

  const handleSoldPermission = () => {
    setIsSoldingPermission(true);
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
            : customerData === null
            ? renderSoldPemmissionDialogTrigger()
            : renderAddDialogTrigger()
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
        handleForm={formik.handleSubmit}
        loadingButton={isLoading}
        bottomDisabled={isLoading}
      >
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
            disabled={isEditing ? key === "customerName" : null}
          />
        ))}
      </Dialog>
    </>
  );
};

export default CustomersForm;
