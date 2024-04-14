import { useContext } from "react";
import { Menu, X } from "lucide-react";
import Logo from "../../assets/logo.svg";
import { Link, useLocation } from "react-router-dom";
import { navLinks } from "@/constants";
import Auth from "../authentication/index";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "../theme/mode-toggle";
import DialogStateContext from "@/context/DialogStateContext";

const MobileNav = () => {
  const { pathname } = useLocation();
  const { userToken } = useContext(DialogStateContext);

  return (
    <div className="flex items-center justify-between fixed z-10 h-16 w-full border-b p-5 bg-background/80 backdrop-blur lg:hidden">
      <Sheet>
        <SheetTrigger>
          <Menu className="w-7 h-7 transition-colors active:text-muted-foreground" />
        </SheetTrigger>
        <SheetContent className="sm:w-80 overflow-auto">
          <div className="flex size-full flex-col gap-6">
            <div className="flex items-center justify-between">
              <Link className="outline-0" to="/">
                <SheetClose>إدارة المخزن</SheetClose>
              </Link>
              <SheetClose className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white focus-visible:outline-none">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </SheetClose>
            </div>
            {userToken && (
              <nav className="mb-auto">
                <ul className="flex flex-col gap-3">
                  {navLinks.map((link, index) => (
                    <li key={index}>
                      <Link to={link.route}>
                        <SheetClose
                          className={`flex items-center p-2 w-full sm:hover:bg-secondary transition-colors rounded gap-2 ${
                            pathname === link.route && "bg-secondary"
                          }`}
                        >
                          {<link.icon className="w-5 h-5" />}
                          {link.label}
                        </SheetClose>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            <SheetClose asChild>
              <div>
                <Auth />
              </div>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>

      <Link to="/">
        <img
          src={Logo}
          width={80}
          height={20}
          className="invert dark:invert-0 w-20 h-5"
          alt="logo"
        />
      </Link>

      <ModeToggle />
    </div>
  );
};

export default MobileNav;
