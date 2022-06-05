import { memo } from "react"
import { Col, Form, Row } from "react-bootstrap"

const SingleQuestion = ({exam: {_id, question, answer_a, answer_b, answer_c, answer_d, answer_true, img}, total, index}) => {
    const handleRadio = (e) => {
        const id = e.target.id.split('-')[2]
        const badgeSelected = document.getElementById(`Badge-${id}`)
        badgeSelected.classList.remove('bg-primary')
        badgeSelected.classList.add('bg-success')
        if(e.target.id.split('-')[1].toUpperCase() === answer_true){
            total[index-1] = 1
        }else {
            total[index-1] = 0
        }
        console.log(total);
    }
    
    return (
        <>
            <div id={_id} className="mb-1 title__question">
                {`Câu ${index}: ${question}`}
                {img && <img src={img} alt="Ảnh câu hỏi"/>}
            </div>
            <Row>
                <Col>
                    <Form.Check
                        label={answer_a}
                        name={`group${_id}`}
                        type='radio'
                        id={`answer-a-${_id}`}
                        onChange={handleRadio}
                    />
                </Col>
                <Col>
                    <Form.Check
                        label={answer_b}
                        name={`group${_id}`}
                        type='radio'
                        id={`answer-b-${_id}`}
                        onChange={handleRadio}
                    />
                </Col>
            </Row>
            <Row className="mb-4">
                <Col>
                    <Form.Check
                        label={answer_c}
                        name={`group${_id}`}
                        type='radio'
                        id={`answer-c-${_id}`}
                        onChange={handleRadio}
                    />
                </Col>
                <Col>
                    <Form.Check
                        label={answer_d}
                        name={`group${_id}`}
                        type='radio'
                        id={`answer-d-${_id}`}
                        onChange={handleRadio}
                    />
                </Col>
            </Row>  
        </>
    )
}

export default memo(SingleQuestion)