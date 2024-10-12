import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTranslation } from "react-i18next";

export function Combobox({
  data,
  setValues,
  lable,
  additionalInfo,
  isLoading,
  buttonTitle,
  placeholder,
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [buttonValue, setButtonValue] = useState("");

  const [t] = useTranslation("global");

  const selectItem = (item) => {
    const isSelected = value === item._id;
    setValue(isSelected ? "" : item._id);
    setButtonValue(isSelected ? "" : item[lable]);
    setValues(
      isSelected
        ? null
        : {
            ...item,
          }
    );
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {buttonValue ? buttonValue : buttonTitle}
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder={`${placeholder}`} />
          <CommandList className="scroll">
            <CommandEmpty>
              {isLoading ? t("loading") : t("noData")}
            </CommandEmpty>
            <CommandGroup>
              {data?.map((item) => (
                <CommandItem
                  key={item._id}
                  // value={item._id}
                  onSelect={() => selectItem(item)}
                  className="gap-2"
                >
                  <Check
                    className={`h-4 w-4 ${
                      value === item._id ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <div className="flex items-center gap-2">
                    {item[lable]}
                    {item[additionalInfo] && " - "}
                    {item[additionalInfo]}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
