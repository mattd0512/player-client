import apiUrl from '../apiConfig'
import axios from 'axios'

// my profile show
export const myProfile = (user) => {
	return axios({
		method: 'GET',
		url: apiUrl + '/my-profile',
        headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}

// remove from my collection
export const removeFromCollection = (user, gameId) => {
	return axios({
		method: 'PATCH',
		url: apiUrl + '/games/mylibrary/remove/' + gameId,
        headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}
