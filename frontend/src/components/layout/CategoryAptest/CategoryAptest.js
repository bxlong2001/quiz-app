import { Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChartSimple, faClockRotateLeft, faHouse, faPencil } from "@fortawesome/free-solid-svg-icons"

const CategoryAptest = () => {
  return (
    <Nav fill variant="tabs" defaultActiveKey="/home" className="flex-column" line="none">
      <Nav.Item>
        <Nav.Link to="/" as={Link}>
          <FontAwesomeIcon icon={faHouse}/>
          <p>Trang chủ</p>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link to="/exams" as={Link}>
          <FontAwesomeIcon icon={faPencil}/>
          <p>Đề thi</p>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link to="/rank" as={Link}>
          <FontAwesomeIcon icon={faChartSimple}/>
          <p>Bảng xếp hạng</p>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link to="/me/history" as={Link}>
          <FontAwesomeIcon icon={faClockRotateLeft}/>
          <p>Lịch sử thi</p>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

export default CategoryAptest