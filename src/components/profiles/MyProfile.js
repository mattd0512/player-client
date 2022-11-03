import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

import ProfileGameShow from './ProfileGameShow'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Badge, Container, Link } from 'react-bootstrap'

import apiUrl from '../../apiConfig'
import { myProfile } from '../../api/profile'

const MyProfile = (props) => {
    console.log('props: ',props)
    const { msgAlert, user, setUser } = props
    console.log(user)
    
    // const [updated, setUpdated] = useState(false)
    // const [myGames, setMyGames] = useState(user.myGames)
    // if (user) {
    //     setMyGames(user.myGames)
    //     console.log(myGames)
    // }
    // useEffect(() => {
    //     myProfile(user)
    //     // .then(() => {setMyGames(user.myGames)})
        
    // }, [updated])

    // const [allPlatform, setAllPlatform] = useState(null)

    // useEffect(() => {

    // })

    let platforms
    if (user) {
        if (user.platforms.length > 0) {
            platforms = user.platforms.map((platform, ind) => (
                <>
                    <Badge key={ind} className='badge-primary badge-pill '>

                        {platform.platform}: {platform.name}
                    </Badge>
                    <br />
                </>
            ))
        }
    }

    let gameCards
    if(user) {
        if (user.myGames.length > 0) {
      
            gameCards = user.myGames.reverse()

            gameCards= gameCards.map(game => (
                <>
                    <ProfileGameShow
                        key = {game}
                        user = {user}
                        msgAlert = {msgAlert}
                        gameId = {game}
                        setUser={setUser}
                    />
                </>
            ))
        }
    }

    // const [name, setName] = useState('')
    // const [password, setPassword] = useState('')

    // const navigate = useNavigate()

	// const onSignIn = (event) => {
	// 	event.preventDefault()
    //     console.log('the props', props)
	// 	const { msgAlert, setUser } = props

    //     const credentials = {name, password}

	// 	signIn(credentials)
	// 		.then((res) => setUser(res.data.user))
	// 		.then(() =>
	// 			msgAlert({
	// 				heading: 'Sign In Success',
	// 				message: messages.signInSuccess,
	// 				variant: 'success',
	// 			})
	// 		)
	// 		.then(() => navigate('/'))
	// 		.catch((error) => {
    //             setName('')
    //             setPassword('')
	// 			msgAlert({
	// 				heading: 'Sign In Failed with error: ' + error.message,
	// 				message: messages.signInFailure,
	// 				variant: 'danger',
	// 			})
	// 		})
	// }

    return (
        <div >
            <h3>Hello, {user.username}</h3>
            { user && user.platforms.length > 0?
                <>
                <h6>My Gamer Tags:</h6>
                {platforms}
                </>
                :
                null
            }
            {gameCards}
        </div>
    )
}

export default MyProfile
