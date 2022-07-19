import moment from 'moment'
import React, { useContext, useEffect } from 'react'
import { Col, Row, Spinner, Table } from 'react-bootstrap'
import { ExamContext } from '../../contexts/ExamContext'

const History = () => {
  const {resultState: {results, resultsLoading}, getResults} = useContext(ExamContext)
  
  useEffect(() => {getResults()}, [])

  const handleTime = (time) => {
    const minutes = Math.floor(time/60)
    const second = time - minutes*60
    return minutes+' phút '+second+' giây'
  }

  let body = null
  if(resultsLoading)
    body = (
      <div className='d-flex justify-content-center mt-2'>
          <Spinner animation='border' variant='info' />
      </div>
  )
  else
  body = (
    <Row>
        <Col>
            <Table striped hover>
                  <thead>
                      <tr>
                      <th></th>
                      <th></th>
                      <th>Môn thi</th>
                      <th>Số lần thi</th>
                      <th>Điểm</th>
                      <th>Thời gian làm bài</th>
                      <th>Ngày thi</th>
                      </tr>
                  </thead>
              {results.length === 0 ?
                <tbody className='text-center'>
                  <tr>
                    <td colSpan={7} className='pt-4' style={{fontSize: 20}}>
                      Bạn chưa thi môn nào
                    </td>
                  </tr>
                </tbody> :
                results.map(result => (
                  <tbody key={result._id}>
                      <tr>
                        <td></td>
                        <td></td>
                        <td>{result.examName}</td>
                        <td>{result.frequency}</td>
                        <td>{result.result}</td>
                        <td>{handleTime(result.timeWork)}</td>
                        <td>{moment.utc(result.createdAt).format('L')}</td>
                      </tr>
                  </tbody>
              ))}
            </Table>
        </Col>
    </Row>
    )

  return (
    <>
      {body}
    </>
    )
}

export default History