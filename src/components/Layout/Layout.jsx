import { Outlet } from "react-router-dom";
import Sidebar from "../navigation/Sidebar";
import MobileNav from "../navigation/MobileNav";
import { Toaster } from "../ui/toaster";
import ScrollToTop from "../shared/ScrollToTop";

const Layout = () => {
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
      <ScrollToTop />
    </div>
  );
};

export default Layout;
