import React, { useEffect, useState } from 'react' 
import { Container, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { gameShow } from '../../api/game'

const findingResult = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30%',
    fontSize: '200%',
    color: 'blue'
}

const imageDisplay = {
    height: '50%',
    width: '50%',
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
        <Container style={findingResult}>
            <p>Finding game...</p>
        </Container>
        </>
    )}

    return (
        <>
			<Container className="fluid">
                <Card>
                <Card.Header><h3>{ game.name }</h3></Card.Header>
                <Card.Body>
                    <Card.Text>
                        {/* <h3>Title: { game.name }</h3><br/> */}
                        <small>Description: { game.description }</small><br/>
                        <img src={ game.image } style={imageDisplay}/>
                    </Card.Text>
                </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default GameShow