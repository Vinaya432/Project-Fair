import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../Components/ProjectCard'
import { getAllProjectAPI } from '../Services/allAPIs'


function Projects() {

  const [searchKey,setSearchKey]=useState("")

  const [allProjects,setAllProjects]=useState([])

  const getAllProjects =async()=>{
    const token=sessionStorage.getItem("token")
    if(token){
      const reqHeader={
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }
      const result=await getAllProjectAPI(searchKey,reqHeader) //implement search by back-end
      if(result.status===200){
        setAllProjects(result.data)
      }else{
        console.log(result);
      }
    }
   
  }

  console.log(allProjects);

  useEffect(()=>{
    getAllProjects()
  },[searchKey])
  return (
    <>
      <Header/>
      <div className="project-page-design">
        <div className="d-flex justify-content-center align-items-center flex-column">
          <h1 style={{height:'60px'}} className='fw-bold mt-5'>All Projects</h1>
          <input style={{width:'500px'}} type="text" className='rounded shadow form-control' placeholder='Search Projects By Technologies'  onChange={e=>setSearchKey(e.target.value)}/>
        </div>
        <Row className='container-fluid mt-5'>
          {allProjects?.length>0? allProjects.map((project,index)=>(
            <Col key={index} sm={12} md={6} lg={4}>
            <ProjectCard project={project}/>
          </Col>
          )) :
          <div className='text-warning fs-1'>No Projects are Available</div>
        }
        </Row>
      </div>
    </>
  )
}

export default Projects