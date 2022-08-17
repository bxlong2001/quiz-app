import React, { useContext, useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Row } from 'react-bootstrap'
import { AuthContext } from '../../../contexts/AuthContext'
import { UserContext } from '../../../contexts/UserContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { apiUrl } from '../../../contexts/constaints'


const Info = () => {
  const inputFocus = useRef()
  const [isDisabledEditName, setDisabledEditName] = useState(true)
  const [isDisabledEditPassword, setDisabledEditPassword] = useState(true)
  const {authState: {user}} = useContext(AuthContext)
  const [fullname, setFullname] = useState(user.fullname)
  const [changePasswordForm, setChangePasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  })

  const {oldPassword, newPassword, confirmNewPassword} = changePasswordForm

  const [img, setImg] = useState({file: '', prev: ''})
  const {updateInfo, updateImg, changePassword} = useContext(UserContext)

  useEffect(() => {
    inputFocus.current.focus()
  }, [isDisabledEditName])

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(img.prev)
    }
  }, [img.prev])

  const handleSeclectImg = (e) => {
    if(e.target.files.length!==0)
      setImg({file: e.target.files[0], prev: URL.createObjectURL(e.target.files[0])})
  }

  const handleChangeName = (e) => {
    setFullname(e.target.value)
  }

  const handleChangePassword = (e) => {
    setChangePasswordForm({
        ...changePasswordForm,
        [e.target.name]: e.target.value
    })  
  }

  const submitChangePassword = async (e) => {
    if(newPassword !== confirmNewPassword){
        alert('Mật khẩu không khớp')
    }

    try {
        const response = await changePassword({oldPassword, newPassword})
        if(!response.success) {
          return toast.error(response.message)
        }
        toast.success(response.message)
        setChangePasswordForm({oldPassword: '', newPassword: '', confirmNewPassword: ''})
        setDisabledEditPassword(true)
    } catch (error) {
        console.log(error);
    }
  }

  const submitUpdateFullname = async (e) => {

    try {
      const response = await updateInfo(fullname)
      if(response.success){
        toast.success(response.message)
        return setDisabledEditName(true)
      }
      toast.error(response.message)
    } catch (error) {
      console.log(error);
    }
  }

  const submitUpdateImg = async (e) => {
    e.preventDefault()
    
    try {
      const response = await updateImg(img.file, user.avt)
      if(response.success){
        URL.revokeObjectURL(img.prev)
        setImg({file: '', prev: ''})
        return toast.success(response.message)
      }
      toast.error(response.message)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ToastContainer theme='colored'/>
      <Row>
        <Col sm={2}/>
        <Col sm={8}>
          <span style={{fontSize: 30}}>Thông tin cá nhân</span>
          <div className='info'>
            <div className='info-content'>
              <span className='info-label'>Họ tên</span>
              <input
                type='text'
                name='fullName'
                className='info-input-name'
                ref={inputFocus}
                maxLength={50}
                placeholder='Thêm tên của bạn'
                value={fullname}
                onChange={e => handleChangeName(e)}
                disabled={isDisabledEditName}
              />
              <p className='info-description'>
                Tên của bạn sẽ xuất hiện trên trang cá nhân
              </p>
            </div>
            {isDisabledEditName?
              <button className='btn-view info-btn' onClick={() => setDisabledEditName(false)}>
                Sửa
              </button>
                :
              <>
                <button className='btn-view info-btn' onClick={e => submitUpdateFullname(e)} style={{marginRight: 5}}>
                  Lưu
                </button>
                <button className='btn-view info-btn' style={{color: 'red', borderColor: 'red'}} onClick={() => {setFullname(user.fullname); setDisabledEditName(true)}}>
                  Hủy
                </button>
              </>
            }
          </div>
          <div className='info'>
              <div className='info-content'>
                <span className='info-label'>Đổi mật khẩu</span>
              {isDisabledEditPassword ?
                <input
                  type='password'
                  className='info-input-name'
                  value="mypassword"
                  onChange={handleChangePassword}
                  disabled={true}
                />
                :
                <>
                  <input
                    type='password'
                    name='oldPassword'
                    className='info-input-name'
                    placeholder='Mật khẩu cũ'
                    value={oldPassword}
                    required
                    onChange={handleChangePassword}
                  />
                  <input
                    type='password'
                    name='newPassword'
                    className='info-input-name'
                    placeholder='Mật khẩu mới'
                    value={newPassword}
                    required
                    onChange={handleChangePassword}
                  />
                  <input
                    type='password'
                    name='confirmNewPassword'
                    className='info-input-name'
                    placeholder='Xác nhận mật khẩu mới'
                    value={confirmNewPassword}
                    required
                    onChange={handleChangePassword}
                  />
                </>
              }
              </div>
              
            {isDisabledEditPassword?
              <button className='btn-view info-btn' onClick={() => setDisabledEditPassword(false)}>
                Đổi
              </button>
                :
              <>
                <button className='btn-view info-btn' onClick={() => submitChangePassword()} style={{marginRight: 5}}>
                  Lưu
                </button>
                <button className='btn-view info-btn' style={{color: 'red', borderColor: 'red'}} onClick={() => {setDisabledEditPassword(true)}}>
                  Hủy
                </button>
              </>
            }
          </div>  
          <div className='info'>
            <div className='info-content'>
              <span className='info-label'>Hình đại diện</span>
              <br/>
              <div className='info-avatar'>
                <img className='info-img' src={img.prev ? img.prev : user.avt} alt='avatar'/>
                <div className='info-round'>
                  <input
                    type='file'
                    name='avt'
                    accept="image/png, image/jpeg, image/jpg"
                    className='info-input-avt'
                    onChange={handleSeclectImg}
                  />
                  <FontAwesomeIcon icon={faCamera}/>
                </div>
              </div>
              <p  className='info-description'>
                Nên là ảnh vuông, chấp nhận các tệp: JPG, JPEG, PNG
              </p>
            </div>
            {img.prev && <button className='btn-view info-btn' onClick={e => submitUpdateImg(e)}>
              Lưu
            </button>}
          </div>
          <div className='info'>
            <div className='info-content'>
              <span className='info-label'>Tài khoản</span>
              <input
                type='text'
                name='full_name'
                className='info-input-name'
                value={user.username}
                onChange={handleChangeName}
                disabled={true}
              />
            </div>
          </div>
           
        </Col>
        <Col sm={2}/>
      </Row>
    </>
  )
}

export default Info