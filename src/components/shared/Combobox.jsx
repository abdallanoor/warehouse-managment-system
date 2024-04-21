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

export function Combobox({
  data,
  setValues,
  lable,
  additionalInfo,
  isLoading,
  buttonTitle,
  placeholder,
  bodyInfo,
}) {
  const [open, setOpen] = useState(false);
  const [value, internalSetValue] = useState("");

  const selectItem = (item) => {
    const isSelected = value === item[lable];
    internalSetValue(isSelected ? "" : item[lable]);
    setValues(
      isSelected
        ? {}
        : {
            ...item,
            ...bodyInfo,
          }
    );
    setOpen(false);
  };

  //   console.log(value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? value : buttonTitle}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder={`ابحث عن ${placeholder}`} />
          <CommandList className="scroll">
            <CommandEmpty>
              {isLoading ? "جاري التحميل..." : "لا توجد بيانات"}
            </CommandEmpty>
            <CommandGroup>
              {data?.map((item, index) => (
                <CommandItem
                  key={index}
                  value={item[lable]}
                  onSelect={() => selectItem(item)}
                >
                  <Check
                    className={`ml-2 h-4 w-4 ${
                      value === item[lable] ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <div className="flex items-center gap-2">
                    {item[lable]}
                    {additionalInfo && " - "}
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
