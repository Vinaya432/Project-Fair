import React, { useContext } from 'react'
import {Navbar,Container} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { tokenAuthenticationContext } from '../Context API/TokenAuth'


function Header({insideDashBoard}) {

  const {isAuthorised,setIsAuthorized} = useContext(tokenAuthenticationContext)


  const navigate=useNavigate()

  const handleLogOut=()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("usernamr")
    setIsAuthorized(false)
    navigate('/')
  }
  return (
    <>
    <Navbar style={{backgroundColor:'#90ee90'}}>
        <Container>
          <Navbar.Brand href="#home">
          <Link to={'/'} style={{textDecoration:'none',color:'white',fontWeight:'bold',fontSize:'30px'}}>
            <i  className="fa-brands fa-stack-overflow fa-bounce me-2"></i>
            Project Fair
          </Link>
          </Navbar.Brand>
          {
            insideDashBoard&&
            <div className='ms-auto'>
              <button className='btn text-dark' onClick={handleLogOut}> <i className='fa-solid fa-gear'></i> Logout</button>
            </div>
          }
        </Container>
      </Navbar>

    </>
  )
}

export default Header