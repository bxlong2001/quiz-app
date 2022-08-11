import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const CategoryAdmin = () => {
  return (
    <Nav fill variant="tabs" className="flex-column">
      <Nav.Item>
        <Nav.Link to="/admin/exams-management" as={Link}>
          Quản lý đề thi
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link to="/admin/users-management" as={Link}>
          Quản lý người dùng
        </Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

export default CategoryAdmin