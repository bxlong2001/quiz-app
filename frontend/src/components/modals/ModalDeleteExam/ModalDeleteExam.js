import { useContext } from 'react';
import { Button, Modal } from 'react-bootstrap'
import { AdminContext } from '../../../contexts/AdminContext';
import { toast } from 'react-toastify';


const ModalDeleteExam = ({id, showDeleteExam, handleCloseDeleteExam}) => {
    const {deleteExam} = useContext(AdminContext)
    const handleDelete = async (e) => {
        e.preventDefault()
        handleCloseDeleteExam()

        try {
            const dlt = await deleteExam(id)
            if(dlt.success){
              handleCloseDeleteExam()
              return toast.success(dlt.message)
          }
          toast.error(dlt.message)
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <Modal show={showDeleteExam} onHide={handleCloseDeleteExam} className="align-items-center">
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn chắc chắn muốn xóa?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={(e) => handleDelete(e)}>
            Xóa
          </Button>
          <Button variant="primary" onClick={handleCloseDeleteExam}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default ModalDeleteExam