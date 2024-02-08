import React, { useState } from 'react'
import {Collapse} from 'react-bootstrap'
import uploadProfile from '../assets/images/profile.jpg'

function Profile() {
  const [open,setOpen] = useState(false);
  return (
    <>
      <div className="d-flex p-2 rounded justify-content-between">
        <h2 style={{height:'40px'}}>Profile</h2>
        <button onClick={() => setOpen(!open)} className='btn btn-outline-secondary'><i class="fa-solid fa-angle-down"></i></button>
      </div>
      <Collapse in={open}>
        <div className='row shadow p-5 justify-content-center mt-3' id="example-collapse-text">
          <label className='text-center'>
            <input style={{display:'none'}}  type="file"/>
            <img width={'200px'} height={'200px'} src={uploadProfile}alt="upload image" /> 
          </label>

          <div className='mb-3'><input type="text" placeholder='Enter your GitHub URL' className='form-control'/></div>
          <div className='mb-3'><input type="text" placeholder='Enter your LinkedIn URL' className='form-control'/></div>
          <button className='btn btn-warning'>UPLOAD</button>
        </div>
      </Collapse>
    </>
  )
}

export default Profile