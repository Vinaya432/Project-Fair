import React, { createContext, useState } from 'react'

//create a context that can access globally
export const addProjectResponseContext = createContext()

function ContextShare({children}) {

    const [addProjectResponse,setAddProjectResponse]=useState("")
  return (
    <>
        <addProjectResponseContext.Provider value={{addProjectResponse,setAddProjectResponse}}>
            {children}
        </addProjectResponseContext.Provider>
    </>
  )
}

export default ContextShare
