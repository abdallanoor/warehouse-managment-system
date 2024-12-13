import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import Logout from "../authentication/Logout";
import { LanguageToggle } from "../language/language-toggle";
import { ModeToggle } from "../theme/mode-toggle";
import { useContext } from "react";
import { userContext } from "@/context/UserContext";
import { Link } from "react-router-dom";
import { LogIn, SettingsIcon } from "lucide-react";

export function Settings({ sidebar }) {
  const { userToken } = useContext(userContext);
  const [t, i18n] = useTranslation("global");

  return (
    <DropdownMenu dir={i18n.dir()}>
      <DropdownMenuTrigger asChild>
        <Button
          className={`relative ${
            sidebar ? "w-full justify-start p-2 gap-2" : ""
          } `}
          variant="ghost"
          size={`${sidebar ? "default" : "icon"}`}
        >
          <SettingsIcon className="w-5 h-5" />
          <span className="hidden lg:block">{t("settings")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-36 sm:w-56">
        <DropdownMenuLabel>{t("settings")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <ModeToggle />
          <LanguageToggle />
          <DropdownMenuSeparator />
          {userToken ? (
            <Logout />
          ) : (
            <Link to="/login">
              <DropdownMenuItem className="cursor-pointer">
                <LogIn className="w-4 h-4" />
                <span>{t("login.login")}</span>
              </DropdownMenuItem>
            </Link>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
