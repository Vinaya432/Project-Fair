import React from 'react'
import Header from '../Components/Header'
import MyProjects from '../Components/MyProjects'
import Profile from '../Components/Profile'

function DashBoard() {
  return (
    <>
    <Header insideDashBoard />
    <div style={{marginTop:'60px'}} className='container'>
      <h1 style={{height:'45px'}} className='fw-bold'>Welcome <span className='text-warning'>User</span></h1>
      <div className="row">
        <div className="col-lg-8">
          <MyProjects/>
        </div>
        <div className="col-lg-4">
          <Profile/>
        </div>
      </div>
    </div>
    </>
  )
}

export default DashBoard