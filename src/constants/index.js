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
    label: "ارصدة الصنف",
    route: "/all-products",
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
