import { useContext, useEffect, useRef, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { AdminContext } from '../../contexts/AdminContext'
import { MathJax } from 'better-react-mathjax'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateExam = () => {
  const fileRef = useRef()
  const {slug} = useParams()
  const type = slug.split('-')[0]
  const {createExam} = useContext(AdminContext)
  const [img, setImg] = useState({file: '', prev: ''})
  const [createForm, setCreateForm] = useState({
    name: slug,
    type,
    question: '',
    part: null,
    answer_a: '',
    answer_b: '',
    answer_c: '',
    answer_d: '',
    answer_true: ''
  })

  const {question, part, answer_a, answer_b, answer_c, answer_d, answer_true} = createForm

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(img.prev)
    }
  }, [img.prev])

  const handleChange = (e) => {
    setCreateForm({
      ...createForm,
      [e.target.name]: e.target.value
  })
  }

  const handleSeclectImg = (e) => {
    if(e.target.files.length!==0)
      setImg({file: e.target.files[0], prev: URL.createObjectURL(e.target.files[0])})
  }

  const submitForm = async (e) => {
    e.preventDefault()

    try {
      const submit = await createExam({
        ...createForm,
        part: Number(part),
        answer_a: `A. ${answer_a}`,
        answer_b: `B. ${answer_b}`,
        answer_c: `C. ${answer_c}`,
        answer_d: `D. ${answer_d}`
      }, img.file)
      if(submit.success){
        URL.revokeObjectURL(img.prev)
        setCreateForm({
          name: slug,
          type,
          question: '',
          part: null,
          answer_a: '',
          answer_b: '',
          answer_c: '',
          answer_d: '',
          answer_true: ''
        })
        setImg({file: '', prev: ''})
        fileRef.current.value = null
        return toast.success(submit.message)
      }
      return toast.error(submit.message)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ToastContainer theme='colored' />
      <Row>
        <Col>
          <Form onSubmit={submitForm} id='form-update'>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                <Form.Label>Câu hỏi</Form.Label>
                <Form.Control
                  as="textarea"
                  name='question'
                  value={question || ''}
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
                  accept="image/*"
                  ref={fileRef}
                  onChange={handleSeclectImg}
                />
            </Form.Group>
            <Form.Group
                className="mb-2"
                controlId="exampleForm.ControlInput7"
            >
                <Form.Label>Mức độ</Form.Label>
                <Form.Control 
                  as='select'
                  name='part'
                  value={part || ''}
                  onChange={handleChange}
                  required
                >
                <option>--Chọn mức độ--</option>
                <option value={1}>Cơ bản</option>
                <option value={2}>Ứng dụng</option>
                <option value={3}>Vận dụng cao</option>
                </Form.Control>
            </Form.Group>
            <Form.Group
                className="mb-2"
                controlId="exampleForm.ControlInput3"
            >
                <Form.Label>Đáp án A</Form.Label>
                <Form.Control 
                  type="text"
                  name='answer_a'
                  value={answer_a || ''}
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
                  value={answer_b || ''}
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
                  value={answer_c || ''}
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
                  value={answer_d || ''}
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
                  value={answer_true || ''}
                  onChange={handleChange}
                  required
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
          <h3>Xem trước</h3>
          <MathJax>
              <span>Câu hỏi: </span>
              <span>{question}</span>
              <br></br>
              {img.prev && <img src={img.prev} width={200} alt="Hình ảnh minh họa"></img>}
            <Row>
                <Col>
                    <span>A. </span>
                    <span>{answer_a}</span>
                </Col>
                <Col>
                    <span>B. </span>
                    <span>{answer_b}</span>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col>
                    <span>C. </span>
                    <span>{answer_c}</span>
                </Col>
                <Col>
                    <span>D. </span>
                    <span>{answer_d}</span>
                </Col>
            </Row>
          </MathJax>
          </Col>
      </Row>
    </>
  )
}

export default CreateExam