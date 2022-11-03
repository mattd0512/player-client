import apiUrl from '../apiConfig'
import axios from 'axios'

// each route from backend API for games

// create
export const gameCreate = (data, user) => {
	return axios({
		method: 'POST',
		url: apiUrl + '/games',
		data: {
			game: data,
		},
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}

// game index
// export const gameIndex = (user) => {
// 	return axios({
// 		method: 'GET',
// 		url: apiUrl + '/games'
// 	})
// }

// game index search results
export const gameSearchResults = (user, name) => {
	return axios({
		method: 'GET',
		url: apiUrl + '/games/search/' + name
	})
}

// game show
export const gameShow = (user, apiId) => {
	return axios({
		method: 'GET',
		url: apiUrl + '/games/' + apiId
	})
}

// game update
export const gameUpdate = (data, user, id) => {
	return axios({
		method: 'PATCH',
		url: apiUrl + '/games/addtocollection/' + id,
		data: {
			game: data,
		},
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}

// game delete
export const gameDelete = (user, id) => {
	return axios({
		method: 'DELETE',
		url: apiUrl + '/games/' + id,
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}