import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import DialogStateContext from "@/context/DialogStateContext";
import Sidebar from "../navigation/Sidebar";
import MobileNav from "../navigation/MobileNav";
import { Toaster } from "../ui/toaster";

const Layout = () => {
  const { setUserToken } = useContext(DialogStateContext);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken !== null) {
      setUserToken(userToken);
    }
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <MobileNav />
      <div className="mt-16 flex-1 overflow-auto scroll py-8 lg:mt-0 lg:max-h-screen lg:py-10">
        <div className="mx-auto px-5 md:px-10 w-full">
          <Outlet />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Layout;
