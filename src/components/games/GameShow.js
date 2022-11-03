import React, { useEffect, useState } from 'react' 
import { Container, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { gameShow } from '../../api/game'
<<<<<<< HEAD
import GameReview from '../../GameReview'
import ReviewSection from '../../ReviewSection'
=======
import Spinner from 'react-bootstrap/Spinner'
>>>>>>> 0a761d8d429c59209d5d2a830f20a37a0b16eaa9

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

const reviewCSS = {
    width: 420,
    height: 400,
    justifyContent: 'flex-end',
    marginLeft: '430px',
    marginTop: '-450px',
    marginBottom: '50px',
    borderRadius: '2.5%'
}

const reviewsCSS = {
    width: 420,
    height: 400,
    justifyContent: 'flex-end',
    marginLeft: '950px',
    marginTop: '-450px',
    marginBottom: '50px',
    borderRadius: '2.5%'
}

const GameShow = ({ user, msgAlert }) => {

    const [game, setGame] = useState(null)

    const { apiId } = useParams()

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
                <div>
                    <Card style={reviewCSS}>
                        <GameReview />
                    </Card>
                </div>
                <div>
                    <Card style={reviewsCSS}>
                        <ReviewSection />
                    </Card>
                </div>
            </Container>
        </div>
        </>
    )
}

export default GameShow