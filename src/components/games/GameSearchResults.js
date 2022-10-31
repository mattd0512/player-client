// import React, { useEffect, useState } from 'react' 
// import { Card } from 'react-bootstrap'
// import { Link } from 'react-router-dom'
// import { gameSearchResults } from '../../api/game'

// const cardContainerLayout = {
//     display: 'flex',
//     flexFlow: 'row wrap',
//     justifyContent: 'center'
// }

// const GameSearchResults = ({ user, msgAlert }) => {

//     const [allGames, setAllGames] = useState([])

//     useEffect((user) => {
//         gameSearchResults(user)
//         .then(res => {
//             setAllGames(res.data.games)
//         })
//         .catch((error) => {
//             msgAlert({
//                 heading: 'Failure',
//                 message: 'Failure to query search results' + error,
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
//             <h3>Testing</h3>
//             {/* { gameCards } */}
//         </div>
//     )
// }

// export default GameSearchResults