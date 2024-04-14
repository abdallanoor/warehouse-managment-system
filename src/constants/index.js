import {
  ArrowRightLeft,
  FileOutputIcon,
  FilePlus2,
  FileTextIcon,
  Home,
  Package2,
  User,
} from "lucide-react";

export const navLinks = [
  {
    label: "الصفحة الرئيسية",
    route: "/",
    icon: Home,
  },
  {
    label: " ارصدة المخزن",
    route: "/products",
    icon: Package2,
  },
  {
    label: "حركة الاصناف",
    route: "/movements",
    icon: ArrowRightLeft,
  },
  {
    label: "العملاء",
    route: "/customers",
    icon: User,
  },
  {
    label: "إذن صرف",
    route: "/sold-permission",
    icon: FileOutputIcon,
  },
  {
    label: "إذن اضافة",
    route: "/add-permission",
    icon: FilePlus2,
  },
  {
    label: "فواتير الصرف",
    route: "/bills",
    icon: FileTextIcon,
  },
];

export const productsHeader = [
  { label: "اسم الصنف", key: "productName" },
  { label: "كود الصنف", key: "productCode" },
  { label: "السيريال", key: "productPartNumber" },
  { label: "الماركة", key: "productType" },
  { label: "بلد المنشـأ	", key: "productCountry" },
  { label: "الموقع", key: "productLocation" },
  { label: "العدد", key: "productCount" },
  { label: "سعـر الوحده", key: "productPriceSell" },
];

export const customersHeader = [
  { label: "اسم العميل", key: "customerName" },
  { label: "كود العميل", key: "customerCode" },
  { label: "رقم الهاتف", key: "customerNumber" },
  { label: "عنوان العميل", key: "customerAddress" },
];

export const movementsHeader = [
  { label: "اسم الصنف", key: "productName" },
  { label: "كود الصنف", key: "productCode" },
  { label: "حركـة الصـنف", key: "typeMovement" },
  { label: "السيريال", key: "productPartNumber" },
  { label: "الماركة", key: "productType" },
  { label: "العدد", key: "productCount" },
  { label: "سعـر الوحده", key: "productPriceSell" },
  { label: "العميل", key: "productSeller" },
  { label: "التاريخ", key: "date" },
];
