import React, { useEffect, useState } from 'react'
import { Container, Card, Button } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { gameShow } from '../../api/game'
import Spinner from 'react-bootstrap/Spinner'
import { FiBookmark } from "react-icons/fi"
import ReviewShow from '../reviews/ReviewShow'
import NewReviewModal from '../reviews/NewReviewModal'
import EditReviewModal from '../reviews/EditReviewModal'
import { getReview } from '../../api/review'
import { addToCollection } from '../../api/profile'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const backgroundCSS = {
    backgroundColor: 'rgb(212, 212, 212)',
    // backgroundColor: 'rgb(120, 219, 111)',
    display: 'flex',
    justifyContent: 'center',
    // height: '100rem'
}

const cardHeader = {
    fontFamily: 'Bungee Inline',
    // backgroundColor: 'rgb(241, 50, 50)',
    // color: 'white'
}

const cardFooter = {
    backgroundColor: 'rgb(241, 50, 50)',
    color: 'white',
    fontFamily: 'Bungee Inline',
}

const spinnerCSS = {
    marginLeft: '15%',
}

const boldText = {
    fontWeight: 'bold'
}

const cardCSS = {
    marginTop: '20px',
    marginBottom: '20px',
    width: '25rem',
    // height: '35rem',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: '2.5%',
}

const findingResult = {
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 'bold',
    marginTop: '30%',
    fontSize: '200%',
    color: 'rgb(241, 50, 50)'
}

const imageDisplay = {
    // height: '70%',
    width: '20rem',
    alignSelf: 'center'
}

const col1Style = {
    paddingLeft: '5rem'
}

const col2Style = {
    paddingRight: '10rem',
    display: 'flex',
    justifyContent: 'right'
}

const reviewCardCSS = {
    // paddingLeft: '20px',
    width: '30rem',
    borderRadius: '2.5%',
    marginTop: '1rem',
    marginLeft: '0.5rem',
    backgroundColor: 'rgb(241, 50, 50)'
}

const reviewButtonCSS = {
    backgroundColor: 'rgb(241, 50, 50)',
    border: 'none',
    color: 'white',
    fontWeight: 'bold'
}


