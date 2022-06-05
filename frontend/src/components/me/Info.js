import React from 'react'
import { Col, Container, Nav, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import NavbarAptest from '../layout/NavbarAptest'

const Info = () => {
  return (
    <Container>
      <NavbarAptest />
      <Row>
        <Col sm={2}>
            <Nav fill variant="tabs" defaultActiveKey="/home" className="flex-column">
                <Nav.Item>
                    <Nav.Link to="/me/info" as={Link}>Thông tin</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link to="/me/reset-pwd" as={Link}>Đổi mật khẩu</Nav.Link>
                </Nav.Item>
            </Nav>
        </Col>
        <Col sm={10}>
          
        </Col>
      </Row>
    </Container>
  )
}

export default Info