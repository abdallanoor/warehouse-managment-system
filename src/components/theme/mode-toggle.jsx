import { Moon, Sun, Settings, SunMoon } from "lucide-react";

import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/context/theme-provider";
import { useTranslation } from "react-i18next";

export function ModeToggle({ sideBar }) {
  const { setTheme } = useTheme();
  const [t] = useTranslation("global");

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <SunMoon className="h-4 w-4" />
        <span>{t("theme.title")}</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <Sun className="w-4 h-4" />
            {t("theme.light")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <Moon className="w-4 h-4" /> {t("theme.dark")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            <Settings className="w-4 h-4" /> {t("theme.system")}
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
