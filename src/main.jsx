import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "./context/theme-provider";
import UserContextProvider from "./context/UserContext";
import ProductsContextProvider from "./context/ProductsContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import "./index.css";

import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Movements from "./pages/Movements";
import Customers from "./pages/Customers";
import SoldPermission from "./pages/SoldPermission";
import AdditionPermission from "./pages/AdditionPermission";
import SoldInvoices from "./pages/SoldInvoices";
import ProductDetails from "./components/products/ProductDetails";
import CustomersContextProvider from "./context/CustomersContext";
import MovementsContextProvider from "./context/MovmentsContext";
import SoldPermissionContextProvider from "./context/SoldPremissionContext";
import Vendors from "./pages/Vendors";
import CustomerDetails from "./components/customers/CustomerDetails";
import VendorsContextProvider from "./context/VendorsContext";
import VendorDetails from "./components/vendors/VendorDetails";
import SoldInvoicesDetails from "./components/soldInvoices/SoldInvoicesDetails";
import AdditionInvoices from "./pages/AdditionInvoices";
import AdditionPermissionContextProvider from "./context/AdditionPermissionContext";
import AdditionInvoicesDetails from "./components/additionInvoices/AdditionInvoicesDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "/products/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/movements",
        element: (
          <ProtectedRoute>
            <Movements />
          </ProtectedRoute>
        ),
      },
      {
        path: "/customers",
        element: (
          <ProtectedRoute>
            <Customers />
          </ProtectedRoute>
        ),
      },
      {
        path: "/customers/:code",
        element: (
          <ProtectedRoute>
            <CustomerDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/vendors",
        element: (
          <ProtectedRoute>
            <Vendors />
          </ProtectedRoute>
        ),
      },
      {
        path: "/vendors/:code",
        element: (
          <ProtectedRoute>
            <VendorDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/sold-permission",
        element: (
          <ProtectedRoute>
            <SoldPermission />
          </ProtectedRoute>
        ),
      },
      {
        path: "/addition-permission",
        element: (
          <ProtectedRoute>
            <AdditionPermission />
          </ProtectedRoute>
        ),
      },
      {
        path: "/sold-invoices",
        element: (
          <ProtectedRoute>
            <SoldInvoices />
          </ProtectedRoute>
        ),
      },
      {
        path: "/sold-invoices/:invoiceNumber",
        element: (
          <ProtectedRoute>
            <SoldInvoicesDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/addition-invoices",
        element: (
          <ProtectedRoute>
            <AdditionInvoices />
          </ProtectedRoute>
        ),
      },
      {
        path: "/addition-invoices/:invoiceNumber",
        element: (
          <ProtectedRoute>
            <AdditionInvoicesDetails />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

// React Query Client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <ProductsContextProvider>
          <CustomersContextProvider>
            <VendorsContextProvider>
              <MovementsContextProvider>
                <SoldPermissionContextProvider>
                  <AdditionPermissionContextProvider>
                    <RouterProvider router={router} />
                    <ReactQueryDevtools
                      initialIsOpen={false}
                      buttonPosition="bottom-left"
                    />
                  </AdditionPermissionContextProvider>
                </SoldPermissionContextProvider>
              </MovementsContextProvider>
            </VendorsContextProvider>
          </CustomersContextProvider>
        </ProductsContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  </ThemeProvider>
);
