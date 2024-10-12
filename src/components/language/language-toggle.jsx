import { Languages } from "lucide-react";

import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/context/language-provider";
export const LanguageToggle = () => {
  const [t] = useTranslation("global");

  const { setLang } = useLanguage();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Languages className="h-4 w-4" />
        <span>{t("lang")}</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem onClick={() => setLang("ar")}>
            <span>العربية</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLang("en")}>
            <span>English</span>
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
};
