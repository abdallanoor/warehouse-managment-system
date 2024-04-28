import {
  ArrowRightLeft,
  FileOutputIcon,
  FilePlus2,
  FileTextIcon,
  Home,
  Package2,
  User,
  Users,
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
    label: "العملاء",
    route: "/customers",
    icon: Users,
  },
  {
    label: "الموردين",
    route: "/vendors",
    icon: User,
  },
  {
    label: "حركة الاصناف",
    route: "/movements",
    icon: ArrowRightLeft,
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
  { label: "الكود", key: "productBarCode" },
  { label: "الماركة", key: "productModel" },
  { label: "بلد المنشـأ	", key: "productCountry" },
  { label: "الحجم", key: "productSize" },
  { label: "الموقع", key: "productLocation" },
  { label: "العدد", key: "productCount" },
  { label: "اللون", key: "productColor" },
  { label: "السعر", key: "productPrice" },
];

export const customersHeader = [
  { label: "اسم العميل", key: "customerName" },
  { label: "كود العميل", key: "customerCode" },
  { label: "رقم الهاتف", key: "customerNumber" },
  { label: "عنوان العميل", key: "customerAddress" },
];

export const movementsHeader = [
  { label: "اسم الصنف", key: "productName" },
  { label: "حركـة الصـنف", key: "typeMovement" },
  { label: "الكود", key: "productPartNumber" },
  { label: "الماركة", key: "productType" },
  { label: "العدد", key: "productCount" },
  { label: "السعر", key: "productPriceSell" },
  { label: "العميل", key: "productSeller" },
  { label: "التاريخ", key: "date" },
];

export const soldPermissionHeader = [
  { label: "اسم الصنف", key: "productName" },
  { label: "كود الصنف", key: "productCode" },
  { label: "الكود", key: "productPartNumber" },
  { label: "الماركة", key: "productType" },
  { label: "بلد المنشـأ	", key: "productCountry" },
  { label: "العدد", key: "productCount" },
  { label: "سعـر الوحده", key: "productPriceSell" },
];

// Form Fields Data
export const productsFormField = [
  { label: "اسم الصنف", key: "productName" },
  { label: "الكود", key: "productBarCode" },
  { label: "الماركة", key: "productModel" },
  { label: "بلد المنشـأ", key: "productCountry" },
  { label: "المكان", key: "productLocation" },
  { label: "العدد", key: "productCount" },
  { label: "اللون", key: "productColor" },
  { label: "الحجم", key: "productSize" },
  { label: "السعر", key: "productPrice" },
  { label: "حد الطلب", key: "requestLimit" },
  { label: "حد المخاطر", key: "riskLimit" },
  { label: "ملاحظات", key: "notes" },
];

export const customersFormField = [
  { label: "اسم العميل", key: "customerName" },
  { label: "رقم الهاتف", key: "customerNumber" },
  { label: "عنوان العميل", key: "customerAddress" },
];

// Formik Validation Schema
export const productsSchema = object({
  productName: string().required("يجب إدخال اسم الصنف"),
  productBarCode: string().required("يجب إدخال الكود"),
  productModel: string(),
  productCount: number().typeError("يجب إدخال ارقام فقط").nullable(),
  productLocation: string(),
  productPrice: number().typeError("يجب إدخال ارقام فقط").nullable(),
  productCountry: string(),
  productColor: string(),
  productSize: number().typeError("يجب إدخال ارقام فقط").nullable(),
  requestLimit: number().typeError("يجب إدخال ارقام فقط").nullable(),
  riskLimit: number().typeError("يجب إدخال ارقام فقط").nullable(),
  notes: string(),
});

export const customersSchema = object({
  customerName: string().required("يجب إدخال اسم العميل"),
  customerNumber: number().typeError("يجب إدخال ارقام فقط").nullable(),
  customerAddress: string(),
});

// Formik Initial Values
export const productsInitialValues = {
  productName: "",
  productBarCode: "",
  productModel: "",
  productCount: "",
  productLocation: "",
  productPrice: "",
  productCountry: "",
  productColor: "",
  productSize: "",
  requestLimit: "",
  riskLimit: "",
  notes: "",
};

export const customersInitialValues = {
  customerName: "",
  customerNumber: "",
  customerAddress: "",
};
