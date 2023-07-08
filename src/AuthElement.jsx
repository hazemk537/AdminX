import React, { Children, createContext, useState } from 'react'


function AuthElement() {  
  const [isLogged,setIsLogged]=useState(0)
    const MyAuth=createContext(null)

const login = ()=>{

    setIsLogged(1)

}
const logout = ()=>{
    setIsLogged(0)



}


  return (
   <MyAuth.Provider value={{login,logout,isLogged}}>
    {Children}
   
   </MyAuth.Provider>
  )
}

export default AuthElement