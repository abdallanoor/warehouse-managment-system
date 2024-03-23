import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./context/theme-provider.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import Movements from "./pages/Movements";
import Customers from "./pages/Customers";
import SoldPermission from "./pages/SoldPermission";
import AddPermission from "./pages/AddPermission";
import Bills from "./pages/Bills";

import Layout from "./components/layout/Layout.jsx";

import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
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

  { path: "login", element: <Login /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
