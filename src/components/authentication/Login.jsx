import { useState, useContext } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { object, string } from "yup";
import { CircleAlert, CircleUserRound, LockKeyhole } from "lucide-react";

import { Input } from "../ui/input";
import Dialog from "../shared/Dialog";
import { toast } from "../ui/use-toast";
import DialogStateContext from "@/context/DialogStateContext";
import { Button } from "../ui/button";

const Login = ({ setNavOpen }) => {
  const { setUserToken } = useContext(DialogStateContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = object({
    userName: string().required("يجب إدخال اسم المستخدم"),
    password: string().required("يجب إدخال كلمة المرور"),
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/auth/login`, values)
      .then(({ data }) => {
        if (data.message === "Done") {
          localStorage.setItem("userToken", data.token);
          setUserToken(data.token);
          setDialogOpen(false);
          setNavOpen(false);
          toast({
            title: "مرحباً بعودتك! تم تسجيل الدخول بنجاح.",
            description: "يمكنك الآن استخدام البرنامج.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "هناك خطأ! تأكد من صحة اسم المستخدم او كلمة المرور",
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
    initialValues: {
      userName: "",
      password: "",
    },
    onSubmit,
    validationSchema,
  });

  const renderErrorMessage = (value) => (
    <div className="flex items-center gap-2 text-red-600 animate-fadeIn mb-2">
      <CircleAlert className="w-4 h-4" />
      <p className="text-xs">{value}</p>
    </div>
  );

  const renderDialogTrigger = () => (
    <Button className="w-full" onClick={() => setDialogOpen(true)}>
      تسجيل الدخول
    </Button>
  );

  const iconsClasses =
    "w-4 h-4 absolute left-3 top-1/2 translate-y-[-50%] text-muted-foreground";

  return (
    <Dialog
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
      dialogTrigger={renderDialogTrigger()}
      dialogTitle="تسجيل الدخول"
      dialogDescription="الرجاء إدخال اسم المستخدم و كلمة المرور"
      actionTitle="تسجيل الدخول"
      handleAction={formik.handleSubmit}
      loadingButton={isLoading}
      bottomDisabled={!(formik.isValid && formik.dirty) || isLoading}
    >
      <div className="flex flex-col gap-4 ">
        <div>
          {formik.errors.userName &&
            formik.touched.userName &&
            renderErrorMessage(formik.errors.userName)}
          <div className="relative">
            <Input
              name="userName"
              type="text"
              placeholder="اسم المستخدم"
              // defaultValue="admin"
              className="h-12"
              onChange={formik.handleChange}
              value={formik.values.userName}
              onBlur={formik.handleBlur}
            />
            <CircleUserRound className={iconsClasses} />
          </div>
        </div>

        <div>
          {formik.errors.password &&
            formik.touched.password &&
            renderErrorMessage(formik.errors.password)}
          <div className="relative">
            <Input
              className="h-12"
              name="password"
              type="password"
              placeholder="كلمة المرور"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
            <LockKeyhole className={iconsClasses} />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default Login;
