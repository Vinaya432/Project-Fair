import React, { useEffect, useState } from 'react'
import landingImg from '../assets/images/landing.jpg'
import { Link, useNavigate } from 'react-router-dom'
import ProjectCard from '../Components/ProjectCard'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getHomeProjectAPI } from '../Services/allAPIs';

function Home() {

  const navigate=useNavigate()


  const [isLoggedin,setIsLoggedIn]=useState(false)

  const [allprojects,setAllprojetcs] = useState([])


  console.log(allprojects);
  //home project get
  const getHomeProject = async ()=>{
    const result = await getHomeProjectAPI()
    if(result.status===200){
      setAllprojetcs(result.data)
    }else{
      console.log(result);
    }
  }

  useEffect(()=>{
    getHomeProject()
    if(sessionStorage.getItem("token")){
      setIsLoggedIn(true)
    }else{
      setIsLoggedIn(false)
    }
  },[])
  const handleProject=()=>{
    if(sessionStorage.getItem("token")){
      navigate('/projects')
    }else{
      toast.warning("Please Login to Explore our Projects!!!")
    }
    
  }
  return (
    <>
      {/* Landing Page */}
      <div className="rounded" style={{height:'100vh',widows:'100%',backgroundColor:'#90ee90'}}>
        <div style={{height:'100%'}} className='container'>
          <div  style={{height:'100%'}} className="row align-items-center">
            <div className="col-lg-5">
              <h1 style={{fontSize:'60px',height:'100px'}} className='text-light fw-bold'><i style={{height:'80px'}} className="fa-brands fa-stack-overflow fa-bounce me-2"></i>Project Fair</h1>
              <p>One stop Destination for all software Development Projects. Where user can add and manage their projects. As well as acess all projects available in our website...What are you waiting for!!!</p>
             {isLoggedin? <Link className='btn btn-warning ' to={'/dashboard'}>Manage Your Projects <i className='fa-solid fa-arrow-right ms-2'></i></Link>: <Link className='btn btn-warning ' to={'/login'}>Starts to Explore <i className='fa-solid fa-arrow-right ms-2'></i></Link>}
            </div>

            <div className="col-lg-2"></div>
            <div className="col-lg-4">
              <img className='img-fluid rounded-circle' style={{height:'450px',width:'450px'}} src={landingImg} alt="No image" />
            </div>
            <div className="col-lg-1"></div>
  
          </div>
        </div>
      </div>

      {/* View projects */}
      <div className="projects mt-5">
        <h1 style={{height:'60px'}} className='text-center mb-3'>Explore Our Projects</h1>
        <marquee >
          <div className="d-flex justify-content-between">
            {allprojects.length>0? allprojects.map((project,index)=>(
              <div key={index} className="me-5">
              <ProjectCard project={project}/>
            </div>
            )) :null
          }
          </div>
        </marquee>
        <div className="text-center">
          <button onClick={handleProject} className='btn btn-link text-danger fw-bold'>View More Projects</button>
        </div>
      </div>
      <ToastContainer theme='colored' autoClose={3000}/>
    </>
  )
}

export default Home