import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { navLinks } from "@/constants";
import Logo from "../../assets/logo.svg";
import Auth from "../auth/index";
import { ModeToggle } from "../theme/mode-toggle";
import DialogStateContext from "@/context/DialogStateContext";

const Sidebar = () => {
  const { pathname } = useLocation();
  const { userToken } = useContext(DialogStateContext);

  return (
    <div className="hidden h-screen w-72 p-5 border-l overflow-auto scroll lg:flex">
      <div className="flex size-full flex-col gap-6">
        <div className="flex items-center justify-center border-b pb-5">
          <Link to="/">
            <img
              src={Logo}
              width={80}
              height={20}
              className="invert dark:invert-0 w-20 h-5"
              alt="logo"
            />
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <Link className="" to="/">
            إدارة المخزن
          </Link>
          <ModeToggle />
        </div>

        {userToken && (
          <nav className="mb-auto font-semibold">
            <ul className="flex flex-col gap-3">
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

        <Auth />
      </div>
    </div>
  );
};

export default Sidebar;
