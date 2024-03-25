import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-8 border rounded-md p-10 mx-5">
          <Link to="/">
            <img
              src={Logo}
              width={100}
              height={160}
              className="invert dark:invert-0"
              alt="logo"
            />
          </Link>
          {/* <h2 className="text-2xl">تسجيل الدخول</h2> */}
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
