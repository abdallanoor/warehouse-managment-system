import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./context/theme-provider";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import Movements from "./pages/Movements";
import Customers from "./pages/Customers";
import SoldPermission from "./pages/SoldPermission";
import AddPermission from "./pages/AddPermission";
import Bills from "./pages/Bills";

import App from "./components/App/App";

import Login from "./pages/Login";
import { DialogStateProvider } from "./context/DialogStateContext";

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
      <DialogStateProvider>
        <RouterProvider router={router} />
      </DialogStateProvider>
    </ThemeProvider>
  </React.StrictMode>
);
