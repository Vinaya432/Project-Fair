import React, { useContext, useEffect, useState } from 'react'
import {Modal,Button} from 'react-bootstrap'
import UploadImg from '../assets/images/uploadicon.jpg'
import { SERVER_URL } from '../Services/serverURL';
import { toast,ToastContainer } from 'react-toastify';
import { editProjectAPI } from '../Services/allAPIs';
import { editProjectResponseContext } from '../Context API/ContextShare';

function EditProject({project}) {

  const {editProjectResponse,setEditProjectResponse}=useContext(editProjectResponseContext)
  const [show, setShow] = useState(false);
  console.log(project);

  const [projectData,setProjectData]=useState({
    id:project._id,title:project.title,languages:project.languages,overview:project.overview,github:project.github,website:project.website,projectImage:""
  })

  const [preview,setPreview]=useState("") //state for storing img url

  useEffect(()=>{
    if(projectData.projectImage){
      setPreview(URL.createObjectURL(projectData.projectImage))
    }else{
      setPreview("")
    }

  },[projectData.projectImage])

  const handleClose = () => {
    setShow(false);
    setProjectData({
      id:project._id,title:project.title,languages:project.languages,overview:project.overview,github:project.github,website:project.website,projectImage:""
    })
    setPreview("")
  }
  const handleShow = () => setShow(true);

  const handleUpdate= async()=>{
    const {id,title,languages,github,overview,website,projectImage}= projectData
    

    if(!title || !languages || !github || !overview || !website){
      toast.warning("Please fill the form Completely!!!")
    }else{
      // alert("Proceed to API call")

      const reqBody=new FormData()
      reqBody.append("title",title)
      reqBody.append("languages",languages)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      preview?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage)

      //reqHeader
      const token = sessionStorage.getItem("token")
      if(token){
        
          const reqHeader={
            "Content-Type":preview?"multipart/form-data":"application/json",
            "Authorization":`Bearer ${token}`
          }
          //api call

        try{
          const result = await editProjectAPI(id,reqBody,reqHeader)
           console.log(result);
           if(result.status===200){
            // toast.success(`Project "${result.data.title}" is updated successfully...`)
            handleClose()
            setEditProjectResponse(result.data)
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
      <button className='btn' onClick={handleShow}><i style={{height:'34px'}} className="fa-solid fa-pen-to-square fa-2x"></i></button>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}
      size='lg' centered>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-6">
                <label>
                  <input style={{display:'none'}} type="file"  onChange={e=>setProjectData({...projectData,projectImage:e.target.files[0]})}/>
                  <img src={preview?preview:`${SERVER_URL}/uploads/${project.projectImage}`} alt="" />
                </label>
            </div>
            <div className="col-lg-6 mt-5">
                  <div className='mb-3'><input className='form-control' type="text" placeholder='Project Title' value={projectData.title}  onChange={e=>setProjectData({...projectData,title:e.target.value})}/></div>
                  <div className='mb-3'><input className='form-control' type="text" placeholder='Language Used' value={projectData.languages}  onChange={e=>setProjectData({...projectData,languages:e.target.value})}/></div>
                  <div className='mb-3'><input className='form-control' type="text" placeholder='Project gitHub Link' value={projectData.github}  onChange={e=>setProjectData({...projectData,github:e.target.value})}/></div>
                  <div className='mb-3'><input className='form-control' type="text" placeholder='Project website Link' value={projectData.website}  onChange={e=>setProjectData({...projectData,website:e.target.value})}/></div>
                  <div className='mb-3'><input className='form-control' type="text"  placeholder='Project Overview' value={projectData.overview}  onChange={e=>setProjectData({...projectData,overview:e.target.value})}/></div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>Upload</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer theme='colored' autoClose={3000}/>
    </>
  )
}

export default EditProject