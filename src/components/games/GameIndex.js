import React, { useEffect, useState } from 'react' 
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { gameIndex } from '../../api/game'

const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const GameIndex = ({ user, msgAlert }) => {

    const [allGames, setAllGames] = useState([])

    useEffect(() => {
        gameIndex(user)
        .then(res => {
            setAllGames(res.data.games)
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Index Games Failure' + error,
                variant: 'danger'
            })
        })
    }, [])

    const allGamesJSX = allGames.map(game => {
        return (
            <Link to={`/games/${game._id}`} key={game._id}>
                <li>Name: {game.name}</li>
            </Link>
        )
    })

    const gameCards = allGames.map(pet => (
        <Card key={ game.id } style={{ width: '30%', margin: 5 }}>
            <Card.Header>{ game.fullTitle }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={ `/games/${game.id}` }>View { game.name }</Link>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    return (
        <div className='container-md' style={ cardContainerLayout }>
            {/* <ul>{allPetsJSX}</ul> */}
            { gameCards }
        </div>
    )
}

export default GameIndex