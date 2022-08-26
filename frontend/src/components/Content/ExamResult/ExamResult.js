import { MathJax } from 'better-react-mathjax'
import React, { memo, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClockRotateLeft, faCaretLeft, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import ScrollButton from '../../layout/ScrollButton/ScrollButton'
import { apiUrl } from '../../../contexts/constaints'

const ExamResult = ({frequency, time, total, exams, examTime, totalAnswerTrue}) => {
    const [showAnswerTrue, setShowAnswerTrue] = useState(false);
    
    const handleTime = () => {
        const s = examTime - time[0]
        const minutes = Math.floor(s/60)
        const second = s - minutes*60
        return minutes+' phút '+second+' giây'
    }

    return (
        <Row>
            <div className='btn-result'>
                <Link to='/exams'>
                    <button className='btn-nav text-success'>
                        <FontAwesomeIcon icon={faCaretLeft} />
                        {" Quay trở lại"}
                    </button>
                </Link>

                <Link to='/me/history'>
                    <button className='btn-nav text-success'>
                        <FontAwesomeIcon icon={faClockRotateLeft} />
                        {" Lịch sử thi"}
                    </button>
                </Link>

            </div>
            {!showAnswerTrue ?
            <Col sm={12}>
                <Table striped hover>
                    <thead>
                        <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>Số lần thi</th>
                        <th>Số câu đúng</th>
                        <th>Thời gian làm bài</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="table-success">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{frequency}</td>
                        <td>{`${total}/${exams.length}`}</td>
                        <td>{handleTime()}</td>
                        </tr>
                    </tbody>
                </Table>
                
            </Col>
                :
            <Col className='mt-4' sm={12}>
                <MathJax>
                    {exams.map((exam, index) => (
                        <div key={index}>
                            <div className='result-question'>
                                <div>
                                    <span>Câu {index+1}: </span>
                                    <span>{exam.question}</span>
                                </div>
                                {(totalAnswerTrue[index] && totalAnswerTrue[index].isAnswerTrue===1) ?
                                    <FontAwesomeIcon icon={faCheck} fontSize={20} color='#3bb44b' style={{marginLeft: 10}}/>
                                        :
                                    <FontAwesomeIcon icon={faXmark} fontSize={20} color='red' style={{marginLeft: 10}}/>
                                }
                            </div>
                            
                            {exam.img &&
                                <>
                                    <br></br>
                                    <img src={exam.img.split('\\')[0]==='uploads' ? apiUrl + exam.img : exam.img} width={200} alt='Ảnh minh họa'/>
                                </>}
                            <Row>
                                <Col>
                                    <span className={totalAnswerTrue[index] && totalAnswerTrue[index].select==='a' && (totalAnswerTrue[index].isAnswerTrue ?'answer-select--true':'answer-select--false')}>{exam.answer_a}</span>
                                </Col>
                                <Col>
                                    <span className={totalAnswerTrue[index] && totalAnswerTrue[index].select==='b' && (totalAnswerTrue[index].isAnswerTrue ?'answer-select--true':'answer-select--false')}>{exam.answer_b}</span>
                                </Col>
                            </Row>
                            <Row className="mb-4">
                                <Col>
                                    <span className={totalAnswerTrue[index] && totalAnswerTrue[index].select==='c' && (totalAnswerTrue[index].isAnswerTrue ?'answer-select--true':'answer-select--false')}>{exam.answer_c}</span>
                                </Col>
                                <Col>
                                    <span className={totalAnswerTrue[index] && totalAnswerTrue[index].select==='d' && (totalAnswerTrue[index].isAnswerTrue ?'answer-select--true':'answer-select--false')}>{exam.answer_d}</span>
                                </Col>
                            </Row>
                        </div>
                    ))}
                </MathJax>
            </Col>}
            <div className='mb-4 col-lg-2 mx-auto'>
                <Button variant="info" onClick={() => window.location.reload(false)}>Thi lại</Button>
                <Button variant="success" onClick={() => setShowAnswerTrue(prev => !prev)} style={{marginLeft: 10}}>{showAnswerTrue?'Ẩn kết quả':'Xem kết quả'}</Button>
            </div>
            <ScrollButton/>
        </Row>
    )
}

export default memo(ExamResult)