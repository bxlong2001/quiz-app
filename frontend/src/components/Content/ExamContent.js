import { useContext, useEffect} from 'react'
import { Button, Card, Col, Form, NavLink, Row, Spinner } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { ExamContext } from '../../contexts/ExamContext'
import ScrollButton from '../layout/ScrollButton'

const ExamContent = () => {
    const search = useLocation().search
    const navigative = useNavigate()
    const {examState: {subjects, subjectsLoading}, getSubjects} = useContext(ExamContext)
    const {authState: {authLoading, isAuthenticated}} = useContext(AuthContext)
    const codeParam = new URLSearchParams(search).get('code')
    const level = new URLSearchParams(search).get('level')

    useEffect(() => {getSubjects()},[])

    const handleChange = (value) => {
      if(value === 'all')
        return navigative('/exams')
      navigative(`?code=${value}`)
    }

    let body = null
    if(authLoading || subjectsLoading)
      body = <div className="d-flex justify-content-center mt-2">
          <Spinner animation='border' variant='info' />
      </div>
    else{
      body = (
        <Row>
          <Col sm={10}></Col>
          <Col sm={2}>
            <Form.Select aria-label="Default select example" onChange={e => handleChange(e.target.value)} className="mb-3">
                <option value='all'>--Môn thi--</option>
              {subjects.map(subject => (
                <option value={subject.code} key={subject.code}>{subject.title}</option>
              ))}
            </Form.Select>
          </Col>
          {/* <Col sm={2}>
            <Form.Select aria-label="Default select example" onChange={e => handleChange(e.target.value)} className="mb-3">
                <option value='all'>--Loại đề--</option>
                <option value='thpt'>THPT Quốc Gia</option>
                <option value='12'>Lớp 12</option>
                <option value='11'>Lớp 11</option>
                <option value='10'>Lớp 10</option>
            </Form.Select>
          </Col> */}
          {subjects.map(({type: types, code}) => {
            if(code === codeParam || !codeParam)
              return types.map((type) => (
                <Col sm={3} key={type.code}>
                  <Card className='mb-4'>
                    <Card.Img variant="top" src={type.img} height={200} className='card_img'/>
                    <Card.Body className='flex-column'>
                      <Card.Title className='text-center'>{type.title}</Card.Title>
                      <Card.Text>
                        Thời gian làm bài: 15 phút
                        <br></br>
                        Số câu hỏi: 20 câu
                      </Card.Text>
                      {isAuthenticated ? 
                        <Button className='mx-auto mt-2 d-flex' variant='success'>
                          <NavLink to={`/exams/${type.code}`} as={Link} style={{color: 'white'}}>Thi ngay</NavLink>
                        </Button> 
                        :
                        <Button className='mx-auto mt-2 d-flex' variant='primary'>
                          <NavLink to={`/exams/try/${type.code}`} as={Link} style={{color: 'white'}}>Thi thử</NavLink>
                        </Button>
                      }
                    </Card.Body>
                  </Card>
                </Col>
              ))
            }
          )}
          <ScrollButton/>
        </Row>
      )
    }

  return (
    <>
      {body}
    </>
  )
}

export default ExamContent