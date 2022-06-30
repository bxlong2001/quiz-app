import React, { useContext } from 'react'
import { Col, Row } from 'react-bootstrap'
import { AuthContext } from '../../contexts/AuthContext'
import { apiUrl } from '../../contexts/constaints'


const MyRank = () => {
  const {authState: {user}} = useContext(AuthContext)
  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <div id='myrank'>
          <div className='myrank-wrap'>
            <img className='myrank-avt' src={apiUrl + user.avt} alt='avatar'></img>
            <div className='myrank-title'>Top 1</div>
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default MyRank