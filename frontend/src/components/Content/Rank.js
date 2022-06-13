import React, { useContext, useEffect, useState } from 'react'
import {Col, Form, Row, Spinner, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'
import { ExamContext } from '../../contexts/ExamContext'
import { useNavigate } from 'react-router-dom'

const Rank = () => {
  const navigative = useNavigate()
  const [value, setValue] = useState('su-12')
  const {
    examState: {topics, topicsLoading},
    resultState: {maxResults, maxResultsLoading},
    getTopic,
    getRanks
  } = useContext(ExamContext)

  useEffect(() => {getTopic()},[])
  useEffect(() => {
    if(value==='all')
      return console.log('point');
    getRanks(value)
  }, [value])

  const convertTime = (time) => {
    const minutes = Math.floor(time/60)
    const second = time - minutes*60
    return minutes + ' phút ' + second + ' giây'
  }

  console.log(maxResults);
  const handleChange = (e) => {
    setValue(e.target.value)
  }

  if(maxResultsLoading || topicsLoading)
      return <div className="d-flex justify-content-center mt-2">
          <Spinner animation='border' variant='info' />
      </div>

  let i = 1
  return (
    <>
    <Row>
      <Col sm={10}/>
      <Col sm={2}>
        <Form.Select aria-label="Default select example" onChange={e => handleChange(e)} className="mb-3">
          <option value='all'>--Đề thi--</option>
          {topics.map(topic => (
            <option value={topic} key={topic}>{topic}</option>
          ))}
        </Form.Select>
      </Col>
    </Row>
      <Table striped hover>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>Hạng</th>
            <th>Tài khoản</th>
            <th>Họ tên</th>
            <th>Điểm số</th>
            <th>Thời gian làm bài</th>
          </tr>
        </thead>
        <tbody>
          {maxResults.map(maxResult => (
            <tr key={maxResult._id}>
              <td></td>
              <td></td>
              <td>
                {i===1 ? <FontAwesomeIcon icon={faTrophy}/>: null}
                {i++}
              </td>
              <td>{maxResult.infoUser[0].username}</td>
              <td>{maxResult.infoUser[0].fullname}</td>
              <td>{maxResult.maxResult}</td>
              <td>{convertTime(maxResult.minTimeWork)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default Rank