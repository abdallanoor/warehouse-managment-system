import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider.jsx";
import Layout from "./components/Layout/Layout.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import AllProducts from "./components/AllProducts";
import Movements from "./components/Movements";
import Customers from "./components/Customers";
import SoldPermission from "./components/SoldPermission";
import AddPermission from "./components/AddPermission";
import Bills from "./components/Bills";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-products",
        element: <AllProducts />,
      },
      {
        path: "/movements",
        element: <Movements />,
      },
      {
        path: "/customers",
        element: <Customers />,
      },
      {
        path: "/sold-permission",
        element: <SoldPermission />,
      },
      {
        path: "/add-permission",
        element: <AddPermission />,
      },
      {
        path: "/bills",
        element: <Bills />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
