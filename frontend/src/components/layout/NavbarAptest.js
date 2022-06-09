import { useContext} from "react"
import { Navbar, Container, Nav, NavDropdown} from "react-bootstrap"
import { Link } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"

const NavbarAptest = () => {
  const {authState: {user}, logoutUser} = useContext(AuthContext)
    
  return (
    <Navbar bg='light' expand="lg" id="navbar">
      <Container>
        <Navbar.Brand to="/" style={{fontSize: 28}} as={Link}>
          <img src="https://cdn.testbook.com/resources/production/test_series/Static%20GK@10x_All_1614186087.png" alt="" width={50}/>
          APTEST
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="ml-auto" >
            {!user ?
            <>
              <Nav.Link to="/login" as={Link}>
                <button className='btn-nav'>Đăng nhập</button>
              </Nav.Link>
              <Nav.Link to="/register" as={Link}>
                <button className='btn-nav'>Đăng ký</button>
              </Nav.Link>
            </>:
            <NavDropdown title={user.admin? 'Admin' : user.fullname} id="basic-nav-dropdown">
              {user.admin ?
              <>
                <NavDropdown.Item to="/admin/exams-management" as={Link}>Quản lý ngân hàng đề</NavDropdown.Item>
                <NavDropdown.Item to="/admin/users-management" as={Link}>Quản lý người dùng</NavDropdown.Item>
              </>
              :
              <>
                <NavDropdown.Item to="/me/info" as={Link}>Thông tin cá nhân</NavDropdown.Item>
                <NavDropdown.Item to="/me/rank" as={Link}>Xếp hạng cá nhân</NavDropdown.Item>
                <NavDropdown.Item to="/me/history" as={Link}>Lịch sử thi</NavDropdown.Item>
              </>
              }
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logoutUser}>Đăng xuất</NavDropdown.Item>
            </NavDropdown>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarAptest