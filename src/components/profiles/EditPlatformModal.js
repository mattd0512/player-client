import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import PlatformForm from '../shared/PlatformForm'
import { updatePlatform } from '../../api/profile'

const EditPlatformModal = (props) => {
  const { user, handleClose, msgAlert } = props

  const [platform, setPlatform] = useState(props.platform)

    const show = true

  const handleChange = (e) => {
    setPlatform(prevPlatform => {
      const name = e.target.name
      let value = e.target.value

      const updatedPlatform = { [name]: value }

      return {
        ...prevPlatform, ...updatedPlatform
      }
    })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    updatePlatform(user, props.platform._id, platform)
    //   .then(() => handleClose())
      .then(() => {
        msgAlert({
          heading: 'Success',
          message: 'Updated Platform Username',
          variant: 'success'
        })
      })
    //   .then(() => triggerRefresh())
      .catch((error) => {
        msgAlert({
          heading: 'Failure',
          message: 'Update Failure' + error,
          variant: 'danger'
        })
      })
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton />
      <Modal.Body>
        <PlatformForm
          platform={platform}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          heading="Give this pet a toy!"
        />
      </Modal.Body>
    </Modal>
  )

}

export default EditPlatformModal