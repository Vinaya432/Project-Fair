import React, { useContext, useEffect, useState } from 'react'
import AddProject from '../Components/AddProject'
import EditProject from '../Components/EditProject'
import { deleteProjectAPI, getUserProjectAPI } from '../Services/allAPIs'
import { addProjectResponseContext, editProjectResponseContext} from '../Context API/ContextShare'
import { toast } from 'react-toastify'


function MyProjects() {


  const {addProjectResponse,setAddProjectResponse}=useContext(addProjectResponseContext)
  const {editProjectResponse,setEditProjectResponse}=useContext(editProjectResponseContext)


  const [userProject,setUserProject]=useState([])

  const getUserProjects=async()=>{
    const token=sessionStorage.getItem("token")
    if(token){
      const reqHeader={
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }
      const result=await getUserProjectAPI(reqHeader)
      if(result.status===200){
        setUserProject(result.data)
      }else{
        console.log(result);
      }
    }
  }

  console.log(userProject);

  useEffect(()=>{
    getUserProjects()
  },[addProjectResponse,editProjectResponse])

  const handleDeleteProject=async(pid)=>{
    const token=sessionStorage.getItem("token")

    if(token){
     const reqHeader={
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
     }
      try{
         const result= await deleteProjectAPI(pid,reqHeader)
         if(result.status==200){
          getUserProjects()
         }else{
          toast.warning(result.response.data)
         }
      }catch(err){
        console.log(err);
      }
    }
  }

  return (
    
     <div className='card shadow p-3'>
        <div className="d-flex justify-content-between">
          <h2 style={{height:'40px'}}>My Projects</h2>
          <div><AddProject/></div>
        </div>
        <div className="mt-4">
          {userProject?.length>0?userProject.map((project,index)=>(
            <div key={index} className="border rounded d-flex justify-content-between align-items-center mb-3 p-2 text-danger">
            <h5 style={{height:'35px'}}>{project?.title}</h5>
            <div className="d-flex icons align-items-center">
              <EditProject project={project}/>

              <a className='btn' href={project?.github} target='_blank'><i style={{height:'34px'}} className='fa-brands fa-github fa-2x'></i></a>
             <button onClick={()=>handleDeleteProject(project?._id)} className='btn'><i style={{height:'34px'}} className='fa-solid fa-trash fa-2x'></i></button>
            </div>
            
          </div>
          )):
          <div className='fw-bold text-info'>No projects are Uploaded Yet!!!</div>
          }
        </div>

     </div>
    
  )
}

export default MyProjects