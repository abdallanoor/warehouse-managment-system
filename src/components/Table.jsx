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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { useState } from "react";

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
        <Input
          placeholder="يمكنك البحث بالاسم و الكود..."
          className="w-full sm:max-w-sm"
        />
        <Select dir="rtl">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="خيارات البحث" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>خيارات البحث</SelectLabel>
              <SelectItem value="byName">البحث بالاسم</SelectItem>
              <SelectItem value="byId">البحث بالكود</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="mr-auto flex items-center justify-between gap-2 max-w-[45%] sm:w-auto">
              اضافة صنف <CirclePlus className="w-4 h-4 " />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>اضافة صنف</DialogTitle>
              <DialogDescription>هنا يمكنك اضافة صنف جديد.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="namee" className="text-right">
                  اسم الصنف
                </Label>
                <Input
                  id="namee"
                  // defaultValue="بستم دبابة ايطالي STD"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="PN" className="text-right">
                  PN
                </Label>
                <Input id="PN" defaultValue="INV001" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="brand" className="text-right">
                  الماركة
                </Label>
                <Input
                  id="brand"
                  defaultValue="الماني"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contry" className="text-right">
                  بلد المنشـأ
                </Label>
                <Input
                  id="contry"
                  defaultValue="ايطالي"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="place" className="text-right">
                  المكان
                </Label>
                <Input
                  id="place"
                  defaultValue="اوضه السبايك"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="num" className="text-right">
                  العدد
                </Label>
                <Input id="num" defaultValue="20" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  سعر الوحده
                </Label>
                <Input
                  id="price"
                  defaultValue="300.00"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">اضافة</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* <Button className="mr-auto max-w-[45%] sm:w-auto">
          اضافة صنف <CirclePlus className="w-4 h-4 mr-2" />
        </Button> */}
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
