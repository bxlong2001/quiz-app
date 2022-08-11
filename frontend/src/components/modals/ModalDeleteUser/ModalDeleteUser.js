import { useContext } from 'react';
import { Button, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify';
import { AdminContext } from '../../../contexts/AdminContext';

const ModalDeleteUser = ({id, showDeleteUser, handleCloseDeleteUser}) => {
    const {deleteUser} = useContext(AdminContext)
    const handleDelete = async (e) => {
        e.preventDefault()
        handleCloseDeleteUser()

        try {
          const dlt = await deleteUser(id)
          if(dlt.success){
            handleCloseDeleteUser()
            return toast.success(dlt.message)
          }
          toast.error(dlt.message)

        } catch (error) {
            console.log(error);
        }
    }
    console.log('re-render');
  return (
    <Modal show={showDeleteUser} onHide={handleCloseDeleteUser} className="align-items-center">
        <Modal.Header closeButton>
          <Modal.Title>Cảnh báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>Thông tin về người dùng sẽ bị xóa vĩnh viễn và không thể khôi phục lại. Bạn chắc chắn chứ?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={(e) => handleDelete(e)}>
            Xóa
          </Button>
          <Button variant="primary" onClick={handleCloseDeleteUser}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default ModalDeleteUser