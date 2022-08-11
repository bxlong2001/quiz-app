import { Row, Col, Spinner, Table, Button } from "react-bootstrap"
import { useContext, useEffect } from "react"
import { ExamContext } from "../../../contexts/ExamContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye} from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

const Exams = () => {
  const {examState: {topics, topicsLoading}, getTopic} = useContext(ExamContext)
  
  useEffect(() => {getTopic()},[])

  if(topicsLoading)
    return (
      <div className="d-flex justify-content-center mt-2">
          <Spinner animation='border' variant='info' />
      </div>
    )
  
  return (
      <Row>
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
                  {topics.map((topic, index) => (
                        <tr key={topic}>
                          <td></td>
                          <td>{index+1}</td>
                          <td></td>
                          <td>{topic}</td>
                          <td></td>
                          <td>
                            <Button variant='success' to={`view/${topic}`} as={Link}>
                              <FontAwesomeIcon icon={faEye} />
                            </Button>
                          </td>
                        </tr>
                      ))}
                </tbody>
            </Table>
        </Col>
      </Row>
  )
}

export default Exams