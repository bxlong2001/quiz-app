import { Row, Col, Spinner, Table, Button, Form } from "react-bootstrap"
import { useContext, useEffect, useState } from "react"
import { ExamContext } from "../../../contexts/ExamContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye} from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

const Exams = () => {
  const {examState: {topics, topicsLoading}, getTopic} = useContext(ExamContext)
  const [param, setParam] = useState('')
  useEffect(() => {getTopic()},[])

  if(topicsLoading)
    return (
      <div className="d-flex justify-content-center mt-2">
          <Spinner animation='border' variant='info' />
      </div>
    )
  
  let i = 1
  return (
      <Row>
        <Col sm={9}></Col>
        <Col sm={3}>
          <Form.Select aria-label="Default select example"className="mb-3" onChange={e => setParam(e.target.value)}>
            <option value=''>--Loại đề--</option>
            <option value='thpt'>Trung học phổ thông</option>
            <option value='12'>Lớp 12</option>
            <option value='11'>Lớp 11</option>
            <option value='10'>Lớp 10</option>
          </Form.Select>
        </Col>
        <Col>
        <Table striped hover responsive="lg">
                <thead>
                  <tr>
                    <th></th>
                    <th>STT</th>
                    <th></th>
                    <th>Mã đề</th>
                    <th></th>
                    <th>Tùy chỉnh</th>
                  </tr>
                </thead>
                <tbody>
                  {topics.map((topic) => {
                    if(topic.split('-')[1] === param || param === '') {
                      return <tr key={topic}>
                        <td></td>
                        <td>{i++}</td>
                        <td></td>
                        <td>{topic}</td>
                        <td></td>
                        <td>
                          <Button variant='success' to={`view/${topic}`} as={Link}>
                            <FontAwesomeIcon icon={faEye} />
                          </Button>
                        </td>
                      </tr>
                    }
                  })}
                </tbody>
            </Table>
        </Col>
      </Row>
  )
}

export default Exams