import { MathJax } from "better-react-mathjax"
import { useContext, useEffect, useRef, useState } from "react"
import { Badge, Button, Card, Col, Form, Modal, Row, Spinner } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { ExamContext } from "../../contexts/ExamContext"
import SingleQuiz from "../single/SingleQuiz"
import ExamResult from "./ExamResult"
import TimeOut from "./TimeOut"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ExamForm = () => {
    //get slug
    let {slug} = useParams()

    //Context
    const {saveResult} = useContext(ExamContext)

    const [show, setShow] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const totalAnswerTrue = useRef([])
    const time = useRef([])
    const total = useRef(0)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const {examState: {exams, examsLoading}, getExams} = useContext(ExamContext)
    useEffect(() => {getExams(slug)}, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        totalAnswerTrue.current.forEach((e) => {
            total.current += e.isAnswerTrue
        })
        

        const resultForm = {
            examName: slug,
            result: total.current,
            timeWork: 900 - time.current[0]
        }

        try {
            const resultData = await saveResult(resultForm)
            if(resultData.success) {
                setShowToast(true)
                return toast.success(resultData.message)
            }
            return toast.error(resultData.message)
        } catch (error) {
            console.log(error);
        }
        
    }
    
    

    let body = null

    if(examsLoading)
        body = (
            <div className='d-flex justify-content-center mt-2'>
                <Spinner animation='border' variant='info' />
            </div>
        )
    else if(showToast)
    body = (
        <>
            <ToastContainer theme="colored"/>
            <ExamResult time={time.current} total={total.current} exams={[...exams]} totalAnswerTrue={totalAnswerTrue.current} />
        </>
        )
    else if(exams.length){
        let indexNav = 1
        let indexQuiz = 1
        body = (
            <Row className="mx-auto">
                <Col sm={3}>
                    <Card className="test__card position-fixed">
                        <Card.Header className="text-center">{`Mã đề: ${slug}`}</Card.Header>
                        <Card.Body className="text-center">
                            <h4>Thời gian làm bài:</h4>
                            <TimeOut submit={handleSubmit} timeOut={time.current} countdown={900}/>
                            <Card.Title>Số câu làm</Card.Title>
                            <div>
                                {exams.map(exam => (
                                    <a href={`#${exam._id}`} key={exam._id}>
                                        <Badge id={`Badge-${exam._id}`} pill bg="primary" className="test__badge">
                                            {indexNav++}
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
                            {exams.map(exam => (
                                <Form.Group key={exam.id}>
                                    <SingleQuiz exam={exam} total={totalAnswerTrue.current} index={indexQuiz++}/>
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

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>Thông báo</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Hãy kiểm tra kỹ lại các phần đã làm. Nếu bạn đã chắc chắn đã làm xong, hãy bấm "Nộp bài"
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Kiểm tra lại
                            </Button>
                            <Button id="button-submit" variant="success" onClick={handleSubmit}>
                                Nộp bài
                            </Button>
                            </Modal.Footer>
                        </Modal>
                    </Form>
                </Col>
            </Row>
        )
    }
    return (
    <>
        {body}
    </>
    )
}

export default ExamForm