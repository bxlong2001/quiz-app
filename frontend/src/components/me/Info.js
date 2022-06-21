import React, { useContext, useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Row } from 'react-bootstrap'
import { AuthContext } from '../../contexts/AuthContext'
import { UserContext } from '../../contexts/UserContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { apiUrl } from '../../contexts/constaints'


const Info = () => {
  const inputFocus = useRef()
  const [isDisabledEdit, setDisabledEdit] = useState(true)
  const {authState: {user}} = useContext(AuthContext)
  const [fullname, setFullname] = useState(user.fullname)
  const [img, setImg] = useState({file: '', prev: ''})
  const {updateInfo, updateImg} = useContext(UserContext)

  useEffect(() => {
    inputFocus.current.focus()
  }, [isDisabledEdit])

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(img.prev)
    }
  }, [img.prev])

  const handleSeclectImg = (e) => {
    if(e.target.files.length!==0)
      setImg({file: e.target.files[0], prev: URL.createObjectURL(e.target.files[0])})
  }

  const handleChange = (e) => {
    setFullname(e.target.value)
  }

  const submitUpdateFullname = async (e) => {

    try {
      const req = await updateInfo(fullname, user._id)
      if(req.success){
        toast.success(req.message)
        return setDisabledEdit(true)
      }
      toast.error(req.message)
    } catch (error) {
      console.log(error);
    }
  }

  const submitUpdateImg = async (e) => {
    e.preventDefault()
    
    try {
      const req = await updateImg(img.file, user._id, user.avt)
      if(req.success){
        URL.revokeObjectURL(img.prev)
        setImg({file: '', prev: ''})
        return toast.success(req.message)
      }
      toast.error(req.message)
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
          <div className='info-wrap'>
            <div className='info-content'>
              <span className='info-label'>Họ tên</span>
              <input
                type='text'
                name='fullName'
                className='info-input'
                ref={inputFocus}
                maxLength={50}
                placeholder='Thêm tên của bạn'
                value={fullname}
                onChange={e => handleChange(e)}
                disabled={isDisabledEdit}
              />
              <p className='info-description'>
                Tên của bạn sẽ xuất hiện trên trang cá nhân
              </p>
            </div>
            {isDisabledEdit?
              <button className='btn-view info-btn' onClick={() => setDisabledEdit(false)}>
                Sửa
              </button>
                :
              <>
                <button className='btn-view info-btn' onClick={e => submitUpdateFullname(e)}>
                  Lưu
                </button>
                <button className='btn-view info-btn' style={{color: 'red', borderColor: 'red'}} onClick={() => {setFullname(user.fullname); setDisabledEdit(true)}}>
                  Hủy
                </button>
              </>
            }
          </div>
          <div className='info-wrap'>
            <div className='info-content'>
              <span className='info-label'>Hình đại diện</span>
              <br/>
              <div className='info-avatar'>
                <img className='info-img' src={img.prev ? img.prev : apiUrl.concat(user.avt)} alt='avatar'/>
                <div className='info-round'>
                  <input
                    type='file'
                    name='avt'
                    accept="image/png, image/jpeg, image/jpg"
                    className='info-input'
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
          <div className='info-wrap'>
            <div className='info-content'>
              <span className='info-label'>Tài khoản</span>
              <input
                type='text'
                name='full_name'
                className='info-input'
                value={user.username}
                onChange={handleChange}
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