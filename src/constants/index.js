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
    label: "إذن بيع",
    route: "/sold-permission",
    icon: FileOutputIcon,
  },
  {
    label: "إذن اضافة",
    route: "/add-permission",
    icon: FilePlus2,
  },
  {
    label: "فواتير البيع",
    route: "/bills",
    icon: FileTextIcon,
  },
];

// Table Data
export const productsHeader = [
  { label: "اسم الصنف", key: "productName" },
  { label: "الكود", key: "productBarCode" },
  { label: "الماركة", key: "productModel" },
  { label: "الحجم", key: "productSize" },
  { label: "اللون", key: "productColor" },
  { label: "الموقع", key: "productLocation" },
  { label: "بلد المنشـأ	", key: "productCountry" },
  { label: "العدد", key: "productCount" },
  { label: "السعر", key: "productPrice" },
];

export const customersHeader = [
  { label: "اسم العميل", key: "customerName" },
  { label: "كود العميل", key: "customerCode" },
  { label: "رقم الهاتف", key: "customerNumber" },
  { label: "عنوان العميل", key: "customerAddress" },
];

export const vendorsHeader = [
  { label: "اسم المورد", key: "vendorName" },
  { label: "كود المورد", key: "vendorCode" },
  { label: "رقم الهاتف", key: "vendorNumber" },
  { label: "عنوان المورد", key: "vendorAddress" },
];

export const movementsHeader = [
  { label: "اسم الصنف", key: "productName" },
  { label: "حركـة الصـنف", key: "typeMovement" },
  { label: "الكود", key: "productBarCode" },
  { label: "الماركة", key: "productModel" },
  { label: "العدد", key: "productCount" },
  { label: "السعر", key: "productPrice" },
  { label: "العميل", key: "seller" },
  { label: "التاريخ", key: "date" },
];

export const soldPermissionHeader = [
  { label: "اسم الصنف", key: "productName" },
  { label: "الكود", key: "productBarCode" },
  { label: "الماركة", key: "productModel" },
  { label: "الحجم", key: "productSize" },
  { label: "اللون", key: "productColor" },
  { label: "العدد", key: "productCount" },
  { label: "السعر", key: "productPrice" },
  { label: "الاجمالي", key: "totalPrice" },
];

export const addPermissionHeader = [
  { label: "اسم الصنف", key: "productName" },
  { label: "الكود", key: "productBarCode" },
  { label: "الماركة", key: "productModel" },
  { label: "الحجم", key: "productSize" },
  { label: "اللون", key: "productColor" },
  { label: "الموقع", key: "productLocation" },
  { label: "العدد", key: "productCount" },
  { label: "السعر", key: "productPrice" },
  { label: "الاجمالي", key: "totalPrice" },
];

// Form Fields Data
export const productsFormField = [
  { label: "اسم الصنف", key: "productName" },
  { label: "الكود", key: "productBarCode" },
  { label: "العدد", key: "productCount" },
  { label: "السعر", key: "productPrice" },
  { label: "الماركة", key: "productModel" },
  { label: "بلد المنشـأ", key: "productCountry" },
  { label: "المكان", key: "productLocation" },
  { label: "اللون", key: "productColor" },
  { label: "الحجم", key: "productSize" },
  { label: "حد الطلب", key: "requestLimit" },
  { label: "حد المخاطر", key: "riskLimit" },
  { label: "ملاحظات", key: "notes" },
];

export const customersFormField = [
  { label: "اسم العميل", key: "customerName" },
  { label: "رقم الهاتف", key: "customerNumber" },
  { label: "عنوان العميل", key: "customerAddress" },
];

export const vendorsFormField = [
  { label: "اسم المورد", key: "vendorName" },
  { label: "رقم الهاتف", key: "vendorNumber" },
  { label: "عنوان المورد", key: "vendorAddress" },
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

export const permissionProductsSchema = object({
  productName: string().required("يجب إدخال اسم الصنف"),
  productBarCode: string().required("يجب إدخال الكود"),
  productModel: string(),
  productCount: number()
    .typeError("يجب إدخال ارقام فقط")
    .required("يجب إدخال العدد")
    .nullable(),
  productLocation: string(),
  productPrice: number()
    .typeError("يجب إدخال ارقام فقط")
    .required("يجب إدخال السعر")
    .nullable(),
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

export const vendorsSchema = object({
  vendorName: string().required("يجب إدخال اسم المورد"),
  vendorNumber: number().typeError("يجب إدخال ارقام فقط").nullable(),
  vendorAddress: string(),
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

export const vendorsInitialValues = {
  vendorName: "",
  vendorNumber: "",
  vendorAddress: "",
};
