import { MathJax } from "better-react-mathjax"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, faClockRotateLeft } from "@fortawesome/free-solid-svg-icons"
import { useContext, useEffect, useRef, useState } from "react"
import { Badge, Button, Card, Col, Form, Modal, Row, Spinner, Table } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import { ExamContext } from "../../../contexts/ExamContext"
import SingleQuiz from "../../single/SingleQuiz/SingleQuiz"
import TimeOut from "../TimeOut/TimeOut"


const TrialExam = () => {
    let {slug} = useParams()
    const [show, setShow] = useState(false);
    const {examState: {trialExams, trialExamsLoading}, examDispatch, getTrialExams} = useContext(ExamContext)
    const time = useRef([])
    const totalAnswerTrue = useRef([])
    const total = useRef(0)
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        getTrialExams(slug)
        
        return () => examDispatch({type: 'TRIALEXAMS_LOADED_FAIL'})
    }, [])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e && e.preventDefault()

        console.log(e);
        totalAnswerTrue.current.forEach((e) => {
            total.current += e.isAnswerTrue
        })

        setShowToast(true)
    }

    const handleTime = () => {
        const s = 600 - time.current[0]
        const minutes = Math.floor(s/60)
        const second = s - minutes*60
        return minutes+' phút '+second+' giây'
    }

    if(trialExamsLoading)
        return (
            <div className='d-flex justify-content-center mt-2'>
                <Spinner animation='border' variant='info' />
            </div>
        )

    if(showToast)
        return (
            <Row>
                <Col>
                <div className="btn-trial">
                        <Link to='/home'>
                            <button className='btn-nav text-success'>
                                <FontAwesomeIcon icon={faCaretLeft} />
                                {" Quay về trang chủ"}
                            </button>
                        </Link>

                    </div>
                    <Table striped hover>
                        <thead>
                            <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
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
                            <td></td>
                            <td>{`${total.current}/${trialExams.length}`}</td>
                            <td>{handleTime()}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <div className="text-center fst-italic" style={{fontWeight: 500}}>{'Hãy '} 
                        <Link to='/login'>đăng nhập</Link>
                        {' và thi thật để thi được nhiều dạng đề hơn !'}
                    </div>
                    <div className='mt-2 col-lg-2 mx-auto'>
                        <Button variant="info" style={{marginRight: 5}} onClick={() => window.location.reload(false)}>Thi lại</Button>
                        <Button variant="success" style={{marginLeft: 5}} to='/login' as={Link}>Thi thật</Button>
                    </div>
                </Col>
            </Row>
        )

    return (
    <>
        <Modal show={show} onHide={handleClose} style={{verticalAlign: 'center'}}>
            <Modal.Header closeButton>
            <Modal.Title>Thông báo</Modal.Title>
            </Modal.Header>
            <Modal.Body>Hãy kiểm tra kỹ lại các phần đã làm. Nếu bạn đã chắc chắn đã làm xong, hãy bấm "Nộp bài"
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Hủy
            </Button>
            <Button id="button-submit" variant="success" onClick={handleSubmit}>
                Nộp bài
            </Button>
            </Modal.Footer>
        </Modal>
    <Row className="mx-auto">
        <Col sm={3}>
        <Card className="test__card position-fixed">
                <Card.Header className="text-center">{`Mã đề: ${slug}`}</Card.Header>
                <Card.Body className="text-center">
                    <h4>Thời gian làm bài:</h4>
                    <TimeOut submit={handleSubmit} timeOut={time.current} countdown={600}/>
                    <Card.Title>Số câu làm</Card.Title>
                    <div>
                        {trialExams.map((trialExam, index) => (
                            <a href={`#${trialExam._id}`} key={trialExam._id}>
                                <Badge id={`Badge-${trialExam._id}`} pill bg="primary" className="test__badge">
                                    {index+1}
                                </Badge>{' '} 
                            </a>
                        ))}
                    </div>
                </Card.Body>
            </Card>
        </Col>
        <Col sm={9}>
            <Form className="me-auto" onSubmit={handleSubmit}>
                <MathJax>
                    {trialExams.map((trialExam, index) => (
                        <Form.Group key={trialExam._id}>
                            <SingleQuiz exam={trialExam} total={totalAnswerTrue.current} index={index+1}/>
                        </Form.Group>
                    ))}
                </MathJax>
                <div className="test__wrap__button">
                    <Button 
                        variant='success'
                        className="col-md-5 mx-auto mt-4"
                        onClick={handleShow}
                    >
                        Nộp bài
                    </Button>
                </div>

            </Form>
        </Col>
    </Row>
    </>
  )
}

export default TrialExam