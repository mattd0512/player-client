import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ReviewForm from '../shared/ReviewForm'
import { updateReview } from '../../api/review'
import messages from '../shared/AutoDismissAlert/messages'

const EditReviewModal = (props) => {
    const { 
        user, show, handleClose, 
        msgAlert, triggerRefresh, game
    } = props

    const [review, setReview] = useState(props.review)

    const handleChange = (e) => {
        setReview(prevReview => {
            const comment = e.target.comment
            let value = e.target.value

            const updatedReview = { [comment]: value }

            return {
                ...prevReview, ...updatedReview
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        updateReview(user, game._id, review)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.updateReviewSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: messages.updateReviewFailure + error,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton/>
            <Modal.Body>
                <ReviewForm 
                    review={review}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Leave a review"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditReviewModal