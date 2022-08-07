import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { Row, Col, Table, Spinner, Button } from "react-bootstrap"
import { AdminContext } from "../../contexts/AdminContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserSlash } from '@fortawesome/free-solid-svg-icons'
import ModalDeleteUser from "../modals/ModalDeleteUser"
import moment from "moment"
const Users = () => {
  const id = useRef()
  const {userState: {users, usersLoading}, getUsers} = useContext(AdminContext)
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  
  const handleCloseDeleteUser = useCallback(() => setShowDeleteUser(false), [])
  
  useEffect(() => {getUsers()}, [])
 
  const handleShowDeleteUser = (idUser) => {
    id.current = idUser
    setShowDeleteUser(true)
  }

  if(usersLoading)
    return (
      <div className="d-flex justify-content-center mt-2">
          <Spinner animation='border' variant='info' />
      </div>
    )
  
  let index = 1
  return (
      <Row>
        <Col>
        {showDeleteUser && <ModalDeleteUser
          id={id.current}
          showDeleteUser={showDeleteUser}
          handleCloseDeleteUser={handleCloseDeleteUser}
        />}
        <Table striped hover responsive="lg">
                <thead>
                  <tr>
                    <th></th>
                    <th>STT</th>
                    <th>Tài khoản</th>
                    <th>Tên người dùng</th>
                    <th>Ngày tạo tài khoản</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => {
                    if(!user.admin) 
                    return(
                      <tr key={user._id}>
                            <td></td>
                            <td>{index++}</td>
                            <td>{user.username}</td>
                            <td>{user.fullname}</td>
                            <td>{moment.utc(user.createdAt).format('L')}</td>
                            <td>
                              <Button variant='danger' onClick={() => handleShowDeleteUser(user._id)}>
                                <FontAwesomeIcon icon={faUserSlash} />
                              </Button>
                            </td>
                          </tr>
                      )})}
                </tbody>
            </Table>
        </Col>
      </Row>
  )
}

export default Users