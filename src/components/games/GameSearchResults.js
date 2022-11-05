import React, { useEffect, useState } from 'react' 
import { Container, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { gameSearchResults } from '../../api/game'
import Spinner from 'react-bootstrap/Spinner'
import GameSearchShow from './GameSearchShow'

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

const GameSearch = ({ user, msgAlert, renderSearch, setRenderSearch }) => {
    useEffect(() => {
        setRenderSearch(true)
    },[])
    
    const [allGames, setAllGames ] = useState([])
    
    const { name } = useParams()
    let searchTerm 

    // let allGames
    useEffect(() => {
        gameSearchResults(user, name)
            .then((res) => {

                console.log(res.data.results)
                // setAllGames({
                //     name: res.data.results[0].name,
                //     // description: res.data.results.deck,
                //     image: res.data.results[0].image.original_url
                // })
                let games = res.data.results.map((game) => (
                    // console.log('before sanitized', game.image.original_url)

                    
                    <GameSearchShow
                        key = { game.id }
                        name = { game.name }
                        image = { game.image.thumb_url }
                        id = { game.id }
                        // game = {game}
                    />
                ))
                console.log('search result',games)
                return games
                })
                
            
            .then(games => {
                console.log(games)
                setRenderSearch(false)
                setAllGames(games)
            })
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Failure to find games ' + error,
                    variant: 'danger'
                })
            })
        }, [renderSearch])
    
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
        // <>
        // <div style={backgroundCSS}>
		// 	<Container className="fluid">
        //         <Card style={cardCSS}>
        //         <Card.Header><h3>{ allGames.name }</h3></Card.Header>
        //         <Card.Body>
        //             <Card.Text>
        //                 <div style={cardBody}>
        //                 <img src={ allGames.image } style={imageDisplay}/><br/><br/>
        //                 </div>
        //             </Card.Text>
        //         </Card.Body>
        //         </Card>
        //     </Container>
        // </div>
        // </>
        <>

        {allGames}

        </>
    )

    // return (
    //     <div className='container-md'>
    //         {/* <ul>{allPetsJSX}</ul> */}
    //         { gameCards }
    //     </div>
    // )
}

export default GameSearch