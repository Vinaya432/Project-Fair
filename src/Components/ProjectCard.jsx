import React, { useState } from 'react'
import {Card,Col,Modal, Row} from 'react-bootstrap';


function ProjectCard() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>

    <Card className='shadow btn  me-3' style={{ width: '28rem' }} onClick={handleShow}>
      <Card.Img className='rounded p-2' variant="top" src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg" />
      <Card.Body>
        <Card.Title className='text-center' style={{height:'50px'}}>Card Title</Card.Title>
      </Card.Body>
     </Card>

     <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <img className='img-fluid' style={{height:'250px'}} src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg" alt="" />
            </Col>
            <Col md={6}>
              <h2 style={{height:'40px'}} className='fw-bold text-warning'>Project Title</h2>
              <p>Project Overview: <span className='text-success'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea voluptatibus et fugiat doloremque blanditiis nisi recusandae dolore quos esse quae atque minus totam quisquam quidem, animi, aperiam, qui amet quia.</span></p>
              <p>Language Used: <span className='text-danger fw-bold'> HTML,JS,CSS</span></p>
            </Col>
          </Row>
          <div className="mt-3">
            <a href="https://github.com/Vinaya432/E-cart" target='_blank' className='btn me-3'> <i style={{height:'40px'}} className="fa-brands fa-github fa-2x"></i></a>
            <a href='https://www.linkedin.com/feed/update/urn:li:activity:7131534864117362689/' target='_blank' className='btn'><i style={{height:'40px'}} className="fa-solid fa-link fa-2x text-dark"></i></a>
          </div>
        </Modal.Body>
        
      </Modal>

    </>
  )
}

export default ProjectCard