const GameShow = ({ user, msgAlert, setUser }) => {

    const [game, setGame] = useState(null)
    const [reviews, setReviews] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)
    const { apiId } = useParams()
    const [reviewModalShow, setReviewModalShow] = useState(false)
    const [canReview, setCanReview] = useState(true)
    const [gameshareScore, setGamesharScore] = useState(null)
    // can remove unused `useNavigate()`
    const navigate = useNavigate()

    const AddToCollection = () => {
        addToCollection(user, game.id)
            .then((res) => setUser(res.data.user))
            .then(() =>
                msgAlert({
                    heading: 'Game Added',
                    message: `${game.name} has been added to your collection.`,
                    variant: 'success',
                })
            )
            .catch(() => {
                msgAlert({
                    heading: 'Failed to Add Game',
                    message: 'Failed to add game to your collection.',
                    variant: 'danger',
                })
            })

    }

    useEffect(() => {
        gameShow(user, apiId)
            .then((res) => {
                setGame({
                    name: res.data.results.name,
                    description: res.data.results.deck,
                    image: res.data.results.image.original_url,
                    id: res.data.results.id
                })
            })
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Failure to show game ' + error,
                    variant: 'danger'
                })
            })
    }, [])


    useEffect(() => {
        getReview(user, apiId)
            .then(res => {
                if (res.data.reviews.find(e => e.username === user.username)) {
                    setCanReview(false)
                } else {
                    setCanReview(true)
                }

                let avgScore
                // This can become unreadalbe pretty quick. Always leave a comment about what something is doing when we cannot see straight off the bat what it's doing
                if (res.data.reviews.length > 0) {
                    avgScore = 0
                    res.data.reviews.forEach(review => {
                        avgScore = avgScore + review.score
                    })
                    avgScore = avgScore / res.data.reviews.length
                    avgScore = Math.round(avgScore * 2) / 2
                    setGamesharScore(avgScore)
                }

                setReviews(res.data.reviews)
            })
    }, [updated])

    // Can remove or comment out unused lines 175 to 188. Also coding consistency is something that we need to keep in mind. Here you are using `useState` but not using the import that you did at the top of the file. If you have imported everything one way the best thing is to stick with that way. 
    const [currentValue, setCurrentValue] = React.useState(0)
    const [hoverValue, setHoverValue] = React.useState(undefined)

    const handleClick = value => {
        setCurrentValue(value)
    }

    const handleMouseOver = value => {
        setHoverValue(value)
    }

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }


    if (!game) {
        return (
            <>
                <div style={backgroundCSS}>
                    <Container style={findingResult}>
                        <p>Finding game</p>
                        <p>
                            <Spinner animation='border' style={spinnerCSS}>
                            </Spinner>
                        </p>
                    </Container>
                </div>
            </>
        )
    }

    let reviewCards
    if (reviews) {

        if (reviews.length > 0) {
            reviewCards = reviews.map(review => (
                <ReviewShow
                    key={review._id}
                    review={review}
                    game={game}
                    user={user}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
            ))
        }
    }

    return (
			<>
				<div style={backgroundCSS}>
					<Container className='fluid'>
						<Row>
							<Col style={col1Style}>
								<Card style={cardCSS}>
									<Card.Header style={cardHeader}>
										{/* {gameshareScore ?
                                        <>
                                            <h5>Gameshare Score<br />{gameshareScore}/5</h5><hr />
                                        </>
                                        :
                                        null} */}
										<h4 style={boldText}>{game.name}</h4>
									</Card.Header>
									<Card.Img
										variant='top'
										src={game.image}
										style={imageDisplay}
									/>
									<Card.Body>
										<Card.Text>
											<div>
												<small>
													<span style={boldText}>Description:</span>{' '}
													{game.description}
												</small>
											</div>
										</Card.Text>

										{user.myGames.includes(apiId) ? (
											<>
												<FiBookmark />
												In My Library
											</>
										) : (
											<Button onClick={() => AddToCollection()}>
												<FiBookmark />
												Add To Collection
											</Button>
										)}
									</Card.Body>
									<Card.Footer style={cardFooter}>
										{/* Can use conditional rendering for this instead of a ternary.
										{gameshareScore && <h5>things in here</h5>} */}
										{gameshareScore ? (
											<>
												<h5 style={boldText}>
													Gameshare Score
													<br />
													{gameshareScore}/5
												</h5>
											</>
										) : null}
									</Card.Footer>
								</Card>
								<Card>
									{/* {canReview ?
                            <Button onClick={() => setReviewModalShow(true)} className="m-2" variant="info">
                                Write {game.name} a review!
                            </Button>
                            :
                            null
                        } */}
								</Card>
							</Col>
							<Col style={col2Style}>
								<div>
									<div>{reviewCards}</div>
									<Card style={reviewCardCSS}>
										{/* Conditionally render this instead of using a ternary
										{canReview && <Button>Button stuff here</Button>} */}
										{canReview ? (
											<Button
												style={reviewButtonCSS}
												onClick={() => setReviewModalShow(true)}
												className='m-2'
												variant='info'>
												Write {game.name} a review!
											</Button>
										) : null}
									</Card>
								</div>
								<EditReviewModal
									user={user}
									game={game}
									show={editModalShow}
									msgAlert={msgAlert}
									triggerRefresh={() => setUpdated((prev) => !prev)}
									handleClose={() => setEditModalShow(false)}
								/>
								<NewReviewModal
									user={user}
									game={game}
									show={reviewModalShow}
									msgAlert={msgAlert}
									triggerRefresh={() => setUpdated((prev) => !prev)}
									handleClose={() => setReviewModalShow(false)}
								/>
							</Col>
							{/* <Col style={col2Style}>
                <div>
                <div>{reviewCards}</div>
                <Card style={reviewCardCSS}>
                    <Button style={reviewButtonCSS} onClick={() => setReviewModalShow(true)} className="m-2" variant="info">
                        Write {game.name} a review!
                    </Button>
                </Card>
                </div>
                    <EditReviewModal
                        user={user}
                        game={game}
                        show={editModalShow}
                        msgAlert={msgAlert}
                        triggerRefresh={() => setUpdated(prev => !prev)}
                        handleClose={() => setEditModalShow(false)}
                    />
                    <NewReviewModal
                        user={user}
                        game={game}
                        show={reviewModalShow}
                        msgAlert={msgAlert}
                        triggerRefresh={() => setUpdated(prev => !prev)}
                        handleClose={() => setReviewModalShow(false)}
                    />
                    </Col> */}
						</Row>
					</Container>
				</div>
			</>
		)
}

export default GameShow