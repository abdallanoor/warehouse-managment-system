import { Menu, X } from "lucide-react";

import logo from "../../assets/logo.svg";
import { ModeToggle } from "../mode-toggle";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";
import { navLinks } from "@/constants";
import Alert from "./AlertDialog";

const MobileNav = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex items-center justify-between fixed z-10 h-16 w-full border-b p-5 bg-background/80 backdrop-blur lg:hidden">
      <Sheet>
        <SheetTrigger>
          <Menu className="w-7 h-7" />
        </SheetTrigger>
        <SheetContent className="sm:w-80">
          <SheetHeader>
            <div className="flex size-full justify-between flex-col gap-6">
              <div className="flex items-center justify-between">
                <Link className="" to="/">
                  إدارة المخزن
                </Link>
                <SheetClose className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white focus-visible:outline-none">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </SheetClose>
              </div>

              <nav className="mb-auto">
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

              <Alert />
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <img
        src={logo}
        width={80}
        height={160}
        className="invert dark:invert-0"
        alt="logo"
      />

      <ModeToggle />
    </div>
  );
};

export default MobileNav;
