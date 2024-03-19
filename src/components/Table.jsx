import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, Search, CirclePlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";

const invoices = [
  {
    paymentStatus: "بستم دبابة ايطالي STD",
    invoice: "INV001",
    paymentMethod: "فرنساوي",
    contry: "مصر",
    location: "اوضه السبايك",
    num: "10",
    totalAmount: "250.00",
  },
  {
    paymentStatus: "بستم دبابة ايطالي STD",
    invoice: "INV001",
    paymentMethod: "الماني",
    contry: "مصر",
    location: "اوضه السبايك",
    num: "14",
    totalAmount: "50.00",
  },
  {
    paymentStatus: "بستم دبابة ايطالي STD",
    invoice: "INV001",
    paymentMethod: "فرنساوي",
    contry: "مصر",
    location: "اوضه السبايك",
    num: "11",
    totalAmount: "120.00",
  },
  {
    paymentStatus: "بستم دبابة ايطالي STD",
    invoice: "INV001",
    paymentMethod: "الماني",
    contry: "مصر",
    location: "اوضه السبايك",
    num: "21",
    totalAmount: "300.00",
  },
  {
    paymentStatus: "بستم دبابة ايطالي STD",
    invoice: "INV001",
    paymentMethod: "فرنساوي",
    contry: "مصر",
    location: "اوضه السبايك",
    num: "5",
    totalAmount: "450.00",
  },
  {
    paymentStatus: "بستم دبابة ايطالي STD",
    invoice: "INV001",
    paymentMethod: "الماني",
    contry: "مصر",
    location: "اوضه السبايك",
    num: "9",
    totalAmount: "100.00",
  },
];

export function TableDemo() {
  return (
    <div className="w-full">
      <h1 className="text-4xl font-medium text-center mb-10">ارصدة الصنف</h1>

      <div className="flex items-center max-sm:flex-wrap gap-5 sm:gap-10  py-4">
        <Input placeholder="ابحث عن..." className="w-full sm:max-w-sm" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-auto max-w-[45%]">
              البحث بالاسم <ChevronDown className="mr-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>البحث بالاسم</DropdownMenuItem>

            <DropdownMenuItem>البحث بالكود</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button className="mr-auto max-w-[45%] sm:w-auto">
          اضافة صنف <CirclePlus className="w-4 h-4 mr-2" />
        </Button>
      </div>

      <div className="rounded-md overflow-hidden border">
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader className="bg-muted dark:bg-muted/80">
            <TableRow>
              <TableHead className="border-l">الكود</TableHead>
              <TableHead className="border-l">اسم الصنف</TableHead>
              <TableHead className="border-l">PN</TableHead>
              <TableHead className="border-l">الماركة</TableHead>
              <TableHead className="border-l">بلد المنشـأ</TableHead>
              <TableHead className="border-l">المكان</TableHead>
              <TableHead className="border-l">العدد</TableHead>
              <TableHead>سعـر الوحده</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice, index) => (
              <TableRow
                key={index}
                className={` ${index % 2 ? "bg-muted/50" : ""}`}
              >
                <TableCell className="font-medium border-l">{index}</TableCell>
                <TableCell className="border-l">
                  {invoice.paymentStatus}
                </TableCell>
                <TableCell className="border-l">{invoice.invoice}</TableCell>
                <TableCell className="border-l">
                  {invoice.paymentMethod}
                </TableCell>
                <TableCell className="border-l">{invoice.contry}</TableCell>
                <TableCell className="border-l">{invoice.location}</TableCell>
                <TableCell className="border-l">{invoice.num}</TableCell>
                <TableCell>{invoice.totalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter> */}
        </Table>
      </div>
    </div>
  );
}
