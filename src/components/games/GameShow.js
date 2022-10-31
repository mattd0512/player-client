import React, { useEffect, useState } from 'react' 
import { Container, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { gameShow } from '../../api/game'

const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

// const GameShow = ({ user, msgAlert }) => {

//     const [allGames, setAllGames] = useState([])

//     useEffect((user) => {
//         gameShow(user)
//         .then(res => {
//             setAllGames(res.data.games)
//         })
//         .catch((error) => {
//             msgAlert({
//                 heading: 'Failure',
//                 message: 'Failure to query show game ' + error,
//                 variant: 'danger'
//             })
//         })
//     }, []
// )

//     const allGamesJSX = allGames.map(game => {
//         return (
//             <Link to={`/games/${game.apiId}`} key={game.apiId}>
//                 <li>Name: {game.title}</li>
//             </Link>
//         )
//     })

//     const gameCards = allGames.map(game => (
//         <Card key={ game.apiId } style={{ width: '30%', margin: 5 }}>
//             <Card.Header>{ game.title }</Card.Header>
//             <Card.Body>
//                 <Card.Text>
//                     <Link to={ `/games/${game.apiId}` }>View { game.title }</Link>
//                 </Card.Text>
//             </Card.Body>
//         </Card>
//     ))

//     return (
//         <div className='container-md' style={ cardContainerLayout }>
//             {/* <h3>Testing</h3> */}
//             {/* { gameCards } */}
//         </div>
//     )
// }


const GameShow = ({ user, msgAlert }) => {

    const [game, setGame] = useState(null)

    const { id } = useParams()

    useEffect(() => {
        gameShow(user, id)
            .then((res) => {
                setGame(res.data.game)
            })
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Failure to show game' + error,
                    variant: 'danger'
                })
            })
    }, [])

    return (
        <>
			<Container className="fluid">
                <Card>
                <Card.Header>{ game.title }</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <small>Title: { game.title }</small><br/>
                        <small>Description: { game.description }</small><br/>
                    </Card.Text>
                </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default GameShow