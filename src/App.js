import { RouterProvider, createBrowserRouter } from "react-router-dom";
import * as ReactDOM from "react-dom";
import React from "react";
import ErrorPage from "./routes/errorPage";
import Root from "./routes/root";
import Permissions from "./routes/users";
import Summary from "./routes/Summary";
import Products from "./routes/products";
import Customers from "./routes/customers";
import Users from "./routes/users";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    // loader: rootLoader,
    // action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <summary /> },
          {
            path: "summary",
            element: <Summary />,
            // loader: contactLoader,
            // action: contactAction,
          },
          {
            path: "products",
            element: <Products />,
            // loader: contactLoader,
            // action: editAction,
          },
          {
            path: "customers",
            element: <Customers />,
            // action: destroyAction,
            // errorElement: <div>Oops! There was an error.</div>,
          },{
            path: "users",
            element: <Users />,
            // action: destroyAction,
            // errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
    ],
  },
]);


function App() {//todo landing page open adminstration to fire authentication
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;