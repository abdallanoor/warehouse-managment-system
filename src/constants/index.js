import {
  ArrowRightLeft,
  FileOutputIcon,
  FilePlus2,
  FileTextIcon,
  Home,
  Package2,
  User,
} from "lucide-react";
import { object, string, number } from "yup";

// NavLink Data
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

// Table Data
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

export const soldPermissionHeader = [
  { label: "اسم الصنف", key: "productName" },
  { label: "كود الصنف", key: "productCode" },
  { label: "السيريال", key: "productPartNumber" },
  { label: "الماركة", key: "productType" },
  { label: "بلد المنشـأ	", key: "productCountry" },
  { label: "العدد", key: "productCount" },
  { label: "سعـر الوحده", key: "productPriceSell" },
];

// Form Fields Data
export const productsFormField = [
  { label: "اسم الصنف", id: "productName" },
  { label: "السيريال", id: "productPartNumber" },
  { label: "الماركة", id: "productType" },
  { label: "بلد المنشـأ", id: "productCountry" },
  { label: "المكان", id: "productLocation" },
  { label: "العدد", id: "productCount" },
  { label: "سعر الوحده", id: "productPriceSell" },
];

export const customersFormField = [
  { label: "اسم العميل", id: "customerName" },
  { label: "رقم الهاتف", id: "customerNumber" },
  { label: "عنوان العميل", id: "customerAddress" },
  { label: "كود العميل", id: "customerCode" },
];

// Formik Validation Schema
export const productsSchema = object({
  productName: string().required("يجب إدخال اسم الصنف"),
  productPartNumber: string().required("يجب إدخال السيريال"),
  productType: string().required("يجب إدخال الماركة"),
  productCount: number().required("يجب إدخال العدد"),
  productLocation: string().required("يجب إدخال مكان الصنف"),
  productPriceSell: number().required("يجب إدخال السعر"),
  productCountry: string().required("يجب إدخال بلد المنشـأ"),
});

export const customersSchema = object({
  customerCode: number().required("يجب إدخال كود العميل"),
  customerName: string().required("يجب إدخال اسم العميل"),
  customerNumber: number().required("يجب إدخال رقم الهاتف"),
  customerAddress: string().required("يجب إدخال عنوان العميل"),
});

// Formik Initial Values
export const productsInitialValues = {
  productName: "",
  productPartNumber: "",
  productType: "",
  productCount: "",
  productLocation: "",
  productPriceSell: "",
  productCountry: "",
  date: new Date().toLocaleDateString("en-GB"),
};

export const customersInitialValues = {
  customerCode: "",
  customerName: "",
  customerNumber: "",
  customerAddress: "",
};
