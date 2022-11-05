import React, { useEffect, useState } from 'react' 
import { Container, Card, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { gameShow } from '../../api/game'
import Spinner from 'react-bootstrap/Spinner'
import { FiBookmark } from "react-icons/fi"
import ReviewShow from '../reviews/ReviewShow'
import NewReviewModal from '../reviews/NewReviewModal'
import EditReviewModal from '../reviews/EditReviewModal'
import { getReview } from '../../api/review'

const backgroundCSS = {
    backgroundColor: 'rgb(212, 212, 212)',
    // backgroundColor: 'rgb(120, 219, 111)',
    display: 'flex',
    justifyContent: 'center'
}

const cardHeader = {
    fontFamily: 'Rubik',
    // fontWeight: 'bold',
    // fontSize: '10px'
}

const cardBody = {
    width: '100%',
    height: '100%'
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
    borderRadius: '2.5%'
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

const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const GameShow = ({ user, msgAlert }) => {

    const [game, setGame] = useState(null)
    const [reviews, setReviews] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)
    const { apiId } = useParams()
    const [reviewModalShow, setReviewModalShow] = useState(false)
    // const [loadReviews, setLoadReviews] = useState(true)

    // if (gameId) {
    //     apiId  = gameId
    // } 
    console.log(apiId)
    useEffect(() => {
        gameShow(user, apiId)
            .then((res) => {
                console.log(res.data.results)
                setGame({
                    name: res.data.results.name,
                    description: res.data.results.deck,
                    image: res.data.results.image.original_url,
                    id: res.data.results.id
                })
                // setGame(res.data.results.name)
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
                console.log('review res',res.data.reviews)
                setReviews(res.data.reviews)
            })

    },[updated])

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
    )}

    let reviewCards
    if (reviews) {
        if (reviews.length > 0) {
            // map over the toys
            // produce one ShowToy component for each of them
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
			<Container className="fluid">
                <Card style={cardCSS}>
                <Card.Header style={cardHeader}><h4>{ game.name }</h4></Card.Header>
                <Card.Img variant="top" src={game.image} style={imageDisplay}/>
                <Card.Body>
                    <Card.Text>
                        {/* <div style={cardBody}>
                        <img src={ game.image } style={imageDisplay}/><br/><br/>
                        </div> */}
                        <div>
                            <small><span style={boldText}>Description:</span> { game.description }</small>
                        </div>
                    </Card.Text>
                    <FiBookmark/>
                </Card.Body>
                </Card>
                <div>{reviewCards}</div>
                <Card>
                    <Button onClick={() => setReviewModalShow(true)} className="m-2" variant="info">
                        Write {game.name} a review!
                    </Button>
                </Card>
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
            </Container>
        </div>
        </>
    )
}

export default GameShow