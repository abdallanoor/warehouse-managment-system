import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { getNavLinks } from "@/constants";
import Logo from "../../assets/logo.svg";
import { userContext } from "@/context/UserContext";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
import { Settings } from "../settings/Settings";

const Sidebar = () => {
  const { pathname } = useLocation();
  const { userToken } = useContext(userContext);
  const [t] = useTranslation("global");

  const navLinks = getNavLinks(t);

  return (
    <div className="hidden h-screen dark:bg-black w-72 p-5 rtl:border-l ltr:border-r overflow-auto scroll lg:flex">
      <div className="flex size-full flex-col gap-5">
        <div className="flex items-center justify-center border-b pb-5">
          <Link to="/">
            <img
              src={Logo}
              width={80}
              height={20}
              className="invert dark:invert-0 w-20 h-5 active:scale-[.98] transition-transform"
              alt="logo"
            />
          </Link>
        </div>

        {userToken && (
          <nav className="mb-auto font-semibold">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    className={`flex items-center p-2 transition-all rounded gap-2 active:scale-[.98] ${
                      pathname === link.route
                        ? "bg-secondary hover:bg-secondary cursor-default"
                        : "opacity-60 hover:bg-secondary active:opacity-70 active:bg-secondary"
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
          <Settings sidebar />
        ) : (
          <Link to="/login">
            <Button className="w-full">{t("login.login")}</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
