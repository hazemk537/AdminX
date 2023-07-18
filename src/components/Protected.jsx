import React from 'react'
import { Navigate } from 'react-router-dom'

function Protected({children}) {
   const isLoggedIn=JSON.parse(localStorage.getItem("token"))

   if(isLoggedIn){
   return  children
   }
     return <Navigate to = "/login" />


  
}

export default Protected