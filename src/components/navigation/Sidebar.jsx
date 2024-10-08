import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { navLinks } from "@/constants";
import Logo from "../../assets/logo.svg";
import { ModeToggle } from "../theme/mode-toggle";
import { userContext } from "@/context/UserContext";
import Logout from "../authentication/Logout";
import Login from "../authentication/Login";
import { Button } from "../ui/button";

const Sidebar = () => {
  const { pathname } = useLocation();
  const { userToken } = useContext(userContext);

  return (
    <div className="hidden h-screen dark:bg-black w-72 p-5 border-l overflow-auto scroll lg:flex">
      <div className="flex size-full flex-col gap-5">
        <div className="flex items-center justify-center border-b pb-5">
          <Link to="/">
            <img
              src={Logo}
              width={80}
              height={20}
              className="invert dark:invert-0 w-20 h-5 active:scale-95 transition-transform"
              alt="logo"
            />
          </Link>
        </div>
        {/* {userToken && (
          <div className="flex items-center justify-between">
            <Link className="outline-0" to="/">
              إدارة المخزن
            </Link>
            <ModeToggle />
          </div>
        )} */}

        {userToken && (
          <nav className="mb-auto font-semibold">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    className={`flex items-center p-2 hover:bg-secondary transition-colors rounded gap-2 ${
                      pathname === link.route && "bg-secondary"
                    }`}
                    to={link.route}
                  >
                    {<link.icon className="w-5 h-5" />}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {userToken ? (
          <div className="w-full flex flex-col gap-1">
            <ModeToggle sideBar />
            <Logout />
          </div>
        ) : (
          <Link to="/login">
            <Button className="w-full">تسجيل الدخول</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
