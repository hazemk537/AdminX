import { RouterProvider, createBrowserRouter } from "react-router-dom";
import * as ReactDOM from "react-dom";
import React from "react";
import ErrorPage from "./routes/errorPage";
import Root from "./routes/root";
import AllProducts from "./routes/AllProducts";
import Products from "./routes/products";
import Users from "./routes/users";
import Category from "./Category";
import Login from "./routes/Login";
import Admin from "./routes/Admin";
import AuthElement from "./AuthElement";
import Protected from "./Protected";
import EmployeeTable from "./routes/EmployeeTable";
import EditEmployee from "./routes/EditEmployee";
import ShowEmployee from "./routes/ShowEmployee";

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
        path: "summary/products",
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
    {
      path:"employee/edit",
      element:<EditEmployee/>

    },{
      path:"employee/show",
      element:<ShowEmployee/>


    }
    ],

}
  
]);


  //todo landing page open adminstration to fire authentication



