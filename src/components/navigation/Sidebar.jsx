import { ModeToggle } from "../theme/mode-toggle";
import { Link, useLocation } from "react-router-dom";
import { navLinks } from "@/constants";
import Alert from "../shared/Alert";
import Logo from "../../assets/logo.svg";

const Sidebar = () => {
  const { pathname } = useLocation();

  console.log(pathname);
  return (
    <div className="hidden h-screen w-72 p-5 border-l overflow-auto scroll lg:flex">
      <div className="flex size-full justify-between flex-col gap-6">
        <div className="flex items-center justify-center border-b pb-5">
          <Link to="/">
            <img
              src={Logo}
              width={80}
              height={160}
              className="invert dark:invert-0"
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

        <Alert />
      </div>
    </div>
  );
};

export default Sidebar;
