import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { deleteReview } from '../../api/review'
import EditReviewModal from './EditReviewModal'

const cardCSS = {
    marginTop: '20px',
    width: '30rem',
    textAlign: 'center',
    borderRadius: '2.5%',
    display: 'flex',
    justifyContent: 'center',
}

const boldText = {
    fontWeight: 'bold'
}

const cardHeader = {
    backgroundColor: 'rgb(98, 180, 223',
    fontWeight: 'bold',
}

const cardBody = {
    backgroundColor: 'rgb(230, 230, 230)'
}

const cardFooter = {
    backgroundColor: 'rgb(98, 180, 223'
}


const ShowReview = (props) => {
    const { review, game, user, msgAlert, triggerRefresh } = props
    console.log('this is the props', props)

    const [editModalShow, setEditModalShow] = useState(false)
    const navigate = useNavigate()

    const destroyReview = () => {
        deleteReview(user, review._id)
            .then(() => {
                msgAlert({
                    heading: 'Review deleted!',
                    message: 'Review has been deleted!',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Oh no!',
                    message: 'Something went wrong!',
                    variant: 'danger'
                })
            })
    }

    return (
        <>
            <Card style={cardCSS} className="m-2" >
                <Card.Header style={cardHeader} onClick={() => navigate(`/profile/${review.username}`)}>Reviewed By: {review.username}</Card.Header>
                <Card.Body style={cardBody}>
                    <h6 style={boldText}>Score: { review.score }/5</h6>
                    { review.comment }
                </Card.Body>
                <Card.Footer style={cardFooter}>
                    { 
                        user && review.owner && user._id === review.owner
                        ?
                        <>
                            <Button
                                style={boldText}
                                className="m-2" 
                                variant="warning"
                                onClick={() => setEditModalShow(true)}  
                            >
                                Edit
                            </Button>
                            <Button 
                                style={boldText}
                                className="m-2"
                                variant="danger"
                                onClick={() => destroyReview()}
                            >
                                Delete
                            </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
            </Card>
            <EditReviewModal 
                user={user}
                game={game}
                review={review}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
            />
        </>
    )
}

export default ShowReview