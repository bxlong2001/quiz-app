import { useContext } from 'react';
import { Button, Modal } from 'react-bootstrap'
import { AdminContext } from '../../contexts/AdminContext';

const ModalDeleteUser = ({id, showDeleteUser, handleCloseDeleteUser}) => {
    const {deleteUser} = useContext(AdminContext)
    const handleDelete = async (e) => {
        e.preventDefault()
        handleCloseDeleteUser()

        try {
            await deleteUser(id)
        } catch (error) {
            console.log(error);
        }
    }
    console.log('re-render');
  return (
    <Modal show={showDeleteUser} onHide={handleCloseDeleteUser} className="align-items-center">
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn chắc chắn muốn xóa?</Modal.Body>
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