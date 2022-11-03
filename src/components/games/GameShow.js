import React, { useEffect, useState } from 'react' 
import { Container, Card, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { gameShow } from '../../api/game'
import Spinner from 'react-bootstrap/Spinner'
import NewReviewModal from '../reviews/NewReviewModal'
import ShowReview from '../reviews/ShowReview'
import EditReviewModal from '../reviews/EditReviewModal'

const backgroundCSS = {
    backgroundColor: 'rgb(212, 212, 212)',
    // backgroundColor: 'rgb(120, 219, 111)',
    display: 'flex',
    justifyContent: 'center'
}

const cardHeader = {
    fontFamily: 'Bungee Inline',
    // fontWeight: 'bold',
    fontSize: '200px'
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
    width: '20rem',
    height: '35rem',
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
    height: '90%',
    width: '90%'
}

const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const GameShow = ({ user, msgAlert }) => {

    const [game, setGame] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)
    const { apiId } = useParams()
    const [reviewModalShow, setReviewModalShow] = useState(false)

    useEffect(() => {
        gameShow(user, apiId)
            .then((res) => {
                console.log(res.data.results)
                setGame({
                    name: res.data.results.name,
                    description: res.data.results.deck,
                    image: res.data.results.image.original_url
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

    // let reviewCards
    // if (game) {
    //     if (game.reviews.length > 0) {
    //         reviewCards = game.reviews.map(review => (
    //             <ShowReview 
    //                 key={review._id}
    //                 review={review}
    //                 game={game}
    //                 user={user}
    //                 msgAlert={msgAlert}
    //                 triggerRefresh={() => setUpdated(prev => !prev)}
    //             />
    //         ))
    //     }
    // }


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

    return (
        <>
        <div style={backgroundCSS}>
			<Container className="fluid">
                <Card style={cardCSS}>
                <Card.Header style={cardHeader}><h3>{ game.name }</h3></Card.Header>
                <Card.Img variant="top" src={game.image} />
                <Card.Body>
                    <Card.Text>
                        {/* <div style={cardBody}>
                        <img src={ game.image } style={imageDisplay}/><br/><br/>
                        </div> */}
                        <div>
                            <small><span style={boldText}>Description:</span> { game.description }</small>
                        </div>
                    </Card.Text>
                </Card.Body>
                </Card>
                <Card>
                    <Button onClick={() => setReviewModalShow(true)} className="m-2" variant="info">
                        Write {game.name} a review!
                    </Button>
                </Card>
            {/* <Container style={cardContainerLayout}>
                { reviewCards }
            </Container> */}
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