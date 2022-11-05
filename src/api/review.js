import apiUrl from '../apiConfig'
import axios from 'axios'

// GET -> reviews for a specific game
export const getReview = (user, gameId) => {
	return axios({
		url: `${apiUrl}/reviews/${gameId}`,
		method: 'GET',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}


// CREATE
export const createReview = (user, gameId, newReview) => {
	return axios({
		url: `${apiUrl}/reviews/${gameId}`,
		method: 'POST',
		data: { review: newReview },
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}

// UPDATE review
export const updateReview = (user, updatedReview) => {
	return axios({
		url: `${apiUrl}/reviews/${updatedReview._id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { review: updatedReview }
	})
}

// DELETE review
export const deleteReview = (user, reviewId) => {
	return axios({
		url: `${apiUrl}/reviews/${reviewId}`,
		method: 'DELETE',
		headers: {
			Authorization: `Token token=${user.token}`,
		}
	})
}