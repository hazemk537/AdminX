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
          { index: true, element: <AllProducts /> },
          {
            path: "summary",
            element: <AllProducts />,
            // loader: contactLoader,
            // action: contactAction,
            children:[

              {index:true,path:"products",element:<AllProducts/>
              // element:

            
            },{path:"category/:catid"
          // element:
            }



            ]
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