import apiUrl from '../apiConfig'
import axios from 'axios'

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
export const updateReview = (user, gameId, updatedReview) => {
	return axios({
		url: `${apiUrl}/reviews/${gameId}/${updatedReview._id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { review: updatedReview }
	})
}

// DELETE review
export const deleteReview = (user, gameId, reviewId) => {
	return axios({
		url: `${apiUrl}/reviews/${gameId}/${reviewId}`,
		method: 'DELETE',
		headers: {
			Authorization: `Token token=${user.token}`,
		}
	})
}