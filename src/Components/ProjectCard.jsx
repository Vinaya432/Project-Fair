import React, { useState } from 'react'
import {Card,Col,Modal, Row} from 'react-bootstrap';
import { SERVER_URL } from '../Services/serverURL';



function ProjectCard({project}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>

    {project&&<Card className='shadow btn  me-3 mb-5' style={{ width: '28rem' }} onClick={handleShow}>
      <Card.Img className='rounded p-2' style={{height:'250px'}} variant="top" src={`${SERVER_URL}/uploads/${project?.projectImage}`}  />
      <Card.Body>
        <Card.Title className='text-center' style={{height:'50px'}}>{project?.title}</Card.Title>
      </Card.Body>
    </Card>}

     <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <img className='img-fluid' style={{height:'250px'}} src={`${SERVER_URL}/uploads/${project?.projectImage}`} alt="" />
            </Col>
            <Col md={6}>
              <h2 style={{height:'40px'}} className='fw-bold text-warning'>{project?.title}</h2>
              <p>Project Overview: <span className='text-success'>{project?.overview}</span></p>
              <p>Language Used: <span className='text-danger fw-bold'> {project?.languages}</span></p>
            </Col>
          </Row>
          <div className="mt-3">
            <a href={project?.github} target='_blank' className='btn me-3'> <i style={{height:'40px'}} className="fa-brands fa-github fa-2x"></i></a>
            <a href={project?.website} target='_blank' className='btn'><i style={{height:'40px'}} className="fa-solid fa-link fa-2x text-dark"></i></a>
          </div>
        </Modal.Body>
        
      </Modal>

    </>
  )
}

export default ProjectCard