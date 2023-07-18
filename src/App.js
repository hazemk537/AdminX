import {  createBrowserRouter } from "react-router-dom";
import React from "react";
import ErrorPage from "./routes/errorPage";
import Root from "./routes/root";
import AllProducts from "./routes/AllProducts";
import Products from "./routes/products";
import Users from "./routes/users";
import Category from "./components/Category";
import Login from "./routes/Login";
import Admin from "./routes/Admin";
import Protected from "./components/Protected";
import EmployeeTable from "./routes/EmployeeTable";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />
  }
,  { path: "login", element: <Login /> },

  {
    path: "admin",
    element: <Protected> <Admin /> </Protected>,
    children: [
      { index: true, element: <Products /> },

      {
        path: "summary/allProducts",
        element: <AllProducts />,
      },
      {
        path: "summary/category/:catid",
        element: <Category />,
      },
      {
        path: "products",
        element: <Products />,
      },

      {
        path: "users",
        element: <Users />,
      },
      {path:"employee",
      element:<EmployeeTable/>

    
    },
    
    ],

}
  
]);


  //todo landing page open adminstration to fire authentication



