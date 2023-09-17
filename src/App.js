import {  createBrowserRouter } from "react-router-dom";
import React from "react";
import ErrorPage from "./routes/errorPage";
import Login from "./routes/Login";
import Protected from "./components/Protected";
import EmployeeTable from "./routes/EmployeeTable";
import HomePage from "./routes/HomePage";
import ProductTable from "./routes/ProductTable";
import Summary from "./routes/Summary";
import CategorySummary from "./routes/Category";
import AdminLayout from './routes/adminLayout'

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />
  }
,  { path: "login", element: <Login /> },

  {
    path: "admin",
    element: <Protected> <AdminLayout/> </Protected>,
    children: [
      { index: true, element: <ProductTable /> },

      {
        path: "summary/allProducts",
        element: <Summary />,
      },
      {
        path: "summary/category/:catid",
        element: <CategorySummary />,
      },
      {
        path: "products",
        element: <ProductTable/>,
      },

      {path:"employee",
      element:<EmployeeTable/>

    
    },
    
    ],

}
  
]);


  //todo landing page open adminstration to fire authentication



