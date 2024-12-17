import api from '../api'

interface RegisterPayload {
	first_name: string
	last_name: string
	date_of_birth: string
	phone_number: string
	email: string
	password: string
}

export const registerUser = async (payload: RegisterPayload) => {
	try {
		const response = await api.post('/register', payload)
		return response.data
	} catch (error) {
		console.error('Registration error:', error)
		throw error
	}
}
