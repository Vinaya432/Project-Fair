import React from 'react'
import {Navbar,Container} from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Header({insideDashBoard}) {
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
              <button className='btn text-dark'> <i className='fa-solid fa-gear'></i> Logout</button>
            </div>
          }
        </Container>
      </Navbar>

    </>
  )
}

export default Header