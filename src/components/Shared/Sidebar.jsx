import { ModeToggle } from "../mode-toggle";
import { Link, useLocation } from "react-router-dom";
import { navLinks } from "@/constants";
import Alert from "./AlertDialog";

const Sidebar = () => {
  const { pathname } = useLocation();

  console.log(pathname);
  return (
    <div className="hidden h-screen w-72 p-5 border-l lg:flex">
      <div className="flex size-full justify-between flex-col gap-6">
        <div className="flex items-center justify-between">
          <Link className="" to="/">
            إدارة المخزن
          </Link>
          <ModeToggle />
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
    </div>
  );
};

export default Sidebar;
