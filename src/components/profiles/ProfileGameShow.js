import React, { useEffect, useState } from 'react' 
import { Container, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { localGameShow } from '../../api/game'
import Spinner from 'react-bootstrap/Spinner'
import apiUrl from '../../apiConfig'
import { removeFromCollection, setAsFavorite } from '../../api/profile'

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

const GameShow = ({ user, msgAlert, gameId, setUser }) => {
    
    const [game, setGame] = useState(null)

    const navigate = useNavigate()
    // let { apiId } = useParams()

    // if (gameId) {
    //     apiId  = gameId
    // } 
    // console.log(apiId)
    const removeFromMyLibrary = () => {
        removeFromCollection(user, gameId)
        .then((res) => {
            console.log('here is a res', res)
            setUser(res.data.user)
        })
        .then(() => {
            // console.log('user after delete', user)
            // console.log('res user', res.user)
            msgAlert({
                heading: 'Success',
                message: 'Removed game from your library',
                variant: 'success'
            })
            
        })
        
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Failed to remove game from your Library' + error,
                variant: 'danger'
            })
        })
    }

    const myFavorite = () => {
        setAsFavorite(user, gameId)
        .then((res) => {
            setUser(res.data.user)
        })
        .then(() => {
            // console.log('user after delete', user)
            // console.log('res user', res.user)
            msgAlert({
                heading: 'Success',
                message: 'Set Game as Favorite',
                variant: 'success'
            })
            
        })
        
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Failed to set Game as Favorite' + error,
                variant: 'danger'
            })
        })
    }
    

    useEffect(() => {
        localGameShow(user, gameId)
            .then((res) => {
                console.log(res)
                setGame({
                    name: res.data.game.title,
                    description: res.data.game.description,
                    image: res.data.game.imgUrl,
                    thumbnail: res.data.game.thumbnailUrl
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
                <Card.Footer>
                    <Button onClick={() => removeFromMyLibrary()} className ="btn-success">Remove from Library</Button>
                    {user.thumbnail != game.thumbnail?
                    <Button onClick={() => myFavorite()} className ="btn-success">Set as Profile Pic</Button>
                    :
                    null
                    }
                </Card.Footer>
                </Card>
            </Container>
        </div>
        </>
    )
}

export default GameShow