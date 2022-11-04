import React, { useEffect, useState } from 'react' 
import { Container, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { gameSearchResults } from '../../api/game'
import Spinner from 'react-bootstrap/Spinner'
import { Link } from 'react-router-dom'

const backgroundCSS = {
    backgroundColor: 'rgb(212, 212, 212)',
    // backgroundColor: 'rgb(120, 219, 111)',
    display: 'flex',
    justifyContent: 'center'
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
    width: '20%',
    height: '100%',
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


const GameSearchResults = ({ user, msgAlert }) => {

    const [allGames, setAllGames] = useState([])



    useEffect(() => {
        gameSearchResults(user)
            .then((res) => { 
                setAllGames(res.data.games)
                    })
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Failure to find games ' + error,
                    variant: 'danger'
                })
            })
    }, [])

    const gameCards =  allGames?.map(game => (
        <Container className="fluid">
                <Card style={cardCSS}>
                <Card.Header><h3>{ game.name }</h3></Card.Header>
                <Card.Body>
                    <Card.Text>
                        <div style={cardBody}>
                        <img src={ game.original_url } style={imageDisplay}/><br/><br/>
                        <Link to={ `/games/${game.id}` }>View { game.name }</Link>
                        </div>
                    </Card.Text>
                </Card.Body>
                </Card>
            </Container>
    ))



    if (!allGames) {
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
        <div>
        {gameCards }
     
        </div>
    )
}

export default GameSearchResults	

