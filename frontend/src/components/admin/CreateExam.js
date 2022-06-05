import { useContext, useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { AdminContext } from '../../contexts/AdminContext'

const CreateExam = () => {
  const {slug} = useParams()
  const type = slug.split('-')[0]
  const {createExam} = useContext(AdminContext)
  const [createForm, setCreateForm] = useState({
    name: slug,
    type,
    question: '',
    img: '',
    answer_a: 'A. ',
    answer_b: 'B. ',
    answer_c: 'C. ',
    answer_d: 'D. ',
    answer_true: ''
  })

  const {question, img, answer_a, answer_b, answer_c, answer_d, answer_true} = createForm

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(img)
    }
  }, [img])

  const handleChange = (e) => {
    setCreateForm({
      ...createForm,
      [e.target.name]: e.target.value
  })
  }

  const handleSeclectImg = (e) => {
    const file = e.target.files[0]
    setCreateForm(prev => ({...prev, img: URL.createObjectURL(file)}))
  }

  const submitForm = async (e) => {
    e.preventDefault()

    try {
      createExam(createForm)
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <Row>
      <Col>
        <Form onSubmit={submitForm} id='form-update'>
          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Label>Câu hỏi</Form.Label>
              <Form.Control
                as="textarea"
                name='question'
                value={question}
                onChange={handleChange}
                placeholder='Nhập câu hỏi'
                required
              />
          </Form.Group>
          <Form.Group className="mb-2" controlId="exampleForm.ControlInput2">
              <Form.Label>Hình ảnh (nếu có)</Form.Label>
              <Form.Control
                type="file"
                name='img'
                accept="image/png, image/jpeg"
                onChange={handleSeclectImg}
              />
          </Form.Group>
          <Form.Group
              className="mb-2"
              controlId="exampleForm.ControlInput3"
          >
              <Form.Label>Đáp án A</Form.Label>
              <Form.Control 
                type="text"
                name='answer_a'
                defaultValue='A. '
                onChange={handleChange}
                placeholder='Nhập đáp án'
                required
              />
          </Form.Group>
          <Form.Group
              className="mb-2"
              controlId="exampleForm.ControlInput4"
          >
              <Form.Label>Đáp án B</Form.Label>
              <Form.Control 
                type="text"
                name='answer_b'
                value={answer_b}
                onChange={handleChange}
                placeholder='Nhập đáp án'
                required
              />
          </Form.Group>
          <Form.Group
              className="mb-2"
              controlId="exampleForm.ControlInput5"
          >
              <Form.Label>Đáp án C</Form.Label>
              <Form.Control 
                type="text"
                name='answer_c'
                value={answer_c}
                onChange={handleChange}
                placeholder='Nhập đáp án'
                required
              />
          </Form.Group>
          <Form.Group
              className="mb-2"
              controlId="exampleForm.ControlInput6"
          >
              <Form.Label>Đáp án D</Form.Label>
              <Form.Control 
                type="text"
                name='answer_d'
                value={answer_d}
                onChange={handleChange}
                placeholder='Nhập đáp án'
                required
              />
          </Form.Group>
          <Form.Group
              className="mb-2"
              controlId="exampleForm.ControlInput7"
          >
              <Form.Label>Đáp án đúng</Form.Label>
              <Form.Control 
                as='select'
                name='answer_true'
                value={answer_true}
                onChange={handleChange}
              >
              <option>--Chọn đáp án đúng--</option>
              <option value='A'>A</option>
              <option value='B'>B</option>
              <option value='C'>C</option>
              <option value='D'>D</option>
              </Form.Control>
          </Form.Group>

          <div className="test__wrap__button">
            <Button 
                type='submit'
                variant='success'
                className="col-md-2 mx-auto mt-2"
            >
                Tạo mới
            </Button>
          </div>
        </Form>
      </Col>
      <Col>
        <div>Xem trước</div>
        <div className="mb-1 title__question">
          {question && `Câu hỏi: ${question}`}
          <br></br>
          {img && <img src={img} width={200}></img>}
        </div>
        <Row>
            <Col>
                <span>{answer_a}</span>
            </Col>
            <Col>
                <span>{answer_b}</span>
            </Col>
        </Row>
        <Row className="mb-4">
            <Col>
                <span>{answer_c}</span>
            </Col>
            <Col>
                <span>{answer_d}</span>
            </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default CreateExam