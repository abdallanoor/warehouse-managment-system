import { useContext, useState } from "react";
import { useFormik } from "formik";
import { object, string, number } from "yup";
import axios from "axios";
import { toast } from "../ui/use-toast";
import Dialog from "../shared/Dialog";
import FormField from "../shared/FormField";
import FormScroll from "../shared/FormScroll";
import { UserPlus } from "lucide-react";
import { customersContext } from "@/context/CustomersContext";
import { Button } from "../ui/button";
import {
  customersFormField,
  customersInitialValues,
  customersSchema,
} from "@/constants";

const CustomersForm = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { refetchCustomers } = useContext(customersContext);

  const onSubmit = async (values) => {
    setIsLoading(true);
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/customers/`, values, {
        headers: {
          authorization: `Warhouse ${localStorage.getItem("userToken")}`,
        },
      })
      .then(({ data }) => {
        if (data.message === "Done") {
          setDialogOpen(false);
          refetchCustomers();
          toast({
            title: `تم إضافة العميل ${formik.values.customerName} بنجاح`,
          });
          formik.resetForm();
        }
        if (data.message === "customer is aleardy exist") {
          toast({
            variant: "destructive",
            title: "العميل موجود بالفعل!",
          });
        }
        if (data.message === "Code is exist") {
          toast({
            variant: "destructive",
            title: "كود العميل موجود بالفعل! يرجي ادخال كود آخر",
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
    initialValues: customersInitialValues,
    onSubmit,
    validationSchema: customersSchema,
  });

  const renderDialogTrigger = () => (
    <Button
      className="w-full active:scale-95 transition-transform"
      onClick={() => setDialogOpen(true)}
    >
      <span>إضافة عميل</span>
      <UserPlus className="mr-1 w-4 h-4" />
    </Button>
  );

  return (
    <>
      <Dialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        dialogTrigger={renderDialogTrigger()}
        dialogTitle="أضافة عميل"
        dialogDescription="يجب عليك ملء جميع الخانات لأضافة عميل جديد"
        actionTitle="أضافة"
        handleAction={formik.handleSubmit}
        loadingButton={isLoading}
        bottomDisabled={!(formik.isValid && formik.dirty) || isLoading}
      >
        <FormScroll>
          {customersFormField.map(({ label, id }) => (
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
    </>
  );
};

export default CustomersForm;
