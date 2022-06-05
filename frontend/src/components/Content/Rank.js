import React from 'react'
import {Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faTrophy } from '@fortawesome/free-solid-svg-icons'

const Rank = () => {
  let i = 1
  return (
    <Table striped hover>
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th></th>
          <th>Hạng</th>
          <th>Tài khoản</th>
          <th>Điểm số</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td>
            {i===1?<FontAwesomeIcon icon={faTrophy} />:++i}
          </td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </Table>
  )
}

export default Rank