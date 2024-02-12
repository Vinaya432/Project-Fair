import React, { createContext, useEffect, useState } from 'react'

export const tokenAuthenticationContext=createContext()

function TokenAuth({children}) {
    const [isAuthorised,setIsAuthorized]=useState(false)

    useEffect(()=>{
        if(sessionStorage.getItem("token")){
            setIsAuthorized(true)
        }else{
            setIsAuthorized(false)
        }
    },[isAuthorised])
  return (
    <>
        <tokenAuthenticationContext.Provider value={{isAuthorised,setIsAuthorized}}>
            {children}
        </tokenAuthenticationContext.Provider>
    </>
  )
}

export default TokenAuth