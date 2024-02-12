import React, { useEffect, useState } from 'react'
import {Collapse} from 'react-bootstrap'
import uploadProfile from '../assets/images/profile.jpg'
import { SERVER_URL } from '../Services/serverURL';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUserProfileAPI } from '../Services/allAPIs';

function Profile() {
  const [open,setOpen] = useState(false);
  const [userData,setUserData] = useState({
    username:"",email:"",password:"",github:"",linkedin:"",profileImg:""
  })

  const [existingImg,setExistingImg]=useState("")
  const [preview,setPreview]=useState("")

  
  useEffect(()=>{
    if(sessionStorage.getItem("userDetails")){
      const user=JSON.parse(sessionStorage.getItem("userDetails"))
      setUserData({...userData,username:user.username,password:user.password,email:user.email,github:user.github,linkedin:user.linkedin})
      setExistingImg(user.profile)
    }
  },[open])

  useEffect(()=>{
    if(userData.profileImg){
      setPreview(URL.createObjectURL(userData.profileImg))
    }else{
      setPreview("")
    }
  },[userData.profileImg])

  console.log(userData);
  // console.log("Ex",existingImg);

  const handleProfileUpdate=async()=>{
    const {username,password,email,github,linkedin,profileImg}=userData
    if(!github || !linkedin){
      toast.info("Please fill github and linked")
    }else{
        //proceed to api call
        const reqBody= new FormData()
        reqBody.append("username",username)
        reqBody.append("password",password)
        reqBody.append("email",email)
        reqBody.append("github",github)
        reqBody.append("linkedin",linkedin)
        preview?reqBody.append("profileImg",profileImg):reqBody.append("profileImg",existingImg)

        const token=sessionStorage.getItem("token")
        if(token){
          const reqHeader={
            "Content-Type":preview?"multipart/form-data":"application/json",
            "Authorization":`Bearer ${token}`
          }
          //api
          try{
            const result = await updateUserProfileAPI(reqBody,reqHeader)
            console.log(result);
            if(result.status==200){
              setOpen(!open)
              sessionStorage.setItem("userDetails",JSON.stringify(result.data))
            }else{
              console.log(result);
            }
          }catch(err){
            console.log("inside catch of profile");
            console.log(err);
          }
        }
    }
  }


  return (
    <>
      <div className="d-flex p-2 rounded justify-content-between">
        <h2 style={{height:'40px'}}>Profile</h2>
        <button onClick={() => setOpen(!open)} className='btn btn-outline-secondary'><i class="fa-solid fa-angle-down"></i></button>
      </div>
      <Collapse in={open}>
        <div className='row shadow p-5 justify-content-center mt-3' id="example-collapse-text">
          <label className='text-center'>
            <input style={{display:'none'}}  type="file" onChange={e=>setUserData({...userData,profileImg:e.target.files[0]})}/>
            {existingImg==""?
              <img width={'200px'} height={'200px'} src={preview?preview:uploadProfile} alt="upload image" /> 
            :
              <img width={'200px'} height={'200px'} className='rounded-circle' src={preview?preview:`${SERVER_URL}/uploads/${existingImg}`} alt="user profile img"/>
            }
          </label>

          <div className='mb-3'><input type="text" placeholder='Enter your GitHub URL' className='form-control' value={userData.github} onChange={e=>setUserData({...userData,github:e.target.value})}/></div>
          <div className='mb-3'><input type="text" placeholder='Enter your LinkedIn URL' className='form-control' value={userData.linkedin} onChange={e=>setUserData({...userData,linkedin:e.target.value})}/></div>
          <button className='btn btn-warning' onClick={handleProfileUpdate}>UPLOAD</button>
        </div>
      </Collapse>

      <ToastContainer autoClose={3000} theme='colored'/>
    </>
  )
}

export default Profile