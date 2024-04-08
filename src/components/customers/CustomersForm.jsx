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

const CustomersForm = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { refetchCustomers } = useContext(customersContext);

  const validationSchema = object({
    customerCode: number().required("يجب إدخال كود العميل"),
    customerName: string().required("يجب إدخال اسم العميل"),
    customerNumber: number().required("يجب إدخال رقم الهاتف"),
    customerAddress: string().required("يجب إدخال عنوان العميل"),
  });

  const initialValues = {
    customerCode: "",
    customerName: "",
    customerNumber: "",
    customerAddress: "",
  };

  const onSubmit = async (values) => {
    setIsLoading(true);
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/customers/`, values, {
        headers: {
          authorization: `Warhouse ${localStorage.getItem("userToken")}`,
        },
      })
      .then(({ data }) => {
        console.log(data);
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
    initialValues,
    onSubmit,
    validationSchema,
  });

  const renderDialogButton = () => {
    return (
      <>
        <span>إضافة عميل</span>
        <UserPlus className="mr-1 w-4 h-4" />
      </>
    );
  };

  return (
    <>
      <Dialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        dialogTrigger={renderDialogButton()}
        dialogTitle="أضافة عميل"
        dialogDescription="يجب عليك ملء جميع الخانات لأضافة عميل جديد"
        actionTitle="أضافة"
        handleAction={formik.handleSubmit}
        loadingButton={isLoading}
        bottomDisabled={!(formik.isValid && formik.dirty) || isLoading}
      >
        <FormScroll>
          <FormField
            labelTitle="اسم العميل"
            id="customerName"
            onChange={formik.handleChange}
            value={formik.values.customerName}
            onBlur={formik.handleBlur}
          />
          <FormField
            labelTitle="رقم الهاتف"
            id="customerNumber"
            onChange={formik.handleChange}
            value={formik.values.customerNumber}
            onBlur={formik.handleBlur}
          />
          <FormField
            labelTitle="عنوان العميل"
            id="customerAddress"
            onChange={formik.handleChange}
            value={formik.values.customerAddress}
            onBlur={formik.handleBlur}
          />
          <FormField
            labelTitle="كود العميل"
            id="customerCode"
            onChange={formik.handleChange}
            value={formik.values.customerCode}
            onBlur={formik.handleBlur}
          />
        </FormScroll>
      </Dialog>
    </>
  );
};

export default CustomersForm;
