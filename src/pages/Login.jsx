import { Button } from "@/components/ui/button";
import { object, string } from "yup";
import { CircleAlert, CircleUserRound, LockKeyhole } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userContext } from "@/context/UserContext";
import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import ButtonLoader from "@/components/loading/ButtonLoader";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setUserToken } = useContext(userContext);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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
          toast({
            title: "مرحباً بعودتك! تم تسجيل الدخول بنجاح.",
            description: "يمكنك الآن استخدام البرنامج.",
          });
          navigate("/");
        } else {
          toast({
            variant: "destructive",
            title: "هناك خطأ! تأكد من صحة اسم المستخدم او كلمة المرور",
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
    initialValues: {
      userName: "",
      password: "",
    },
    onSubmit,
    validationSchema,
  });

  const renderErrorMessage = (value) => (
    <div className="flex items-center gap-1 text-destructive animate-fadeIn">
      <CircleAlert className="w-4 h-4" />
      <p className="text-xs">{value}</p>
    </div>
  );

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">تسجيل الدخول</CardTitle>
            <CardDescription>
              يمكنك استخدام اسم المستخدم 'admin' مع كلمة المرور 'admin' لتسجيل
              الدخول وتجربة البرنامج.
            </CardDescription>
          </CardHeader>
          <form onSubmit={formik.handleSubmit}>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="userName">اسم المستخدم</Label>
                <Input
                  id="userName"
                  name="userName"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.userName}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.userName &&
                  formik.touched.userName &&
                  renderErrorMessage(formik.errors.userName)}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.password &&
                  formik.touched.password &&
                  renderErrorMessage(formik.errors.password)}
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={isLoading} type="submit" className="w-full">
                <span>تسجيل الدخول</span>
                {isLoading && <ButtonLoader />}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
};

export default Login;
