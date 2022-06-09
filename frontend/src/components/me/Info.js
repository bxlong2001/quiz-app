import React, { useContext, useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { AuthContext } from '../../contexts/AuthContext'

const Info = () => {
  const inputFocus = useRef()
  const [isDisabledEdit, setDisabledEdit] = useState(true)
  const {authState: {user}} = useContext(AuthContext)
  const {username, fullname} = user
  const handleChange = () => {

  }

  return (
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
              onChange={handleChange}
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
              <button className='btn-view info-btn'>
                Lưu
              </button>
              <button className='btn-view info-btn' style={{color: 'red', borderColor: 'red'}} onClick={() => setDisabledEdit(true)}>
                Hủy
              </button>
            </>
          }
        </div>
        <div className='info-wrap'>
          <div className='info-content'>
            <span className='info-label'>Hình đại diện</span>
            <input
              type='file'
              className='info-input'
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
              value={username}
              onChange={handleChange}
              disabled={true}
            />
          </div>
        </div>   
      </Col>
      <Col sm={2}/>
    </Row>
  )
}

export default Info