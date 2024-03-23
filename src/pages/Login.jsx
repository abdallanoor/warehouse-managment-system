import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Login = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-8 border rounded p-10">
          <h2 className="text-2xl">تسجيل الدخول</h2>
          <div className="flex flex-col gap-5">
            <Input type="email" placeholder="اسم المستخدم" />
            <Input type="password" placeholder="كلمة المرور" />
          </div>
          <Button className="w-full" type="submit">
            تسجيل الدخول
          </Button>
        </div>
      </div>
    </>
  );
};

export default Login;
