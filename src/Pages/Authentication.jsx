import React from 'react'
import {  Link } from 'react-router-dom'
import {Form} from 'react-bootstrap'


function Authentication({insideRegister}) {
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
                          <Form.Control type="text" placeholder="Enter your Username" />
                      </Form.Group>
                    }
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                       <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Control type="password" placeholder="Password" />
                    </Form.Group>  
                    {
                      insideRegister?
                      <div >
                          <button className='btn btn-light mb-2'>Register</button>
                          <p>Already have an Account? Click here to <Link to={'/login'} className='text-danger fw-bold'>Login</Link></p>
                      </div>:
                      <div >
                        <button className='btn btn-light mb-2'>Login</button>
                        <p>New User? Click here to <Link to={'/login'} className='text-danger fw-bold'>Register</Link></p>
                      </div>
                    }
                  </Form>
                </div>
              </div>
            </div>
        </div>
      </div>

      
    </div>
  )
}

export default Authentication