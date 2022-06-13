import React, { useContext, useEffect, useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { AuthContext } from '../../contexts/AuthContext'
import { UserContext } from '../../contexts/UserContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Info = () => {
  const inputFocus = useRef()
  const [isDisabledEdit, setDisabledEdit] = useState(true)
  const {authState: {user}} = useContext(AuthContext)
  const [fullname, setFullname] = useState(user.fullname)
  const [img, setImg] = useState({file: {}, img: ''})
  const {updateInfo} = useContext(UserContext)

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(img.img)
    }
  }, [img.img])

  const handleSeclectImg = (e) => {
    if(e.target.files.length!==0)
      setImg({file: e.target.files[0], img: URL.createObjectURL(e.target.files[0])})
  }

  const handleChange = (e) => {
    setFullname(e.target.value)
  }

  const submitUpdate = async (e) => {
    e.preventDefault()

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
  console.log(img.file);
  console.log(img.img);
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
                Tên của bạn xuất hiện trên trang cá nhân
              </p>
            </div>
            {isDisabledEdit?
              <button className='btn-view info-btn' onClick={() => setDisabledEdit(false)}>
                Sửa
              </button>
                :
              <>
                <button className='btn-view info-btn' onClick={e => submitUpdate(e)}>
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
              {img.img && <img className='info-avatar' src={img.img} alt='avatar'></img>}
              <input
                type='file'
                name='info-avt'
                accept="image/png, image/jpeg"
                className='info-input'
                onChange={handleSeclectImg}
              />
              <p  className='info-description'>
                Nên là ảnh vuông, chấp nhận các tệp: JPG, PNG
              </p>
            </div>
            <button className='btn-view info-btn'>
              Sửa
            </button>
          </div>
          <div className='info-wrap'>
            <div className='info-content'>
              <span className='info-label'>Đổi mật khẩu</span>
              <p  className='info-description'>
                Bạn nên sử dụng mật khẩu mạnh mà mình chưa sử dụng ở đâu khác
              </p>
            </div>
            <button className='btn-view info-btn'>
              Sửa
            </button>
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