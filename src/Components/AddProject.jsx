import React, { useEffect, useState } from 'react'
import {Modal,Button} from 'react-bootstrap'
import UploadImg from '../assets/images/uploadicon.jpg'
import {addProjectAPI} from '../Services/allAPIs'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { addProjectResponseContext } from '../Context API/ContextShare';

function AddProject() {

  const {addProjectResponse,setAddProjectResponse}=useContext(addProjectResponseContext)

  const [fileStatus,setFileStatus]=useState(false)
  const [prjImg,setPrjImg]=useState("")//storing the image url created
  const [show, setShow] = useState(false);
  const [projectData,setProjectData]=useState({
    title:"",languages:"",overview:"",github:"",website:"",projectImage:""
  })

  console.log(projectData);

  const handleClose = () =>{ 
    setShow(false);
    setProjectData({
      title:"",languages:"",overview:"",github:"",website:"",projectImage:""
    })
    setPrjImg("")
  }
  const handleShow = () => setShow(true);

  useEffect(()=>{
    console.log(projectData.projectImage.type);

    if(projectData.projectImage.type==="image/png" || projectData.projectImage.type==="image/jpeg" || projectData.projectImage.type==="image/jpg" || projectData.projectImage.type==="image/svg"){
      console.log("generate image url");
      setPrjImg(URL.createObjectURL(projectData.projectImage))
      setFileStatus(false)
    }else{
      console.log("Incorrect image format");
      setFileStatus(true)
      setPrjImg("")
      setProjectData({...projectData,projectImage:""})
    }
  },[projectData.projectImage])

  const handleAddProject= async()=>{
    const {title,languages,overview,github,website,projectImage} = projectData
    
    const token = sessionStorage.getItem("token")
    
    if(!title || !languages || !github || !website || !overview || !projectImage){
      toast.info("Please fill the form Completely!!!")
    }else{
      //api call -reqBody
      const reqBody=new FormData()
      reqBody.append("title",title)
      reqBody.append("languages",languages)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("projectImage",projectImage)

      //reqHeader
      if(token){
        const reqHeader={
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }

        //api call
        try{
          const result = await addProjectAPI(reqBody,reqHeader)
          console.log(result);

          if(result.status===200){
            console.log(result.data);
            handleClose()
            setAddProjectResponse(result.data)
          }else{
            toast.warning(result.response.data)
          }
        }catch(err){
          console.log(err);
        }
      }
      
      
      
    }
  }
  return (
    <>
      <button className='btn btn-success' onClick={handleShow}><i className='fa-solid fa-plus'></i>Add Project</button>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}
      size='lg' centered>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-6">
                <label >
                  <input type="file" style={{display:'none'}} onChange={e=>setProjectData({...projectData,projectImage:e.target.files[0]})}/>
                  <img src={prjImg?prjImg:UploadImg} alt="upload project image" />
                </label>

                {/* image extension */}
                {fileStatus&&<div className="text-danger mt-1 fw-bold">
                  <p>* Please upload the  image with the following Extensions (png,jpg,jpeg) only *</p>
                </div>}

            </div>
            <div className="col-lg-6 mt-5">
                  <div className='mb-3'><input className='form-control' type="text" placeholder='Project Title' value={projectData.title} onChange={e=>setProjectData({...projectData,title:e.target.value})}/></div>
                  <div className='mb-3'><input className='form-control' type="text" placeholder='Language Used'  value={projectData.languages} onChange={e=>setProjectData({...projectData,languages:e.target.value})}/></div>
                  <div className='mb-3'><input className='form-control' type="text" placeholder='Project gitHub Link'  value={projectData.github} onChange={e=>setProjectData({...projectData,github:e.target.value})} /></div>
                  <div className='mb-3'><input className='form-control' type="text" placeholder='Project Website Link'  value={projectData.website}  onChange={e=>setProjectData({...projectData,website:e.target.value})}/></div>
                  <div className='mb-3'><input className='form-control' type="text"  placeholder='Project Overview'  value={projectData.overview} onChange={e=>setProjectData({...projectData,overview:e.target.value})}/></div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddProject}>Add</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer theme='colored' autoClose={3000}/>
    </>
  )
}

export default AddProject