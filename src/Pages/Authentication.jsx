import React, { useContext, useState } from 'react'
import {  Link, useNavigate } from 'react-router-dom'
import {Form,Spinner} from 'react-bootstrap'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from '../Services/allAPIs';
import { tokenAuthenticationContext } from '../Context API/TokenAuth';

function Authentication({insideRegister}) {

  const {isAuthorised,setIsAuthorized} = useContext(tokenAuthenticationContext)

  const [loginStatus,setLoginStatus]=useState(false)

  const navigate=useNavigate()
  const [userData,setUserData]=useState({
    username:"",email:"",password:""
  })

  const handleRegister=async (e)=>{
    e.preventDefault()
    console.log(userData);
    const {username,email,password}=userData
    if(!username || !email || !password){
      toast.info("Please fill the form completely!!!")
    }else{
      // toast.success("Proceed to api call")
      try{
        const result=await registerAPI(userData)
        console.log(result);
        if(result.status===200){
          toast.success(`${result.data.username} has Registered Successfully!!!`)
          setUserData({username:"",email:"",password:""})
          setTimeout(()=>{
            navigate('/login')
          },2000)
        }else{
          toast.warning(result.response.data)
        }
      }catch(err){
        console.log(err);
      }
    }

  }

  const handleLogin= async(e)=>{
    e.preventDefault()
    const {email,password}=userData
    if(!email || !password){
      toast.info("Please fill the form completely!!!")
    }else{
      try{
        const result=await loginAPI({email,password})
        console.log(result);
        if(result.status===200){
          sessionStorage.setItem("usename",result.data.existingUser.username)
          sessionStorage.setItem("token",result.data.token)
          sessionStorage.setItem("userDetails",JSON.stringify(result.data.existingUser))
          setIsAuthorized(true)
          setUserData({email:"",password:""})
          setLoginStatus(true)
         setTimeout(()=>{
          navigate('/')
          setLoginStatus(false)
         },2000)
        }else{
          toast.warning(result.response.data)
        }
      }catch(err){
        console.log(err);
      }
    }
  }
  return (
    <div style={{height:'100vh',width:'100%'}} className='d-flex justify-content-center align-items-center'>
      <div className="container w-75">
        <Link to={'/'}> <i className='fa-solid fa-arrow-left fw-bold'></i> Back to Home</Link>
        <div className="card shadow p-5 bg-success bg-opacity-75">
            <div className="row align-items-center">
              <div className="col-lg-5">
                <img style={{height:'300px'}} className='img-fluid' src="https://www.hicomultifin.com/auth/images/login.png" alt="login img" />
              </div>
              <div className="col-lg-7">
                <div className="d-flex align-items-center flex-column">
                  <h1 style={{height:'100px'}} className='text-light fw-bold'><i style={{height:'46px'}} className="fa-brands fa-stack-overflow fa-bounce me-2"></i>Project Fair</h1>
                  <h5 className='text-light  pb-3 fw-bold'>
                    {insideRegister?'Sign up to your Account':'Sign In to your Account'}
                  </h5>

                  <Form className='w-75'>
                    {
                      insideRegister&&<Form.Group className="mb-3" controlId="formBasicuname">
                          <Form.Control type="text" placeholder="Enter your Username" onChange={(e)=>setUserData({...userData,username:e.target.value})} value={userData.username}/>
                      </Form.Group>
                    }
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                       <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setUserData({...userData,email:e.target.value})} value={userData.email}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Control type="password" placeholder="Password" onChange={(e)=>setUserData({...userData,password:e.target.value})} value={userData.password}/>
                    </Form.Group>  
                    {
                      insideRegister?
                      <div >
                          <button onClick={handleRegister} className='btn btn-light mb-2'>Register</button>
                          <p>Already have an Account? Click here to <Link to={'/login'} className='text-danger fw-bold'>Login</Link></p>
                      </div>:
                      <div >
                        <button onClick={handleLogin} className='btn btn-light mb-2'>Login {loginStatus&&<Spinner animation="border" variant="primary" />}</button>
                        <p>New User? Click here to <Link to={'/register'} className='text-danger fw-bold'>Register</Link></p>
                      </div>
                    }
                  </Form>
                </div>
              </div>
            </div>
        </div>
      </div>

      <ToastContainer theme='colored' autoClose={2000}/>
    </div>
  )
}

export default Authentication