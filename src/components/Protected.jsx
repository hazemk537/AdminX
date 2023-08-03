import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'

function Protected({children}) {
  const Hackredux = useSelector(state => state.Hackredux);


   const isLoggedIn=JSON.parse(localStorage.getItem("token"))

   if(isLoggedIn || Hackredux){
   return  children
   }
     return <Navigate to = "/login" />


  
}

export default Protected