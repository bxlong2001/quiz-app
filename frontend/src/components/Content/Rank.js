import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import {Col, Form, Row, Spinner, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'
import { ExamContext } from '../../contexts/ExamContext'
import { apiUrl } from '../../contexts/constaints'

const Rank = () => {
  const [value, setValue] = useState('all')
  const {
    examState: {topics, topicsLoading},
    resultState: {maxResults, maxResultsLoading},
    resultDispatch,
    getTopic,
    getRanks
  } = useContext(ExamContext)
  console.log(maxResults);
  useEffect(() => {getTopic()},[])
  useLayoutEffect(() => {
    getRanks(value)
  }, [value])

  const convertTime = (time) => {
    const minutes = Math.floor(time/60)
    const second = time - minutes*60
    return minutes + ' phút ' + second + ' giây'
  }

  const handleChange = (e) => {
    resultDispatch({type: 'MAXRESULTS_LOADED_FAIL'})
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
          <option value='all' key={'all'}>--Đề thi--</option>
          {topics.map(topic => (
            <option value={topic} key={topic}>{topic}</option>
          ))}
        </Form.Select>
      </Col>
    </Row>
    {value!=='all' ?
      <Table striped hover>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>Hạng</th>
            <th>Tài khoản</th>
            <th>Họ tên</th>
            <th>Điểm số</th>
            <th>Thời gian</th>
          </tr>
        </thead>
        <tbody>
          { maxResults.map(maxResult => (
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
            </tr>))
          }
        </tbody>
      </Table>
      :
      maxResults.length !== 0 && 
        <Row>
          <Col>
            <div className='myrank-wrap'>
              <div className='on-top'>
                <img className='myrank-avt rank2' src={apiUrl + maxResults[1].avt} alt='avatar'/>
                <div>Top 2</div>
                <div>{maxResults[1].username}</div>
              </div>
              <div className='on-top'>
                <img className='myrank-avt' src={apiUrl + maxResults[0].avt} alt='avatar'/>
                <div>Top 1</div>
                <div>{maxResults[0].username}</div>
              </div>
              <div className='on-top'>
                <img className='myrank-avt rank2' src={apiUrl + maxResults[2].avt} alt='avatar'/>
                <div>Top 3</div>
                <div>{maxResults[2].username}</div>
              </div>
            </div>
          </Col>
        </Row>
      }
    </>
  )
}

export default Rank