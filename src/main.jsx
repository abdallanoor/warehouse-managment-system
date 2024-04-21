import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "./context/theme-provider";
import { DialogStateProvider } from "./context/DialogStateContext";
import ProductsContextProvider from "./context/ProductsContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import "./index.css";

import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Movements from "./pages/Movements";
import Customers from "./pages/Customers";
import SoldPermission from "./pages/SoldPermission";
import AddPermission from "./pages/AddPermission";
import Bills from "./pages/Bills";
import ProductDetails from "./components/products/ProductDetails";
import CustomersContextProvider from "./context/CustomersContext";
import MovementsContextProvider from "./context/MovmentsContext";
import SoldPermissionContextProvider from "./context/SoldPremissionContext";

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
        path: "/sold-permission",
        element: (
          <ProtectedRoute>
            <SoldPermission />
          </ProtectedRoute>
        ),
      },
      {
        path: "/add-permission",
        element: (
          <ProtectedRoute>
            <AddPermission />
          </ProtectedRoute>
        ),
      },
      {
        path: "/bills",
        element: (
          <ProtectedRoute>
            <Bills />
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
      <DialogStateProvider>
        <ProductsContextProvider>
          <CustomersContextProvider>
            <MovementsContextProvider>
              <SoldPermissionContextProvider>
                <RouterProvider router={router} />
                <ReactQueryDevtools initialIsOpen={false} />
              </SoldPermissionContextProvider>
            </MovementsContextProvider>
          </CustomersContextProvider>
        </ProductsContextProvider>
      </DialogStateProvider>
    </QueryClientProvider>
  </ThemeProvider>
);
