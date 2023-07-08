import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function Protected({children}) {
   const isLoggedIn=JSON.parse(localStorage.getItem("isLoggedIn"))

   if(isLoggedIn){
   return  children
   }
     return <Navigate to = "/login" />


  
}

export default Protected