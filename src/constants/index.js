import {
  ArrowRightLeft,
  FileOutputIcon,
  FilePlus2,
  FileTextIcon,
  Home,
  Package,
  ShoppingCart,
  User,
  Users,
} from "lucide-react";
import { object, string, number } from "yup";

export const appDir = document.documentElement.dir;

// NavLink Data
export const getNavLinks = (t) => [
  {
    label: t("homePage.title"),
    route: "/",
    icon: Home,
  },
  {
    label: t("products.title"),
    route: "/products",
    icon: Package,
  },
  {
    label: t("customers.title"),
    route: "/customers",
    icon: Users,
  },
  {
    label: t("vendors.title"),
    route: "/vendors",
    icon: User,
  },
  {
    label: t("movements.title"),
    route: "/movements",
    icon: ArrowRightLeft,
  },
  // {
  //   label: "الطلبات",
  //   route: "/orders",
  //   icon: ShoppingCart,
  // },
  {
    label: t("saleProducts.title"),
    route: "/sold-permission",
    icon: FileOutputIcon,
  },
  {
    label: t("purchaseProducts.title"),
    route: "/addition-permission",
    icon: FilePlus2,
  },
  {
    label: t("saleInvoices.title"),
    route: "/sold-invoices",
    icon: FileTextIcon,
  },
  {
    label: t("parchaseInvoices.title"),
    route: "/addition-invoices",
    icon: FileTextIcon,
  },
];

// Table Data
export const getProductsHeader = (t) => [
  { label: t("share.name"), key: "productName" },
  { label: t("share.code"), key: "productBarCode" },
  { label: t("share.model"), key: "productModel" },
  { label: t("share.size"), key: "productSize" },
  { label: t("share.color"), key: "productColor" },
  { label: t("share.location"), key: "productLocation" },
  // { label: t("share.country"), key: "productCountry" },
  { label: t("share.quantity"), key: "productCount" },
  { label: t("share.price"), key: "productPrice" },
];

export const getCustomersHeader = (t) => [
  { label: t("share.name"), key: "customerName" },
  { label: t("share.code"), key: "customerCode" },
  { label: t("share.phone"), key: "customerNumber" },
  { label: t("share.address"), key: "customerAddress" },
];

export const getVendorsHeader = (t) => [
  { label: t("share.name"), key: "vendorName" },
  { label: t("share.code"), key: "vendorCode" },
  { label: t("share.phone"), key: "vendorNumber" },
  { label: t("share.address"), key: "vendorAddress" },
];

export const getMovementsHeader = (t) => [
  { label: t("share.name"), key: "productName" },
  { label: t("share.movementType"), key: "typeMovement" },
  { label: t("share.code"), key: "productBarCode" },
  { label: t("share.model"), key: "productModel" },
  { label: t("share.quantity"), key: "productCount" },
  { label: t("share.price"), key: "productPrice" },
  { label: t("share.customer/vendor"), key: "seller" },
  { label: t("share.date"), key: "date" },
];

export const getSoldPermissionHeader = (t) => [
  { label: t("share.name"), key: "productName" },
  { label: t("share.code"), key: "productBarCode" },
  { label: t("share.model"), key: "productModel" },
  { label: t("share.size"), key: "productSize" },
  { label: t("share.color"), key: "productColor" },
  { label: t("share.quantity"), key: "productCount" },
  { label: t("share.price"), key: "productPrice" },
  { label: t("share.totalPrice"), key: "totalPrice" },
];

export const getAdditionPermissionHeader = (t) => [
  { label: t("share.name"), key: "productName" },
  { label: t("share.code"), key: "productBarCode" },
  { label: t("share.model"), key: "productModel" },
  { label: t("share.size"), key: "productSize" },
  { label: t("share.color"), key: "productColor" },
  { label: t("share.location"), key: "productLocation" },
  { label: t("share.quantity"), key: "productCount" },
  { label: t("share.price"), key: "productPrice" },
  { label: t("share.totalPrice"), key: "totalPrice" },
];

export const getSoldInvoicesInfoHeader = (t) => [
  { label: t("share.name"), key: "customerName" },
  { label: t("share.date"), key: "date" },
  { label: t("share.invoiceNumber"), key: "invoiceNumber" },
];

export const getAdditionInvoicesInfoHeader = (t) => [
  { label: t("share.name"), key: "vendorName" },
  { label: t("share.date"), key: "date" },
  { label: t("share.invoiceNumber"), key: "invoiceNumber" },
];

// Form Fields Data
export const getProductsFormField = (t) => [
  { label: t("share.name"), key: "productName" },
  { label: t("share.code"), key: "productBarCode" },
  { label: t("share.quantity"), key: "productCount" },
  { label: t("share.price"), key: "productPrice" },
  { label: t("share.model"), key: "productModel" },
  { label: t("share.size"), key: "productSize" },
  { label: t("share.color"), key: "productColor" },
  { label: t("share.location"), key: "productLocation" },
  // { label: t("share.country"), key: "productCountry" },
  // { label: "حد الطلب", key: "requestLimit" },
  // { label: "حد المخاطر", key: "riskLimit" },
  // { label: "ملاحظات", key: "notes" },
];

export const getCustomersFormField = (t) => [
  { label: t("share.name"), key: "customerName" },
  { label: t("share.phone"), key: "customerNumber" },
  { label: t("share.address"), key: "customerAddress" },
];

export const getVendorsFormField = (t) => [
  { label: t("share.name"), key: "vendorName" },
  { label: t("share.phone"), key: "vendorNumber" },
  { label: t("share.address"), key: "vendorAddress" },
];

// Formik Validation Schema
export const getProductsSchema = (t) =>
  object({
    productName: string().required(t("messageError.nameEntered")),
    productBarCode: string().required(t("messageError.codeEntered")),
    productModel: string(),
    productCount: number().typeError(t("messageError.onlyNumber")).nullable(),
    productLocation: string(),
    productPrice: number().typeError(t("messageError.onlyNumber")).nullable(),
    productCountry: string(),
    productColor: string(),
    productSize: number().typeError(t("messageError.onlyNumber")).nullable(),
    requestLimit: number().typeError(t("messageError.onlyNumber")).nullable(),
    riskLimit: number().typeError(t("messageError.onlyNumber")).nullable(),
    notes: string(),
  });

export const getPermissionProductsSchema = (t) =>
  object({
    productName: string().required(t("messageError.nameEntered")),
    productBarCode: string().required(t("messageError.codeEntered")),
    productModel: string(),
    productCount: number()
      .typeError(t("messageError.onlyNumber"))
      .required(t("messageError.quantityEntered"))
      .nullable(),
    productLocation: string(),
    productPrice: number()
      .typeError(t("messageError.onlyNumber"))
      .required(t("messageError.priceEntered"))
      .nullable(),
    productCountry: string(),
    productColor: string(),
    productSize: number().typeError(t("messageError.onlyNumber")).nullable(),
    requestLimit: number().typeError(t("messageError.onlyNumber")).nullable(),
    riskLimit: number().typeError(t("messageError.onlyNumber")).nullable(),
    notes: string(),
  });

export const getCustomersSchema = (t) =>
  object({
    customerName: string().required(t("messageError.nameEntered")),
    customerNumber: number().typeError(t("messageError.onlyNumber")).nullable(),
    customerAddress: string(),
  });

export const getVendorsSchema = (t) =>
  object({
    vendorName: string().required(t("messageError.nameEntered")),
    vendorNumber: number().typeError(t("messageError.onlyNumber")).nullable(),
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
