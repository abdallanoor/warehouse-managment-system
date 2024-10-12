import { useContext, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "../../assets/logo.svg";
import { Link, useLocation } from "react-router-dom";
import { getNavLinks } from "@/constants";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { userContext } from "@/context/UserContext";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
import { Settings } from "../settings/Settings";

const MobileNav = () => {
  const { pathname } = useLocation();
  const { userToken } = useContext(userContext);
  const [navOpen, setNavOpen] = useState(false);

  const [t] = useTranslation("global");

  const navLinks = getNavLinks(t);

  return (
    <div className="flex items-center justify-between fixed z-10 h-16 w-full border-b p-5 bg-background/80 backdrop-blur lg:hidden">
      <Settings />
      <Link to="/">
        <img
          src={Logo}
          width={80}
          height={20}
          className="invert dark:invert-0 w-20 h-5"
          alt="logo"
        />
      </Link>
      <Sheet open={navOpen} onOpenChange={setNavOpen}>
        <SheetTrigger asChild>
          <Button
            className="active:text-muted-foreground"
            variant="ghost"
            size="icon"
          >
            <Menu className="w-6 h-6 transition-colors " />
          </Button>
        </SheetTrigger>
        <SheetContent className="sm:w-80 overflow-auto">
          <div className="flex size-full flex-col gap-6">
            <div className="flex items-center justify-between">
              <Link to="/">
                <img
                  src={Logo}
                  width={80}
                  height={20}
                  className="invert dark:invert-0 w-20 h-5"
                  alt="logo"
                />
              </Link>
              <SheetClose className="flex h-8 w-8 items-center justify-center rounded-md border opacity-70 hover:opacity-100 transition-opacity">
                <X className="h-4 w-4 " />
                <span className="sr-only">Close</span>
              </SheetClose>
            </div>
            {userToken && (
              <nav className="mb-auto">
                <ul className="flex flex-col gap-1">
                  {navLinks.map((link, index) => (
                    <li key={index}>
                      <Link to={link.route}>
                        <SheetClose
                          className={`flex items-center p-2 w-full transition-all rounded gap-2 active:scale-[.98] ${
                            pathname === link.route
                              ? "bg-secondary"
                              : "hover:bg-secondary active:bg-secondary"
                          }`}
                        >
                          {<link.icon className="w-5 h-5" />}
                          <span>{link.label}</span>
                        </SheetClose>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
            {!userToken && (
              <Link to="/login">
                <Button className="w-full">{t("login.login")}</Button>
              </Link>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
