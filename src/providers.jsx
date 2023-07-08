import React from 'react';
import { Navigate, BrowserRouter as Router, RouterProvider } from 'react-router-dom';
import { router } from './App';
import Protected from './Protected';
function Providers({  children }) {
  return (
    
    <RouterProvider router={router}>
       <Navigate to = "/login" />

          {children}
      </RouterProvider >  
  )
}

export default Providers;