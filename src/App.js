import { RouterProvider, createBrowserRouter } from "react-router-dom";
import * as ReactDOM from "react-dom";
import React from "react";
import ErrorPage from "./routes/errorPage";
import Root from "./routes/root";
import Permissions from "./routes/users";
import AllProducts from "./routes/AllProducts";
import Products from "./routes/products";
import Customers from "./routes/customers";
import Users from "./routes/users";
import Category from "./Category";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Admin from "./routes/Admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />
  }
,  { path: "login", element: <Login /> },
  { path: "signup", element: <Signup /> },
  {
    path: "admin",
    element: <Admin />,
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
    ],
  },
]);

function App() {
  //todo landing page open adminstration to fire authentication
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
