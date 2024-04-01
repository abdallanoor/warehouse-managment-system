import { Input } from "../ui/input";
import Dialog from "../shared/Dialog";

import { useContext, useState } from "react";
import DialogStateContext from "@/context/DialogStateContext";
import { toast } from "../ui/use-toast";

import { useFormik } from "formik";
import axios from "axios";

import { object, string } from "yup";
import { CircleAlert, CircleUserRound, LockKeyhole } from "lucide-react";

const Login = () => {
  const { setIsOpen, setUserToken } = useContext(DialogStateContext);
  const [Loading, setLoading] = useState(false);

  const validationSchema = object({
    userName: string().required("يجب إدخال اسم المستخدم"),
    password: string().required("يجب إدخال كلمة المرور"),
  });

  async function onSubmit(values) {
    setLoading(true);
    let { data } = await axios
      .post(`${import.meta.env.VITE_API_URL}/api/auth/login`, values)
      .catch((error) => {
        toast({
          title: `${error.response.data.message}`,
        });
      });
    setLoading(false);

    if (data.message === "Done") {
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      setIsOpen(false);
      toast({
        title: "مرحباً بعودتك! تم تسجيل الدخول بنجاح.",
        description: "يمكنك الآن استخدام البرنامج.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "هناك خطأ! تأكد من صحة اسم المستحدم او كلمة المرور",
      });
    }
  }

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    onSubmit,
    validationSchema,
  });

  return (
    <>
      <Dialog
        dialogTrigger="تسجيل الدخول"
        dialogTitle="تسجيل الدخول"
        dialogDescription="الرجاء إدخال اسم المستخدم و كلمة المرور لتسجيل الدخول"
        actionTitle="تسجيل الدخول"
        handleAction={formik.handleSubmit}
        loadingButton={Loading}
        bottomDisabled={!(formik.isValid && formik.dirty) || Loading}
      >
        <div>
          {formik.errors.userName && formik.touched.userName ? (
            <div className="flex items-center gap-2 text-red-600 mb-2">
              <CircleAlert className="w-4 h-4" />
              <p className="text-xs ">{formik.errors.userName}</p>
            </div>
          ) : null}

          <div className="relative">
            <Input
              name="userName"
              type="text"
              placeholder="اسم المستخدم"
              className="h-12"
              onChange={formik.handleChange}
              value={formik.values.userName}
              onBlur={formik.handleBlur}
            />
            <CircleUserRound className="w-4 h-4 absolute left-3 top-1/2 translate-y-[-50%] text-muted-foreground" />
          </div>
        </div>

        <div>
          {formik.errors.password && formik.touched.password ? (
            <div className="flex items-center gap-2 text-red-600 mb-2">
              <CircleAlert className="w-4 h-4" />
              <p className="text-xs ">{formik.errors.password}</p>
            </div>
          ) : null}
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
            <LockKeyhole className="w-4 h-4 absolute left-3 top-1/2 translate-y-[-50%] text-muted-foreground" />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Login;
