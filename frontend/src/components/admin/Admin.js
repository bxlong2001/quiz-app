import { faBook, faBookOpenReader, faListCheck, faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useEffect } from "react"
import { Col, Row, Spinner, Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import { AdminContext } from "../../contexts/AdminContext"
import CountUp from 'react-countup'

const Admin = () => {
  const {statisticState: {statistics, statisticsLoading}, getStatistic} = useContext(AdminContext)
  const {countExam, countQuiz, countSubject, countUser, sortUser, sortResult} = statistics

  useEffect(() => {getStatistic()}, [])

  const convertTime = (time) => {
    const minutes = Math.floor(time/60)
    const second = time - minutes*60
    return minutes + ' phút ' + second + ' giây'
  }
  
  if(statisticsLoading)
    return(
      <div className="d-flex justify-content-center mt-2">
          <Spinner animation='border' variant='info' />
      </div>
    )
    
  else {
    let total = 0
    let i = 1
    let t = 1
    if(countExam)
        countExam.map(exam => total+=exam.count)
    
    return (
      <>
        <Row>
          <Col sm={6} md={6} xl={3} className='mb-2'>
            <div className="ui-admin">
              <div className="ui-admin-title">
                <span className="ui-admin-number">
                  <CountUp duration={0.75} end={countUser} />
                </span>
                <FontAwesomeIcon icon={faUsers} fontSize={34}/>
              </div>
              <span className="ui-admin-text">Người dùng</span>
            </div>
          </Col>
          <Col sm={6} md={6} xl={3} className='mb-2'>
            <div className="ui-admin">
              <div className="ui-admin-title">
                <span className="ui-admin-number">
                  <CountUp duration={0.75} end={countSubject} />
                </span>
                <FontAwesomeIcon icon={faBook} fontSize={34}/>
              </div>
              <span className="ui-admin-text">Môn thi</span>
            </div>
          </Col>
          <Col sm={6} md={6} xl={3}  className='mb-2'>
            <div className="ui-admin">
              <div className="ui-admin-title">
                <span className="ui-admin-number">
                  <CountUp duration={0.75} end={total} />
                </span>
                <FontAwesomeIcon icon={faBookOpenReader} fontSize={34}/>
              </div>
              <span className="ui-admin-text">Đề thi</span>
            </div>
          </Col>
          <Col sm={6} md={6} xl={3}  className='mb-2'>
            <div className="ui-admin">
              <div className="ui-admin-title">
                <span className="ui-admin-number">
                  <CountUp duration={0.75} end={countQuiz} />
                </span>
                <FontAwesomeIcon icon={faListCheck} fontSize={34}/>
              </div>
              <span className="ui-admin-text">Câu hỏi</span>
            </div>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col sm={12} md={12} xl={8}>
            <div className="mb-2 home-link">
              <span style={{fontSize: 20}}>Lịch sử thi gần đây</span>
            <Link to='exams-management'>
              <button className="btn-view">Xem chi tiết đề thi</button>
            </Link>
            </div>
              
            <Table variant="success">
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID người dùng</th>
                  <th>Mã đề thi</th>
                  <th>Kết quả</th>
                  <th>Thời gian</th>
                  <th>Ngày thi</th>
                </tr>
              </thead>
              <tbody>
                {sortResult.map(result => (
                  <tr key={result._id}>
                    <td>{i++}</td>
                    <td>{result.infoUser[0].username}</td>
                    <td>{result.examName}</td>
                    <td>{result.result}</td>
                    <td>{convertTime(result.timeWork)}</td>
                    <td>{result.updatedAt.split('T')[0]}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col sm={12} md={12} xl={4}>
            <div>
                <div className="mb-2 home-link">
                  <span style={{fontSize: 20}}>Người dùng gần đây</span>
                  <Link to='users-management'>
                    <button className="btn-view" style={{marginRight: 5}}>Xem chi tiết</button>
                  </Link>
                </div>
      
                <Table variant="success">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Tài khoản</th>
                      <th>Ngày tạo tài khoản</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortUser.map((user) => (
                      <tr key={user._id}>
                        <td>{t++}</td>
                        <td>{user.username}</td>
                        <td>{user.createdAt.split('T')[0]}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
            </div>
            
          </Col>
        </Row>
      </>
    )
  }
}

export default Admin