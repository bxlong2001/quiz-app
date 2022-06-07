import { memo, useContext, useState } from 'react'
import { AdminContext } from '../../contexts/AdminContext'
import { Button, Form, Modal } from 'react-bootstrap'

const ModalUpdate = ({quiz, showUpdate, handleCloseUpdate}) => {
    const {updateExam} = useContext(AdminContext)
    const [updateForm, setUpdateForm] = useState({...quiz})

    console.log(updateForm);
    const submitUpdateExam = async (e) => {
        e.preventDefault()
        handleCloseUpdate()
        
        try {
            await updateExam(updateForm)
            window.location.reload(false)
        } catch (error) {
          console.log(error);
        }    
    }
    
    const handleSubmitUpdate = (e) => {
        setUpdateForm({
            ...updateForm,
            [e.target.name]: e.target.value
        })
    }
    return (
        <Modal show={showUpdate} onHide={handleCloseUpdate}>
            <Modal.Header closeButton>
                <Modal.Title>Sửa câu hỏi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={submitUpdateExam} id='form-update'>
                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                    <Form.Label>Câu hỏi</Form.Label>
                    <Form.Control
                    as="textarea"
                    name='question'
                    value={updateForm.question ?? ''}
                    onChange={handleSubmitUpdate}
                    />
                </Form.Group>
                <Form.Group
                    className="mb-2"
                    controlId="exampleForm.ControlInput2"
                >
                    <Form.Label>Đáp án A</Form.Label>
                    <Form.Control 
                    type="text"
                    name='answer_a'
                    value={updateForm.answer_a ?? 'A. '}
                    onChange={handleSubmitUpdate}
                    />
                </Form.Group>
                <Form.Group
                    className="mb-2"
                    controlId="exampleForm.ControlInput3"
                >
                    <Form.Label>Đáp án B</Form.Label>
                    <Form.Control 
                    type="text"
                    name='answer_b'
                    value={updateForm.answer_b ?? 'B. '}
                    onChange={handleSubmitUpdate}
                    />
                </Form.Group>
                <Form.Group
                    className="mb-2"
                    controlId="exampleForm.ControlInput4"
                >
                    <Form.Label>Đáp án C</Form.Label>
                    <Form.Control 
                    type="text"
                    name='answer_c'
                    value={updateForm.answer_c ?? 'C. '}
                    onChange={handleSubmitUpdate}
                    />
                </Form.Group>
                <Form.Group
                    className="mb-2"
                    controlId="exampleForm.ControlInput5"
                >
                    <Form.Label>Đáp án D</Form.Label>
                    <Form.Control 
                    type="text"
                    name='answer_d'
                    value={updateForm.answer_d ?? 'D. '}
                    onChange={handleSubmitUpdate}
                    />
                </Form.Group>
                <Form.Group
                    className="mb-2"
                    controlId="exampleForm.ControlInput6"
                >
                    <Form.Label>Đáp án đúng</Form.Label>
                    <Form.Control 
                    as='select'
                    name='answer_true'
                    value={updateForm.answer_true  ?? '--Chọn--'}
                    onChange={handleSubmitUpdate}
                    >
                    <option value='A'>A</option>
                    <option value='B'>B</option>
                    <option value='C'>C</option>
                    <option value='D'>D</option>
                    </Form.Control>
                </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseUpdate}>
                Hủy
                </Button>
                <Button type='submit' variant="success" form='form-update'>
                Thay đổi
                </Button>
            </Modal.Footer>
        </Modal>
  )
}

export default memo(ModalUpdate)