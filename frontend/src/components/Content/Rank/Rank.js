import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Col, Form, Row, Spinner, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy, faStar } from '@fortawesome/free-solid-svg-icons'
import { ExamContext } from '../../../contexts/ExamContext'

const Rank = () => {
  const [value, setValue] = useState('all')
  const {
    examState: { topics, topicsLoading },
    resultState: { maxResults, maxResultsLoading },
    resultDispatch,
    getTopic,
    getRanks
  } = useContext(ExamContext)
  console.log(maxResults);
  useEffect(() => { getTopic() }, [])
  useLayoutEffect(() => {
    getRanks(value)
  }, [value])

  const convertTime = (time) => {
    const minutes = Math.floor(time / 60)
    const second = time - minutes * 60
    return minutes + ' phút ' + second + ' giây'
  }

  const handleChange = (e) => {
    resultDispatch({ type: 'MAXRESULTS_LOADED_FAIL' })
    setValue(e.target.value)
  }

  if (maxResultsLoading || topicsLoading)
    return <div className="d-flex justify-content-center mt-2">
      <Spinner animation='border' variant='info' />
    </div>

  return (
    <>
      <Row>
        <Col sm={10} />
        <Col sm={2}>
          <Form.Select aria-label="Default select example" onChange={e => handleChange(e)} className="mb-3">
            <option value='all' key={'all'}>--Đề thi--</option>
            {topics.map(topic => (
              <option value={topic} key={topic}>{topic}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>
      {value !== 'all' ?
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
            {maxResults.map((maxResult, index) => (
              <tr key={maxResult._id}>
                <td></td>
                <td></td>
                <td>
                  {(index + 1) === 1 ? <FontAwesomeIcon icon={faTrophy} /> : (index + 1)}
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
        <>
          <Row>
            <Col>
              <div className='onTop cover-img-left'>
                <div className='onTop__avt rank2'>
                  
                  <img className='onTop__img' src={maxResults[1].avt} alt='avatar' />
                  <img
                      className="onTop__img__medal"
                      src="https://cdn-icons-png.flaticon.com/512/2583/2583319.png"
                      alt="silver-medal"
                    ></img>

                </div>
                <div className='onTop__content'>
                  <div className='onTop__content__fullname'>{maxResults[1].fullname}</div>
                  <div className='onTop__content__username'>{maxResults[1].username}</div>
                
                  <div className='single__rank__box'>
                    <div className='onTop__content__point'>{'Điểm tích lũy: ' + maxResults[1].point}
                      <FontAwesomeIcon className="myrank__star" icon={faStar} />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col>
              <div className='onTop cover-img-center'>
                <div className='onTop__avt rank1'>
                  
                  <img className='onTop__img' src={maxResults[0].avt} alt='avatar' />
                  <img
                      className="onTop__img__medal"
                      src="https://cdn-icons-png.flaticon.com/512/2583/2583344.png"
                      alt="gold-medal"
                    ></img>

                </div>
                <div className='onTop__content'>
                  <div className='onTop__content__fullname'>{maxResults[0].fullname}</div>
                  <div className='onTop__content__username'>{maxResults[0].username}</div>
                  
                  <div className='single__rank__box'>
                    <div className='onTop__content__point'>{'Điểm tích lũy: ' + maxResults[0].point}
                      <FontAwesomeIcon className="myrank__star" icon={faStar} />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col>
              <div className='onTop cover-img-right'>
                <div className='onTop__avt rank3'>
                  
                  <img className='onTop__img' src={maxResults[2].avt} alt='avatar' />
                  <img
                      className="onTop__img__medal"
                      src="https://cdn-icons-png.flaticon.com/512/2583/2583434.png"
                      alt="bronze-medal"
                    ></img>

                </div>
                <div className='onTop__content'>
                  <div className='onTop__content__fullname'>{maxResults[2].fullname}</div>
                  <div className='onTop__content__username'>{maxResults[2].username}</div>
                
                  <div className='single__rank__box'>
                    <div className='onTop__content__point'>{'Điểm tích lũy: ' + maxResults[2].point}
                      <FontAwesomeIcon className="myrank__star" icon={faStar} />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>
                {maxResults.map((maxResult, index) => (
                  index >= 3 &&
                  <div className='single__rank'>
                    <div className='single__rank__index'>{(index + 1) + 'th'}</div>

                    <div className='single__rank__content'>
                      <img src={maxResult.avt} alt='avatar' />

                      <div>
                        <div className='sr__content__fullname'>{maxResult.fullname}</div>
                        <div className='sr__content__username'>{maxResult.username}</div>
                      </div>
                    </div>

                    <div className='single__rank__box'>
                      <div className='single__rank__point'>{maxResult.point + ' điểm tích lũy'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </>
      }
    </>
  )
}

export default Rank