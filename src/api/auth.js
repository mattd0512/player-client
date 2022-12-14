import apiUrl from '../apiConfig'
import axios from 'axios'

export const signUp = (credentials) => {
    // this is here to ensure @ doesn't get passed to the DB when creating a user
    if (credentials.username.includes('@')) {
        credentials.username = null
    }
	return axios({
		method: 'POST',
		url: apiUrl + '/sign-up',
		data: {
			credentials: {
				email: credentials.email,
				username: credentials.username,
				password: credentials.password,
				password_confirmation: credentials.passwordConfirmation,
			},
		},
	})
}

export const signIn = (credentials) => {
	return axios({
		url: apiUrl + '/sign-in',
		method: 'POST',
		data: {
			credentials: {
                name: credentials.name,
                username: credentials.username,
				email: credentials.email,
				password: credentials.password,
			},
		},
	})
}

export const signOut = (user) => {
	return axios({
		url: apiUrl + '/sign-out',
		method: 'DELETE',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}

export const changePassword = (passwords, user) => {
	return axios({
		url: apiUrl + '/change-password',
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: {
			passwords: {
				old: passwords.oldPassword,
				new: passwords.newPassword,
			},
		},
	})
}

export const chat = (user) => {
	return axios({
		url: apiUrl + '/chat',
		method: 'POST',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}
