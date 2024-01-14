import React from 'react'
import Header from '../Components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../Components/ProjectCard'

function Projects() {
  return (
    <>
      <Header/>
      <div className="project-page-design">
        <div className="d-flex justify-content-center align-items-center flex-column">
          <h1 style={{height:'60px'}} className='fw-bold mt-5'>All Projects</h1>
          <input style={{width:'500px'}} type="text" className='rounded shadow' placeholder='Search Projects By Technologies' />
        </div>
        <Row className='container-fluid mt-5'>
          <Col sm={12} md={6} lg={4}>
            <ProjectCard/>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Projects