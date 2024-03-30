import { Input } from "../ui/input";
import Dialog from "../shared/Dialog";
import { useContext } from "react";
import DialogStateContext from "@/context/DialogStateContext";
import { toast } from "../ui/use-toast";
const Login = () => {
  const { setIsOpen, setUserToken } = useContext(DialogStateContext);

  const handleLogin = () => {
    localStorage.setItem("userToken", "111");
    setUserToken("111");

    setIsOpen(false);

    toast({
      title: "مرحباً بعودتك! تم تسجيل الدخول بنجاح.",
      description: "يمكنك الآن استخدام البرنامج.",
    });
  };

  return (
    <>
      <Dialog
        dialogTrigger="تسجيل الدخول"
        dialogTitle="تسجيل الدخول"
        dialogDescription="الرجاء إدخال اسم المستخدم و كلمة المرور."
        actionTitle="تسجيل الدخول"
        handleAction={handleLogin}
      >
        <Input type="email" placeholder="اسم المستخدم" />
        <Input type="password" placeholder="كلمة المرور" />
      </Dialog>
    </>
  );
};

export default Login;
