import apiUrl from '../apiConfig'
import axios from 'axios'

export const reviewShow = (user) => {
	return axios({
		method: 'GET',
		url: `${apiUrl}/reviews/show/id`
	})
}

export const createReview = (user, gameId, data) => {
    return axios({
        method: 'POST',
        url: `${apiUrl}/reviews/${gameId}`,
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		review: { data }
    })
}

export const updateReview = (user, data, id) => {
	return axios({
		url: `${apiUrl}/reviews/${id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		review: { data }
	})
}

export const deleteReview = (user, id) => {
	return axios({
		url: `${apiUrl}/reviews/${id}`,
		method: 'DELETE',
		headers: {
			Authorization: `Token token=${user.token}`,
		}
	})
}