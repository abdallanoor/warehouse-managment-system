import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "./context/theme-provider";
import { DialogStateProvider } from "./context/DialogStateContext";
import ProductsContextProvider from "./context/ProductsContext";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";

import "./index.css";

import App from "./components/app/App";
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import Movements from "./pages/Movements";
import Customers from "./pages/Customers";
import SoldPermission from "./pages/SoldPermission";
import AddPermission from "./pages/AddPermission";
import Bills from "./pages/Bills";
import Login from "./pages/Login";
import CustomersContextProvider from "./context/CustomersContext";
import MovementsContextProvider from "./context/MovmentsContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/all-products",
        element: (
          <ProtectedRoute>
            <AllProducts />
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

  { path: "login", element: <Login /> },
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
              <RouterProvider router={router} />
              <ReactQueryDevtools initialIsOpen={false} />
            </MovementsContextProvider>
          </CustomersContextProvider>
        </ProductsContextProvider>
      </DialogStateProvider>
    </QueryClientProvider>
  </ThemeProvider>
);
