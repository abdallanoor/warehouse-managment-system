import { useContext, useState } from "react";
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
import { customersContext } from "@/context/CustomersContext";
import axios from "axios";

export function ComboboxDemo({ setCustomerValues }) {
  const { customers, isLoading } = useContext(customersContext);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const invoiceNumber = 5;

  const selectCustomer = (customer) => {
    const isSelected = value === customer.customerName;
    setValue(isSelected ? "" : customer.customerName);
    setCustomerValues(
      isSelected
        ? {}
        : {
            ...customer,
            datePermission: new Date().toLocaleDateString("en-GB"),
            invoiceNumber: invoiceNumber,
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
          {value ? value : "اختر العميل"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="ابحث عن العميل بالاسم" />
          <CommandList className="scroll">
            <CommandEmpty>
              {isLoading ? "جاري التحميل..." : "لا توجد بيانات"}
            </CommandEmpty>
            <CommandGroup>
              {customers?.data?.customers?.map((customer) => (
                <CommandItem
                  key={customer._id}
                  value={customer.customerName}
                  onSelect={() => selectCustomer(customer)}
                >
                  <Check
                    className={`ml-2 h-4 w-4 ${
                      value === customer.customerName
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  />
                  {customer.customerName} - {customer.customerAddress}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
